/**
 * dsh-better-model-setting — host 侧核心逻辑。
 *
 * 设计（按用户确定的方案，替代旧的"运行时拦截 disabledProviders"思路）：
 * - 禁用 provider = 真正把它从 settings.yaml 的 `llm-pi-ai.providers` 里删除，
 *   并把完整配置快照存入"插件专用小数据库"（settings.yaml 同目录的 JSON）。
 *   由于 settings.yaml / FileProvider 启用了 watch，DSH 会热发布本变更，
 *   模型选择器（读 llm-pi-ai 适配器）随之不再显示该 provider。
 * - 启用 provider = 从数据库读出快照，写回 `llm-pi-ai.providers`，并删除库中快照。
 * - 思考档位（modelEfforts）与重试覆盖通过插件自有命名空间 `better-model-setting`
 *   持久化 —— FileProvider 把它作为 settings.yaml 里的同名分节落盘，即"直接编辑 settings.yaml"。
 * - 每次写 settings.yaml 前自动备份该文件，保留最近 5 份。
 *
 * 持久化传输：DSH 的 API Proxy 只给配置客户端暴露 llm-provider / 白名单命名空间，
 * 不会暴露插件的 `better-model-setting`，因此沿用插件自建 loopback-only HTTP 端点
 * （本进程内直接操作 SettingsProvider / 配置文件）。
 */
import { ReasoningEffortId } from '@deepseek-ai/dsh-llm'
import z from '@deepseek-ai/schemastery'
import fs from 'node:fs'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
const Schema = z as any

const SETTINGS_NS = 'better-model-setting'
const LLM_NS = 'llm-pi-ai' as any

// Built-in providers (not stored in llm-pi-ai.providers, so they cannot be
// removed from config). id -> displayName. Hiding these is done client-side by
// filtering the model selector; their disabled state lives in the plugin
// namespace (`builtinDisabled`).
const BUILTIN_PROVIDERS: Record<string, string> = {
  'deepseek-official': 'DeepSeek',
}
const ROUTE_PATH = '/api/plugins/better-model-setting'
const MAX_BODY_BYTES = 256 * 1024
const BACKUP_KEEP = 5
const BACKUP_THROTTLE_MS = 3000

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

function json(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body ?? null)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
  })
  res.end(payload)
}

/** Only loopback origins may drive this config route. */
function isLoopbackOrigin(req: IncomingMessage): boolean {
  const header = req.headers.origin
  if (header === undefined) return true // non-browser / same-origin fetch
  try {
    const url = new URL(header)
    return url.hostname === '127.0.0.1' || url.hostname === 'localhost' || url.hostname === '::1'
  } catch {
    return false
  }
}

