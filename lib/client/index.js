/**
 * dsh-better-model-setting — client 设置面板。
 * 替代官方 dsh-client-ui-settings-models 的模型设置页。
 * 视觉/结构/文案对齐官方，保留新增功能：
 * 启用/禁用、思考档位、重试覆盖、拖动排序。
 */
import React from 'react';
export const inject = ['connection', 'slots', 'locale'];
// ---------------------------------------------------------------------------
// 官方 zh-cn 文案（仅本站使用的子集）
// ---------------------------------------------------------------------------
const ZH = {
    nav: '模型',
    title: '模型',
    intro: '填入各提供方的 API 密钥即可使用其模型。',
    edit: '编辑',
    editProvider: '编辑 {provider}',
    remove: '删除',
    removeProvider: '删除 {provider}',
    deleteTitle: '删除 {provider}？',
    deleteDescription: '删除 {provider} 会永久移除其配置，无法撤销。',
    savedProvider: '已保存 {provider}。',
    readOnly: '当前部署的设置文档为只读。',
    loadFailed: '加载提供方目录失败',
    retry: '重试',
    close: '关闭',
    cancel: '取消',
    apply: '保存',
    applying: '保存中…',
    add: '添加提供方',
    customAdd: '添加自定义提供方',
    provider: '提供方',
    credentialConfigured: 'API 密钥已配置',
    credentialMissing: 'API 密钥缺失',
    keyInput: 'API 密钥',
    keyEnvLocked: '由启动环境提供（只读）',
    keyPlaceholder: '输入 API 密钥',
    baseUrl: 'API 地址',
    baseUrlDefault: '提供方默认',
    modelSettings: '模型设置',
    modelSettingsPills: '模型设置',
    models: '模型目录',
    modelsInherited: '正在使用适配器默认模型',
    modelsCustomized: '已自定义模型目录',
    modelId: '模型 ID',
    modelName: '显示名称',
    modelNamePlaceholder: '留空时使用模型 ID',
    contextWindow: '上下文窗口',
    contextWindowPlaceholder: '使用提供方默认值',
    maxTokens: '最大输出 token 数',
    maxTokensPlaceholder: '使用提供方默认值',
    modelAdvanced: '容量',
    addModel: '添加模型',
    modelsEmpty: '模型选择器中将不显示任何模型；目录外 ID 仍可直接发送。',
    advancedHint: '其余字段在 settings.yaml 中，请直接编辑对应段。',
    modelIdRequired: '模型 ID 不能为空。',
    modelIdDuplicate: '模型 ID 不能重复。',
    modelNameInvalid: '显示名称不能为空。',
    modelContextInvalid: '上下文窗口必须是正数，例如 131072、256K 或 1M。',
    modelMaxTokensInvalid: '最大输出 token 数必须是正数，例如 8192、64K 或 1M。',
    customTag: '自定义',
    customRoute: 'Provider ID',
    customRouteHint: '以小写字母开头的标识，在请求中唯一标识该提供方。',
    customRouteInvalid: '需以小写字母开头，之后可用小写字母、数字和短横线。',
    customRouteTaken: '已有提供方使用了这个 ID。',
    customDisplayName: '显示名称',
    customApi: 'API 协议',
    customApiUnset: '未选择',
    customNeedsBaseUrl: '自定义提供方需要填写 API 地址。',
    customNeedsModels: '自定义提供方至少需要一个模型。',
    create: '创建提供方',
    creating: '创建中…',
    enabled: '已启用',
    disabled: '已禁用',
    enable: '启用',
    disable: '禁用',
    disabledProviders: '已禁用的提供方',
    retryCount: '重试次数',
    effortTitle: '每模型思考强度档位',
    applyTier: '应用档位',
    defaultTier: '默认',
    effortUnset: '未设置',
    displayTiers: '前端显示档位',
    editProviderSettings: '编辑 {provider}',
    providerId: '提供方 ID',
    displayName: '显示名称',
    protocol: 'API 协议',
    protocolDefault: '不指定（按提供方默认）',
    baseURL: 'API 地址',
    apiKeyEnv: 'API Key 环境变量',
    modelIdRequiredErr: '模型 ID 不能为空。',
    modelIdPlaceholder: '例如 gpt-5.6',
    noModels: '尚未添加模型。',
    addProvider: '添加提供方',
    addModelHint: '可选：添加提供方下的模型。',
    hide: '收起',
    show: '展开',
};
function t(key) {
    return ZH[key] ?? key;
}
// ---------------------------------------------------------------------------
// CSS（官方 84 条规则整合，bms 前缀防冲突）
// ---------------------------------------------------------------------------
const STYLE_ID = 'better-model-setting-styles-v3';
function ensureStyles() {
    if (typeof document === 'undefined')
        return;
    if (document.getElementById(STYLE_ID))
        return;
    const s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = `
.better-model-setting .bms-section{max-width:720px;color:var(--dsw-alias-label-primary);flex-direction:column;gap:6px;display:flex}
.better-model-setting .bms-title{color:var(--dsw-alias-label-primary);margin:0;font-size:15px;font-weight:500;line-height:22px}
.better-model-setting .bms-intro{color:var(--dsw-alias-label-tertiary);margin:0;font-size:13px;line-height:20px}
.better-model-setting .bms-notice{color:var(--dsw-alias-state-warn-label);margin:0;font-size:11px;line-height:16px}
.better-model-setting .bms-savedNotice{color:var(--dsw-alias-state-success-primary);margin:0;font-size:11px;line-height:16px;animation:bmsFadeIn .18s ease both}
.better-model-setting .bms-error{color:var(--dsw-alias-state-error-primary);margin:0;font-size:11px;line-height:16px;animation:bmsFadeIn .18s ease both}
.better-model-setting .bms-loading{align-items:center;gap:8px;color:var(--dsw-alias-label-tertiary);display:inline-flex;font-size:13px;line-height:20px}
.better-model-setting .bms-spinner{box-sizing:border-box;border:2px solid var(--dsw-alias-border-l3);border-top-color:var(--dsw-alias-brand-primary);border-radius:50%;width:16px;height:16px;flex:none;animation:bmsSpin .7s linear infinite}
.better-model-setting .bms-rows{flex-direction:column;gap:4px;margin:6px 0 0;padding:0;list-style:none;display:flex}
.better-model-setting .bms-rowCard{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;flex-direction:column;gap:6px;padding:8px 10px;display:flex;background:var(--dsw-alias-bg-module);transition:transform .2s cubic-bezier(.32,.72,.24,1),opacity .14s ease,border-color .16s ease,box-shadow .2s ease,background-color .2s ease;animation:bmsRowIn .26s cubic-bezier(.32,.72,.24,1) backwards}
.better-model-setting .bms-rowCard:hover{border-color:var(--dsw-alias-border-l3)}
.better-model-setting .bms-rowCard.bms-dragging{border-style:dashed;border-color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 5%,var(--dsw-alias-bg-module))}
.better-model-setting .bms-rowCard.bms-overTarget{box-shadow:0 0 0 1.5px var(--dsw-alias-brand-primary) inset}
.better-model-setting .bms-rowCard.bms-disabledRow{opacity:.6;background:var(--dsw-alias-bg-module-platform)}
.better-model-setting .bms-rowHead{align-items:center;gap:8px;display:flex}
.better-model-setting .bms-rowIdentity{align-items:center;gap:4px;min-width:0;display:inline-flex}
.better-model-setting .bms-dragHandle{width:12px;height:18px;cursor:grab;color:var(--dsw-alias-label-tertiary);user-select:none;-webkit-user-select:none;flex:none;touch-action:none;opacity:0;transition:opacity .16s ease,transform .16s ease;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='18' viewBox='0 0 12 18'%3E%3Cg fill='%2381858C'%3E%3Ccircle cx='3' cy='3' r='1.4'/%3E%3Ccircle cx='9' cy='3' r='1.4'/%3E%3Ccircle cx='3' cy='9' r='1.4'/%3E%3Ccircle cx='9' cy='9' r='1.4'/%3E%3Ccircle cx='3' cy='15' r='1.4'/%3E%3Ccircle cx='9' cy='15' r='1.4'/%3E%3C/g%3E%3C/svg%3E");background-size:12px 18px;background-repeat:no-repeat}
.better-model-setting .bms-rowCard:hover .bms-dragHandle,.better-model-setting .bms-rows.bms-dragActive .bms-dragHandle,.better-model-setting .bms-rowCard:focus-within .bms-dragHandle{opacity:1}
.better-model-setting .bms-dragHandle:hover{transform:scale(1.2)}
.better-model-setting .bms-dragHandle:active{cursor:grabbing}
.better-model-setting .bms-rowName{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.better-model-setting .bms-rowTag{border:1px solid var(--dsw-alias-border-l3);color:var(--dsw-alias-label-secondary);border-radius:4px;flex:none;padding:1px 6px;font-size:11px;line-height:16px}
.better-model-setting .bms-credentialDot{box-sizing:border-box;border-radius:50%;flex:none;width:8px;height:8px;display:inline-block;transition:background-color .2s ease}
.better-model-setting .bms-credentialDotConfigured{background:var(--dsw-alias-state-success-primary)}
.better-model-setting .bms-credentialDotMissing{background:var(--dsw-alias-state-error-primary)}
.better-model-setting .bms-rowActions{align-items:center;gap:4px;margin-left:auto;display:inline-flex;flex-wrap:wrap}
.better-model-setting .bms-primaryButton,.better-model-setting .bms-secondaryButton,.better-model-setting .bms-addButton{box-sizing:border-box;height:28px;font:inherit;cursor:pointer;border:none;border-radius:14px;justify-content:center;align-items:center;gap:4px;padding:0 10px;font-size:12px;line-height:18px;display:inline-flex;transition:background-color .16s ease,color .16s ease,border-color .16s ease,opacity .16s ease,transform .12s ease}
.better-model-setting .bms-primaryButton{background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground)}
.better-model-setting .bms-primaryButton:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover)}
.better-model-setting .bms-secondaryButton,.better-model-setting .bms-addButton{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);background:transparent}
.better-model-setting .bms-secondaryButton:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}
.better-model-setting .bms-rowActions .bms-secondaryButton,.better-model-setting .bms-rowActions .bms-dangerButton{border-radius:10px;height:22px;padding:0 6px;font-size:11px;line-height:14px}
.better-model-setting .bms-dangerButton{box-sizing:border-box;height:28px;color:var(--dsw-alias-state-error-primary);font:inherit;cursor:pointer;background:transparent;border:none;border-radius:14px;justify-content:center;align-items:center;padding:0 10px;font-size:12px;line-height:18px;display:inline-flex;transition:background-color .16s ease,color .16s ease,opacity .16s ease,transform .12s ease}
.better-model-setting .bms-dangerButton:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger)}
.better-model-setting .bms-primaryButton:active:not(:disabled),.better-model-setting .bms-secondaryButton:active:not(:disabled),.better-model-setting .bms-dangerButton:active:not(:disabled),.better-model-setting .bms-addButton:active:not(:disabled),.better-model-setting .bms-linkButton:active:not(:disabled){transform:scale(.96)}
.better-model-setting .bms-primaryButton:disabled,.better-model-setting .bms-secondaryButton:disabled,.better-model-setting .bms-dangerButton:disabled,.better-model-setting .bms-addButton:disabled,.better-model-setting .bms-linkButton:disabled,.better-model-setting .bms-addModelButton:disabled{opacity:.4;cursor:default}
.better-model-setting .bms-primaryButton:focus-visible,.better-model-setting .bms-secondaryButton:focus-visible,.better-model-setting .bms-dangerButton:focus-visible,.better-model-setting .bms-addButton:focus-visible,.better-model-setting .bms-linkButton:focus-visible,.better-model-setting .bms-addModelButton:focus-visible,.better-model-setting .bms-iconButton:focus-visible,.better-model-setting .bms-customizedSummary:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-border-l3);outline:none}
.better-model-setting .bms-editor{background:var(--dsw-alias-bg-module-platform);border-radius:10px;flex-direction:column;gap:8px;padding:10px 12px;display:flex;animation:bmsCollapseIn .24s cubic-bezier(.32,.72,.24,1) both}
.better-model-setting .bms-editorHeader{align-items:baseline;gap:8px;display:flex}
.better-model-setting .bms-editorTitle{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:20px}
.better-model-setting .bms-editorRoute{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px}
.better-model-setting .bms-field{flex-direction:column;gap:2px;display:flex}
.better-model-setting .bms-fieldLabel{color:var(--dsw-alias-label-secondary);align-items:center;gap:8px;font-size:11px;font-weight:500;line-height:16px;display:inline-flex}
.better-model-setting .bms-linkButton{box-sizing:border-box;height:24px;color:var(--dsw-alias-label-tertiary);font:inherit;cursor:pointer;background:transparent;border:none;border-radius:12px;align-items:center;padding:0 6px;font-size:11px;line-height:14px;display:inline-flex;transition:background-color .16s ease,color .16s ease,transform .12s ease}
.better-model-setting .bms-linkButton:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}
.better-model-setting .bms-input{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);width:100%;height:26px;font:inherit;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border-radius:5px;padding:0 6px;font-size:12px;line-height:18px;transition:border-color .15s ease,box-shadow .15s ease}
.better-model-setting select.bms-input{cursor:pointer;max-width:180px}
.better-model-setting .bms-input:focus{border-color:var(--dsw-alias-brand-primary);outline:none;box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-brand-primary) 15%,transparent)}
.better-model-setting .bms-input::placeholder{color:var(--dsw-alias-label-dimmed)}
.better-model-setting .bms-input:disabled{opacity:.6;cursor:default}
.better-model-setting .bms-retry{width:72px}
.better-model-setting .bms-selectInput{appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2381858C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-position:right 12px center;background-repeat:no-repeat;background-size:12px 12px;padding-right:32px}
.better-model-setting .bms-customized{border-top:1px solid var(--dsw-alias-border-l2);padding-top:4px;margin-top:2px}
.better-model-setting .bms-customizedSummary{cursor:pointer;width:fit-content;color:var(--dsw-alias-label-secondary);border-radius:6px;align-items:center;gap:6px;margin-left:-4px;padding:2px 4px;font-size:12px;font-weight:500;line-height:18px;list-style:none;display:flex}
.better-model-setting .bms-customizedSummary::-webkit-details-marker{display:none}
.better-model-setting .bms-customizedSummary:before{content:"";border-bottom:1.5px solid;border-right:1.5px solid;width:5px;height:5px;transition:transform .12s;transform:rotate(-45deg)translate(-1px,-1px)}
.better-model-setting .bms-customized[open]>.bms-customizedSummary:before{transform:rotate(45deg)translate(-1px,-1px)}
.better-model-setting .bms-customizedSummary:hover{color:var(--dsw-alias-label-primary)}
.better-model-setting .bms-customizedBody{flex-direction:column;gap:6px;padding-top:6px;display:flex}
.better-model-setting .bms-modelPills{display:inline-flex;gap:4px;margin-left:auto;flex-wrap:wrap;align-items:center}
.better-model-setting .bms-modelPill{border:1px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);border-radius:3px;padding:0 4px;font-size:11px;line-height:14px}
.better-model-setting .bms-modelCatalog{border-top:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:4px;padding-top:6px;display:flex}
.better-model-setting .bms-modelCatalogHeading{flex-direction:column;gap:2px;display:flex}
.better-model-setting .bms-modelCatalogTitle{color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:500;line-height:18px}
.better-model-setting .bms-modelCatalogMeta,.better-model-setting .bms-modelEmpty{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:18px}
.better-model-setting .bms-modelList{flex-direction:column;gap:4px;display:flex}
.better-model-setting .bms-modelListHead{justify-content:space-between;align-items:flex-start;gap:8px;display:flex}
.better-model-setting .bms-modelEntry{border:1px solid var(--dsw-alias-border-l2);border-radius:5px;padding:3px}
.better-model-setting .bms-modelRow{grid-template-columns:minmax(0,1.2fr) minmax(0,0.8fr) auto;align-items:center;gap:4px;display:grid}
.better-model-setting .bms-iconButton{box-sizing:border-box;width:22px;height:22px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:transparent;border:none;border-radius:3px;justify-content:center;align-items:center;display:inline-flex;transition:background-color .16s ease,color .16s ease,transform .12s ease}
.better-model-setting .bms-iconButton:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.better-model-setting .bms-iconButton:disabled{cursor:default;opacity:.4}
.better-model-setting .bms-iconButtonDanger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-state-error-primary)}
.better-model-setting .bms-modelAdvanced{grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:2px;padding:2px 4px 2px;display:grid}
.better-model-setting .bms-modelField{flex-direction:column;gap:1px;display:flex}
.better-model-setting .bms-modelFieldLabel{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:14px}
.better-model-setting .bms-modelEmpty{border:1px dashed var(--dsw-alias-border-l3);text-align:center;border-radius:5px;padding:4px;font-size:11px;line-height:16px}
.better-model-setting .bms-addModelButton{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);height:22px;color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;background:transparent;border-radius:11px;align-self:flex-start;align-items:center;gap:4px;padding:0 6px;font-size:11px;line-height:14px;display:inline-flex;transition:background-color .16s ease,color .16s ease,transform .12s ease}
.better-model-setting .bms-addModelButton:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}
.better-model-setting .bms-advancedHint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:11px;line-height:14px}
.better-model-setting .bms-editorActions{justify-content:flex-end;gap:6px;display:flex}
.better-model-setting .bms-addBlock{flex-direction:column;gap:6px;display:flex}
.better-model-setting .bms-addActions{flex-wrap:wrap;gap:8px;display:flex}
.better-model-setting .bms-addCard{background:var(--dsw-alias-bg-module-platform);border-radius:10px;flex-direction:column;gap:8px;padding:10px 12px;display:flex;animation:bmsCollapseIn .24s cubic-bezier(.32,.72,.24,1) both}
.better-model-setting .bms-addButton{border:1px dashed var(--dsw-alias-border-l3);border-radius:10px;flex:1 1 0;gap:4px;min-width:140px;height:30px;color:var(--dsw-alias-label-secondary)}
.better-model-setting .bms-addButton:hover:not(:disabled){border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 5%,transparent)}
.better-model-setting .bms-plus{font-size:14px;line-height:1;display:inline-block;transition:transform .2s ease}
.better-model-setting .bms-addButton:hover:not(:disabled) .bms-plus{transform:rotate(90deg)}
.better-model-setting .bms-addHint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:18px}
.better-model-setting .bms-overlay{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--dsw-alias-bg-overlay) 60%,transparent);animation:bmsFadeIn .18s ease both}
.better-model-setting .bms-dialog{background:var(--dsw-alias-bg-module);border:1px solid var(--dsw-alias-border-l2);border-radius:14px;flex-direction:column;gap:10px;padding:16px;min-width:320px;max-width:400px;display:flex;animation:bmsCollapseIn .2s cubic-bezier(.32,.72,.24,1) both}
.better-model-setting .bms-dialogTitle{color:var(--dsw-alias-label-primary);margin:0;font-size:14px;font-weight:500;line-height:20px}
.better-model-setting .bms-dialogDesc{color:var(--dsw-alias-label-secondary);margin:0;font-size:12px;line-height:18px}
.better-model-setting .bms-dialogActions{justify-content:flex-end;gap:6px;display:flex}
.better-model-setting .bms-tierBoxes{display:flex;flex-wrap:wrap;gap:4px}
.better-model-setting .bms-chip{position:relative;align-items:center;height:20px;padding:0 6px;border-radius:10px;border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);font-size:11px;line-height:14px;cursor:pointer;user-select:none;background:transparent;display:inline-flex;transition:color .15s ease,border-color .15s ease,background-color .15s ease,transform .12s ease}
.better-model-setting .bms-chip:hover{border-color:var(--dsw-alias-label-tertiary);color:var(--dsw-alias-label-primary)}
.better-model-setting .bms-chip:active{transform:scale(.94)}
.better-model-setting .bms-chip:has(.bms-chipInput:checked){border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,transparent)}
.better-model-setting .bms-chip:has(.bms-chipInput:disabled){opacity:.45;cursor:default}
.better-model-setting .bms-chipInput{position:absolute;opacity:0;width:0;height:0;margin:0;pointer-events:none}
.better-model-setting .bms-chipInput:focus-visible + .bms-chipText{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;border-radius:6px}
@keyframes bmsSpin{to{transform:rotate(360deg)}}
@keyframes bmsFadeIn{from{opacity:0}to{opacity:1}}
@keyframes bmsCollapseIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
@keyframes bmsRowIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@media (prefers-reduced-motion:reduce){.better-model-setting *,.better-model-setting *::before,.better-model-setting *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
  `;
    document.head.appendChild(s);
}
// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------
const ROUTE_PATH = '/api/plugins/better-model-setting';
const MAX_BODY_BYTES = 256 * 1024;
// OP-01: 进程内共享 token，首次 GET 从 host 获取后，POST 写操作携带鉴权
let authToken;
async function getStatus() {
    const res = await fetch(ROUTE_PATH, { method: 'GET', cache: 'no-store' });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.ok === true && data.value && typeof data.value === 'object') {
        if (typeof data.value.authToken === 'string' && data.value.authToken.length > 0)
            authToken = data.value.authToken;
        return data.value;
    }
    throw new Error((data?.error?.message) || `GET ${ROUTE_PATH} failed (${res.status})`);
}
async function postCommand(body) {
    const payload = JSON.stringify(body);
    if (payload.length > MAX_BODY_BYTES)
        throw new Error('payload too large');
    const headers = { 'Content-Type': 'application/json' };
    if (authToken)
        headers['X-BMS-Token'] = authToken;
    const res = await fetch(ROUTE_PATH, {
        method: 'POST', headers, body: payload,
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.ok === true && data.value)
        return data.value;
    throw new Error((data?.error?.message) || `POST ${ROUTE_PATH} failed (${res.status})`);
}
// ---------------------------------------------------------------------------
// Normalization helpers
// ---------------------------------------------------------------------------
function normalizeEffortEntry(value) {
    if (typeof value === 'string')
        return value.length > 0 ? { selected: value } : {};
    if (value && typeof value === 'object')
        return {
            selected: typeof value.selected === 'string' ? value.selected : undefined,
            tiers: Array.isArray(value.tiers) ? value.tiers.filter((t) => typeof t === 'string') : undefined,
        };
    return {};
}
function normalizeSetting(raw) {
    if (!raw || typeof raw !== 'object')
        return { builtinDisabled: [], providerOrder: [], modelEfforts: {}, providerRetryOverrides: {} };
    const modelEfforts = {};
    for (const provider of Object.keys(raw.modelEfforts || {})) {
        for (const model of Object.keys(raw.modelEfforts[provider] || {})) {
            ;
            (modelEfforts[provider] = modelEfforts[provider] || {})[model] = normalizeEffortEntry(raw.modelEfforts[provider][model]);
        }
    }
    const strings = (v) => Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
    return {
        builtinDisabled: strings(raw.builtinDisabled),
        providerOrder: strings(raw.providerOrder), modelEfforts,
        providerRetryOverrides: raw.providerRetryOverrides && typeof raw.providerRetryOverrides === 'object' ? raw.providerRetryOverrides : {},
        officialAdded: raw.officialAdded === true,
    };
}
function toModelRow(model) {
    if (!model || typeof model.id !== 'string' || !model.id)
        return null;
    const efforts = (model.reasoningEfforts && typeof model.reasoningEfforts === 'object') ? model.reasoningEfforts : {};
    return {
        id: model.id, name: model.name || model.id,
        tiers: Object.keys(efforts).filter((t) => typeof t === 'string' && t.length > 0),
        contextWindow: typeof model.contextWindow === 'number' ? model.contextWindow : undefined,
        maxTokens: typeof model.maxTokens === 'number' ? model.maxTokens : undefined,
        input: Array.isArray(model.input) ? model.input.filter((m) => typeof m === 'string') : undefined,
    };
}
function parseCapacity(text) {
    if (typeof text !== 'string')
        return undefined;
    const t = text.trim().replace(/,/g, '');
    if (!t)
        return undefined;
    const m = /^([0-9]+(?:\.[0-9]+)?)\s*([km])?$/i.exec(t);
    if (!m)
        return NaN;
    const n = Number(m[1]);
    if (!Number.isFinite(n))
        return NaN;
    const suf = (m[2] || '').toLowerCase();
    return Math.round(suf === 'k' ? n * 1000 : suf === 'm' ? n * 1e6 : n);
}
function formatCapacity(value) {
    if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0)
        return '';
    if (value % 1e6 === 0)
        return `${value / 1e6}M`;
    if (value % 1000 === 0)
        return `${value / 1000}K`;
    return String(value);
}
function toRow(id, profile, active, kind = 'config', cred) {
    return {
        provider: id, displayName: profile.displayName || id, active, kind,
        apiKeyEnv: typeof profile.apiKeyEnv === 'string' && profile.apiKeyEnv.length > 0 ? profile.apiKeyEnv : undefined,
        baseURL: typeof profile.baseURL === 'string' && profile.baseURL.length > 0 ? profile.baseURL : undefined,
        credential: cred ?? (profile.apiKeyEnv ? 'missing' : 'none'),
        models: Array.isArray(profile.models) ? profile.models.map(toModelRow).filter((m) => m !== null) : [],
    };
}
function mergeRows(status) {
    const rows = [];
    const seen = new Set();
    const creds = status.credentials || {};
    for (const id of Object.keys(status.enabledProviders || {})) {
        const p = status.enabledProviders[id];
        if (p && typeof p === 'object') {
            rows.push(toRow(id, p, true, 'config', creds[id]));
            seen.add(id);
        }
    }
    for (const id of Object.keys(status.disabledProviders || {})) {
        const p = status.disabledProviders[id];
        if (p && typeof p === 'object') {
            rows.push(toRow(id, p, false, 'config', creds[id]));
            seen.add(id);
        }
    }
    const builtinDisabled = new Set(status.builtinDisabled || []);
    for (const id of Object.keys(status.builtinProviders || {})) {
        if (!seen.has(id))
            rows.push(toRow(id, { displayName: status.builtinProviders[id] }, !builtinDisabled.has(id), 'builtin', creds[id]));
    }
    return rows;
}
function sortRows(rows, order) {
    if (!Array.isArray(order) || order.length === 0)
        return rows;
    const rank = new Map();
    order.forEach((id, i) => rank.set(id, i));
    return [...rows].sort((a, b) => (rank.get(a.provider) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b.provider) ?? Number.MAX_SAFE_INTEGER));
}
/**
 * 排序：启用 provider 按 providerOrder 在前；禁用的自动排到末尾，
 * 且最早禁用的在最后面（disabledOrder 按禁用先后追加，越早越靠后）。
 */
