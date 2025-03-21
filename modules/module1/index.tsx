import { Module, customModule } from '@ijstech/components';
import ScomContractDeployer from '@scom/contract-deployer-widget';

@customModule
export default class Module1 extends Module {
    private contractDeployer: ScomContractDeployer;

    init() {
        super.init();
    };

    render() {
        return (
            <i-panel width="100%" padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}>
                <i-scom-contract-deployer-widget
                    id="contractDeployer"
                    width="100%" height="100%"
                    contract={this.options.contract}
                />
            </i-panel>
        )
    }
}