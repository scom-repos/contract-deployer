var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@modules/module1", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Module1 = class Module1 extends components_1.Module {
        init() {
            super.init();
        }
        ;
        render() {
            return (this.$render("i-panel", { width: "100%", padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' } },
                this.$render("i-scom-contract-deployer-widget", { id: "contractDeployer", width: "100%", height: "100%", contract: this.options.contract })));
        }
    };
    Module1 = __decorate([
        components_1.customModule
    ], Module1);
    exports.default = Module1;
});
