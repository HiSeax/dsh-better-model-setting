# dsh-better-model-setting

A DSH (DeepSeek Harness) hybrid plugin that **replaces the official "Models" settings page** with enhanced provider management, per-model reasoning effort control, retry overrides, and more.

## Features

- **Provider CRUD**: add custom providers (with protocol/Base URL/model list), delete (permanent), edit (model ID/name/context/tokens/reasoning efforts)
- **Enable/Disable**: disable = snapshot + remove from `llm-pi-ai.providers` (reversible); enable = restore from snapshot
- **Official DeepSeek**: hidden by default; "+ 添加官方模型" button to add it (with API key persistence to credentials vault)
- **Per-model reasoning effort**: whitelist `tiers` + `selected` tier, injected at `agent/request` time
- **Per-provider retry overrides**: override retry policy at `agent/request-error` time
- **Drag reorder**: `providerOrder` persisted, live auto-squeeze animation
- **Credential status**: green/red dots via `ctx.credentials.resolve()`
- **Edit draft**: changes saved only on explicit "保存" button; closing with unsaved changes shows confirm dialog
- **Disabled sorting**: disabled providers auto-sorted to bottom (earliest disabled = last)
- **Unified three-button rows**: enable/disable + edit + delete (red, confirm dialog)
- **Loopback route security**: shared token authentication for POST write operations

## Architecture

- **Host** (`src/index.ts`): HTTP route (`/api/plugins/better-model-setting`), settings namespace, `agent/request` + `agent/request-error` interceptors, JSON DB snapshots, settings.yaml backup (5 copies, 3s throttle)
- **Client** (`src/client/index.ts`): React panel via `settings.section` slot (id=`models`, order=10, label="模型"), API wrapper for provider filtering/reorder

## Build

```bash
# Host: tsc (requires DSH checkout junctions)
DSH_CHECKOUT=<checkout> bash scripts/build.sh

# Client: tsdown bundle
npm run build:client
```

## Install (via dsh-super-injector)

```bash
# In DSH with super-injector loaded:
dev_inject_plugin <this-directory>
```

## Replace official Models page

Add to `profiles/web/cordis.patch.yml`:
```yaml
- id: ui-settings-models
  disabled: true
```

The plugin registers `settings.section` with `id: "models"`, `order: 10`, `label: "模型"` — seamlessly replacing the official page.

## License

BSD-3-Clause
