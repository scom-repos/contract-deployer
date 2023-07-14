var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@modules/module1/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = components_1.Styles.style({
        $nest: {
            'textarea': {
                border: 'none',
                outline: 'none'
            },
            '.preview-wrap': {
                whiteSpace: 'pre-wrap'
            },
            '.prevent-select': {
                userSelect: 'none',
                "-webkit-user-select": "none"
            }
        }
    });
});
define("@modules/module1", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@modules/module1/index.css.ts"], function (require, exports, components_2, eth_wallet_1, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    let Module1 = class Module1 extends components_2.Module {
        renderDeployResult(content) {
            const newContent = content.replace(/(<)(.*)(>)/g, '&lt$2&gt');
            this.logs.append(this.$render("i-label", { caption: newContent }));
        }
        init() {
            super.init();
            if (this.options.contract) {
                components_2.RequireJS.require([this.options.contract], (contract) => {
                    if (contract.DefaultDeployOptions) {
                        this.codeEditorOptions.value = JSON.stringify(contract.DefaultDeployOptions, null, 4);
                    }
                });
            }
            ;
        }
        ;
        deploy() {
            this.pnlPreview.visible = true;
            if (this.options.contract) {
                components_2.RequireJS.require([this.options.contract], async (contract) => {
                    if (contract.onProgress) {
                        contract.onProgress((msg) => {
                            this.renderDeployResult(msg);
                        });
                    }
                    ;
                    let options = {};
                    if (this.codeEditorOptions.value)
                        options = JSON.parse(this.codeEditorOptions.value);
                    this.renderDeployResult('Contracts deployment start');
                    await eth_wallet_1.Wallet.getClientInstance().init();
                    let result = await contract.deploy(eth_wallet_1.Wallet.getInstance(), options, (msg) => {
                        this.renderDeployResult(msg);
                    });
                    this.renderDeployResult('Contracts deployment finished');
                    this.codeEditorResult.value = JSON.stringify(result, null, 4);
                });
            }
            ;
        }
        ;
        render() {
            return (this.$render("i-panel", { class: index_css_1.default, width: "100%", padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' } },
                this.$render("i-grid-layout", { width: "100%", height: "100%", gap: { column: '1rem', row: '1rem' }, overflow: "hidden", templateColumns: ['55%', '1fr'], mediaQueries: [
                        {
                            maxWidth: '1150px',
                            properties: {
                                templateColumns: ['1fr', '1fr']
                            }
                        },
                        {
                            maxWidth: '875px',
                            properties: {
                                templateColumns: ['1fr']
                            }
                        }
                    ] },
                    this.$render("i-tabs", { width: "100%", height: "100%" },
                        this.$render("i-tab", { caption: "Options", font: { size: '1em' } },
                            this.$render("i-panel", { height: "100%", width: "100%", minHeight: 500, position: 'relative' },
                                this.$render("i-code-editor", { id: "codeEditorOptions", height: "100%", width: "100%", position: "absolute", language: 'json' }))),
                        this.$render("i-tab", { caption: "Result", font: { size: '1em' } },
                            this.$render("i-panel", { height: "100%", width: "100%", minHeight: 500, position: 'relative' },
                                this.$render("i-code-editor", { id: "codeEditorResult", height: "100%", width: "100%", position: "absolute", language: 'json' })))),
                    this.$render("i-vstack", { height: "100%", gap: "1rem" },
                        this.$render("i-hstack", null,
                            this.$render("i-button", { caption: "Deploy", padding: { top: '0.25rem', bottom: '0.25rem', left: '1rem', right: '1rem' }, onClick: this.deploy.bind(this) })),
                        this.$render("i-panel", { id: "pnlPreview", class: "preview-wrap", visible: false, border: { width: 1, style: 'solid', color: Theme.divider, radius: 5 }, padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' } },
                            this.$render("i-vstack", { id: "logs", gap: "5px", margin: { bottom: 4 } }))))));
        }
    };
    Module1 = __decorate([
        components_2.customModule
    ], Module1);
    exports.default = Module1;
});
