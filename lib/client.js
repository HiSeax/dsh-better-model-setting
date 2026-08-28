((factory) => {
	["dsh-better-model-setting", "@dsh-external/dsh-better-model-setting"].forEach((id) => window.__ModuleLoader__.load({
		id,
		factory
	}));
})((require) => {
	var module = { exports: {} };
	var exports = module.exports;
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
	//#region \0rolldown/runtime.js
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	//#endregion
	let react = require("react");
	react = __toESM(react, 1);
	//#region src/client/index.ts
	/**
	* dsh-better-model-setting — client 设置面板。
	* 替代官方 dsh-client-ui-settings-models 的模型设置页。
	* 视觉/结构/文案对齐官方，保留新增功能：
	* 启用/禁用、思考档位、重试覆盖、拖动排序。
	*/
	const inject = [
		"connection",
		"slots",
		"locale"
	];
	const ZH = {
		nav: "模型",
		title: "模型",
		intro: "填入各提供方的 API 密钥即可使用其模型。",
		edit: "编辑",
		editProvider: "编辑 {provider}",
		remove: "删除",
		removeProvider: "删除 {provider}",
		deleteTitle: "删除 {provider}？",
		deleteDescription: "删除 {provider} 会永久移除其配置，无法撤销。",
		savedProvider: "已保存 {provider}。",
		readOnly: "当前部署的设置文档为只读。",
		loadFailed: "加载提供方目录失败",
		retry: "重试",
		close: "关闭",
		cancel: "取消",
		apply: "保存",
		applying: "保存中…",
		add: "添加提供方",
		customAdd: "添加自定义提供方",
		provider: "提供方",
		credentialConfigured: "API 密钥已配置",
		credentialMissing: "API 密钥缺失",
		keyInput: "API 密钥",
		keyEnvLocked: "由启动环境提供（只读）",
		keyPlaceholder: "输入 API 密钥",
		baseUrl: "API 地址",
		baseUrlDefault: "提供方默认",
		modelSettings: "模型设置",
		modelSettingsPills: "模型设置",
		models: "模型目录",
		modelsInherited: "正在使用适配器默认模型",
		modelsCustomized: "已自定义模型目录",
		modelId: "模型 ID",
		modelName: "显示名称",
		modelNamePlaceholder: "留空时使用模型 ID",
		contextWindow: "上下文窗口",
		contextWindowPlaceholder: "使用提供方默认值",
		maxTokens: "最大输出 token 数",
		maxTokensPlaceholder: "使用提供方默认值",
		modelAdvanced: "容量",
		addModel: "添加模型",
		modelsEmpty: "模型选择器中将不显示任何模型；目录外 ID 仍可直接发送。",
		advancedHint: "其余字段在 settings.yaml 中，请直接编辑对应段。",
		modelIdRequired: "模型 ID 不能为空。",
		modelIdDuplicate: "模型 ID 不能重复。",
		modelNameInvalid: "显示名称不能为空。",
		modelContextInvalid: "上下文窗口必须是正数，例如 131072、256K 或 1M。",
		modelMaxTokensInvalid: "最大输出 token 数必须是正数，例如 8192、64K 或 1M。",
		customTag: "自定义",
		customRoute: "Provider ID",
		customRouteHint: "以小写字母开头的标识，在请求中唯一标识该提供方。",
		customRouteInvalid: "需以小写字母开头，之后可用小写字母、数字和短横线。",
		customRouteTaken: "已有提供方使用了这个 ID。",
		customDisplayName: "显示名称",
		customApi: "API 协议",
		customApiUnset: "未选择",
		customNeedsBaseUrl: "自定义提供方需要填写 API 地址。",
		customNeedsModels: "自定义提供方至少需要一个模型。",
		create: "创建提供方",
		creating: "创建中…",
		enabled: "已启用",
		disabled: "已禁用",
		enable: "启用",
		disable: "禁用",
		disabledProviders: "已禁用的提供方",
		retryCount: "重试次数",
		effortTitle: "每模型思考强度档位",
		applyTier: "应用档位",
		defaultTier: "默认",
		effortUnset: "未设置",
		displayTiers: "前端显示档位",
		editProviderSettings: "编辑 {provider}",
		providerId: "提供方 ID",
		displayName: "显示名称",
		protocol: "API 协议",
		protocolDefault: "不指定（按提供方默认）",
		baseURL: "API 地址",
		apiKeyEnv: "API Key 环境变量",
		modelIdRequiredErr: "模型 ID 不能为空。",
		modelIdPlaceholder: "例如 gpt-5.6",
		noModels: "尚未添加模型。",
		addProvider: "添加提供方",
		addModelHint: "可选：添加提供方下的模型。",
		hide: "收起",
		show: "展开",
		fetching: "正在拉取…",
		fetchEmpty: "上游未公布任何模型",
		fetchSelectAll: "全部选择",
		fetchDeselectAll: "全部取消",
		fetchAdopt: "采用所选",
		syncUpstream: "同步上游",
		syncUpstreamAll: "一键同步所有上游",
		syncUpstreamAllTitle: "同步所有上游模型",
		syncUpstreamOneTitle: "同步 {provider} 的上游模型",
		syncUpstreamHint: "勾选要添加的模型（默认全部未选）；已存在于本提供方下的会跳过。",
		loading: "加载中…"
	};
	const STYLE_ID = "better-model-setting-styles-v3";
	function ensureStyles() {
		if (typeof document === "undefined") return;
		if (document.getElementById(STYLE_ID)) return;
		const s = document.createElement("style");
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
	const ROUTE_PATH = "/api/plugins/better-model-setting";
	const MAX_BODY_BYTES = 262144;
	let authToken;
	async function getStatus() {
		const res = await fetch(ROUTE_PATH, {
			method: "GET",
			cache: "no-store"
		});
		const data = await res.json().catch(() => null);
		if (res.ok && data?.ok === true && data.value && typeof data.value === "object") {
			if (typeof data.value.authToken === "string" && data.value.authToken.length > 0) authToken = data.value.authToken;
			return data.value;
		}
		throw new Error(data?.error?.message || `GET ${ROUTE_PATH} failed (${res.status})`);
	}
	async function postCommand(body) {
		const payload = JSON.stringify(body);
		if (payload.length > MAX_BODY_BYTES) throw new Error("payload too large");
		const headers = { "Content-Type": "application/json" };
		if (authToken) headers["X-BMS-Token"] = authToken;
		const res = await fetch(ROUTE_PATH, {
			method: "POST",
			headers,
			body: payload
		});
		const data = await res.json().catch(() => null);
		if (res.ok && data?.ok === true && data.value) return data.value;
		throw new Error(data?.error?.message || `POST ${ROUTE_PATH} failed (${res.status})`);
	}
	async function postRaw(body) {
		const payload = JSON.stringify(body);
		if (payload.length > MAX_BODY_BYTES) throw new Error("payload too large");
		const headers = { "Content-Type": "application/json" };
		if (authToken) headers["X-BMS-Token"] = authToken;
		const res = await fetch(ROUTE_PATH, {
			method: "POST",
			headers,
			body: payload
		});
		const data = await res.json().catch(() => null);
		if (res.ok && data?.ok === true && data.value) return data.value;
		throw new Error(data?.error?.message || `POST ${ROUTE_PATH} failed (${res.status})`);
	}
	function normalizeEffortEntry(value) {
		if (typeof value === "string") return value.length > 0 ? { selected: value } : {};
		if (value && typeof value === "object") return {
			selected: typeof value.selected === "string" ? value.selected : void 0,
			tiers: Array.isArray(value.tiers) ? value.tiers.filter((t) => typeof t === "string") : void 0
		};
		return {};
	}
	function normalizeSetting(raw) {
		if (!raw || typeof raw !== "object") return {
			builtinDisabled: [],
			providerOrder: [],
			modelEfforts: {},
			providerRetryOverrides: {}
		};
		const modelEfforts = {};
		for (const provider of Object.keys(raw.modelEfforts || {})) for (const model of Object.keys(raw.modelEfforts[provider] || {})) (modelEfforts[provider] = modelEfforts[provider] || {})[model] = normalizeEffortEntry(raw.modelEfforts[provider][model]);
		const strings = (v) => Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
		return {
			builtinDisabled: strings(raw.builtinDisabled),
			providerOrder: strings(raw.providerOrder),
			modelEfforts,
			providerRetryOverrides: raw.providerRetryOverrides && typeof raw.providerRetryOverrides === "object" ? raw.providerRetryOverrides : {},
			officialAdded: raw.officialAdded === true
		};
	}
	function toModelRow(model) {
		if (!model || typeof model.id !== "string" || !model.id) return null;
		const efforts = model.reasoningEfforts && typeof model.reasoningEfforts === "object" ? model.reasoningEfforts : {};
		return {
			id: model.id,
			name: model.name || model.id,
			tiers: Object.keys(efforts).filter((t) => typeof t === "string" && t.length > 0),
			contextWindow: typeof model.contextWindow === "number" ? model.contextWindow : void 0,
			maxTokens: typeof model.maxTokens === "number" ? model.maxTokens : void 0,
			input: Array.isArray(model.input) ? model.input.filter((m) => typeof m === "string") : void 0
		};
	}
	function parseCapacity(text) {
		if (typeof text !== "string") return void 0;
		const t = text.trim().replace(/,/g, "");
		if (!t) return void 0;
		const m = /^([0-9]+(?:\.[0-9]+)?)\s*([km])?$/i.exec(t);
		if (!m) return NaN;
		const n = Number(m[1]);
		if (!Number.isFinite(n)) return NaN;
		const suf = (m[2] || "").toLowerCase();
		return Math.round(suf === "k" ? n * 1e3 : suf === "m" ? n * 1e6 : n);
	}
	function formatCapacity(value) {
		if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return "";
		if (value % 1e6 === 0) return `${value / 1e6}M`;
		if (value % 1e3 === 0) return `${value / 1e3}K`;
		return String(value);
	}
	function toRow(id, profile, active, kind = "config", cred) {
		return {
			provider: id,
			displayName: profile.displayName || id,
			active,
			kind,
			apiKeyEnv: typeof profile.apiKeyEnv === "string" && profile.apiKeyEnv.length > 0 ? profile.apiKeyEnv : void 0,
			baseURL: typeof profile.baseURL === "string" && profile.baseURL.length > 0 ? profile.baseURL : void 0,
			credential: cred ?? (profile.apiKeyEnv ? "missing" : "none"),
			models: Array.isArray(profile.models) ? profile.models.map(toModelRow).filter((m) => m !== null) : []
		};
	}
	function mergeRows(status) {
		const rows = [];
		const seen = /* @__PURE__ */ new Set();
		const creds = status.credentials || {};
		for (const id of Object.keys(status.enabledProviders || {})) {
			const p = status.enabledProviders[id];
			if (p && typeof p === "object") {
				rows.push(toRow(id, p, true, "config", creds[id]));
				seen.add(id);
			}
		}
		for (const id of Object.keys(status.disabledProviders || {})) {
			const p = status.disabledProviders[id];
			if (p && typeof p === "object") {
				rows.push(toRow(id, p, false, "config", creds[id]));
				seen.add(id);
			}
		}
		const builtinDisabled = new Set(status.builtinDisabled || []);
		for (const id of Object.keys(status.builtinProviders || {})) if (!seen.has(id)) rows.push(toRow(id, { displayName: status.builtinProviders[id] }, !builtinDisabled.has(id), "builtin", creds[id]));
		return rows;
	}
	function sortRows(rows, order) {
		if (!Array.isArray(order) || order.length === 0) return rows;
		const rank = /* @__PURE__ */ new Map();
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
		const rankD = /* @__PURE__ */ new Map();
		(disabledOrder || disabled.map((r) => r.provider)).forEach((id, i) => rankD.set(id, i));
		const sortedDisabled = [...disabled].sort((a, b) => (rankD.get(b.provider) ?? Number.MAX_SAFE_INTEGER) - (rankD.get(a.provider) ?? Number.MAX_SAFE_INTEGER));
		return [...sortedEnabled, ...sortedDisabled];
	}
	const filterState = {
		hidden: /* @__PURE__ */ new Set(),
		order: [],
		efforts: {}
	};
	function syncFilterState(status) {
		filterState.hidden = new Set(status?.builtinDisabled || []);
		filterState.order = status?.providerOrder || [];
		const efforts = {};
		const me = status?.setting?.modelEfforts;
		if (me && typeof me === "object") for (const provider of Object.keys(me)) {
			const models = me[provider];
			if (!models || typeof models !== "object") continue;
			for (const model of Object.keys(models)) {
				const entry = models[model];
				const selected = typeof entry === "string" ? entry : entry?.selected;
				if (typeof selected === "string" && selected.length > 0) {
					efforts[provider] = efforts[provider] || {};
					efforts[provider][model] = selected;
				}
			}
		}
		filterState.efforts = efforts;
	}
	function applyOrder(items, order) {
		if (!Array.isArray(order) || order.length === 0) return items;
		const rank = /* @__PURE__ */ new Map();
		order.forEach((id, i) => rank.set(id, i));
		const ranked = [];
		const rest = [];
		for (const item of items) if ((item && typeof item.id === "string" ? rank.get(item.id) : void 0) !== void 0) ranked.push(item);
		else rest.push(item);
		ranked.sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0));
		return [...ranked, ...rest];
	}
	function isHiddenId(id) {
		return typeof id === "string" && filterState.hidden.has(id);
	}
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
		for (const p of baseOrder) offsets[p] = (topLive[p] ?? 0) - (topBase[p] ?? 0);
		return offsets;
	}
	const PROTOCOL_OPTIONS = [
		"openai-completions",
		"openai-responses",
		"anthropic-messages"
	];
	const ADD_TIER_CANDIDATES = [
		"off",
		"minimal",
		"low",
		"medium",
		"high",
		"xhigh",
		"max"
	];
	let addModelUid = 0;
	const NEW_MODEL_PREFIX = "__new__";
	const DEFAULT_DRAFT = {
		provider: "",
		displayName: "",
		api: "",
		baseURL: "",
		apiKeyEnv: ""
	};
	function BetterModelSettingPanel(props) {
		const { t: userT } = props;
		ensureStyles();
		const text = (key, fallback) => {
			const v = typeof userT === "function" ? userT(key) : void 0;
			return typeof v === "string" && v !== key ? v : ZH[key] ?? fallback ?? key;
		};
		const [rows, setRows] = react.default.useState([]);
		const [setting, setSetting] = react.default.useState({
			builtinDisabled: [],
			providerOrder: [],
			modelEfforts: {},
			providerRetryOverrides: {},
			officialAdded: false
		});
		const [writable, setWritable] = react.default.useState(true);
		const [documentPath, setDocumentPath] = react.default.useState(void 0);
		const [loading, setLoading] = react.default.useState(true);
		const [loadError, setLoadError] = react.default.useState(void 0);
		const [saveStatus, setSaveStatus] = react.default.useState("");
		const [saveError, setSaveError] = react.default.useState(false);
		const [saveBusy, setSaveBusy] = react.default.useState(false);
		const setSaveMsg = (msg, isError = false) => {
			setSaveStatus(msg);
			setSaveError(isError);
		};
		const [editingProvider, setEditingProvider] = react.default.useState(null);
		const [modelDraft, setModelDraft] = react.default.useState({});
		const [deletedModelIds, setDeletedModelIds] = react.default.useState({});
		const [providerDraft, setProviderDraft] = react.default.useState(null);
		const [adding, setAdding] = react.default.useState(false);
		const [draft, setDraft] = react.default.useState({ ...DEFAULT_DRAFT });
		const [draftModels, setDraftModels] = react.default.useState([]);
		const [addError, setAddError] = react.default.useState("");
		const [addBusy, setAddBusy] = react.default.useState(false);
		const [showOfficialForm, setShowOfficialForm] = react.default.useState(false);
		const [officialApiKey, setOfficialApiKey] = react.default.useState("");
		const [officialEnvName, setOfficialEnvName] = react.default.useState("DEEPSEEK_API_KEY");
		const [officialBusy, setOfficialBusy] = react.default.useState(false);
		const [officialError, setOfficialError] = react.default.useState("");
		const [deleteTarget, setDeleteTarget] = react.default.useState(null);
		const [deleting, setDeleting] = react.default.useState(false);
		const [deleteFailure, setDeleteFailure] = react.default.useState("");
		const [providerSyncTarget, setProviderSyncTarget] = react.default.useState(null);
		const [providerSyncGroups, setProviderSyncGroups] = react.default.useState([]);
		const [providerSyncPicked, setProviderSyncPicked] = react.default.useState({});
		const [providerSyncBusy, setProviderSyncBusy] = react.default.useState(false);
		const [providerSyncError, setProviderSyncError] = react.default.useState("");
		const [discoverBusy, setDiscoverBusy] = react.default.useState("");
		const applyStatus = (status, opts) => {
			setRows(sortRowsWithDisabled(mergeRows(status), status.providerOrder, status.disabledOrder));
			syncFilterState(status);
			setWritable(status.writable !== false);
			setDocumentPath(status.documentPath);
			if (!opts?.keepSetting && status.setting) setSetting(normalizeSetting(status.setting));
		};
		const load = async () => {
			setLoading(true);
			setLoadError(void 0);
			try {
				applyStatus(await getStatus());
			} catch (error) {
				setLoadError(error?.message || String(error));
			} finally {
				setLoading(false);
			}
		};
		react.default.useEffect(() => {
			load();
		}, []);
		const saveTimer = react.default.useRef(null);
		const saveGeneration = react.default.useRef(0);
		const flushApply = (next) => {
			const gen = ++saveGeneration.current;
			setSaveBusy(true);
			setSaveMsg(text("applying", "保存中…"));
			postCommand({
				op: "apply",
				setting: next
			}).then((status) => {
				if (gen !== saveGeneration.current) return;
				applyStatus(status);
				setSaveMsg(text("savedProvider", "已保存。"));
				setTimeout(() => setSaveMsg(""), 1500);
			}).catch((error) => {
				if (gen === saveGeneration.current) setSaveMsg("保存失败: " + (error?.message || String(error)), true);
			}).finally(() => {
				if (gen === saveGeneration.current) setSaveBusy(false);
			});
		};
		const queueApply = (next) => {
			if (saveTimer.current) clearTimeout(saveTimer.current);
			saveTimer.current = setTimeout(() => flushApply(next), 250);
		};
		const updateSetting = (updater) => {
			setSetting((prev) => {
				const next = updater(prev);
				queueApply(next);
				return next;
			});
		};
		const updateSettingDraft = (updater) => {
			setSetting((prev) => {
				return updater(prev);
			});
			setDirty(true);
		};
		const [dirty, setDirty] = react.default.useState(false);
		const [pendingCloseProvider, setPendingCloseProvider] = react.default.useState(null);
		const closeEditorState = (provider) => {
			setEditingProvider(null);
			setDirty(false);
			setModelDraft((p) => {
				const n = { ...p };
				delete n[provider];
				return n;
			});
			setProviderDraft(null);
			setPendingCloseProvider(null);
			setDeletedModelIds((p) => {
				const n = { ...p };
				delete n[provider];
				return n;
			});
		};
		const requestCloseEditor = async (provider, opts) => {
			if (opts?.discard) {
				closeEditorState(provider);
				return;
			}
			if (opts?.saveFirst) {
				if (await saveSettings(provider)) closeEditorState(provider);
				return;
			}
			if (dirty) setPendingCloseProvider(provider);
			else closeEditorState(provider);
		};
		react.default.useEffect(() => () => {
			if (saveTimer.current) clearTimeout(saveTimer.current);
		}, []);
		const confirmDelete = async () => {
			if (!deleteTarget) return;
			setDeleting(true);
			setDeleteFailure("");
			try {
				const status = await postCommand({
					op: "delete",
					provider: deleteTarget
				});
				applyStatus(status, { keepSetting: true });
				setDeleteTarget(null);
				setSaveMsg(text("savedProvider", "已保存。"));
				setTimeout(() => setSaveMsg(""), 1500);
			} catch (error) {
				setDeleteFailure(error?.message || String(error));
			} finally {
				setDeleting(false);
			}
		};
		const enableProvider = async (provider) => {
			setSaveBusy(true);
			setSaveMsg(text("applying", "保存中…"));
			try {
				const status = await postCommand({
					op: "enable",
					provider
				});
				applyStatus(status, { keepSetting: true });
				setSaveMsg(text("savedProvider", "已保存。"));
				setTimeout(() => setSaveMsg(""), 1500);
			} catch (error) {
				setSaveMsg("操作失败: " + (error?.message || String(error)), true);
			} finally {
				setSaveBusy(false);
			}
		};
		const submitOfficial = async () => {
			setOfficialBusy(true);
			setOfficialError("");
			try {
				const status = await postCommand({
					op: "addOfficial",
					apiKey: officialApiKey || void 0,
					envName: officialEnvName || "DEEPSEEK_API_KEY"
				});
				applyStatus(status);
				setShowOfficialForm(false);
				setSaveMsg(text("savedProvider", "已保存。"));
				setTimeout(() => setSaveMsg(""), 1500);
			} catch (error) {
				setOfficialError(error?.message || String(error));
			} finally {
				setOfficialBusy(false);
			}
		};
		const toggleProvider = (provider, kind, active) => {
			if (kind === "builtin") toggleBuiltinEnabled(provider, active);
			else if (active) {
				setSaveBusy(true);
				setSaveMsg(text("applying", "保存中…"));
				postCommand({
					op: "disable",
					provider
				}).then((status) => {
					applyStatus(status, { keepSetting: true });
					setSaveMsg(text("savedProvider", "已保存。"));
					setTimeout(() => setSaveMsg(""), 1500);
				}).catch((error) => {
					setSaveMsg("操作失败: " + (error?.message || String(error)), true);
				}).finally(() => setSaveBusy(false));
			} else enableProvider(provider);
		};
		const toggleBuiltinEnabled = (provider, enabled) => {
			updateSetting((prev) => {
				const builtinDisabled = new Set(prev.builtinDisabled || []);
				if (enabled) builtinDisabled.delete(provider);
				else builtinDisabled.add(provider);
				return {
					...prev,
					builtinDisabled: [...builtinDisabled]
				};
			});
		};
		const openAdd = () => {
			setDraft({ ...DEFAULT_DRAFT });
			setDraftModels([]);
			setAddError("");
			setAdding(true);
		};
		const closeAdd = () => {
			setAdding(false);
			setAddError("");
		};
		const submitAdd = async () => {
			const provider = draft.provider.trim();
			if (!provider) {
				setAddError(text("modelIdRequired", "Provider ID 不能为空。"));
				return;
			}
			if (!/^[a-z][a-z0-9-]*$/.test(provider)) {
				setAddError(text("customRouteInvalid", "需以小写字母开头，之后可用小写字母、数字和短横线。"));
				return;
			}
			if (rows.some((r) => r.provider === provider)) {
				setAddError(text("customRouteTaken", "已有提供方使用了这个 ID。"));
				return;
			}
			if (!draft.baseURL.trim()) {
				setAddError(text("customNeedsBaseUrl", "自定义提供方需要填写 API 地址。"));
				return;
			}
			const validModels = draftModels.filter((m) => m.id.trim().length > 0);
			if (validModels.length === 0) {
				setAddError(text("customNeedsModels", "自定义提供方至少需要一个模型。"));
				return;
			}
			setAddBusy(true);
			setAddError("");
			try {
				const profile = {};
				if (draft.displayName.trim()) profile.displayName = draft.displayName.trim();
				if (draft.api.trim()) profile.api = draft.api.trim();
				if (draft.baseURL.trim()) profile.baseURL = draft.baseURL.trim();
				if (draft.apiKeyEnv.trim()) profile.apiKeyEnv = draft.apiKeyEnv.trim();
				profile.models = validModels.map((m) => {
					const entry = { id: m.id.trim() };
					if (m.name?.trim()) entry.name = m.name.trim();
					if (m.tiers.length > 0) {
						entry.reasoningEfforts = {};
						for (const t of m.tiers) entry.reasoningEfforts[t] = t === "off" ? null : t;
					}
					return entry;
				});
				const status = await postCommand({
					op: "add",
					provider,
					profile
				});
				applyStatus(status, { keepSetting: true });
				setAdding(false);
				setSaveMsg(text("savedProvider", "已保存。"));
				setTimeout(() => setSaveMsg(""), 1500);
			} catch (error) {
				setAddError(error?.message || String(error));
			} finally {
				setAddBusy(false);
			}
		};
		const addModelRow = () => setDraftModels((prev) => [{
			uid: ++addModelUid,
			id: "",
			name: "",
			tiers: []
		}, ...prev]);
		const removeModelRow = (index) => setDraftModels((prev) => prev.filter((_, i) => i !== index));
		const updateModelRow = (index, patch) => setDraftModels((prev) => prev.map((m, i) => i === index ? {
			...m,
			...patch
		} : m));
		const toggleModelTier = (index, tier) => setDraftModels((prev) => prev.map((m, i) => {
			if (i !== index) return m;
			const tiers = new Set(m.tiers);
			if (tiers.has(tier)) tiers.delete(tier);
			else tiers.add(tier);
			return {
				...m,
				tiers: [...tiers]
			};
		}));
		const addEditModelRow = (provider) => setModelDraft((prev) => ({
			...prev,
			[provider]: {
				...prev[provider] || {},
				[`${NEW_MODEL_PREFIX}${++addModelUid}`]: {
					id: "",
					name: "",
					context: "",
					maxTokens: "",
					tiers: []
				}
			}
		}));
		const removeEditModelRow = (provider, key) => {
			setModelDraft((prev) => {
				const next = { ...prev[provider] || {} };
				delete next[key];
				return {
					...prev,
					[provider]: next
				};
			});
			if (!key.startsWith(NEW_MODEL_PREFIX)) setDeletedModelIds((prev) => {
				const cur = prev[provider] || [];
				if (cur.includes(key)) return prev;
				return {
					...prev,
					[provider]: [...cur, key]
				};
			});
			setDirty(true);
		};
		const openProviderSync = async (provider) => {
			setDiscoverBusy(provider);
			setProviderSyncError("");
			try {
				const result = await postRaw({
					op: "discover",
					provider,
					request: {}
				});
				const models = Array.isArray(result?.models) ? result.models : [];
				setProviderSyncGroups([{
					provider,
					displayName: provider,
					ok: true,
					models
				}]);
				setProviderSyncPicked({ [provider]: /* @__PURE__ */ new Set() });
				setProviderSyncTarget({
					mode: "single",
					provider
				});
			} catch (error) {
				setSaveMsg("同步失败: " + (error?.message || String(error)), true);
			} finally {
				setDiscoverBusy("");
			}
		};
		const openGlobalSync = async () => {
			let providers = [];
			try {
				const st = await getStatus();
				providers = Array.isArray(st?.syncableProviders) ? st.syncableProviders : [];
			} catch {
				providers = [];
			}
			if (providers.length === 0) {
				setSaveMsg("没有可同步的上游（未配置 baseURL 的自定义提供方或未启用的内置提供方）", true);
				return;
			}
			setDiscoverBusy("__all__");
			setProviderSyncError("");
			setProviderSyncBusy(true);
			const groups = [];
			for (const p of providers) try {
				const result = await postRaw({
					op: "discover",
					provider: p.provider,
					request: {}
				});
				const models = Array.isArray(result?.models) ? result.models : [];
				groups.push({
					provider: p.provider,
					displayName: p.displayName,
					ok: true,
					models
				});
			} catch (error) {
				groups.push({
					provider: p.provider,
					displayName: p.displayName,
					ok: false,
					models: [],
					error: error?.message || String(error)
				});
			}
			setProviderSyncGroups(groups);
			const picked = {};
			for (const g of groups) picked[g.provider] = /* @__PURE__ */ new Set();
			setProviderSyncPicked(picked);
			setProviderSyncTarget({ mode: "all" });
			setProviderSyncBusy(false);
			setDiscoverBusy("");
		};
		const toggleSyncPicked = (provider, modelId) => {
			setProviderSyncPicked((prev) => {
				const cur = new Set(prev[provider] || []);
				if (cur.has(modelId)) cur.delete(modelId);
				else cur.add(modelId);
				return {
					...prev,
					[provider]: cur
				};
			});
		};
		const toggleAllInGroup = (provider, on) => {
			setProviderSyncPicked((prev) => {
				const group = providerSyncGroups.find((g) => g.provider === provider);
				if (!group) return prev;
				return {
					...prev,
					[provider]: on ? new Set(group.models.map((m) => m.id)) : /* @__PURE__ */ new Set()
				};
			});
		};
		const closeProviderSync = () => {
			setProviderSyncTarget(null);
			setProviderSyncGroups([]);
			setProviderSyncPicked({});
			setProviderSyncError("");
		};
		const submitProviderSync = async () => {
			if (!providerSyncTarget) return;
			const providerAddModels = {};
			let total = 0;
			for (const g of providerSyncGroups) {
				const picked = providerSyncPicked[g.provider];
				if (!picked || picked.size === 0) continue;
				const entries = [];
				for (const m of g.models) if (picked.has(m.id)) entries.push(m);
				if (entries.length > 0) {
					providerAddModels[g.provider] = entries;
					total += entries.length;
				}
			}
			if (total === 0) {
				closeProviderSync();
				return;
			}
			setProviderSyncBusy(true);
			try {
				const status = await postRaw({
					op: "addModels",
					providerAddModels
				});
				if (status) applyStatus(status);
				closeProviderSync();
				setSaveMsg(text("savedProvider", "已保存。"));
				setTimeout(() => setSaveMsg(""), 1500);
			} catch (error) {
				setProviderSyncError("保存失败: " + (error?.message || String(error)));
			} finally {
				setProviderSyncBusy(false);
			}
		};
		const updateEditModelRow = (provider, key, patch) => setModelDraft((prev) => ({
			...prev,
			[provider]: {
				...prev[provider] || {},
				[key]: {
					id: "",
					name: "",
					context: "",
					maxTokens: "",
					tiers: [],
					...prev[provider]?.[key] || {},
					...patch
				}
			}
		}));
		const toggleEditModelTier = (provider, key, tier) => setModelDraft((prev) => {
			const cur = prev[provider]?.[key] || {
				id: "",
				name: "",
				context: "",
				maxTokens: "",
				tiers: []
			};
			const tiers = new Set(cur.tiers || []);
			if (tiers.has(tier)) tiers.delete(tier);
			else tiers.add(tier);
			return {
				...prev,
				[provider]: {
					...prev[provider] || {},
					[key]: {
						...cur,
						tiers: [...tiers]
					}
				}
			};
		});
		const dragSrc = react.default.useRef(null);
		const [liveOrder, setLiveOrder] = react.default.useState(null);
		const [overKey, setOverKey] = react.default.useState(null);
		const [noTransition, setNoTransition] = react.default.useState(false);
		const heightsRef = react.default.useRef({});
		const rowElsRef = react.default.useRef({});
		const captureHeights = (keys) => {
			const h = {};
			for (const k of keys) {
				const el = rowElsRef.current[k];
				if (el) h[k] = el.offsetHeight;
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
				e.dataTransfer.effectAllowed = "move";
				e.dataTransfer.setData("text/plain", provider);
			}
		};
		const onDragOverRow = (e, target) => {
			if (e.preventDefault) e.preventDefault();
			if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
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
				const byIdx = order.map((id) => rows.find((r) => r.provider === id)).filter((r) => r !== void 0);
				if (byIdx.length === rows.length) setRows(byIdx);
				setNoTransition(true);
				requestAnimationFrame(() => requestAnimationFrame(() => setNoTransition(false)));
				updateSetting((prev) => ({
					...prev,
					providerOrder: order.slice()
				}));
			}
			dragSrc.current = null;
			setLiveOrder(null);
			setOverKey(null);
			heightsRef.current = {};
		};
		const onDragEnd = () => {
			dragSrc.current = null;
			setLiveOrder(null);
			setOverKey(null);
			heightsRef.current = {};
		};
		const getEffortEntry = (provider, modelId) => normalizeEffortEntry(setting.modelEfforts[provider]?.[modelId]);
		const setEffortTiers = (provider, modelId, tiers) => updateSettingDraft((prev) => {
			const modelEfforts = { ...prev.modelEfforts };
			const pm = { ...modelEfforts[provider] || {} };
			const existing = normalizeEffortEntry(pm[modelId]);
			const next = {
				tiers: tiers.length > 0 ? tiers : void 0,
				selected: existing.selected && tiers.includes(existing.selected) ? existing.selected : void 0
			};
			if (next.tiers === void 0 && next.selected === void 0) delete pm[modelId];
			else pm[modelId] = next;
			modelEfforts[provider] = pm;
			return {
				...prev,
				modelEfforts
			};
		});
		const setEffortSelected = (provider, modelId, selected) => updateSettingDraft((prev) => {
			const modelEfforts = { ...prev.modelEfforts };
			const pm = { ...modelEfforts[provider] || {} };
			const next = {
				tiers: normalizeEffortEntry(pm[modelId]).tiers,
				selected: selected || void 0
			};
			if (next.tiers === void 0 && next.selected === void 0) delete pm[modelId];
			else pm[modelId] = next;
			modelEfforts[provider] = pm;
			return {
				...prev,
				modelEfforts
			};
		});
		const getRetry = (provider) => setting.providerRetryOverrides[provider]?.maxRetries ?? 2;
		const setRetry = (provider, value) => updateSettingDraft((prev) => ({
			...prev,
			providerRetryOverrides: {
				...prev.providerRetryOverrides,
				[provider]: {
					...prev.providerRetryOverrides[provider] || {},
					maxRetries: value
				}
			}
		}));
		const rowForSave = (id) => rows.find((r) => r.provider === id);
		const saveSettings = async (provider) => {
			if (saveTimer.current) clearTimeout(saveTimer.current);
			setSaveBusy(true);
			setSaveMsg(text("applying", "保存中…"));
			try {
				const nextSetting = {
					...setting,
					modelEfforts: { ...setting.modelEfforts || {} }
				};
				const body = {
					op: "apply",
					setting: nextSetting
				};
				if (provider) {
					const draftMap = modelDraft[provider];
					if (draftMap && Object.keys(draftMap).length > 0) {
						const edits = [];
						for (const [modelId, d] of Object.entries(draftMap)) {
							if (modelId.startsWith(NEW_MODEL_PREFIX)) {
								const newId = d.id?.trim() || "";
								if (!newId) continue;
								const update = {
									id: newId,
									oldId: modelId
								};
								if (d.name?.trim()) update.name = d.name.trim();
								const nctx = parseCapacity(d.context);
								if (nctx !== void 0 && Number.isFinite(nctx) && nctx > 0) update.contextWindow = nctx;
								const nmt = parseCapacity(d.maxTokens);
								if (nmt !== void 0 && Number.isFinite(nmt) && nmt > 0) update.maxTokens = nmt;
								if (Array.isArray(d.tiers) && d.tiers.length > 0) {
									const efforts = {};
									for (const tier of d.tiers) efforts[tier] = tier === "off" ? null : tier;
									update.reasoningEfforts = efforts;
								}
								edits.push(update);
								continue;
							}
							const oldId = modelId;
							const newId = d.id?.trim() || oldId;
							const update = {
								id: newId,
								oldId
							};
							if (d.name?.trim()) update.name = d.name.trim();
							else update.name = "";
							const ctx = parseCapacity(d.context);
							if (ctx !== void 0 && Number.isFinite(ctx) && ctx > 0) update.contextWindow = ctx;
							else if (d.context?.trim()) update.contextWindow = null;
							const mt = parseCapacity(d.maxTokens);
							if (mt !== void 0 && Number.isFinite(mt) && mt > 0) update.maxTokens = mt;
							else if (d.maxTokens?.trim()) update.maxTokens = null;
							if (Array.isArray(d.tiers) && d.tiers.length > 0) {
								const efforts = {};
								for (const tier of d.tiers) efforts[tier] = tier === "off" ? null : tier;
								update.reasoningEfforts = efforts;
							}
							if (d.input !== void 0) update.input = d.input === "multimodal" ? ["text", "image"] : ["text"];
							if (oldId !== newId) {
								const pm = nextSetting.modelEfforts[provider];
								if (pm && pm[oldId]) {
									const np = {
										...pm,
										[newId]: pm[oldId]
									};
									delete np[oldId];
									nextSetting.modelEfforts[provider] = np;
								}
							}
							edits.push(update);
						}
						body.providerModels = { [provider]: edits };
					}
					const deletes = deletedModelIds[provider];
					if (deletes && deletes.length > 0) body.providerDeleteModels = { [provider]: deletes };
					const pd = providerDraft;
					if (pd) {
						const orig = rowForSave(provider);
						const profileUpdate = {};
						if (pd.displayName.trim() !== (orig?.displayName || provider)) profileUpdate.displayName = pd.displayName.trim() || provider;
						const origBaseURL = orig?.baseURL || "";
						if (pd.baseURL.trim() !== origBaseURL) profileUpdate.baseURL = pd.baseURL.trim() || null;
						const origEnv = orig?.apiKeyEnv || "";
						if (pd.apiKeyEnv.trim() !== origEnv) profileUpdate.apiKeyEnv = pd.apiKeyEnv.trim() || void 0;
						if (Object.keys(profileUpdate).length > 0) body.providerProfile = profileUpdate;
						if (pd.newProviderId.trim() !== provider && /^[a-z][a-z0-9-]*$/.test(pd.newProviderId.trim())) body.providerIdRename = {
							oldId: provider,
							newId: pd.newProviderId.trim()
						};
					}
				}
				const status = await postCommand(body);
				applyStatus(status);
				setDirty(false);
				setSaveMsg(text("savedProvider", "已保存。"));
				return true;
			} catch (error) {
				setSaveMsg("保存失败: " + (error?.message || String(error)), true);
				return false;
			} finally {
				setSaveBusy(false);
			}
		};
		if (loading) return react.default.createElement("div", { className: "better-model-setting bms-section" }, [react.default.createElement("div", {
			className: "bms-loading",
			key: "loading"
		}, [react.default.createElement("span", {
			className: "bms-spinner",
			key: "spin",
			"aria-hidden": true
		}), react.default.createElement("span", { key: "text" }, text("loading", "加载中…"))])]);
		if (loadError) return react.default.createElement("div", { className: "better-model-setting bms-section" }, [react.default.createElement("p", {
			className: "bms-error",
			key: "err"
		}, `${text("loadFailed")}: ${loadError}`), react.default.createElement("button", {
			type: "button",
			className: "bms-secondaryButton",
			key: "retry",
			onClick: () => void load()
		}, text("retry"))]);
		const canDrag = writable !== false && !saveBusy;
		const configRows = rows.filter((r) => r.kind !== "builtin");
		const officialRow = rows.find((r) => r.provider === "deepseek-official" && r.kind === "builtin");
		const officialAdded = !!setting.officialAdded;
		const baseOrder = rows.map((r) => r.provider);
		const offsets = liveOrder ? computeOffsets(baseOrder, liveOrder, heightsRef.current) : {};
		const draggingKey = dragSrc.current;
		const renderProviderRow = (row, index) => {
			const provider = row.provider;
			const isEditing = editingProvider === provider;
			const isDisabled = !row.active;
			const isDragging = draggingKey === provider;
			const offset = liveOrder ? offsets[provider] || 0 : 0;
			const rowStyle = {
				opacity: isDisabled ? .55 : isDragging ? .85 : 1,
				transform: liveOrder ? `translateY(${offset}px)` : void 0,
				transition: noTransition ? "none" : "transform .2s cubic-bezier(.32,.72,.24,1), opacity .14s ease, border-color .16s ease, box-shadow .2s ease, background-color .2s ease",
				zIndex: isDragging ? 2 : void 0,
				position: "relative",
				animationDelay: `${Math.min(index, 10) * 24}ms`
			};
			const rowClass = "bms-rowCard" + (isDragging ? " bms-dragging" : "") + (isDisabled ? " bms-disabledRow" : "") + (overKey === provider && !isDragging && liveOrder ? " bms-overTarget" : "");
			return react.default.createElement("li", {
				key: provider,
				ref: (el) => {
					rowElsRef.current[provider] = el;
				},
				className: rowClass,
				style: rowStyle,
				onDragOver: (e) => onDragOverRow(e, provider),
				onDrop,
				onDragEnd
			}, [react.default.createElement("div", {
				className: "bms-rowHead",
				key: "head"
			}, [react.default.createElement("div", {
				className: "bms-rowIdentity",
				key: "id"
			}, [
				row.kind !== "builtin" && canDrag ? react.default.createElement("span", {
					className: "bms-dragHandle",
					key: "handle",
					title: "拖动排序",
					draggable: true,
					onDragStart: (e) => onDragStart(e, provider)
				}) : null,
				react.default.createElement("span", {
					className: "bms-rowName",
					key: "name"
				}, row.displayName),
				row.kind === "builtin" ? react.default.createElement("span", {
					className: "bms-rowTag",
					key: "tag"
				}, "内置") : null,
				row.credential === "configured" ? react.default.createElement("span", {
					className: "bms-credentialDot bms-credentialDotConfigured",
					key: "cd",
					role: "img",
					title: text("credentialConfigured")
				}) : row.credential === "missing" ? react.default.createElement("span", {
					className: "bms-credentialDot bms-credentialDotMissing",
					key: "cd",
					role: "img",
					title: text("credentialMissing")
				}) : null
			]), react.default.createElement("div", {
				className: "bms-rowActions",
				key: "actions"
			}, [
				react.default.createElement("button", {
					type: "button",
					className: "bms-secondaryButton",
					key: "toggle",
					disabled: saveBusy || writable === false,
					onClick: () => toggleProvider(provider, row.kind, !isDisabled)
				}, isDisabled ? text("enable") : text("disable")),
				react.default.createElement("button", {
					type: "button",
					className: "bms-secondaryButton",
					key: "edit",
					disabled: saveBusy || writable === false || row.kind === "builtin",
					onClick: () => {
						if (isEditing) requestCloseEditor(provider);
						else {
							setEditingProvider(provider);
							setDirty(false);
							setDeletedModelIds((p) => {
								const n = { ...p };
								delete n[provider];
								return n;
							});
							setProviderDraft({
								displayName: row.displayName,
								baseURL: row.apiKeyEnv ? row.baseURL || "" : "",
								apiKeyEnv: row.apiKeyEnv || "",
								newProviderId: provider
							});
						}
					}
				}, text("edit")),
				react.default.createElement("button", {
					type: "button",
					className: "bms-dangerButton",
					key: "del",
					"aria-label": text("removeProvider").replace("{provider}", row.displayName),
					disabled: saveBusy || writable === false,
					onClick: () => {
						setDeleteTarget(provider);
						setDeleteFailure("");
					}
				}, text("remove"))
			])]), isEditing && row.kind !== "builtin" ? react.default.createElement("div", {
				className: "bms-editor",
				key: "editor"
			}, [
				react.default.createElement("div", {
					className: "bms-field",
					key: "headName"
				}, [react.default.createElement("span", { className: "bms-fieldLabel" }, text("displayName", "显示名称")), react.default.createElement("input", {
					className: "bms-input",
					disabled: saveBusy || writable === false,
					value: providerDraft?.displayName ?? row.displayName,
					placeholder: row.displayName,
					onChange: (e) => {
						setProviderDraft((d) => ({
							...d ?? {
								displayName: row.displayName,
								baseURL: row.baseURL || "",
								apiKeyEnv: row.apiKeyEnv || "",
								newProviderId: provider
							},
							displayName: e.target.value
						}));
						setDirty(true);
					}
				})]),
				react.default.createElement("div", {
					className: "bms-field",
					key: "headId"
				}, [react.default.createElement("span", { className: "bms-fieldLabel" }, text("providerId", "Provider ID")), react.default.createElement("input", {
					className: "bms-input",
					disabled: saveBusy || writable === false,
					value: providerDraft?.newProviderId ?? provider,
					placeholder: provider,
					onChange: (e) => {
						setProviderDraft((d) => ({
							...d ?? {
								displayName: row.displayName,
								baseURL: row.baseURL || "",
								apiKeyEnv: row.apiKeyEnv || "",
								newProviderId: provider
							},
							newProviderId: e.target.value
						}));
						setDirty(true);
					}
				})]),
				(() => {
					const apiKeyEnv = (providerDraft?.apiKeyEnv ?? row.apiKeyEnv) || "";
					return [
						react.default.createElement("label", {
							key: "baseUrl",
							className: "bms-field"
						}, [react.default.createElement("span", { className: "bms-fieldLabel" }, text("baseUrl")), react.default.createElement("input", {
							className: "bms-input",
							disabled: saveBusy || writable === false,
							value: (providerDraft?.baseURL ?? row.baseURL) || "",
							placeholder: text("baseUrlDefault"),
							onChange: (e) => {
								setProviderDraft((d) => ({
									...d ?? {
										displayName: row.displayName,
										baseURL: row.baseURL || "",
										apiKeyEnv: row.apiKeyEnv || "",
										newProviderId: provider
									},
									baseURL: e.target.value
								}));
								setDirty(true);
							}
						})]),
						react.default.createElement("label", {
							key: "keyEnv",
							className: "bms-field"
						}, [react.default.createElement("span", { className: "bms-fieldLabel" }, text("keyInput")), react.default.createElement("input", {
							className: "bms-input",
							disabled: saveBusy || writable === false,
							value: (providerDraft?.apiKeyEnv ?? row.apiKeyEnv) || "",
							placeholder: apiKeyEnv ? text("keyEnvLocked") : text("keyPlaceholder"),
							style: { fontFamily: "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace" },
							onChange: (e) => {
								setProviderDraft((d) => ({
									...d ?? {
										displayName: row.displayName,
										baseURL: row.baseURL || "",
										apiKeyEnv: row.apiKeyEnv || "",
										newProviderId: provider
									},
									apiKeyEnv: e.target.value
								}));
								setDirty(true);
							}
						})]),
						react.default.createElement("label", {
							key: "retry",
							className: "bms-field"
						}, [react.default.createElement("span", { className: "bms-fieldLabel" }, text("retryCount", "重试次数")), react.default.createElement("input", {
							type: "number",
							min: 0,
							max: 20,
							className: "bms-input bms-retry",
							style: { width: 96 },
							value: getRetry(provider),
							disabled: saveBusy || writable === false,
							onChange: (e) => setRetry(provider, Math.max(0, Math.min(20, Number.parseInt(e.target.value, 10) || 0)))
						})]),
						react.default.createElement("details", {
							className: "bms-customized",
							key: "customized"
						}, [react.default.createElement("summary", { className: "bms-customizedSummary" }, [text("modelSettings"), row.models.length > 0 ? react.default.createElement("span", {
							key: "pills",
							className: "bms-modelPills"
						}, row.models.map((m) => react.default.createElement("span", {
							key: m.id,
							className: "bms-modelPill"
						}, m.name || m.id))) : null]), react.default.createElement("div", { className: "bms-customizedBody" }, [react.default.createElement("div", { className: "bms-modelCatalog" }, [
							react.default.createElement("div", { className: "bms-modelCatalogHeading" }, [react.default.createElement("div", { className: "bms-modelCatalogTitle" }, text("models")), react.default.createElement("p", { className: "bms-modelCatalogMeta" }, row.models.length > 0 ? text("modelsCustomized") : text("modelsInherited"))]),
							react.default.createElement("button", {
								type: "button",
								className: "bms-linkButton",
								key: "syncUpstream",
								disabled: saveBusy || writable === false || discoverBusy === provider,
								onClick: () => void openProviderSync(provider)
							}, discoverBusy === provider ? text("fetching", "正在拉取…") : text("syncUpstream", "同步上游")),
							row.models.length === 0 ? react.default.createElement("p", { className: "bms-modelEmpty" }, text("modelsEmpty")) : null,
							react.default.createElement("div", { className: "bms-modelList" }, row.models.map((model) => {
								const available = model.tiers || [];
								const entry = getEffortEntry(provider, model.id);
								const whitelist = entry.tiers ?? (available.length > 0 ? available.slice() : []);
								const selected = entry.selected && whitelist.includes(entry.selected) ? entry.selected : "";
								const candidates = ADD_TIER_CANDIDATES;
								const draftEntry = modelDraft[provider]?.[model.id];
								const nameVal = draftEntry ? draftEntry.name : model.name;
								const ctxVal = draftEntry ? draftEntry.context : formatCapacity(model.contextWindow);
								const mtVal = draftEntry ? draftEntry.maxTokens : formatCapacity(model.maxTokens);
								const setDraftField = (field, value) => {
									setModelDraft((prev) => ({
										...prev,
										[provider]: {
											...prev[provider] || {},
											[model.id]: {
												id: prev[provider]?.[model.id]?.id ?? model.id,
												name: prev[provider]?.[model.id]?.name ?? model.name,
												context: prev[provider]?.[model.id]?.context ?? formatCapacity(model.contextWindow),
												maxTokens: prev[provider]?.[model.id]?.maxTokens ?? formatCapacity(model.maxTokens),
												input: prev[provider]?.[model.id]?.input ?? (model.input?.includes("image") ? "multimodal" : "text"),
												[field]: value
											}
										}
									}));
								};
								const toggleTier = (tier, on) => {
									const set = new Set(whitelist);
									if (on) set.add(tier);
									else set.delete(tier);
									setEffortTiers(provider, model.id, [...set]);
									if (available.length === 0) setModelDraft((prev) => ({
										...prev,
										[provider]: {
											...prev[provider] || {},
											[model.id]: {
												...prev[provider]?.[model.id] ?? {
													id: model.id,
													name: model.name,
													context: formatCapacity(model.contextWindow),
													maxTokens: formatCapacity(model.maxTokens)
												},
												tiers: [...set]
											}
										}
									}));
								};
								return react.default.createElement("div", {
									key: model.id,
									className: "bms-modelEntry"
								}, [react.default.createElement("div", { className: "bms-modelRow" }, [
									react.default.createElement("label", { className: "bms-modelField" }, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, text("modelId")), react.default.createElement("input", {
										className: "bms-input",
										disabled: saveBusy || writable === false,
										value: draftEntry?.id ?? model.id,
										placeholder: model.id,
										onChange: (e) => setDraftField("id", e.target.value)
									})]),
									react.default.createElement("label", { className: "bms-modelField" }, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, text("modelName")), react.default.createElement("input", {
										className: "bms-input",
										disabled: saveBusy || writable === false,
										value: nameVal,
										placeholder: text("modelNamePlaceholder"),
										onChange: (e) => setDraftField("name", e.target.value)
									})]),
									react.default.createElement("button", {
										type: "button",
										className: "bms-iconButton bms-iconButtonDanger",
										disabled: saveBusy || writable === false,
										title: text("removeModel", "删除模型"),
										onClick: () => removeEditModelRow(provider, model.id)
									}, "✕")
								]), react.default.createElement("div", { className: "bms-modelAdvanced" }, [
									react.default.createElement("label", { className: "bms-modelField" }, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, text("contextWindow")), react.default.createElement("input", {
										className: "bms-input",
										disabled: saveBusy || writable === false,
										value: ctxVal,
										placeholder: text("contextWindowPlaceholder"),
										onChange: (e) => setDraftField("context", e.target.value)
									})]),
									react.default.createElement("label", { className: "bms-modelField" }, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, text("maxTokens")), react.default.createElement("input", {
										className: "bms-input",
										disabled: saveBusy || writable === false,
										value: mtVal,
										placeholder: text("maxTokensPlaceholder"),
										onChange: (e) => setDraftField("maxTokens", e.target.value)
									})]),
									react.default.createElement("label", { className: "bms-modelField" }, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, "模态"), react.default.createElement("select", {
										className: "bms-input bms-selectInput",
										value: draftEntry?.input ?? (model.input?.includes("image") ? "multimodal" : "text"),
										disabled: saveBusy || writable === false,
										onChange: (e) => setDraftField("input", e.target.value)
									}, [react.default.createElement("option", {
										key: "text",
										value: "text"
									}, "大语言"), react.default.createElement("option", {
										key: "multimodal",
										value: "multimodal"
									}, "多模态")])]),
									react.default.createElement("label", {
										className: "bms-modelField",
										style: { gridColumn: "1 / -1" }
									}, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, text("applyTier", "应用档位")), react.default.createElement("select", {
										className: "bms-input bms-selectInput",
										value: selected,
										disabled: saveBusy || writable === false || whitelist.length === 0,
										onChange: (e) => setEffortSelected(provider, model.id, e.target.value)
									}, [react.default.createElement("option", {
										key: "",
										value: "",
										disabled: true
									}, text("effortUnset", "未设置")), ...whitelist.map((tier) => react.default.createElement("option", {
										key: tier,
										value: tier
									}, tier))])]),
									react.default.createElement("label", {
										className: "bms-modelField",
										style: { gridColumn: "1 / -1" }
									}, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, text("displayTiers", "前端显示档位")), react.default.createElement("div", { className: "bms-tierBoxes" }, candidates.map((tier) => react.default.createElement("label", {
										key: tier,
										className: "bms-chip"
									}, [react.default.createElement("input", {
										type: "checkbox",
										className: "bms-chipInput",
										checked: whitelist.includes(tier),
										disabled: saveBusy || writable === false,
										onChange: (e) => toggleTier(tier, e.target.checked)
									}), react.default.createElement("span", { className: "bms-chipText" }, tier)])))])
								])]);
							})),
							...Object.keys(modelDraft[provider] || {}).filter((k) => k.startsWith(NEW_MODEL_PREFIX)).map((key) => {
								const nd = modelDraft[provider][key];
								return react.default.createElement("div", {
									key,
									className: "bms-modelEntry"
								}, [react.default.createElement("div", { className: "bms-modelRow" }, [
									react.default.createElement("label", { className: "bms-modelField" }, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, text("modelId")), react.default.createElement("input", {
										className: "bms-input",
										disabled: saveBusy || writable === false,
										value: nd.id || "",
										placeholder: "gpt-5.6",
										onChange: (e) => updateEditModelRow(provider, key, { id: e.target.value })
									})]),
									react.default.createElement("label", { className: "bms-modelField" }, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, text("modelName")), react.default.createElement("input", {
										className: "bms-input",
										disabled: saveBusy || writable === false,
										value: nd.name || "",
										placeholder: text("modelNamePlaceholder"),
										onChange: (e) => updateEditModelRow(provider, key, { name: e.target.value })
									})]),
									react.default.createElement("button", {
										type: "button",
										className: "bms-iconButton bms-iconButtonDanger",
										disabled: saveBusy || writable === false,
										title: text("removeModel", "删除模型"),
										onClick: () => removeEditModelRow(provider, key)
									}, "✕")
								]), react.default.createElement("div", { className: "bms-modelAdvanced" }, [
									react.default.createElement("label", { className: "bms-modelField" }, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, text("contextWindow")), react.default.createElement("input", {
										className: "bms-input",
										disabled: saveBusy || writable === false,
										value: nd.context || "",
										placeholder: "例如 128K 或 1M",
										onChange: (e) => updateEditModelRow(provider, key, { context: e.target.value })
									})]),
									react.default.createElement("label", { className: "bms-modelField" }, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, text("maxTokens")), react.default.createElement("input", {
										className: "bms-input",
										disabled: saveBusy || writable === false,
										value: nd.maxTokens || "",
										placeholder: "例如 8K 或 64K",
										onChange: (e) => updateEditModelRow(provider, key, { maxTokens: e.target.value })
									})]),
									react.default.createElement("label", {
										className: "bms-modelField",
										style: { gridColumn: "1 / -1" }
									}, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, text("displayTiers", "思考档位")), react.default.createElement("div", { className: "bms-tierBoxes" }, ADD_TIER_CANDIDATES.map((tier) => react.default.createElement("label", {
										key: tier,
										className: "bms-chip"
									}, [react.default.createElement("input", {
										type: "checkbox",
										className: "bms-chipInput",
										checked: (nd.tiers || []).includes(tier),
										disabled: saveBusy || writable === false,
										onChange: () => toggleEditModelTier(provider, key, tier)
									}), react.default.createElement("span", { className: "bms-chipText" }, tier)])))])
								])]);
							}),
							react.default.createElement("button", {
								type: "button",
								className: "bms-addModelButton",
								key: "addModel",
								disabled: saveBusy || writable === false,
								onClick: () => addEditModelRow(provider)
							}, "+ " + text("addModel"))
						]), react.default.createElement("p", { className: "bms-advancedHint" }, text("advancedHint"))])])
					];
				})(),
				react.default.createElement("div", {
					className: "bms-editorActions",
					key: "foot"
				}, [react.default.createElement("button", {
					type: "button",
					className: "bms-secondaryButton",
					disabled: saveBusy,
					onClick: () => void requestCloseEditor(provider)
				}, text("cancel")), react.default.createElement("button", {
					type: "button",
					className: "bms-primaryButton",
					disabled: saveBusy || writable === false,
					onClick: () => void requestCloseEditor(provider, { saveFirst: true })
				}, saveBusy ? text("applying") : text("apply"))])
			]) : null]);
		};
		return react.default.createElement("div", { className: "better-model-setting bms-section" }, [
			react.default.createElement("h2", {
				className: "bms-title",
				key: "title"
			}, text("title")),
			react.default.createElement("p", {
				className: "bms-intro",
				key: "intro"
			}, text("intro")),
			!writable ? react.default.createElement("p", {
				className: "bms-notice",
				key: "ro"
			}, text("readOnly")) : null,
			saveStatus ? react.default.createElement("p", {
				className: saveError ? "bms-error" : "bms-savedNotice",
				key: "status",
				role: "status",
				"aria-live": "polite"
			}, saveStatus) : null,
			react.default.createElement("div", {
				key: "topActions",
				style: {
					display: "flex",
					justifyContent: "flex-end",
					gap: 8,
					flexWrap: "wrap"
				}
			}, [react.default.createElement("button", {
				type: "button",
				className: "bms-secondaryButton",
				key: "syncAll",
				disabled: writable === false || discoverBusy === "__all__",
				onClick: () => void openGlobalSync()
			}, discoverBusy === "__all__" ? text("fetching", "正在拉取…") : text("syncUpstreamAll", "一键同步所有上游")), !officialAdded ? react.default.createElement("button", {
				type: "button",
				className: "bms-primaryButton",
				key: "addOfficial",
				disabled: writable === false,
				onClick: () => {
					setShowOfficialForm(true);
					setOfficialError("");
				}
			}, "+ 添加官方模型") : null]),
			showOfficialForm && !officialAdded ? react.default.createElement("div", {
				className: "bms-addCard",
				key: "officialForm"
			}, [
				react.default.createElement("div", { className: "bms-editorHeader" }, [react.default.createElement("div", { className: "bms-editorTitle" }, "添加 DeepSeek 官方模型")]),
				react.default.createElement("label", { className: "bms-field" }, [react.default.createElement("span", { className: "bms-fieldLabel" }, "API 密钥环境变量名"), react.default.createElement("input", {
					className: "bms-input",
					value: officialEnvName,
					disabled: officialBusy,
					placeholder: "DEEPSEEK_API_KEY",
					onChange: (e) => setOfficialEnvName(e.target.value)
				})]),
				react.default.createElement("label", { className: "bms-field" }, [react.default.createElement("span", { className: "bms-fieldLabel" }, "API 密钥"), react.default.createElement("input", {
					type: "password",
					className: "bms-input",
					value: officialApiKey,
					disabled: officialBusy,
					placeholder: "输入 API 密钥（如已设置环境变量可留空）",
					onChange: (e) => setOfficialApiKey(e.target.value)
				})]),
				officialError ? react.default.createElement("p", { className: "bms-error" }, officialError) : null,
				react.default.createElement("div", { className: "bms-editorActions" }, [react.default.createElement("button", {
					type: "button",
					className: "bms-secondaryButton",
					disabled: officialBusy,
					onClick: () => setShowOfficialForm(false)
				}, text("cancel")), react.default.createElement("button", {
					type: "button",
					className: "bms-primaryButton",
					disabled: officialBusy || writable === false,
					onClick: () => void submitOfficial()
				}, officialBusy ? text("creating", "创建中…") : "添加")])
			]) : null,
			react.default.createElement("ul", {
				className: "bms-rows",
				key: "mainRows"
			}, (officialAdded && officialRow ? [officialRow, ...configRows] : configRows).map((row, idx) => renderProviderRow(row, idx))),
			react.default.createElement("div", {
				className: "bms-addBlock",
				key: "addBlock"
			}, adding ? react.default.createElement("div", {
				className: "bms-addCard",
				key: "addCard"
			}, [
				react.default.createElement("div", {
					className: "bms-editorHeader",
					key: "eh"
				}, [react.default.createElement("div", { className: "bms-editorTitle" }, text("customAdd"))]),
				react.default.createElement("label", {
					key: "provider",
					className: "bms-field"
				}, [react.default.createElement("span", { className: "bms-fieldLabel" }, text("customRoute")), react.default.createElement("input", {
					className: "bms-input",
					value: draft.provider,
					disabled: addBusy,
					placeholder: text("customRouteHint"),
					onChange: (e) => setDraft({
						...draft,
						provider: e.target.value
					})
				})]),
				react.default.createElement("label", {
					key: "displayName",
					className: "bms-field"
				}, [react.default.createElement("span", { className: "bms-fieldLabel" }, text("customDisplayName")), react.default.createElement("input", {
					className: "bms-input",
					value: draft.displayName,
					disabled: addBusy,
					placeholder: "例如 HiAPI",
					onChange: (e) => setDraft({
						...draft,
						displayName: e.target.value
					})
				})]),
				react.default.createElement("label", {
					key: "api",
					className: "bms-field"
				}, [react.default.createElement("span", { className: "bms-fieldLabel" }, text("customApi")), react.default.createElement("select", {
					className: "bms-input bms-selectInput",
					value: draft.api,
					disabled: addBusy,
					onChange: (e) => setDraft({
						...draft,
						api: e.target.value
					})
				}, [react.default.createElement("option", {
					key: "",
					value: ""
				}, text("customApiUnset")), ...PROTOCOL_OPTIONS.map((p) => react.default.createElement("option", {
					key: p,
					value: p
				}, p))])]),
				react.default.createElement("label", {
					key: "baseURL",
					className: "bms-field"
				}, [react.default.createElement("span", { className: "bms-fieldLabel" }, text("baseUrl")), react.default.createElement("input", {
					className: "bms-input",
					value: draft.baseURL,
					disabled: addBusy,
					placeholder: "https://api.example.com/v1",
					onChange: (e) => setDraft({
						...draft,
						baseURL: e.target.value
					})
				})]),
				react.default.createElement("label", {
					key: "apiKeyEnv",
					className: "bms-field"
				}, [react.default.createElement("span", { className: "bms-fieldLabel" }, text("keyInput", "API Key 环境变量")), react.default.createElement("input", {
					className: "bms-input",
					value: draft.apiKeyEnv,
					disabled: addBusy,
					placeholder: "例如 HIApi_API_KEY",
					onChange: (e) => setDraft({
						...draft,
						apiKeyEnv: e.target.value
					})
				})]),
				addError ? react.default.createElement("p", {
					className: "bms-error",
					key: "err"
				}, addError) : null,
				react.default.createElement("div", {
					key: "models",
					className: "bms-modelCatalog"
				}, [
					react.default.createElement("div", { className: "bms-modelCatalogHeading" }, [react.default.createElement("div", { className: "bms-modelCatalogTitle" }, text("models"))]),
					draftModels.length === 0 ? react.default.createElement("p", { className: "bms-modelEmpty" }, text("addModelHint", "可选：添加模型。")) : null,
					react.default.createElement("div", { className: "bms-modelList" }, draftModels.map((m, index) => {
						return react.default.createElement("div", {
							key: m.uid,
							className: "bms-modelEntry"
						}, [react.default.createElement("div", { className: "bms-modelRow" }, [
							react.default.createElement("label", { className: "bms-modelField" }, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, text("modelId")), react.default.createElement("input", {
								className: "bms-input",
								value: m.id,
								disabled: addBusy,
								placeholder: "gpt-5.6",
								onChange: (e) => updateModelRow(index, { id: e.target.value })
							})]),
							react.default.createElement("label", { className: "bms-modelField" }, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, text("modelName")), react.default.createElement("input", {
								className: "bms-input",
								value: m.name || "",
								disabled: addBusy,
								placeholder: text("modelNamePlaceholder"),
								onChange: (e) => updateModelRow(index, { name: e.target.value })
							})]),
							react.default.createElement("button", {
								type: "button",
								className: "bms-iconButton bms-iconButtonDanger",
								disabled: addBusy,
								title: text("removeModel", "删除模型"),
								onClick: () => removeModelRow(index)
							}, "✕")
						]), react.default.createElement("div", { className: "bms-modelAdvanced" }, [react.default.createElement("label", {
							className: "bms-modelField",
							style: { gridColumn: "1 / -1" }
						}, [react.default.createElement("span", { className: "bms-modelFieldLabel" }, text("displayTiers", "思考档位（可选）")), react.default.createElement("div", { className: "bms-tierBoxes" }, ADD_TIER_CANDIDATES.map((tier) => react.default.createElement("label", {
							key: tier,
							className: "bms-chip"
						}, [react.default.createElement("input", {
							type: "checkbox",
							className: "bms-chipInput",
							checked: m.tiers.includes(tier),
							disabled: addBusy,
							onChange: () => toggleModelTier(index, tier)
						}), react.default.createElement("span", { className: "bms-chipText" }, tier)])))])])]);
					})),
					react.default.createElement("button", {
						type: "button",
						className: "bms-addModelButton",
						disabled: addBusy,
						onClick: addModelRow
					}, "+ " + text("addModel"))
				]),
				react.default.createElement("div", {
					className: "bms-editorActions",
					key: "foot"
				}, [react.default.createElement("button", {
					type: "button",
					className: "bms-secondaryButton",
					disabled: addBusy,
					onClick: closeAdd
				}, text("cancel")), react.default.createElement("button", {
					type: "button",
					className: "bms-primaryButton",
					disabled: addBusy || writable === false,
					onClick: () => void submitAdd()
				}, addBusy ? text("creating", "创建中…") : text("create", "创建提供方"))])
			]) : react.default.createElement("div", {
				className: "bms-addActions",
				key: "addActions"
			}, [react.default.createElement("button", {
				type: "button",
				className: "bms-addButton",
				disabled: writable === false,
				onClick: openAdd
			}, [react.default.createElement("span", {
				key: "plus",
				className: "bms-plus"
			}, "+"), text("customAdd", "添加自定义提供方")])])),
			deleteTarget ? react.default.createElement("div", {
				className: "bms-overlay",
				key: "overlay",
				onClick: () => !deleting && setDeleteTarget(null),
				onKeyDown: (e) => {
					if (e.key === "Escape" && !deleting) setDeleteTarget(null);
				}
			}, [react.default.createElement("div", {
				className: "bms-dialog",
				key: "dialog",
				onClick: (e) => e.stopPropagation()
			}, [
				react.default.createElement("h3", { className: "bms-dialogTitle" }, text("deleteTitle").replace("{provider}", rows.find((r) => r.provider === deleteTarget)?.displayName || deleteTarget)),
				react.default.createElement("p", { className: "bms-dialogDesc" }, text("deleteDescription")),
				deleteFailure ? react.default.createElement("p", { className: "bms-error" }, deleteFailure) : null,
				react.default.createElement("div", { className: "bms-dialogActions" }, [react.default.createElement("button", {
					type: "button",
					className: "bms-secondaryButton",
					disabled: deleting,
					onClick: () => setDeleteTarget(null)
				}, text("cancel")), react.default.createElement("button", {
					type: "button",
					className: "bms-dangerButton bms-dangerConfirm",
					disabled: deleting,
					onClick: confirmDelete
				}, deleting ? text("deleting", "正在删除…") : text("deleteConfirm", "删除").replace("{provider}", ""))])
			])]) : null,
			pendingCloseProvider ? react.default.createElement("div", {
				className: "bms-overlay",
				key: "unsavedOverlay",
				onClick: () => setPendingCloseProvider(null),
				onKeyDown: (e) => {
					if (e.key === "Escape") setPendingCloseProvider(null);
				}
			}, [react.default.createElement("div", {
				className: "bms-dialog",
				key: "dialog",
				onClick: (e) => e.stopPropagation()
			}, [
				react.default.createElement("h3", { className: "bms-dialogTitle" }, "未保存的修改"),
				react.default.createElement("p", { className: "bms-dialogDesc" }, "模型设置已修改，是否保存后再关闭？"),
				react.default.createElement("div", { className: "bms-dialogActions" }, [
					react.default.createElement("button", {
						type: "button",
						className: "bms-secondaryButton",
						onClick: () => void requestCloseEditor(pendingCloseProvider, { discard: true })
					}, "不保存"),
					react.default.createElement("button", {
						type: "button",
						className: "bms-primaryButton",
						onClick: () => void requestCloseEditor(pendingCloseProvider, { saveFirst: true })
					}, "保存"),
					react.default.createElement("button", {
						type: "button",
						className: "bms-secondaryButton",
						onClick: () => setPendingCloseProvider(null)
					}, "取消")
				])
			])]) : null,
			providerSyncTarget ? react.default.createElement("div", {
				className: "bms-overlay",
				key: "syncOverlay",
				onClick: () => !providerSyncBusy && closeProviderSync(),
				onKeyDown: (e) => {
					if (e.key === "Escape" && !providerSyncBusy) closeProviderSync();
				}
			}, [react.default.createElement("div", {
				className: "bms-dialog",
				key: "syncDialog",
				style: {
					minWidth: 480,
					maxWidth: 640,
					maxHeight: "80vh",
					overflow: "hidden",
					display: "flex",
					flexDirection: "column"
				},
				onClick: (e) => e.stopPropagation()
			}, [
				react.default.createElement("h3", { className: "bms-dialogTitle" }, providerSyncTarget.mode === "all" ? text("syncUpstreamAllTitle", "同步所有上游模型") : text("syncUpstreamOneTitle", "同步 {provider} 的上游模型").replace("{provider}", providerSyncTarget.provider || "")),
				react.default.createElement("p", { className: "bms-dialogDesc" }, text("syncUpstreamHint", "勾选要添加的模型（默认全部未选）；已存在于本提供方下的会跳过。")),
				providerSyncError ? react.default.createElement("p", { className: "bms-error" }, providerSyncError) : null,
				react.default.createElement("div", {
					key: "scroll",
					style: {
						overflowY: "auto",
						flex: 1,
						minHeight: 0,
						display: "flex",
						flexDirection: "column",
						gap: 8,
						paddingRight: 4
					}
				}, providerSyncGroups.map((g) => {
					const picked = providerSyncPicked[g.provider] || /* @__PURE__ */ new Set();
					const allPicked = g.models.length > 0 && g.models.every((m) => picked.has(m.id));
					return react.default.createElement("div", {
						key: g.provider,
						className: "bms-addCard",
						style: { padding: 8 }
					}, [
						react.default.createElement("div", {
							key: "header",
							style: {
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								gap: 8
							}
						}, [react.default.createElement("strong", { key: "name" }, g.displayName), g.ok && g.models.length > 0 ? react.default.createElement("button", {
							type: "button",
							className: "bms-linkButton",
							key: "toggleAll",
							disabled: providerSyncBusy,
							onClick: () => toggleAllInGroup(g.provider, !allPicked)
						}, allPicked ? text("fetchDeselectAll", "全部取消") : text("fetchSelectAll", "全部选择")) : null]),
						!g.ok ? react.default.createElement("p", {
							className: "bms-error",
							key: "err"
						}, g.error || "拉取失败") : null,
						g.ok && g.models.length === 0 ? react.default.createElement("p", {
							className: "bms-modelEmpty",
							key: "empty"
						}, text("fetchEmpty", "上游未公布任何模型")) : null,
						...g.models.map((m) => react.default.createElement("label", {
							key: m.id,
							className: "bms-chip",
							style: {
								marginRight: 4,
								marginBottom: 4
							}
						}, [react.default.createElement("input", {
							type: "checkbox",
							className: "bms-chipInput",
							key: "cb",
							checked: picked.has(m.id),
							disabled: providerSyncBusy,
							onChange: () => toggleSyncPicked(g.provider, m.id)
						}), react.default.createElement("span", {
							className: "bms-chipText",
							key: "t"
						}, m.id + (m.name ? ` (${m.name})` : "") + (typeof m.contextWindow === "number" ? ` · ${m.contextWindow}` : ""))]))
					]);
				})),
				react.default.createElement("div", { className: "bms-dialogActions" }, [react.default.createElement("button", {
					type: "button",
					className: "bms-secondaryButton",
					key: "cancel",
					disabled: providerSyncBusy,
					onClick: closeProviderSync
				}, text("cancel", "取消")), react.default.createElement("button", {
					type: "button",
					className: "bms-primaryButton",
					key: "ok",
					disabled: providerSyncBusy,
					onClick: () => void submitProviderSync()
				}, providerSyncBusy ? text("applying", "保存中…") : text("fetchAdopt", "采用所选"))])
			])]) : null
		]);
	}
	function apply(ctx) {
		ctx.effect(() => {
			ensureStyles();
			const bootstrapped = getStatus().then((status) => {
				syncFilterState(status);
			}).catch(() => {});
			const disposers = [];
			const filterDirectoryResponse = (response) => {
				const targets = [];
				if (response && typeof response === "object") {
					if (response.result && typeof response.result === "object") targets.push(response.result);
					if (response.ok !== void 0 || response.value !== void 0) targets.push(response);
				}
				for (const r of targets) if (r && r.ok && r.value && typeof r.value === "object") {
					if (Array.isArray(r.value.groups)) r.value.groups = applyOrder(r.value.groups.filter((g) => !(g && isHiddenId(g.id))), filterState.order);
					if (Array.isArray(r.value.failures)) r.value.failures = r.value.failures.filter((f) => !(f && isHiddenId(f.id)));
				}
			};
			const filterProvidersResponse = (response) => {
				const targets = [];
				if (response && typeof response === "object") {
					if (response.result && typeof response.result === "object") targets.push(response.result);
					if (response.ok !== void 0 || response.value !== void 0) targets.push(response);
				}
				for (const r of targets) if (r && r.ok && r.value && Array.isArray(r.value.providers)) r.value.providers = r.value.providers.filter((p) => !(p && isHiddenId(p.provider)));
			};
			const wrapModels = (face, key, filter) => {
				if (!face || typeof face !== "object") return;
				const orig = face[key];
				if (typeof orig !== "function" || orig.__bmsWrapped) return;
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
				disposers.push(() => {
					if (face[key] === wrapped) face[key] = orig;
				});
			};
			const wrapSelectModel = (face) => {
				if (!face || typeof face !== "object") return;
				const orig = face.selectModel;
				if (typeof orig !== "function" || orig.__bmsSelectWrapped) return;
				const wrapped = async (request, ...rest) => {
					const eff = request && typeof request === "object" ? filterState.efforts[request.provider]?.[request.model] : void 0;
					if (typeof eff === "string" && eff.length > 0 && request && request.reasoningEffort === void 0) return orig.call(face, {
						...request,
						reasoningEffort: eff
					}, ...rest);
					return orig.call(face, request, ...rest);
				};
				wrapped.__bmsSelectWrapped = true;
				face.selectModel = wrapped;
				disposers.push(() => {
					if (face.selectModel === wrapped) face.selectModel = orig;
				});
			};
			const getConnection = () => {
				try {
					if (typeof ctx.get === "function") {
						const conn = ctx.get("connection");
						if (conn && typeof conn === "object") return conn;
					}
				} catch {}
				return ctx.connection;
			};
			const wrapFaces = () => {
				const conn = getConnection();
				const api = conn && typeof conn === "object" ? conn.api : void 0;
				if (!api || typeof api !== "object") return;
				if (api.llm && typeof api.llm === "object") {
					wrapModels(api.llm, "models", filterDirectoryResponse);
					wrapModels(api.llm, "providers", filterProvidersResponse);
				}
				wrapModels(api.sessions, "models", filterDirectoryResponse);
				wrapModels(api.session, "models", filterDirectoryResponse);
				wrapSelectModel(api.sessions);
				wrapSelectModel(api.session);
			};
			wrapFaces();
			if (typeof ctx.on === "function") ctx.on("connection/reset", wrapFaces);
			const disposeSlots = ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "models",
				order: 10,
				label: () => "模型",
				inject: () => ({ t: ctx.locale?.bind?.("better-model-setting") ?? ((s) => s) })
			}, (props) => {
				return react.default.createElement(BetterModelSettingPanel, { t: props.t });
			}));
			return () => {
				disposeSlots();
				for (const dispose of disposers) dispose();
			};
		}, "better-model-setting: register settings.section");
	}
	//#endregion
	exports.apply = apply;
	exports.inject = inject;
	return module.exports;
});

//# sourceMappingURL=client.js.map