/** 进程内随机 token，用于 loopback 路由的写操作鉴权（OP-01）。 */
function randomToken(): string {
  return `bms-${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
}

function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        reject(new Error('request body too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function parseJsonBody(raw: Buffer): any {
  let value: unknown
  try {
    value = JSON.parse(raw.toString('utf8'))
  } catch {
    throw new Error('invalid json')
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('expected object')
  }
  return value
}

// ---------------------------------------------------------------------------
// Settings schema
// ---------------------------------------------------------------------------

// modelEfforts: Record<provider, Record<model, { selected?: string; tiers?: string[] }>>
//   - `tiers`   : whitelist of effort tiers the UI may offer for this model.
//   - `selected`: the single tier actually applied to requests (must be in `tiers`).
// `builtinDisabled` : built-in provider ids hidden from the model selector.
// `providerOrder`   : explicit provider display order (ids); drives panel + selector.
const BetterModelSettingSchema = Schema.object({
  // disabledProviders 不在 schema 持久化：禁用状态唯一真源是插件 JSON DB（OP-09）
  builtinDisabled: Schema.array(Schema.string()).default([]),
  providerOrder: Schema.array(Schema.string()).default([]),
  modelEfforts: Schema.any().default({}),
  providerRetryOverrides: Schema.any().default({}),
  officialAdded: Schema.boolean().default(false),
})

export type BetterModelSetting = Schemastery.TypeT<typeof BetterModelSettingSchema>

// ---------------------------------------------------------------------------
// Plugin definition
// ---------------------------------------------------------------------------

export const name = 'dsh-better-model-setting'
export const inject = ['settings', 'llm', 'webServer', 'credentials']

export interface Config {}

export const Config = Schema.object({})

// ---------------------------------------------------------------------------
// Effort helpers
// ---------------------------------------------------------------------------

/**
 * The single effort tier actually applied to a request:
 * - legacy stored value: a plain string tier id;
 * - current shape: `{ selected?: string; tiers?: string[] }` → `selected`.
 */
function getEffortSelected(
  settings: BetterModelSetting | undefined,
  provider: string,
  model: string
): string | undefined {
  if (!settings) return undefined
  const entry = settings.modelEfforts?.[provider]?.[model]
  if (typeof entry === 'string') return entry.length > 0 ? entry : undefined
  if (!entry || typeof entry !== 'object') return undefined
  const selected = (entry as any).selected
  return typeof selected === 'string' && selected.length > 0 ? selected : undefined
}

function deepMerge(base: Record<string, any> | undefined, override: Record<string, any> | undefined): Record<string, any> {
  if (!override) return base ?? {}
  if (!base) return override
  const out: Record<string, any> = { ...base }
  for (const key of Object.keys(override)) {
    const baseVal = base[key]
    const overVal = override[key]
    if (isPlainObject(baseVal) && isPlainObject(overVal)) {
      out[key] = deepMerge(baseVal, overVal)
    } else {
      out[key] = overVal
    }
  }
  return out
}

function isPlainObject(value: unknown): boolean {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isValidRetryMode(mode: unknown): mode is 'normal' | 'always' {
  return mode === 'normal' || mode === 'always'
}

function normalizeRetryOverride(value: unknown): Record<string, any> | undefined {
  if (!isPlainObject(value)) return undefined
  const override = { ...(value as Record<string, any>) }
  if (override.mode !== undefined && !isValidRetryMode(override.mode)) return undefined
  if (override.maxRetries !== undefined) {
    const maxRetries = Number(override.maxRetries)
    if (!Number.isInteger(maxRetries) || maxRetries < 0) return undefined
    override.maxRetries = maxRetries
  }
  // OP-36: mode='always' 时若无 maxRetries 则给默认上限，防无界重试/token 浪费
  if (override.mode === 'always' && override.maxRetries === undefined) {
    override.maxRetries = 4
  }
  // OP-06: retryableCodes 校验为合法 HTTP 状态码
  if (override.retryableCodes !== undefined) {
    if (!Array.isArray(override.retryableCodes) || !override.retryableCodes.every((code: unknown) => typeof code === 'string' && /^[1-5][0-9]{2}$/.test(code))) return undefined
  }
  if (override.backoff !== undefined) {
    if (!isPlainObject(override.backoff)) return undefined
    const backoff = { ...override.backoff }
    for (const key of ['initialDelayMs', 'maxDelayMs', 'jitterRatio']) {
      if (backoff[key] !== undefined && typeof backoff[key] !== 'number') return undefined
    }
    override.backoff = backoff
  }
  return override
}

// ---------------------------------------------------------------------------
// Apply
// ---------------------------------------------------------------------------

export function apply(ctx: any, _config: Config): void {
  const scope = ctx.settings.register(SETTINGS_NS, BetterModelSettingSchema, {
    base: {
      disabledProviders: [],
      builtinDisabled: ['deepseek-official'],
      providerOrder: [],
      modelEfforts: {},
      providerRetryOverrides: {},
      officialAdded: false,
    },
  })

  let current = scope.get()
  const disposeCurrentWatch = scope.watch((next: any) => {
    current = next
  })

  // --- settings.yaml location + plugin-owned DB / backups -------------------
  const documentPath: string | undefined = ctx.settings.documentPath
  const dbDir = documentPath ? path.dirname(documentPath) : undefined
  const dbPath = dbDir ? path.join(dbDir, 'better-model-setting.db.json') : undefined
  const backupDir = dbDir ? path.join(dbDir, 'better-model-setting-backups') : undefined

  // In-memory set of disabled (removed-from-config) provider ids. Source of
  // truth is the DB; the set is cached for the cheap runtime guard.
  let disabledSet = new Set<string>()

  function readDb(): { disabledProviders: Record<string, any>; disabledOrder?: string[] } {
    if (!dbPath) return { disabledProviders: {} }
    try {
      const raw = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
      if (raw && typeof raw === 'object') {
        return {
          disabledProviders: raw.disabledProviders && typeof raw.disabledProviders === 'object' ? raw.disabledProviders : {},
          disabledOrder: Array.isArray(raw.disabledOrder) ? raw.disabledOrder : undefined,
        }
      }
      return { disabledProviders: {} }
    } catch {
      return { disabledProviders: {} }
    }
  }

  function writeDb(db: { disabledProviders: Record<string, any>; disabledOrder?: string[] }): void {
    if (!dbPath || !dbDir) return
    fs.mkdirSync(dbDir, { recursive: true })
    const tmp = `${dbPath}.tmp`
    fs.writeFileSync(tmp, JSON.stringify(db, null, 2), 'utf8')
    fs.renameSync(tmp, dbPath)
  }

  function syncDisabledSet(): void {
    disabledSet = new Set(Object.keys(readDb().disabledProviders || {}))
  }
  syncDisabledSet()

  // OP-11: 实时查 DB 判断 provider 是否被禁用（不依赖 stale 缓存）
  function dbDisabledHas(provider: string): boolean {
    return Object.prototype.hasOwnProperty.call(readDb().disabledProviders || {}, provider)
  }

  // Back up settings.yaml to <dir>/better-model-setting-backups, keep 5. Throttled
  // so rapid UI autosaves do not thrash the backup directory.
  let lastBackup = 0
  function backupYaml(): void {
    if (!documentPath || !backupDir) return
    const now = Date.now()
    if (now - lastBackup < BACKUP_THROTTLE_MS) return
    try {
      const content = fs.readFileSync(documentPath, 'utf8')
      fs.mkdirSync(backupDir, { recursive: true })
      const stamp = new Date(now).toISOString().replace(/[:.]/g, '-')
      fs.writeFileSync(path.join(backupDir, `settings-${stamp}.yaml`), content, 'utf8')
      const files = fs.readdirSync(backupDir)
        .filter((f: string) => f.startsWith('settings-') && f.endsWith('.yaml'))
        .sort()
      while (files.length > BACKUP_KEEP) {
        const oldest = files.shift()
        if (oldest) {
          try {
            fs.unlinkSync(path.join(backupDir, oldest))
          } catch { /* keep going */ }
        }
      }
    } catch (error: any) {
      ctx.logger?.warn?.(`[better-model-setting] backup failed: ${error?.message || String(error)}`)
    }
  }

  // --- Status snapshot the client's panel renders from ----------------------
  async function credentialStateOf(profile: any): Promise<'configured' | 'missing' | 'none'> {
    const apiKeyEnv = profile && typeof profile === 'object' ? profile.apiKeyEnv : undefined
    if (typeof apiKeyEnv !== 'string' || apiKeyEnv.length === 0) return 'none'
    try {
      const resolved = await ctx.credentials?.resolve(apiKeyEnv)
      return resolved !== undefined ? 'configured' : 'missing'
    } catch {
      return 'missing'
    }
  }

  async function buildStatus(): Promise<any> {
    const llmConfig: any = ctx.settings.get(LLM_NS)
    const enabledProviders = (llmConfig && llmConfig.providers && typeof llmConfig.providers === 'object')
      ? llmConfig.providers
      : {}
    const db = readDb()
    const disabledProviders = db.disabledProviders || {}
    const disabledOrder = Array.isArray(db.disabledOrder) ? db.disabledOrder : Object.keys(disabledProviders)
    const setting = current
    const credentials: Record<string, string> = {}
    for (const [id, profile] of Object.entries({ ...enabledProviders, ...disabledProviders })) {
      credentials[id] = await credentialStateOf(profile)
    }
    for (const id of Object.keys(BUILTIN_PROVIDERS)) {
      // OP-07: 内置 provider 凭据也真实解析，而非硬编码 configured
      credentials[id] = await credentialStateOf({ apiKeyEnv: id === 'deepseek-official' ? 'DEEPSEEK_API_KEY' : undefined })
    }
    return {
      documentPath,
      writable: ctx.settings.writable !== false,
      setting,
      enabledProviders,
      disabledProviders,
      disabledOrder,
      credentials,
      builtinProviders: { ...BUILTIN_PROVIDERS },
      builtinDisabled: Array.isArray(setting.builtinDisabled) ? setting.builtinDisabled : [],
      providerOrder: Array.isArray(setting.providerOrder) ? setting.providerOrder : [],
    }
  }

  async function handleDisable(provider: string): Promise<void> {
    const llmConfig: any = ctx.settings.get(LLM_NS)
    const providers = (llmConfig && llmConfig.providers && typeof llmConfig.providers === 'object')
      ? llmConfig.providers
      : {}
    const profile = providers[provider]
    if (profile === undefined) throw new Error(`provider "${provider}" is not present in llm-pi-ai`)

    const db = readDb()
    if (db.disabledProviders[provider] !== undefined) throw new Error(`provider "${provider}" is already disabled`)
    // 确保 providerOrder 移除已禁用的 provider（排序不应包含禁用项）
    const order = new Set(current.providerOrder || [])
    order.delete(provider)

    backupYaml()
    // OP-10: 先移除 config，再写 DB——mutate 失败则 DB 未动，无需回滚，避免两文件不一致
    try {
      await ctx.settings.mutate(LLM_NS, [{ op: 'unset', path: ['providers', provider] }])
    } catch (error: any) {
      throw error
    }
    db.disabledProviders[provider] = profile
    const disabledOrder = db.disabledOrder ? [...db.disabledOrder] : Object.keys(db.disabledProviders)
    if (!disabledOrder.includes(provider)) disabledOrder.push(provider)
    db.disabledOrder = disabledOrder
    writeDb(db)
    syncDisabledSet()
    // 同步从 providerOrder 中移除
    await scope.replace({ ...current, builtinDisabled: current.builtinDisabled || [], providerOrder: [...order] })
  }

  async function handleEnable(provider: string): Promise<void> {
    const db = readDb()
    const profile = db.disabledProviders[provider]
    if (profile === undefined) throw new Error(`provider "${provider}" has no saved snapshot`)

    backupYaml()
    try {
      await ctx.settings.mutate(LLM_NS, [{ op: 'set', path: ['providers', provider], value: profile }])
    } catch (error: any) {
      throw error
    }
    const next = readDb()
    delete next.disabledProviders[provider]
    next.disabledOrder = next.disabledOrder?.filter((id: string) => id !== provider)
    writeDb(next)
    syncDisabledSet()
    // 恢复 provider 在 providerOrder 中的原位置（OP-08）
    const order = (current.providerOrder || []).filter((id: string) => id !== provider)
    order.push(provider)
    if (JSON.stringify(order) !== JSON.stringify(current.providerOrder || [])) {
      await scope.replace({ ...current, providerOrder: order })
    }
  }

  async function handleApply(candidate: any, providerModels?: any): Promise<void> {
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
      throw new Error('expected a settings object')
    }
    backupYaml()
    await scope.replace(candidate)

    // Merge model name / context-window edits back into llm-pi-ai providers,
    // preserving every other field already present in settings.yaml.
    if (providerModels && typeof providerModels === 'object' && !Array.isArray(providerModels)) {
      const llmConfig: any = ctx.settings.get(LLM_NS)
      const providers = (llmConfig && llmConfig.providers && typeof llmConfig.providers === 'object')
        ? llmConfig.providers
        : {}
      for (const provider of Object.keys(providerModels)) {
        const updates = providerModels[provider]
        if (!Array.isArray(updates)) continue
        const profile = providers[provider]
        if (!profile || typeof profile !== 'object') continue
        const existing = Array.isArray(profile.models) ? profile.models : []
        const byId = new Map<string, any>()
        for (const m of existing) if (m && typeof m === 'object' && typeof m.id === 'string') byId.set(m.id, m)
        let changed = false
        for (const u of updates) {
          if (!u || typeof u !== 'object' || typeof u.id !== 'string' || u.id.length === 0) continue
          const oldId = (typeof u.oldId === 'string' && u.oldId.length > 0) ? u.oldId : u.id
          const newId = u.id
          if (newId !== oldId && byId.has(newId)) {
            throw new Error(`provider "${provider}" already has a model "${newId}"`)
          }
          const cur = byId.get(oldId)
          const next: Record<string, any> = cur ? { ...cur } : { id: newId }
          next.id = newId
          if (newId !== oldId) {
            changed = true
            byId.delete(oldId)
          }
          if (typeof u.name === 'string' && (u.name.length > 0 ? next.name !== u.name : next.name !== undefined)) {
            if (u.name.length > 0) next.name = u.name
            else delete next.name
            changed = true
          }
          if (typeof u.contextWindow === 'number' && next.contextWindow !== u.contextWindow) {
            next.contextWindow = u.contextWindow
            changed = true
          } else if (u.contextWindow === null && next.contextWindow !== undefined) {
            delete next.contextWindow
            changed = true
          }
          if (typeof u.maxTokens === 'number' && next.maxTokens !== u.maxTokens) {
            next.maxTokens = u.maxTokens
            changed = true
          } else if (u.maxTokens === null && next.maxTokens !== undefined) {
            delete next.maxTokens
            changed = true
          }
          // input modalities: ["text"] = 大语言, ["text","image"] = 多模态
          if (Array.isArray(u.input)) {
            const next_input = [...u.input]
            if (JSON.stringify(next.input ?? null) !== JSON.stringify(next_input)) {
              next.input = next_input
              changed = true
            }
          } else if (u.input === null && next.input !== undefined) {
            delete next.input
            changed = true
          }
          if (u.reasoningEfforts && typeof u.reasoningEfforts === 'object' && !Array.isArray(u.reasoningEfforts)) {
            if (JSON.stringify(next.reasoningEfforts ?? null) !== JSON.stringify(u.reasoningEfforts)) {
              next.reasoningEfforts = u.reasoningEfforts
              changed = true
            }
          } else if (u.reasoningEfforts === null && next.reasoningEfforts !== undefined) {
            delete next.reasoningEfforts
            changed = true
          }
          byId.set(newId, next)
        }
        if (changed) {
          await ctx.settings.mutate(LLM_NS, [{ op: 'set', path: ['providers', provider, 'models'], value: [...byId.values()] }])
        }
      }
    }
  }

  // Add a new pi-ai provider: write its profile into llm-pi-ai.providers so DSH
  // hot-publishes it and the model selector starts listing it immediately.
  async function handleAdd(provider: string, profile: Record<string, any>): Promise<void> {
    if (typeof provider !== 'string' || provider.length === 0) throw new Error('provider is required')
    if (!isPlainObject(profile)) throw new Error('profile is required')
    provider = provider.trim()
    const llmConfig: any = ctx.settings.get(LLM_NS)
    const providers = (llmConfig && llmConfig.providers && typeof llmConfig.providers === 'object')
      ? llmConfig.providers
      : {}
    if (providers[provider] !== undefined) throw new Error(`provider "${provider}" already exists`)
    if (disabledSet.has(provider)) throw new Error(`provider "${provider}" was disabled; enable it instead`)
    if (BUILTIN_PROVIDERS[provider] !== undefined && builtinRelease(profile)) {
      throw new Error(`provider "${provider}" is a built-in; it cannot be configured here`)
    }

    const clean: Record<string, any> = {}
    if (typeof profile.displayName === 'string' && profile.displayName.length > 0) clean.displayName = profile.displayName
    if (typeof profile.api === 'string' && profile.api.length > 0) clean.api = profile.api
    if (typeof profile.baseURL === 'string' && profile.baseURL.length > 0) clean.baseURL = profile.baseURL
    if (typeof profile.apiKeyEnv === 'string' && profile.apiKeyEnv.length > 0) clean.apiKeyEnv = profile.apiKeyEnv
    if (Array.isArray(profile.models)) clean.models = profile.models.filter((m: any) => m && typeof m === 'object' && !Array.isArray(m))
    if (typeof profile.provider === 'string' && profile.provider.length > 0) clean.provider = profile.provider
    if (typeof profile.extraBody === 'object' && profile.extraBody !== null) clean.extraBody = profile.extraBody
    if (!clean.displayName) clean.displayName = provider

    backupYaml()
    await ctx.settings.mutate(LLM_NS, [{ op: 'set', path: ['providers', provider], value: clean }])
  }

  /** A built-in profile is unsafe to overwrite via the add flow. */
  function builtinRelease(profile: Record<string, any>): boolean {
    return profile && typeof profile === 'object' && profile.unsafe === true
  }

  async function handleAddOfficial(apiKey: string | undefined, envName: string): Promise<void> {
    // OP-02: envName 白名单校验——仅允许合法的环境变量名，且拒绝覆盖敏感系统变量
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(envName)) {
      throw new Error(`invalid environment variable name "${envName}"`)
    }
    const reservedEnv = ['NODE_OPTIONS', 'PATH', 'HOME', 'USER', 'SHELL', 'LD_PRELOAD', 'DYLD_INSERT_LIBRARIES']
    if (reservedEnv.includes(envName)) {
      throw new Error(`environment variable "${envName}" is reserved and cannot be overridden`)
    }
    // 1. 如果提供了 API Key，持久化到凭据库（重启后保留，OP-03），并写入当前进程环境变量
    if (typeof apiKey === 'string' && apiKey.length > 0) {
      try {
        await ctx.credentials?.set?.(envName, apiKey)
      } catch (error: any) {
        ctx.logger?.warn?.(`[better-model-setting] failed to persist credential to vault: ${error?.message || String(error)}`)
      }
      process.env[envName] = apiKey
    }
    // 2. 移除 builtinDisabled 中的 'deepseek-official'，使其在模型选择器中出现
    const builtinDisabled = new Set(current.builtinDisabled || [])
    builtinDisabled.delete('deepseek-official')
    // 3. 标记官方模型已添加
    backupYaml()
    await scope.replace({
      ...current,
      builtinDisabled: [...builtinDisabled],
      officialAdded: true,
    })
    ctx.logger?.info?.(`[better-model-setting] official DeepSeek model added (env: ${envName})`)
  }

  async function handleDelete(provider: string): Promise<void> {
    let changed = false
    // 1. 如果在 llm-pi-ai.providers 中，移除（不保存快照）
    const llmConfig: any = ctx.settings.get(LLM_NS)
    const providers = (llmConfig && llmConfig.providers && typeof llmConfig.providers === 'object') ? llmConfig.providers : {}
    if (providers[provider] !== undefined) {
      backupYaml()
      await ctx.settings.mutate(LLM_NS, [{ op: 'unset', path: ['providers', provider] }])
      changed = true
    }
    // 2. 如果快照库中有，彻底删除
    const db = readDb()
    if (db.disabledProviders[provider] !== undefined) {
      delete db.disabledProviders[provider]
      db.disabledOrder = db.disabledOrder?.filter((id: string) => id !== provider)
      writeDb(db)
      syncDisabledSet()
      changed = true
    }
    // 3. 如果是内置 provider，隐藏
    if (BUILTIN_PROVIDERS[provider] !== undefined) {
      const builtinDisabled = new Set(current.builtinDisabled || [])
      builtinDisabled.add(provider)
      backupYaml()
      await scope.replace({ ...current, builtinDisabled: [...builtinDisabled], officialAdded: false })
      changed = true
    }
    // 4. 从排序中移除，并清理 modelEfforts / providerRetryOverrides 残留（OP-12）
    const nextSetting = { ...current }
    nextSetting.providerOrder = (current.providerOrder || []).filter((id: string) => id !== provider)
    if (nextSetting.modelEfforts?.[provider]) { const m = { ...nextSetting.modelEfforts }; delete m[provider]; nextSetting.modelEfforts = m }
    if (nextSetting.providerRetryOverrides?.[provider]) { const r = { ...nextSetting.providerRetryOverrides }; delete r[provider]; nextSetting.providerRetryOverrides = r }
    if (JSON.stringify(nextSetting) !== JSON.stringify(current)) {
      await scope.replace(nextSetting)
    }
    if (!changed) throw new Error(`provider "${provider}" not found`)
  }

  // 1. Plugin-owned loopback route: GET = status; POST = { op } command.
  // OP-01: 生成进程内共享 token，POST 写操作需携带 X-BMS-Token 鉴权。
  const authToken = randomToken()
  const routeDisposers: Array<() => void> = []
  const webServer = ctx.webServer as { register: (route: any) => () => void } | undefined
  if (webServer && typeof webServer.register === 'function') {
    routeDisposers.push(webServer.register({
      kind: 'exact',
      path: ROUTE_PATH,
      handler: async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
        if (!isLoopbackOrigin(req)) return json(res, 403, { ok: false, error: { message: 'forbidden' } })

        // 写操作（POST）需要 token；GET 携带 token 可暴露 token 到 status
        const reqToken = req.headers['x-bms-token']

        if (req.method === 'GET') {
          const status = await buildStatus()
          // 首次 GET 携带 token 下发（后续 POST 复用）；无 token 时也允许读状态但不下发 token
          if (typeof reqToken === 'string' && reqToken.length > 0) {
            if (reqToken === authToken) return json(res, 200, { ok: true, value: status })
            return json(res, 403, { ok: false, error: { message: 'forbidden' } })
          }
          return json(res, 200, { ok: true, value: { ...status, authToken } })
        }

        if (req.method !== 'POST') {
          return json(res, 405, { ok: false, error: { message: 'method not allowed' } })
        }

        // POST 写操作必须携带有效 token
        if (typeof reqToken !== 'string' || reqToken !== authToken) {
          return json(res, 403, { ok: false, error: { message: 'forbidden' } })
        }

        let raw: Buffer
        try {
          raw = await readBody(req)
        } catch (error: any) {
          return json(res, 413, { ok: false, error: { message: error?.message || 'invalid body' } })
        }

        let body: any
        try {
          body = parseJsonBody(raw)
        } catch (error: any) {
          return json(res, 400, { ok: false, error: { message: error?.message || String(error) } })
        }

        try {
          switch (body.op) {
            case 'disable': {
              if (typeof body.provider !== 'string' || !body.provider) {
                return json(res, 400, { ok: false, error: { message: 'provider is required' } })
              }
              await handleDisable(body.provider)
              return json(res, 200, { ok: true, value: await buildStatus() })
            }
            case 'enable': {
              if (typeof body.provider !== 'string' || !body.provider) {
                return json(res, 400, { ok: false, error: { message: 'provider is required' } })
              }
              await handleEnable(body.provider)
              return json(res, 200, { ok: true, value: await buildStatus() })
            }
            case 'add': {
              if (typeof body.provider !== 'string' || !body.provider) {
                return json(res, 400, { ok: false, error: { message: 'provider is required' } })
              }
              await handleAdd(body.provider, body.profile)
              return json(res, 200, { ok: true, value: await buildStatus() })
            }
            case 'apply':
              await handleApply(body.setting, body.providerModels)
              return json(res, 200, { ok: true, value: await buildStatus() })
            case 'addOfficial': {
              await handleAddOfficial(
                typeof body.apiKey === 'string' ? body.apiKey : undefined,
                typeof body.envName === 'string' && body.envName.length > 0 ? body.envName : 'DEEPSEEK_API_KEY',
              )
              return json(res, 200, { ok: true, value: await buildStatus() })
            }
            case 'delete': {
              if (typeof body.provider !== 'string' || !body.provider) {
                return json(res, 400, { ok: false, error: { message: 'provider is required' } })
              }
              await handleDelete(body.provider)
              return json(res, 200, { ok: true, value: await buildStatus() })
            }
            default:
              return json(res, 400, { ok: false, error: { message: `unknown op: ${String(body.op)}` } })
          }
        } catch (error: any) {
          return json(res, 409, { ok: false, error: { message: error?.message || String(error) } })
        }
      },
    }))
  }

  // 2. Runtime guard: refuse any request whose provider is disabled. Because a
  // disabled provider is removed from llm-pi-ai config, normal routing already
  // avoids it; this guard is a belt-and-suspenders safety net.
  const disposeRequest = ctx.on('agent/request', async (_payload: any, next: any) => {
    const config = await next()
    if (!config || typeof config !== 'object') return config

    const provider = config.provider
    const model = config.model
    // OP-11: 实时读 DB 判断禁用状态（替代 stale 的 disabledSet 缓存），外部 DB 变更也生效
    if (provider && dbDisabledHas(provider)) {
      throw new Error(`[better-model-setting] Provider "${provider}" is disabled.`)
    }
    // 内置 provider 禁用后同样在服务端拦截（OP-13），防止直接按 ID 调用
    if (provider && Array.isArray(current.builtinDisabled) && current.builtinDisabled.includes(provider)) {
      throw new Error(`[better-model-setting] Provider "${provider}" is disabled.`)
    }

    // 注入 reasoningEffort 前校验 selected 是否在白名单内（OP-37）
    const effortEntry = provider && model ? (current.modelEfforts?.[provider]?.[model] as any) : undefined
    const effort = typeof effortEntry === 'string' ? (effortEntry || undefined) : (typeof effortEntry?.selected === 'string' ? effortEntry.selected : undefined)
    if (typeof effort === 'string' && effort.length > 0) {
      const tiers = Array.isArray(effortEntry?.tiers) ? effortEntry.tiers : undefined
      // 仅当设置了 tiers 白名单时才校验 selected 归属；未设白名单时视为有效
      if (!tiers || tiers.includes(effort)) {
        return { ...config, reasoningEffort: ReasoningEffortId(effort) }
      }
    }
    return config
  })

  // 3. Per-provider retry override applied at request-error.
  const disposeRetry = ctx.on('agent/request-error', async (payload: any, next: any) => {
    const rawOverride = current.providerRetryOverrides[payload.provider]
    const override = normalizeRetryOverride(rawOverride)
    if (!override || Object.keys(override).length === 0) return next()

    const merged = deepMerge(payload.retryPolicy as Record<string, any> | undefined, override)
    const originalPolicy = payload.retryPolicy
    payload.retryPolicy = merged
    try {
      return await next()
    } finally {
      payload.retryPolicy = originalPolicy
    }
  }, { prepend: true })

  ctx.effect(
    () => {
      return () => {
        disposeCurrentWatch()
        for (const dispose of routeDisposers) dispose()
        disposeRequest()
        disposeRetry()
      }
    },
    'better-model-setting: teardown'
  )

  ctx.logger?.info?.(`[better-model-setting] plugin loaded (settings: ${documentPath || 'n/a'})`)
}