/// <amd-module name="@scom/contract-deployer-widget/interface.ts" />
declare module "@scom/contract-deployer-widget/interface.ts" {
    import { IClientSideProvider, INetwork } from '@ijstech/eth-wallet';
    export interface IExtendedNetwork extends INetwork {
        symbol?: string;
        env?: string;
        explorerName?: string;
        explorerTxUrl?: string;
        explorerAddressUrl?: string;
        isDisabled?: boolean;
    }
    export interface INetworkConfig {
        chainName?: string;
        chainId: number;
    }
    export enum WalletPlugin {
        MetaMask = "metamask",
        WalletConnect = "walletconnect",
        Email = "email",
        Google = "google",
        Ton = "tonwallet"
    }
    export interface IWalletPlugin {
        name: string;
        displayName?: string;
        image?: string;
        packageName?: string;
        provider: IClientSideProvider;
    }
}
/// <amd-module name="@scom/contract-deployer-widget/index.css.ts" />
declare module "@scom/contract-deployer-widget/index.css.ts" {
    const _default: string;
    export default _default;
}
/// <amd-module name="@scom/contract-deployer-widget/store.ts" />
declare module "@scom/contract-deployer-widget/store.ts" {
    export const setWalletModel: (value: any) => void;
    export const getWalletModel: () => any;
}
/// <amd-module name="@scom/contract-deployer-widget/deployer.tsx" />
declare module "@scom/contract-deployer-widget/deployer.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-contract-deployer-widget--deployer']: DeployerElement;
            }
        }
    }
    interface IDeployData {
        contract: string;
        script?: string;
    }
    interface DeployerElement extends ControlElement {
        contract?: string;
        script?: string;
    }
    export default class ScomContractDeployerDeployer extends Module {
        private codeEditorOptions;
        private codeEditorResult;
        private pnlPreview;
        private logs;
        private _data;
        get contract(): string;
        set contract(value: string);
        get script(): string;
        set script(value: string);
        setData(value: IDeployData): Promise<void>;
        renderDeployResult(content: string): void;
        init(): void;
        deploy(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/contract-deployer-widget/defaultData.ts" />
declare module "@scom/contract-deployer-widget/defaultData.ts" {
    const _default_1: {
        infuraId: string;
        defaultData: {
            baseStripeApi: string;
            returnUrl: string;
            defaultChainId: number;
            networks: {
                chainId: number;
            }[];
            wallets: {
                name: string;
            }[];
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/contract-deployer-widget" />
declare module "@scom/contract-deployer-widget" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    import { INetworkConfig, IWalletPlugin } from "@scom/contract-deployer-widget/interface.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-contract-deployer-widget']: ContractDeployerElement;
            }
        }
    }
    interface ContractDeployerElement extends ControlElement {
        networks?: INetworkConfig[];
        wallets?: IWalletPlugin[];
        contract?: string;
        script?: string;
        defaultChainId?: number;
    }
    interface IData {
        networks?: INetworkConfig[];
        wallets?: IWalletPlugin[];
        contract?: string;
        script?: string;
        defaultChainId?: number;
    }
    export default class ScomContractDeployer extends Module {
        private dappContainer;
        private deployer;
        private _data;
        private rpcWalletId;
        constructor(parent?: Container, options?: any);
        get networks(): INetworkConfig[];
        set networks(value: INetworkConfig[]);
        get wallets(): any[];
        set wallets(value: any[]);
        get contract(): string;
        set contract(value: string);
        get defaultChainId(): number;
        set defaultChainId(value: number);
        get script(): string;
        set script(value: string);
        setData(data: IData): Promise<void>;
        private initRpcWallet;
        init(): Promise<void>;
        render(): any;
    }
}