function sortRowsWithDisabled(rows, order, disabledOrder) {
    const enabled = rows.filter((r) => r.active);
    const disabled = rows.filter((r) => !r.active);
    const sortedEnabled = sortRows(enabled, order);
    const rankD = new Map();
    (disabledOrder || disabled.map((r) => r.provider)).forEach((id, i) => rankD.set(id, i));
    const sortedDisabled = [...disabled].sort((a, b) => (rankD.get(b.provider) ?? Number.MAX_SAFE_INTEGER) - (rankD.get(a.provider) ?? Number.MAX_SAFE_INTEGER));
    return [...sortedEnabled, ...sortedDisabled];
}
// api wrapper filter state
const filterState = { hidden: new Set(), order: [], efforts: {} };
function syncFilterState(status) {
    filterState.hidden = new Set(status?.builtinDisabled || []);
    filterState.order = status?.providerOrder || [];
    // 记录每 provider/model 的 selected 思考档位（供模型选择器切换时自动注入）
    const efforts = {};
    const me = status?.setting?.modelEfforts;
    if (me && typeof me === 'object') {
        for (const provider of Object.keys(me)) {
            const models = me[provider];
            if (!models || typeof models !== 'object')
                continue;
            for (const model of Object.keys(models)) {
                const entry = models[model];
                const selected = typeof entry === 'string' ? entry : entry?.selected;
                if (typeof selected === 'string' && selected.length > 0) {
                    efforts[provider] = efforts[provider] || {};
                    efforts[provider][model] = selected;
                }
            }
        }
    }
    filterState.efforts = efforts;
}
function applyOrder(items, order) {
    if (!Array.isArray(order) || order.length === 0)
        return items;
    const rank = new Map();
    order.forEach((id, i) => rank.set(id, i));
    const ranked = [];
    const rest = [];
    for (const item of items) {
        const pos = item && typeof item.id === 'string' ? rank.get(item.id) : undefined;
        if (pos !== undefined)
            ranked.push(item);
        else
            rest.push(item);
    }
    ranked.sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0));
    return [...ranked, ...rest];
}
function isHiddenId(id) { return typeof id === 'string' && filterState.hidden.has(id); }
// Drag helpers
const ROW_GAP = 8;
function computeOffsets(baseOrder, liveOrder, heights) {
    const topBase = {};
    let y = 0;
    for (const p of baseOrder) {
        topBase[p] = y;
        y += (heights[p] ?? 0) + ROW_GAP;
    }
    y = 0;
    const topLive = {};
    for (const p of liveOrder) {
        topLive[p] = y;
        y += (heights[p] ?? 0) + ROW_GAP;
    }
    const offsets = {};
    for (const p of baseOrder)
        offsets[p] = (topLive[p] ?? 0) - (topBase[p] ?? 0);
    return offsets;
}
const PROTOCOL_OPTIONS = ['openai-completions', 'openai-responses', 'anthropic-messages'];
const ADD_TIER_CANDIDATES = ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'];
let addModelUid = 0;
const NEW_MODEL_PREFIX = '__new__';
const DEFAULT_DRAFT = { provider: '', displayName: '', api: '', baseURL: '', apiKeyEnv: '' };
// ---------------------------------------------------------------------------
// Panel Component
// ---------------------------------------------------------------------------
function BetterModelSettingPanel(props) {
    const { t: userT } = props;
    ensureStyles();
    const text = (key, fallback) => {
        const v = typeof userT === 'function' ? userT(key) : undefined;
        return (typeof v === 'string' && v !== key) ? v : (ZH[key] ?? fallback ?? key);
    };
    const [rows, setRows] = React.useState([]);
    const [setting, setSetting] = React.useState({
        builtinDisabled: [], providerOrder: [], modelEfforts: {}, providerRetryOverrides: {}, officialAdded: false,
    });
    const [writable, setWritable] = React.useState(true);
    const [documentPath, setDocumentPath] = React.useState(undefined);
    const [loading, setLoading] = React.useState(true);
    const [loadError, setLoadError] = React.useState(undefined);
    const [saveStatus, setSaveStatus] = React.useState('');
    const [saveError, setSaveError] = React.useState(false);
    const [saveBusy, setSaveBusy] = React.useState(false);
    // OP-19: 统一设置保存消息 + 错误标志（替代脆弱的正则判断）
    const setSaveMsg = (msg, isError = false) => { setSaveStatus(msg); setSaveError(isError); };
    const [editingProvider, setEditingProvider] = React.useState(null);
    const [modelDraft, setModelDraft] = React.useState({});
    // 编辑中的 provider 级字段草案（显示名称 / Base URL / API Key 环境变量 / Provider ID 重命名）
    const [providerDraft, setProviderDraft] = React.useState(null);
    // Add-provider page state
    const [adding, setAdding] = React.useState(false);
    const [draft, setDraft] = React.useState({ ...DEFAULT_DRAFT });
    const [draftModels, setDraftModels] = React.useState([]);
    const [addError, setAddError] = React.useState('');
    const [addBusy, setAddBusy] = React.useState(false);
    // Add-official-model state
    const [showOfficialForm, setShowOfficialForm] = React.useState(false);
    const [officialApiKey, setOfficialApiKey] = React.useState('');
    const [officialEnvName, setOfficialEnvName] = React.useState('DEEPSEEK_API_KEY');
    const [officialBusy, setOfficialBusy] = React.useState(false);
    const [officialError, setOfficialError] = React.useState('');
    // Delete confirmation
    const [deleteTarget, setDeleteTarget] = React.useState(null);
    const [deleting, setDeleting] = React.useState(false);
    const [deleteFailure, setDeleteFailure] = React.useState('');
    const applyStatus = (status, opts) => {
        // 排序：启用提供方按 providerOrder 排序在前，禁用的自动排到末尾，
        // 且最早禁用的在最后面（disabledOrder 按禁用时间追加）。
        setRows(sortRowsWithDisabled(mergeRows(status), status.providerOrder, status.disabledOrder));
        syncFilterState(status);
        setWritable(status.writable !== false);
        setDocumentPath(status.documentPath);
        if (!opts?.keepSetting && status.setting)
            setSetting(normalizeSetting(status.setting));
    };
    const load = async () => {
        setLoading(true);
        setLoadError(undefined);
        try {
            applyStatus(await getStatus());
        }
        catch (error) {
            setLoadError(error?.message || String(error));
        }
        finally {
            setLoading(false);
        }
    };
    React.useEffect(() => { void load(); }, []);
    // Save
    const saveTimer = React.useRef(null);
    const saveGeneration = React.useRef(0);
    const flushApply = (next) => {
        const gen = ++saveGeneration.current;
        setSaveBusy(true);
        setSaveMsg(text('applying', '保存中…'));
        postCommand({ op: 'apply', setting: next }).then((status) => {
            if (gen !== saveGeneration.current)
                return;
            applyStatus(status);
            setSaveMsg(text('savedProvider', '已保存。'));
            setTimeout(() => setSaveMsg(''), 1500);
        }).catch((error) => {
            if (gen === saveGeneration.current)
                setSaveMsg('保存失败: ' + (error?.message || String(error)), true);
        }).finally(() => { if (gen === saveGeneration.current)
            setSaveBusy(false); });
    };
    const queueApply = (next) => {
        if (saveTimer.current)
            clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => flushApply(next), 250);
    };
    const updateSetting = (updater) => {
        setSetting((prev) => { const next = updater(prev); queueApply(next); return next; });
    };
    // 编辑器内的草稿更新：只改 React state，不触发自动保存
    const updateSettingDraft = (updater) => {
        setSetting((prev) => { const next = updater(prev); return next; });
        setDirty(true);
    };
    const [dirty, setDirty] = React.useState(false);
    const [pendingCloseProvider, setPendingCloseProvider] = React.useState(null);
    const closeEditorState = (provider) => {
        setEditingProvider(null);
        setDirty(false);
        setModelDraft((p) => { const n = { ...p }; delete n[provider]; return n; });
        setProviderDraft(null);
        setPendingCloseProvider(null);
    };
    // 关闭编辑器前检查是否有未保存修改；discard=true 直接丢弃草稿关闭
    const requestCloseEditor = async (provider, opts) => {
        if (opts?.discard) {
            closeEditorState(provider);
            return;
        }
        if (opts?.saveFirst) {
            const ok = await saveSettings(provider);
            if (ok)
                closeEditorState(provider);
            // 保存失败时保留编辑器与草稿，不关闭
            return;
        }
        if (dirty) {
            setPendingCloseProvider(provider);
        }
        else {
            closeEditorState(provider);
        }
    };
    React.useEffect(() => () => { if (saveTimer.current)
        clearTimeout(saveTimer.current); }, []);
    // Delete (disable) provider
    const confirmDelete = async () => {
        if (!deleteTarget)
            return;
        setDeleting(true);
        setDeleteFailure('');
        try {
            const status = await postCommand({ op: 'delete', provider: deleteTarget });
            applyStatus(status, { keepSetting: true });
            setDeleteTarget(null);
            setSaveMsg(text('savedProvider', '已保存。'));
            setTimeout(() => setSaveMsg(''), 1500);
        }
        catch (error) {
            setDeleteFailure(error?.message || String(error));
        }
        finally {
            setDeleting(false);
        }
    };
    // Enable provider
    const enableProvider = async (provider) => {
        setSaveBusy(true);
        setSaveMsg(text('applying', '保存中…'));
        try {
            const status = await postCommand({ op: 'enable', provider });
            applyStatus(status, { keepSetting: true });
            setSaveMsg(text('savedProvider', '已保存。'));
            setTimeout(() => setSaveMsg(''), 1500);
        }
        catch (error) {
            setSaveMsg('操作失败: ' + (error?.message || String(error)), true);
        }
        finally {
            setSaveBusy(false);
        }
    };
    // Add official DeepSeek model
    const submitOfficial = async () => {
        setOfficialBusy(true);
        setOfficialError('');
        try {
            const status = await postCommand({ op: 'addOfficial', apiKey: officialApiKey || undefined, envName: officialEnvName || 'DEEPSEEK_API_KEY' });
            applyStatus(status);
            setShowOfficialForm(false);
            setSaveMsg(text('savedProvider', '已保存。'));
            setTimeout(() => setSaveMsg(''), 1500);
        }
        catch (error) {
            setOfficialError(error?.message || String(error));
        }
        finally {
            setOfficialBusy(false);
        }
    };
    // Quick toggle (no confirm)
    const toggleProvider = (provider, kind, active) => {
        if (kind === 'builtin') {
            toggleBuiltinEnabled(provider, active);
        }
        else if (active) {
            setSaveBusy(true);
            setSaveMsg(text('applying', '保存中…'));
            postCommand({ op: 'disable', provider }).then((status) => {
                applyStatus(status, { keepSetting: true });
                setSaveMsg(text('savedProvider', '已保存。'));
                setTimeout(() => setSaveMsg(''), 1500);
            }).catch((error) => {
                setSaveMsg('操作失败: ' + (error?.message || String(error)), true);
            }).finally(() => setSaveBusy(false));
        }
        else {
            enableProvider(provider);
        }
    };
    const toggleBuiltinEnabled = (provider, enabled) => {
        updateSetting((prev) => {
            const builtinDisabled = new Set(prev.builtinDisabled || []);
            if (enabled)
                builtinDisabled.delete(provider);
            else
                builtinDisabled.add(provider);
            return { ...prev, builtinDisabled: [...builtinDisabled] };
        });
    };
    // Add provider
    const openAdd = () => { setDraft({ ...DEFAULT_DRAFT }); setDraftModels([]); setAddError(''); setAdding(true); };
    const closeAdd = () => { setAdding(false); setAddError(''); };
    const submitAdd = async () => {
        const provider = draft.provider.trim();
        if (!provider) {
            setAddError(text('modelIdRequired', 'Provider ID 不能为空。'));
            return;
        }
        if (!/^[a-z][a-z0-9-]*$/.test(provider)) {
            setAddError(text('customRouteInvalid', '需以小写字母开头，之后可用小写字母、数字和短横线。'));
            return;
        }
        if (rows.some((r) => r.provider === provider)) {
            setAddError(text('customRouteTaken', '已有提供方使用了这个 ID。'));
            return;
        }
        if (!draft.baseURL.trim()) {
            setAddError(text('customNeedsBaseUrl', '自定义提供方需要填写 API 地址。'));
            return;
        }
        const validModels = draftModels.filter((m) => m.id.trim().length > 0);
        if (validModels.length === 0) {
            setAddError(text('customNeedsModels', '自定义提供方至少需要一个模型。'));
            return;
        }
        setAddBusy(true);
        setAddError('');
        try {
            const profile = {};
            if (draft.displayName.trim())
                profile.displayName = draft.displayName.trim();
            if (draft.api.trim())
                profile.api = draft.api.trim();
            if (draft.baseURL.trim())
                profile.baseURL = draft.baseURL.trim();
            if (draft.apiKeyEnv.trim())
                profile.apiKeyEnv = draft.apiKeyEnv.trim();
            profile.models = validModels.map((m) => {
                const entry = { id: m.id.trim() };
                if (m.name?.trim())
                    entry.name = m.name.trim();
                if (m.tiers.length > 0) {
                    entry.reasoningEfforts = {};
                    for (const t of m.tiers)
                        entry.reasoningEfforts[t] = t === 'off' ? null : t;
                }
                return entry;
            });
            const status = await postCommand({ op: 'add', provider, profile });
            applyStatus(status, { keepSetting: true });
            setAdding(false);
            setSaveMsg(text('savedProvider', '已保存。'));
            setTimeout(() => setSaveMsg(''), 1500);
        }
        catch (error) {
            setAddError(error?.message || String(error));
        }
        finally {
            setAddBusy(false);
        }
    };
    const addModelRow = () => setDraftModels((prev) => [{ uid: ++addModelUid, id: '', name: '', tiers: [] }, ...prev]);
    const removeModelRow = (index) => setDraftModels((prev) => prev.filter((_, i) => i !== index));
    const updateModelRow = (index, patch) => setDraftModels((prev) => prev.map((m, i) => (i === index ? { ...m, ...patch } : m)));
    const toggleModelTier = (index, tier) => setDraftModels((prev) => prev.map((m, i) => {
        if (i !== index)
            return m;
        const tiers = new Set(m.tiers);
        if (tiers.has(tier))
            tiers.delete(tier);
        else
            tiers.add(tier);
        return { ...m, tiers: [...tiers] };
    }));
    // Edit model additions
    const addEditModelRow = (provider) => setModelDraft((prev) => ({
        ...prev,
        [provider]: { ...(prev[provider] || {}), [`${NEW_MODEL_PREFIX}${++addModelUid}`]: { id: '', name: '', context: '', maxTokens: '', tiers: [] } },
    }));
    const removeEditModelRow = (provider, key) => setModelDraft((prev) => {
        const next = { ...(prev[provider] || {}) };
        delete next[key];
        return { ...prev, [provider]: next };
    });
    const updateEditModelRow = (provider, key, patch) => setModelDraft((prev) => ({
        ...prev,
        [provider]: { ...(prev[provider] || {}), [key]: { id: '', name: '', context: '', maxTokens: '', tiers: [], ...(prev[provider]?.[key] || {}), ...patch } },
    }));
    const toggleEditModelTier = (provider, key, tier) => setModelDraft((prev) => {
        const cur = prev[provider]?.[key] || { id: '', name: '', context: '', maxTokens: '', tiers: [] };
        const tiers = new Set(cur.tiers || []);
        if (tiers.has(tier))
            tiers.delete(tier);
        else
            tiers.add(tier);
        return { ...prev, [provider]: { ...(prev[provider] || {}), [key]: { ...cur, tiers: [...tiers] } } };
    });
    // Drag
    const dragSrc = React.useRef(null);
    const [liveOrder, setLiveOrder] = React.useState(null);
    const [overKey, setOverKey] = React.useState(null);
    const [noTransition, setNoTransition] = React.useState(false);
    const heightsRef = React.useRef({});
    const rowElsRef = React.useRef({});
    const captureHeights = (keys) => {
        const h = {};
        for (const k of keys) {
            const el = rowElsRef.current[k];
            if (el)
                h[k] = el.offsetHeight;
        }
        heightsRef.current = h;
    };
    const onDragStart = (e, provider) => {
        dragSrc.current = provider;
        const base = rows.map((r) => r.provider);
        captureHeights(base);
        setLiveOrder(base.slice());
        setOverKey(provider);
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', provider);
        }
    };
    const onDragOverRow = (e, target) => {
        if (e.preventDefault)
            e.preventDefault();
        if (e.dataTransfer)
            e.dataTransfer.dropEffect = 'move';
        const src = dragSrc.current;
        if (!src) {
            setOverKey(target);
            return;
        }
        const base = rows.map((r) => r.provider);
        const from = base.indexOf(src);
        const to = base.indexOf(target);
        if (from < 0 || to < 0 || from === to) {
            setOverKey(target);
            return;
        }
        const next = base.slice();
        next.splice(from, 1);
        next.splice(to, 0, src);
        setLiveOrder(next);
        setOverKey(target);
    };
    const onDrop = () => {
        const src = dragSrc.current;
        const order = liveOrder;
        if (src && order) {
            const byIdx = order.map((id) => rows.find((r) => r.provider === id)).filter((r) => r !== undefined);
            if (byIdx.length === rows.length)
                setRows(byIdx);
            setNoTransition(true);
            requestAnimationFrame(() => requestAnimationFrame(() => setNoTransition(false)));
            updateSetting((prev) => ({ ...prev, providerOrder: order.slice() }));
        }
        dragSrc.current = null;
        setLiveOrder(null);
        setOverKey(null);
        heightsRef.current = {};
    };
    const onDragEnd = () => { dragSrc.current = null; setLiveOrder(null); setOverKey(null); heightsRef.current = {}; };
    // Effort / retry
    const getEffortEntry = (provider, modelId) => normalizeEffortEntry(setting.modelEfforts[provider]?.[modelId]);
    const setEffortTiers = (provider, modelId, tiers) => updateSettingDraft((prev) => {
        const modelEfforts = { ...prev.modelEfforts };
        const pm = { ...(modelEfforts[provider] || {}) };
        const existing = normalizeEffortEntry(pm[modelId]);
        const next = { tiers: tiers.length > 0 ? tiers : undefined, selected: existing.selected && tiers.includes(existing.selected) ? existing.selected : undefined };
        if (next.tiers === undefined && next.selected === undefined)
            delete pm[modelId];
        else
            pm[modelId] = next;
        modelEfforts[provider] = pm;
        return { ...prev, modelEfforts };
    });
    const setEffortSelected = (provider, modelId, selected) => updateSettingDraft((prev) => {
        const modelEfforts = { ...prev.modelEfforts };
        const pm = { ...(modelEfforts[provider] || {}) };
        const existing = normalizeEffortEntry(pm[modelId]);
        const next = { tiers: existing.tiers, selected: selected || undefined };
        if (next.tiers === undefined && next.selected === undefined)
            delete pm[modelId];
        else
            pm[modelId] = next;
        modelEfforts[provider] = pm;
        return { ...prev, modelEfforts };
    });
    const getRetry = (provider) => setting.providerRetryOverrides[provider]?.maxRetries ?? 2;
    const setRetry = (provider, value) => updateSettingDraft((prev) => ({
        ...prev,
        providerRetryOverrides: { ...prev.providerRetryOverrides, [provider]: { ...(prev.providerRetryOverrides[provider] || {}), maxRetries: value } },
    }));
    // Save editor — 返回是否保存成功
    const rowForSave = (id) => rows.find((r) => r.provider === id);
    const saveSettings = async (provider) => {
        if (saveTimer.current)
            clearTimeout(saveTimer.current);
        setSaveBusy(true);
        setSaveMsg(text('applying', '保存中…'));
        try {
            const nextSetting = { ...setting, modelEfforts: { ...(setting.modelEfforts || {}) } };
            const body = { op: 'apply', setting: nextSetting };
            if (provider) {
                const draftMap = modelDraft[provider];
                if (draftMap && Object.keys(draftMap).length > 0) {
                    const edits = [];
                    for (const [modelId, d] of Object.entries(draftMap)) {
                        if (modelId.startsWith(NEW_MODEL_PREFIX)) {
                            const newId = d.id?.trim() || '';
                            if (!newId)
                                continue;
                            const update = { id: newId, oldId: modelId };
                            if (d.name?.trim())
                                update.name = d.name.trim();
                            const nctx = parseCapacity(d.context);
                            if (nctx !== undefined && Number.isFinite(nctx) && nctx > 0)
                                update.contextWindow = nctx;
                            const nmt = parseCapacity(d.maxTokens);
                            if (nmt !== undefined && Number.isFinite(nmt) && nmt > 0)
                                update.maxTokens = nmt;
                            if (Array.isArray(d.tiers) && d.tiers.length > 0) {
                                const efforts = {};
                                for (const tier of d.tiers)
                                    efforts[tier] = tier === 'off' ? null : tier;
                                update.reasoningEfforts = efforts;
                            }
                            edits.push(update);
                            continue;
                        }
                        const oldId = modelId;
                        const newId = d.id?.trim() || oldId;
                        const update = { id: newId, oldId };
                        if (d.name?.trim())
                            update.name = d.name.trim();
                        else
                            update.name = '';
                        const ctx = parseCapacity(d.context);
                        if (ctx !== undefined && Number.isFinite(ctx) && ctx > 0)
                            update.contextWindow = ctx;
                        else if (d.context?.trim())
                            update.contextWindow = null;
                        const mt = parseCapacity(d.maxTokens);
                        if (mt !== undefined && Number.isFinite(mt) && mt > 0)
                            update.maxTokens = mt;
                        else if (d.maxTokens?.trim())
                            update.maxTokens = null;
                        if (Array.isArray(d.tiers) && d.tiers.length > 0) {
                            const efforts = {};
                            for (const tier of d.tiers)
                                efforts[tier] = tier === 'off' ? null : tier;
                            update.reasoningEfforts = efforts;
                        }
                        if (d.input !== undefined)
                            update.input = d.input === 'multimodal' ? ['text', 'image'] : ['text'];
                        if (oldId !== newId) {
                            const pm = nextSetting.modelEfforts[provider];
                            if (pm && pm[oldId]) {
                                const np = { ...pm, [newId]: pm[oldId] };
                                delete np[oldId];
                                nextSetting.modelEfforts[provider] = np;
                            }
                        }
                        edits.push(update);
                    }
                    body.providerModels = { [provider]: edits };
                }
                // Provider 级字段变更（显示名称 / Base URL / API Key env / Provider ID 重命名）
                const pd = providerDraft;
                if (pd) {
                    const orig = rowForSave(provider);
                    const profileUpdate = {};
                    if (pd.displayName.trim() !== (orig?.displayName || provider)) {
                        profileUpdate.displayName = pd.displayName.trim() || provider;
                    }
                    const origBaseURL = orig?.baseURL || '';
                    if (pd.baseURL.trim() !== origBaseURL) {
                        profileUpdate.baseURL = pd.baseURL.trim() || null;
                    }
                    const origEnv = orig?.apiKeyEnv || '';
                    if (pd.apiKeyEnv.trim() !== origEnv) {
                        profileUpdate.apiKeyEnv = pd.apiKeyEnv.trim() || undefined;
                    }
                    if (Object.keys(profileUpdate).length > 0)
                        body.providerProfile = profileUpdate;
                    // Provider ID 重命名（需 host 迁移 provider 键）
                    if (pd.newProviderId.trim() !== provider && /^[a-z][a-z0-9-]*$/.test(pd.newProviderId.trim())) {
                        body.providerIdRename = { oldId: provider, newId: pd.newProviderId.trim() };
                    }
                }
            }
            const status = await postCommand(body);
            applyStatus(status);
            setDirty(false);
            setSaveMsg(text('savedProvider', '已保存。'));
            return true;
        }
        catch (error) {
            setSaveMsg('保存失败: ' + (error?.message || String(error)), true);
            return false;
        }
        finally {
            setSaveBusy(false);
        }
    };
    // ---- Render ----
    if (loading) {
        return React.createElement('div', { className: 'better-model-setting bms-section' }, [
            React.createElement('div', { className: 'bms-loading', key: 'loading' }, [
                React.createElement('span', { className: 'bms-spinner', key: 'spin', 'aria-hidden': true }),
                React.createElement('span', { key: 'text' }, text('loading', '加载中…')),
            ]),
        ]);
    }
    if (loadError) {
        return React.createElement('div', { className: 'better-model-setting bms-section' }, [
            React.createElement('p', { className: 'bms-error', key: 'err' }, `${text('loadFailed')}: ${loadError}`),
            React.createElement('button', { type: 'button', className: 'bms-secondaryButton', key: 'retry', onClick: () => void load() }, text('retry')),
        ]);
    }
    const canDrag = writable !== false && !saveBusy;
    const configRows = rows.filter((r) => r.kind !== 'builtin');
    // 内置 DeepSeek 只在用户已"添加官方模型"后显示
    const officialRow = rows.find((r) => r.provider === 'deepseek-official' && r.kind === 'builtin');
    const officialAdded = !!setting.officialAdded;
    const baseOrder = rows.map((r) => r.provider);
    const offsets = liveOrder ? computeOffsets(baseOrder, liveOrder, heightsRef.current) : {};
    const draggingKey = dragSrc.current;
    const renderProviderRow = (row, index) => {
        const provider = row.provider;
        const isEditing = editingProvider === provider;
        const isDisabled = !row.active;
        const isDragging = draggingKey === provider;
        const offset = liveOrder ? (offsets[provider] || 0) : 0;
        const rowStyle = {
            opacity: isDisabled ? 0.55 : (isDragging ? 0.85 : 1),
            transform: liveOrder ? `translateY(${offset}px)` : undefined,
            transition: noTransition ? 'none' : 'transform .2s cubic-bezier(.32,.72,.24,1), opacity .14s ease, border-color .16s ease, box-shadow .2s ease, background-color .2s ease',
            zIndex: isDragging ? 2 : undefined, position: 'relative',
            animationDelay: `${Math.min(index, 10) * 24}ms`,
        };
        const rowClass = 'bms-rowCard' + (isDragging ? ' bms-dragging' : '') + (isDisabled ? ' bms-disabledRow' : '') +
            (overKey === provider && !isDragging && liveOrder ? ' bms-overTarget' : '');
        return React.createElement('li', {
            key: provider, ref: (el) => { rowElsRef.current[provider] = el; },
            className: rowClass, style: rowStyle,
            onDragOver: (e) => onDragOverRow(e, provider), onDrop, onDragEnd,
        }, [
            React.createElement('div', { className: 'bms-rowHead', key: 'head' }, [
                React.createElement('div', { className: 'bms-rowIdentity', key: 'id' }, [
                    row.kind !== 'builtin' && canDrag ? React.createElement('span', {
                        className: 'bms-dragHandle', key: 'handle', title: '拖动排序',
                        draggable: true, onDragStart: (e) => onDragStart(e, provider),
                    }) : null,
                    React.createElement('span', { className: 'bms-rowName', key: 'name' }, row.displayName),
                    row.kind === 'builtin' ? React.createElement('span', { className: 'bms-rowTag', key: 'tag' }, '内置') : null,
                    row.credential === 'configured' ? React.createElement('span', {
                        className: 'bms-credentialDot bms-credentialDotConfigured', key: 'cd',
                        role: 'img', title: text('credentialConfigured'),
                    }) : row.credential === 'missing' ? React.createElement('span', {
                        className: 'bms-credentialDot bms-credentialDotMissing', key: 'cd',
                        role: 'img', title: text('credentialMissing'),
                    }) : null,
                ]),
                React.createElement('div', { className: 'bms-rowActions', key: 'actions' }, [
                    // 1. 禁用/启用（所有 provider 统一，仅文案随状态变化）
                    React.createElement('button', {
                        type: 'button', className: 'bms-secondaryButton', key: 'toggle',
                        disabled: saveBusy || writable === false,
                        onClick: () => toggleProvider(provider, row.kind, !isDisabled),
                    }, isDisabled ? text('enable') : text('disable')),
                    // 2. 编辑（内置无法编辑；禁用态允许编辑模型设置，保存后仍需启用才生效）
                    React.createElement('button', {
                        type: 'button', className: 'bms-secondaryButton', key: 'edit',
                        disabled: saveBusy || writable === false || row.kind === 'builtin',
                        onClick: () => {
                            if (isEditing) {
                                requestCloseEditor(provider);
                            }
                            else {
                                setEditingProvider(provider);
                                setDirty(false);
                                // 初始化 provider 级草案（显示名称 / Base URL / API Key env / Provider ID）
                                setProviderDraft({
                                    displayName: row.displayName,
                                    baseURL: row.apiKeyEnv ? row.baseURL || '' : '',
                                    apiKeyEnv: row.apiKeyEnv || '',
                                    newProviderId: provider,
                                });
                            }
                        },
                    }, text('edit')),
                    // 3. 删除（红色，需弹窗确认）
                    React.createElement('button', {
                        type: 'button', className: 'bms-dangerButton', key: 'del',
                        'aria-label': text('removeProvider').replace('{provider}', row.displayName),
                        disabled: saveBusy || writable === false,
                        onClick: () => { setDeleteTarget(provider); setDeleteFailure(''); },
                    }, text('remove')),
                ]),
            ]),
            // Editor (only for configured custom providers, not disabled)
            isEditing && row.kind !== 'builtin' ? React.createElement('div', { className: 'bms-editor', key: 'editor' }, [
                // 显示名称 / Provider ID 可编辑头部
                React.createElement('div', { className: 'bms-field', key: 'headName' }, [
                    React.createElement('span', { className: 'bms-fieldLabel' }, text('displayName', '显示名称')),
                    React.createElement('input', {
                        className: 'bms-input', disabled: saveBusy || writable === false,
                        value: providerDraft?.displayName ?? row.displayName,
                        placeholder: row.displayName,
                        onChange: (e) => { setProviderDraft((d) => ({ ...(d ?? { displayName: row.displayName, baseURL: row.baseURL || '', apiKeyEnv: row.apiKeyEnv || '', newProviderId: provider }), displayName: e.target.value })); setDirty(true); },
                    }),
                ]),
                React.createElement('div', { className: 'bms-field', key: 'headId' }, [
                    React.createElement('span', { className: 'bms-fieldLabel' }, text('providerId', 'Provider ID')),
                    React.createElement('input', {
                        className: 'bms-input', disabled: saveBusy || writable === false,
                        value: providerDraft?.newProviderId ?? provider,
                        placeholder: provider,
                        onChange: (e) => { setProviderDraft((d) => ({ ...(d ?? { displayName: row.displayName, baseURL: row.baseURL || '', apiKeyEnv: row.apiKeyEnv || '', newProviderId: provider }), newProviderId: e.target.value })); setDirty(true); },
                    }),
                ]),
                // Base URL + API Key env fields
                (() => {
                    const apiKeyEnv = (providerDraft?.apiKeyEnv ?? row.apiKeyEnv) || '';
                    return [
                        React.createElement('label', { key: 'baseUrl', className: 'bms-field' }, [
                            React.createElement('span', { className: 'bms-fieldLabel' }, text('baseUrl')),
                            React.createElement('input', {
                                className: 'bms-input', disabled: saveBusy || writable === false,
                                value: (providerDraft?.baseURL ?? row.baseURL) || '',
                                placeholder: text('baseUrlDefault'),
                                onChange: (e) => { setProviderDraft((d) => ({ ...(d ?? { displayName: row.displayName, baseURL: row.baseURL || '', apiKeyEnv: row.apiKeyEnv || '', newProviderId: provider }), baseURL: e.target.value })); setDirty(true); },
                            }),
                        ]),
                        React.createElement('label', { key: 'keyEnv', className: 'bms-field' }, [
                            React.createElement('span', { className: 'bms-fieldLabel' }, text('keyInput')),
                            React.createElement('input', {
                                className: 'bms-input', disabled: saveBusy || writable === false,
                                value: (providerDraft?.apiKeyEnv ?? row.apiKeyEnv) || '',
                                placeholder: apiKeyEnv ? text('keyEnvLocked') : text('keyPlaceholder'),
                                style: { fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace' },
                                onChange: (e) => { setProviderDraft((d) => ({ ...(d ?? { displayName: row.displayName, baseURL: row.baseURL || '', apiKeyEnv: row.apiKeyEnv || '', newProviderId: provider }), apiKeyEnv: e.target.value })); setDirty(true); },
                            }),
                        ]),
                        // Retry (added feature)
                        React.createElement('label', { key: 'retry', className: 'bms-field' }, [
                            React.createElement('span', { className: 'bms-fieldLabel' }, text('retryCount', '重试次数')),
                            React.createElement('input', {
                                type: 'number', min: 0, max: 20,
                                className: 'bms-input bms-retry', style: { width: 96 },
                                value: getRetry(provider), disabled: saveBusy || writable === false,
                                onChange: (e) => setRetry(provider, Math.max(0, Math.min(20, Number.parseInt(e.target.value, 10) || 0))),
                            }),
                        ]),
                        // 模型设置 (models catalog)
                        React.createElement('details', { className: 'bms-customized', key: 'customized' }, [
                            React.createElement('summary', { className: 'bms-customizedSummary' }, [
                                text('modelSettings'),
                                row.models.length > 0 ? React.createElement('span', { key: 'pills', className: 'bms-modelPills' }, row.models.map((m) => React.createElement('span', { key: m.id, className: 'bms-modelPill' }, m.name || m.id))) : null,
                            ]),
                            React.createElement('div', { className: 'bms-customizedBody' }, [
                                React.createElement('div', { className: 'bms-modelCatalog' }, [
                                    React.createElement('div', { className: 'bms-modelCatalogHeading' }, [
                                        React.createElement('div', { className: 'bms-modelCatalogTitle' }, text('models')),
                                        React.createElement('p', { className: 'bms-modelCatalogMeta' }, row.models.length > 0 ? text('modelsCustomized') : text('modelsInherited')),
                                    ]),
                                    row.models.length === 0 ? React.createElement('p', { className: 'bms-modelEmpty' }, text('modelsEmpty')) : null,
                                    React.createElement('div', { className: 'bms-modelList' }, row.models.map((model) => {
                                        const available = model.tiers || [];
                                        const entry = getEffortEntry(provider, model.id);
                                        const whitelist = entry.tiers ?? (available.length > 0 ? available.slice() : []);
                                        const selected = entry.selected && whitelist.includes(entry.selected) ? entry.selected : '';
                                        // 思考强度候选始终列 DSH 权威全量档位（off..max，固定顺序），
                                        // 让用户能勾选 provider 未声明的档位。档位集合由 pi-ai 定义，
                                        // 无 ultra（ultra 是网关对 max 的传输拼写映射，见 reasoningEfforts max: ultra）。
                                        const candidates = ADD_TIER_CANDIDATES;
                                        const draftEntry = modelDraft[provider]?.[model.id];
                                        const nameVal = draftEntry ? draftEntry.name : model.name;
                                        const ctxVal = draftEntry ? draftEntry.context : formatCapacity(model.contextWindow);
                                        const mtVal = draftEntry ? draftEntry.maxTokens : formatCapacity(model.maxTokens);
                                        const setDraftField = (field, value) => {
                                            setModelDraft((prev) => ({
                                                ...prev,
                                                [provider]: {
                                                    ...(prev[provider] || {}),
                                                    [model.id]: {
                                                        id: prev[provider]?.[model.id]?.id ?? model.id,
                                                        name: prev[provider]?.[model.id]?.name ?? model.name,
                                                        context: prev[provider]?.[model.id]?.context ?? formatCapacity(model.contextWindow),
                                                        maxTokens: prev[provider]?.[model.id]?.maxTokens ?? formatCapacity(model.maxTokens),
                                                        input: prev[provider]?.[model.id]?.input ?? (model.input?.includes('image') ? 'multimodal' : 'text'),
                                                        [field]: value,
                                                    },
                                                },
                                            }));
                                        };
                                        const toggleTier = (tier, on) => {
                                            const set = new Set(whitelist);
                                            if (on)
                                                set.add(tier);
                                            else
                                                set.delete(tier);
                                            setEffortTiers(provider, model.id, [...set]);
                                            if (available.length === 0) {
                                                setModelDraft((prev) => ({
                                                    ...prev,
                                                    [provider]: {
                                                        ...(prev[provider] || {}),
                                                        [model.id]: {
                                                            ...prev[provider]?.[model.id] ?? { id: model.id, name: model.name, context: formatCapacity(model.contextWindow), maxTokens: formatCapacity(model.maxTokens) },
                                                            tiers: [...set],
                                                        },
                                                    },
                                                }));
                                            }
                                        };
                                        return React.createElement('div', { key: model.id, className: 'bms-modelEntry' }, [
                                            React.createElement('div', { className: 'bms-modelRow' }, [
                                                // Model ID
                                                React.createElement('label', { className: 'bms-modelField' }, [
                                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, text('modelId')),
                                                    React.createElement('input', {
                                                        className: 'bms-input', disabled: saveBusy || writable === false,
                                                        value: draftEntry?.id ?? model.id, placeholder: model.id,
                                                        onChange: (e) => setDraftField('id', e.target.value),
                                                    }),
                                                ]),
                                                // Display name
                                                React.createElement('label', { className: 'bms-modelField' }, [
                                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, text('modelName')),
                                                    React.createElement('input', {
                                                        className: 'bms-input', disabled: saveBusy || writable === false,
                                                        value: nameVal, placeholder: text('modelNamePlaceholder'),
                                                        onChange: (e) => setDraftField('name', e.target.value),
                                                    }),
                                                ]),
                                                // Remove button
                                                React.createElement('button', {
                                                    type: 'button', className: 'bms-iconButton bms-iconButtonDanger',
                                                    disabled: saveBusy || writable === false,
                                                    title: text('removeModel', '删除模型'),
                                                    onClick: () => removeEditModelRow(provider, model.id),
                                                }, '✕'),
                                            ]),
                                            // 容量 (advanced fields)
                                            React.createElement('div', { className: 'bms-modelAdvanced' }, [
                                                React.createElement('label', { className: 'bms-modelField' }, [
                                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, text('contextWindow')),
                                                    React.createElement('input', {
                                                        className: 'bms-input', disabled: saveBusy || writable === false,
                                                        value: ctxVal, placeholder: text('contextWindowPlaceholder'),
                                                        onChange: (e) => setDraftField('context', e.target.value),
                                                    }),
                                                ]),
                                                React.createElement('label', { className: 'bms-modelField' }, [
                                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, text('maxTokens')),
                                                    React.createElement('input', {
                                                        className: 'bms-input', disabled: saveBusy || writable === false,
                                                        value: mtVal, placeholder: text('maxTokensPlaceholder'),
                                                        onChange: (e) => setDraftField('maxTokens', e.target.value),
                                                    }),
                                                ]),
                                                // 模态选择（大语言/多模态）
                                                React.createElement('label', { className: 'bms-modelField' }, [
                                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, '模态'),
                                                    React.createElement('select', {
                                                        className: 'bms-input bms-selectInput',
                                                        value: draftEntry?.input ?? (model.input?.includes('image') ? 'multimodal' : 'text'),
                                                        disabled: saveBusy || writable === false,
                                                        onChange: (e) => setDraftField('input', e.target.value),
                                                    }, [
                                                        React.createElement('option', { key: 'text', value: 'text' }, '大语言'),
                                                        React.createElement('option', { key: 'multimodal', value: 'multimodal' }, '多模态'),
                                                    ]),
                                                ]),
                                                // 思考档位 (added)
                                                React.createElement('label', { className: 'bms-modelField', style: { gridColumn: '1 / -1' } }, [
                                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, text('applyTier', '应用档位')),
                                                    React.createElement('select', {
                                                        className: 'bms-input bms-selectInput',
                                                        value: selected, disabled: saveBusy || writable === false || whitelist.length === 0,
                                                        onChange: (e) => setEffortSelected(provider, model.id, e.target.value),
                                                    }, [
                                                        // 空值占位（未设置思考档位时显示，用户只能主动选具体档位）
                                                        React.createElement('option', { key: '', value: '', disabled: true }, text('effortUnset', '未设置')),
                                                        ...whitelist.map((tier) => React.createElement('option', { key: tier, value: tier }, tier)),
                                                    ]),
                                                ]),
                                                React.createElement('label', { className: 'bms-modelField', style: { gridColumn: '1 / -1' } }, [
                                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, text('displayTiers', '前端显示档位')),
                                                    React.createElement('div', { className: 'bms-tierBoxes' }, candidates.map((tier) => React.createElement('label', { key: tier, className: 'bms-chip' }, [
                                                        React.createElement('input', {
                                                            type: 'checkbox', className: 'bms-chipInput',
                                                            checked: whitelist.includes(tier),
                                                            disabled: saveBusy || writable === false,
                                                            onChange: (e) => toggleTier(tier, e.target.checked),
                                                        }),
                                                        React.createElement('span', { className: 'bms-chipText' }, tier),
                                                    ]))),
                                                ]),
                                            ]),
                                        ]);
                                    })),
                                    // New model rows from edit form
                                    ...Object.keys(modelDraft[provider] || {}).filter((k) => k.startsWith(NEW_MODEL_PREFIX)).map((key) => {
                                        const nd = modelDraft[provider][key];
                                        return React.createElement('div', { key, className: 'bms-modelEntry' }, [
                                            React.createElement('div', { className: 'bms-modelRow' }, [
                                                React.createElement('label', { className: 'bms-modelField' }, [
                                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, text('modelId')),
                                                    React.createElement('input', {
                                                        className: 'bms-input', disabled: saveBusy || writable === false,
                                                        value: nd.id || '', placeholder: 'gpt-5.6',
                                                        onChange: (e) => updateEditModelRow(provider, key, { id: e.target.value }),
                                                    }),
                                                ]),
                                                React.createElement('label', { className: 'bms-modelField' }, [
                                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, text('modelName')),
                                                    React.createElement('input', {
                                                        className: 'bms-input', disabled: saveBusy || writable === false,
                                                        value: nd.name || '', placeholder: text('modelNamePlaceholder'),
                                                        onChange: (e) => updateEditModelRow(provider, key, { name: e.target.value }),
                                                    }),
                                                ]),
                                                React.createElement('button', {
                                                    type: 'button', className: 'bms-iconButton bms-iconButtonDanger',
                                                    disabled: saveBusy || writable === false,
                                                    title: text('removeModel', '删除模型'),
                                                    onClick: () => removeEditModelRow(provider, key),
                                                }, '✕'),
                                            ]),
                                            React.createElement('div', { className: 'bms-modelAdvanced' }, [
                                                React.createElement('label', { className: 'bms-modelField' }, [
                                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, text('contextWindow')),
                                                    React.createElement('input', {
                                                        className: 'bms-input', disabled: saveBusy || writable === false,
                                                        value: nd.context || '', placeholder: '例如 128K 或 1M',
                                                        onChange: (e) => updateEditModelRow(provider, key, { context: e.target.value }),
                                                    }),
                                                ]),
                                                React.createElement('label', { className: 'bms-modelField' }, [
                                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, text('maxTokens')),
                                                    React.createElement('input', {
                                                        className: 'bms-input', disabled: saveBusy || writable === false,
                                                        value: nd.maxTokens || '', placeholder: '例如 8K 或 64K',
                                                        onChange: (e) => updateEditModelRow(provider, key, { maxTokens: e.target.value }),
                                                    }),
                                                ]),
                                                React.createElement('label', { className: 'bms-modelField', style: { gridColumn: '1 / -1' } }, [
                                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, text('displayTiers', '思考档位')),
                                                    React.createElement('div', { className: 'bms-tierBoxes' }, ADD_TIER_CANDIDATES.map((tier) => React.createElement('label', { key: tier, className: 'bms-chip' }, [
                                                        React.createElement('input', {
                                                            type: 'checkbox', className: 'bms-chipInput',
                                                            checked: (nd.tiers || []).includes(tier),
                                                            disabled: saveBusy || writable === false,
                                                            onChange: () => toggleEditModelTier(provider, key, tier),
                                                        }),
                                                        React.createElement('span', { className: 'bms-chipText' }, tier),
                                                    ]))),
                                                ]),
                                            ]),
                                        ]);
                                    }),
                                    // Add model button
                                    React.createElement('button', {
                                        type: 'button', className: 'bms-addModelButton', key: 'addModel',
                                        disabled: saveBusy || writable === false,
                                        onClick: () => addEditModelRow(provider),
                                    }, '+ ' + text('addModel')),
                                ]),
                                React.createElement('p', { className: 'bms-advancedHint' }, text('advancedHint')),
                            ]),
                        ]),
                    ];
                })(),
                React.createElement('div', { className: 'bms-editorActions', key: 'foot' }, [
                    React.createElement('button', {
                        type: 'button', className: 'bms-secondaryButton',
                        disabled: saveBusy, onClick: () => void requestCloseEditor(provider),
                    }, text('cancel')),
                    React.createElement('button', {
                        type: 'button', className: 'bms-primaryButton',
                        disabled: saveBusy || writable === false,
                        onClick: () => void requestCloseEditor(provider, { saveFirst: true }),
                    }, saveBusy ? text('applying') : text('apply')),
                ]),
            ]) : null,
        ]);
    };
    return React.createElement('div', { className: 'better-model-setting bms-section' }, [
        React.createElement('h2', { className: 'bms-title', key: 'title' }, text('title')),
        React.createElement('p', { className: 'bms-intro', key: 'intro' }, text('intro')),
        !writable ? React.createElement('p', { className: 'bms-notice', key: 'ro' }, text('readOnly')) : null,
        saveStatus ? React.createElement('p', {
            className: saveError ? 'bms-error' : 'bms-savedNotice',
            key: 'status', role: 'status', 'aria-live': 'polite',
        }, saveStatus) : null,
        // 添加官方模型按钮（右上角）
        !officialAdded ? React.createElement('div', { key: 'officialActions', style: { display: 'flex', justifyContent: 'flex-end' } }, [
            React.createElement('button', {
                type: 'button', className: 'bms-primaryButton',
                disabled: writable === false,
                onClick: () => { setShowOfficialForm(true); setOfficialError(''); },
            }, '+ 添加官方模型'),
        ]) : null,
        // 添加官方模型表单
        showOfficialForm && !officialAdded ? React.createElement('div', { className: 'bms-addCard', key: 'officialForm' }, [
            React.createElement('div', { className: 'bms-editorHeader' }, [
                React.createElement('div', { className: 'bms-editorTitle' }, '添加 DeepSeek 官方模型'),
            ]),
            React.createElement('label', { className: 'bms-field' }, [
                React.createElement('span', { className: 'bms-fieldLabel' }, 'API 密钥环境变量名'),
                React.createElement('input', {
                    className: 'bms-input', value: officialEnvName, disabled: officialBusy,
                    placeholder: 'DEEPSEEK_API_KEY',
                    onChange: (e) => setOfficialEnvName(e.target.value),
                }),
            ]),
            React.createElement('label', { className: 'bms-field' }, [
                React.createElement('span', { className: 'bms-fieldLabel' }, 'API 密钥'),
                React.createElement('input', {
                    type: 'password', className: 'bms-input', value: officialApiKey, disabled: officialBusy,
                    placeholder: '输入 API 密钥（如已设置环境变量可留空）',
                    onChange: (e) => setOfficialApiKey(e.target.value),
                }),
            ]),
            officialError ? React.createElement('p', { className: 'bms-error' }, officialError) : null,
            React.createElement('div', { className: 'bms-editorActions' }, [
                React.createElement('button', {
                    type: 'button', className: 'bms-secondaryButton',
                    disabled: officialBusy, onClick: () => setShowOfficialForm(false),
                }, text('cancel')),
                React.createElement('button', {
                    type: 'button', className: 'bms-primaryButton',
                    disabled: officialBusy || writable === false,
                    onClick: () => void submitOfficial(),
                }, officialBusy ? text('creating', '创建中…') : '添加'),
            ]),
        ]) : null,
        // 所有提供方统一平铺列表（内置 DeepSeek 仅在已添加后显示）
        React.createElement('ul', { className: 'bms-rows', key: 'mainRows' }, (officialAdded && officialRow ? [officialRow, ...configRows] : configRows).map((row, idx) => renderProviderRow(row, idx))),
        // 添加提供方 / 自定义提供方卡片
        React.createElement('div', { className: 'bms-addBlock', key: 'addBlock' }, adding
            ? React.createElement('div', { className: 'bms-addCard', key: 'addCard' }, [
                React.createElement('div', { className: 'bms-editorHeader', key: 'eh' }, [
                    React.createElement('div', { className: 'bms-editorTitle' }, text('customAdd')),
                ]),
                React.createElement('label', { key: 'provider', className: 'bms-field' }, [
                    React.createElement('span', { className: 'bms-fieldLabel' }, text('customRoute')),
                    React.createElement('input', {
                        className: 'bms-input', value: draft.provider, disabled: addBusy,
                        placeholder: text('customRouteHint'),
                        onChange: (e) => setDraft({ ...draft, provider: e.target.value }),
                    }),
                ]),
                React.createElement('label', { key: 'displayName', className: 'bms-field' }, [
                    React.createElement('span', { className: 'bms-fieldLabel' }, text('customDisplayName')),
                    React.createElement('input', {
                        className: 'bms-input', value: draft.displayName, disabled: addBusy,
                        placeholder: '例如 HiAPI',
                        onChange: (e) => setDraft({ ...draft, displayName: e.target.value }),
                    }),
                ]),
                React.createElement('label', { key: 'api', className: 'bms-field' }, [
                    React.createElement('span', { className: 'bms-fieldLabel' }, text('customApi')),
                    React.createElement('select', {
                        className: 'bms-input bms-selectInput', value: draft.api, disabled: addBusy,
                        onChange: (e) => setDraft({ ...draft, api: e.target.value }),
                    }, [
                        React.createElement('option', { key: '', value: '' }, text('customApiUnset')),
                        ...PROTOCOL_OPTIONS.map((p) => React.createElement('option', { key: p, value: p }, p)),
                    ]),
                ]),
                React.createElement('label', { key: 'baseURL', className: 'bms-field' }, [
                    React.createElement('span', { className: 'bms-fieldLabel' }, text('baseUrl')),
                    React.createElement('input', {
                        className: 'bms-input', value: draft.baseURL, disabled: addBusy,
                        placeholder: 'https://api.example.com/v1',
                        onChange: (e) => setDraft({ ...draft, baseURL: e.target.value }),
                    }),
                ]),
                React.createElement('label', { key: 'apiKeyEnv', className: 'bms-field' }, [
                    React.createElement('span', { className: 'bms-fieldLabel' }, text('keyInput', 'API Key 环境变量')),
                    React.createElement('input', {
                        className: 'bms-input', value: draft.apiKeyEnv, disabled: addBusy,
                        placeholder: '例如 HIApi_API_KEY',
                        onChange: (e) => setDraft({ ...draft, apiKeyEnv: e.target.value }),
                    }),
                ]),
                addError ? React.createElement('p', { className: 'bms-error', key: 'err' }, addError) : null,
                React.createElement('div', { key: 'models', className: 'bms-modelCatalog' }, [
                    React.createElement('div', { className: 'bms-modelCatalogHeading' }, [
                        React.createElement('div', { className: 'bms-modelCatalogTitle' }, text('models')),
                    ]),
                    draftModels.length === 0 ? React.createElement('p', { className: 'bms-modelEmpty' }, text('addModelHint', '可选：添加模型。')) : null,
                    React.createElement('div', { className: 'bms-modelList' }, draftModels.map((m, index) => {
                        return React.createElement('div', { key: m.uid, className: 'bms-modelEntry' }, [
                            React.createElement('div', { className: 'bms-modelRow' }, [
                                React.createElement('label', { className: 'bms-modelField' }, [
                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, text('modelId')),
                                    React.createElement('input', {
                                        className: 'bms-input', value: m.id, disabled: addBusy,
                                        placeholder: 'gpt-5.6',
                                        onChange: (e) => updateModelRow(index, { id: e.target.value }),
                                    }),
                                ]),
                                React.createElement('label', { className: 'bms-modelField' }, [
                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, text('modelName')),
                                    React.createElement('input', {
                                        className: 'bms-input', value: m.name || '', disabled: addBusy,
                                        placeholder: text('modelNamePlaceholder'),
                                        onChange: (e) => updateModelRow(index, { name: e.target.value }),
                                    }),
                                ]),
                                React.createElement('button', {
                                    type: 'button', className: 'bms-iconButton bms-iconButtonDanger',
                                    disabled: addBusy, title: text('removeModel', '删除模型'),
                                    onClick: () => removeModelRow(index),
                                }, '✕'),
                            ]),
                            React.createElement('div', { className: 'bms-modelAdvanced' }, [
                                React.createElement('label', { className: 'bms-modelField', style: { gridColumn: '1 / -1' } }, [
                                    React.createElement('span', { className: 'bms-modelFieldLabel' }, text('displayTiers', '思考档位（可选）')),
                                    React.createElement('div', { className: 'bms-tierBoxes' }, ADD_TIER_CANDIDATES.map((tier) => React.createElement('label', { key: tier, className: 'bms-chip' }, [
                                        React.createElement('input', {
                                            type: 'checkbox', className: 'bms-chipInput',
                                            checked: m.tiers.includes(tier), disabled: addBusy,
                                            onChange: () => toggleModelTier(index, tier),
                                        }),
                                        React.createElement('span', { className: 'bms-chipText' }, tier),
                                    ]))),
                                ]),
                            ]),
                        ]);
                    })),
                    React.createElement('button', {
                        type: 'button', className: 'bms-addModelButton', disabled: addBusy,
                        onClick: addModelRow,
                    }, '+ ' + text('addModel')),
                ]),
                React.createElement('div', { className: 'bms-editorActions', key: 'foot' }, [
                    React.createElement('button', {
                        type: 'button', className: 'bms-secondaryButton',
                        disabled: addBusy, onClick: closeAdd,
                    }, text('cancel')),
                    React.createElement('button', {
                        type: 'button', className: 'bms-primaryButton',
                        disabled: addBusy || writable === false,
                        onClick: () => void submitAdd(),
                    }, addBusy ? text('creating', '创建中…') : text('create', '创建提供方')),
                ]),
            ])
            : React.createElement('div', { className: 'bms-addActions', key: 'addActions' }, [
                React.createElement('button', {
                    type: 'button', className: 'bms-addButton',
                    disabled: writable === false, onClick: openAdd,
                }, [
                    React.createElement('span', { key: 'plus', className: 'bms-plus' }, '+'),
                    text('customAdd', '添加自定义提供方'),
                ]),
            ])),
        // 删除确认弹窗
        deleteTarget ? React.createElement('div', { className: 'bms-overlay', key: 'overlay', onClick: () => !deleting && setDeleteTarget(null), onKeyDown: (e) => { if (e.key === 'Escape' && !deleting)
                setDeleteTarget(null); } }, [
            React.createElement('div', { className: 'bms-dialog', key: 'dialog', onClick: (e) => e.stopPropagation() }, [
                React.createElement('h3', { className: 'bms-dialogTitle' }, text('deleteTitle').replace('{provider}', rows.find((r) => r.provider === deleteTarget)?.displayName || deleteTarget)),
                React.createElement('p', { className: 'bms-dialogDesc' }, text('deleteDescription')),
                deleteFailure ? React.createElement('p', { className: 'bms-error' }, deleteFailure) : null,
                React.createElement('div', { className: 'bms-dialogActions' }, [
                    React.createElement('button', {
                        type: 'button', className: 'bms-secondaryButton',
                        disabled: deleting, onClick: () => setDeleteTarget(null),
                    }, text('cancel')),
                    React.createElement('button', {
                        type: 'button', className: 'bms-dangerButton bms-dangerConfirm',
                        disabled: deleting, onClick: confirmDelete,
                    }, deleting ? text('deleting', '正在删除…') : text('deleteConfirm', '删除').replace('{provider}', '')),
                ]),
            ]),
        ]) : null,
        // 未保存修改确认弹窗
        pendingCloseProvider ? React.createElement('div', { className: 'bms-overlay', key: 'unsavedOverlay', onClick: () => setPendingCloseProvider(null), onKeyDown: (e) => { if (e.key === 'Escape')
                setPendingCloseProvider(null); } }, [
            React.createElement('div', { className: 'bms-dialog', key: 'dialog', onClick: (e) => e.stopPropagation() }, [
                React.createElement('h3', { className: 'bms-dialogTitle' }, '未保存的修改'),
                React.createElement('p', { className: 'bms-dialogDesc' }, '模型设置已修改，是否保存后再关闭？'),
                React.createElement('div', { className: 'bms-dialogActions' }, [
                    React.createElement('button', {
                        type: 'button', className: 'bms-secondaryButton',
                        onClick: () => void requestCloseEditor(pendingCloseProvider, { discard: true }),
                    }, '不保存'),
                    React.createElement('button', {
                        type: 'button', className: 'bms-primaryButton',
                        onClick: () => void requestCloseEditor(pendingCloseProvider, { saveFirst: true }),
                    }, '保存'),
                    React.createElement('button', {
                        type: 'button', className: 'bms-secondaryButton',
                        onClick: () => setPendingCloseProvider(null),
                    }, '取消'),
                ]),
            ]),
        ]) : null,
    ]);
}
// ---------------------------------------------------------------------------
// Slot registration
// ---------------------------------------------------------------------------
export function apply(ctx) {
    ctx.effect(() => {
        ensureStyles();
        const bootstrapped = getStatus().then((status) => { syncFilterState(status); }).catch(() => { });
        const disposers = [];
        const filterDirectoryResponse = (response) => {
            const targets = [];
            if (response && typeof response === 'object') {
                if (response.result && typeof response.result === 'object')
                    targets.push(response.result);
                if (response.ok !== undefined || response.value !== undefined)
                    targets.push(response);
            }
            for (const r of targets) {
                if (r && r.ok && r.value && typeof r.value === 'object') {
                    if (Array.isArray(r.value.groups))
                        r.value.groups = applyOrder(r.value.groups.filter((g) => !(g && isHiddenId(g.id))), filterState.order);
                    if (Array.isArray(r.value.failures))
                        r.value.failures = r.value.failures.filter((f) => !(f && isHiddenId(f.id)));
                }
            }
        };
        const filterProvidersResponse = (response) => {
            const targets = [];
            if (response && typeof response === 'object') {
                if (response.result && typeof response.result === 'object')
                    targets.push(response.result);
                if (response.ok !== undefined || response.value !== undefined)
                    targets.push(response);
            }
            for (const r of targets) {
                if (r && r.ok && r.value && Array.isArray(r.value.providers))
                    r.value.providers = r.value.providers.filter((p) => !(p && isHiddenId(p.provider)));
            }
        };
        const wrapModels = (face, key, filter) => {
            if (!face || typeof face !== 'object')
                return;
            const orig = face[key];
            if (typeof orig !== 'function' || orig.__bmsWrapped)
                return;
            const wrapped = (request, ...rest) => {
                const result = orig.call(face, request, ...rest);
                return Promise.resolve(result).then(async (response) => {
                    await bootstrapped;
                    filter(response);
                    return response;
                });
            };
            wrapped.__bmsWrapped = true;
            face[key] = wrapped;
            disposers.push(() => { if (face[key] === wrapped)
                face[key] = orig; });
        };
        // 包装 selectModel：切模型时若未显式指定思考档位，自动注入插件为该模型配置的 selected 档位
        const wrapSelectModel = (face) => {
            if (!face || typeof face !== 'object')
                return;
            const orig = face.selectModel;
            if (typeof orig !== 'function' || orig.__bmsSelectWrapped)
                return;
            const wrapped = async (request, ...rest) => {
                const eff = request && typeof request === 'object'
                    ? filterState.efforts[request.provider]?.[request.model]
                    : undefined;
                if (typeof eff === 'string' && eff.length > 0 && request && request.reasoningEffort === undefined) {
                    return orig.call(face, { ...request, reasoningEffort: eff }, ...rest);
                }
                return orig.call(face, request, ...rest);
            };
            wrapped.__bmsSelectWrapped = true;
            face.selectModel = wrapped;
            disposers.push(() => { if (face.selectModel === wrapped)
                face.selectModel = orig; });
        };
        const getConnection = () => {
            try {
                if (typeof ctx.get === 'function') {
                    const conn = ctx.get('connection');
                    if (conn && typeof conn === 'object')
                        return conn;
                }
            }
            catch { }
            return ctx.connection;
        };
        const wrapFaces = () => {
            const conn = getConnection();
            const api = conn && typeof conn === 'object' ? conn.api : undefined;
            if (!api || typeof api !== 'object')
                return;
            if (api.llm && typeof api.llm === 'object') {
                wrapModels(api.llm, 'models', filterDirectoryResponse);
                wrapModels(api.llm, 'providers', filterProvidersResponse);
            }
            wrapModels(api.sessions, 'models', filterDirectoryResponse);
            wrapModels(api.session, 'models', filterDirectoryResponse);
            // 切模型时自动注入插件配置的思考档位
            wrapSelectModel(api.sessions);
            wrapSelectModel(api.session);
        };
        wrapFaces();
        if (typeof ctx.on === 'function')
            ctx.on('connection/reset', wrapFaces);
        const disposeSlots = ctx.slots.inject('settings.section', () => ctx.slots.register({
            name: 'settings.section',
            // 替代官方 ui-settings-models：同 id/order/label，深链接无缝接管
            id: 'models',
            order: 10,
            label: () => '模型',
            inject: () => ({
                t: ctx.locale?.bind?.('better-model-setting') ?? ((s) => s),
            }),
        }, (props) => {
            return React.createElement(BetterModelSettingPanel, { t: props.t });
        }));
        return () => {
            disposeSlots();
            for (const dispose of disposers)
                dispose();
        };
    }, 'better-model-setting: register settings.section');
}
//# sourceMappingURL=index.js.map