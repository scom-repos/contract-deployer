/// <reference path="@ijstech/eth-wallet/index.d.ts" />
/// <amd-module name="@scom/scom-dapp-container/interface.ts" />
declare module "@scom/scom-dapp-container/interface.ts" {
    import { IClientSideProvider, INetwork } from "@ijstech/eth-wallet";
    interface IWalletPlugin {
        name: string;
        packageName?: string;
        provider?: IClientSideProvider;
    }
    enum WidgetType {
        Standalone = 0,
        Embed = 1
    }
    interface IDappContainerData {
        defaultChainId?: number;
        networks?: INetworkConfig[];
        wallets?: IWalletPlugin[];
        showHeader?: boolean;
        showFooter?: boolean;
        showWalletNetwork?: boolean;
        rpcWalletId?: string;
        widgetType?: WidgetType;
    }
    interface IPageBlockData {
        name: string;
        description: string;
        ipfscid: string;
        imgUrl: string;
        localPath?: string;
    }
    interface ICodeInfoFileContent {
        version: ISemanticVersion;
        codeCID: string;
        source: string;
    }
    interface ISemanticVersion {
        major: number;
        minor: number;
        patch: number;
    }
    enum EVENT {
        'UPDATE_TAG' = "UPDATE_TAG"
    }
    interface IExtendedNetwork extends INetwork {
        symbol?: string;
        env?: string;
        explorerName?: string;
        explorerTxUrl?: string;
        explorerAddressUrl?: string;
        isDisabled?: boolean;
    }
    interface INetworkConfig {
        chainName?: string;
        chainId: number;
    }
    interface ITheme {
        fontColor: string;
        backgroundColor: string;
        inputFontColor: string;
        inputBackgroundColor: string;
        buttonBackgroundColor: string;
        buttonFontColor: string;
        modalColor: string;
        secondaryColor: string;
        secondaryFontColor: string;
        textSecondary: string;
        primaryButtonBackground: string;
        primaryButtonHoverBackground: string;
        primaryButtonDisabledBackground: string;
        maxButtonBackground: string;
        maxButtonHoverBackground: string;
    }
    export { IWalletPlugin, WidgetType, IPageBlockData, IDappContainerData, ICodeInfoFileContent, EVENT, IExtendedNetwork, INetworkConfig, ITheme };
}
/// <amd-module name="@scom/scom-dapp-container/index.css.ts" />
declare module "@scom/scom-dapp-container/index.css.ts" {
    const _default: string;
    export default _default;
}
/// <amd-module name="@scom/scom-dapp-container/body.tsx" />
declare module "@scom/scom-dapp-container/body.tsx" {
    import { ControlElement, Module } from "@ijstech/components";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['dapp-container-body']: ControlElement;
            }
        }
    }
    export class DappContainerBody extends Module {
        private pnlModule;
        private module;
        private isLoading;
        isInited: boolean;
        clear(): void;
        getModule(): any;
        setModule(module: Module): void;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-dapp-container/utils/pathToRegexp.ts" />
declare module "@scom/scom-dapp-container/utils/pathToRegexp.ts" {
    export interface ParseOptions {
        /**
         * Set the default delimiter for repeat parameters. (default: `'/'`)
         */
        delimiter?: string;
        /**
         * List of characters to automatically consider prefixes when parsing.
         */
        prefixes?: string;
    }
    /**
     * Parse a string for the raw tokens.
     */
    export function parse(str: string, options?: ParseOptions): Token[];
    export interface TokensToFunctionOptions {
        /**
         * When `true` the regexp will be case sensitive. (default: `false`)
         */
        sensitive?: boolean;
        /**
         * Function for encoding input strings for output.
         */
        encode?: (value: string, token: Key) => string;
        /**
         * When `false` the function can produce an invalid (unmatched) path. (default: `true`)
         */
        validate?: boolean;
    }
    /**
     * Compile a string to a template function for the path.
     */
    export function compile<P extends object = object>(str: string, options?: ParseOptions & TokensToFunctionOptions): PathFunction<P>;
    export type PathFunction<P extends object = object> = (data?: P) => string;
    /**
     * Expose a method for transforming tokens into the path function.
     */
    export function tokensToFunction<P extends object = object>(tokens: Token[], options?: TokensToFunctionOptions): PathFunction<P>;
    export interface RegexpToFunctionOptions {
        /**
         * Function for decoding strings for params.
         */
        decode?: (value: string, token: Key) => string;
    }
    /**
     * A match result contains data about the path match.
     */
    export interface MatchResult<P extends object = object> {
        path: string;
        index: number;
        params: P;
    }
    /**
     * A match is either `false` (no match) or a match result.
     */
    export type Match<P extends object = object> = false | MatchResult<P>;
    /**
     * The match function takes a string and returns whether it matched the path.
     */
    export type MatchFunction<P extends object = object> = (path: string) => Match<P>;
    /**
     * Create path match function from `path-to-regexp` spec.
     */
    export function match<P extends object = object>(str: Path, options?: ParseOptions & TokensToRegexpOptions & RegexpToFunctionOptions): MatchFunction<P>;
    /**
     * Create a path match function from `path-to-regexp` output.
     */
    export function regexpToFunction<P extends object = object>(re: RegExp, keys: Key[], options?: RegexpToFunctionOptions): MatchFunction<P>;
    /**
     * Metadata about a key.
     */
    export interface Key {
        name: string | number;
        prefix: string;
        suffix: string;
        pattern: string;
        modifier: string;
    }
    /**
     * A token is a string (nothing special) or key metadata (capture group).
     */
    export type Token = string | Key;
    export interface TokensToRegexpOptions {
        /**
         * When `true` the regexp will be case sensitive. (default: `false`)
         */
        sensitive?: boolean;
        /**
         * When `true` the regexp won't allow an optional trailing delimiter to match. (default: `false`)
         */
        strict?: boolean;
        /**
         * When `true` the regexp will match to the end of the string. (default: `true`)
         */
        end?: boolean;
        /**
         * When `true` the regexp will match from the beginning of the string. (default: `true`)
         */
        start?: boolean;
        /**
         * Sets the final character for non-ending optimistic matches. (default: `/`)
         */
        delimiter?: string;
        /**
         * List of characters that can also be "end" characters.
         */
        endsWith?: string;
        /**
         * Encode path tokens for use in the `RegExp`.
         */
        encode?: (value: string) => string;
    }
    /**
     * Expose a function for taking tokens and returning a RegExp.
     */
    export function tokensToRegexp(tokens: Token[], keys?: Key[], options?: TokensToRegexpOptions): RegExp;
    /**
     * Supported `path-to-regexp` input types.
     */
    export type Path = string | RegExp | Array<string | RegExp>;
    /**
     * Normalize the given path string, returning a regular expression.
     *
     * An empty array can be passed in for the keys, which will hold the
     * placeholder key descriptions. For example, using `/user/:id`, `keys` will
     * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
     */
    export function pathToRegexp(path: Path, keys?: Key[], options?: TokensToRegexpOptions & ParseOptions): RegExp;
}
/// <amd-module name="@scom/scom-dapp-container/utils/theme.ts" />
declare module "@scom/scom-dapp-container/utils/theme.ts" {
    export const darkTheme: {
        background: {
            main: string;
            modal: string;
            gradient: string;
        };
        input: {
            background: string;
            fontColor: string;
        };
        text: {
            primary: string;
            secondary: string;
        };
        colors: {
            primary: {
                main: string;
                contrastText: string;
            };
            secondary: {
                main: string;
                contrastText: string;
            };
        };
        buttons: {
            primary: {
                background: string;
                hoverBackground: string;
                disabledBackground: string;
            };
            secondary: {
                background: string;
                hoverBackground: string;
                disabledBackground: string;
            };
        };
    };
    export const lightTheme: {
        background: {
            modal: string;
            main: string;
        };
        input: {
            background: string;
            fontColor: string;
        };
        text: {
            primary: string;
            secondary: string;
        };
        colors: {
            primary: {
                main: string;
                contrastText: string;
            };
            secondary: {
                main: string;
                contrastText: string;
            };
        };
        buttons: {
            primary: {
                background: string;
                hoverBackground: string;
                disabledBackground: string;
            };
            secondary: {
                background: string;
                hoverBackground: string;
                disabledBackground: string;
            };
        };
    };
    export const embedTheme: {
        background: {
            main: string;
            modal: string;
            gradient: string;
        };
        input: {
            background: string;
            fontColor: string;
        };
        text: {
            primary: string;
            secondary: string;
        };
        colors: {
            primary: {
                main: string;
                contrastText: string;
            };
            secondary: {
                main: string;
                contrastText: string;
            };
        };
        buttons: {
            primary: {
                background: string;
                hoverBackground: string;
                disabledBackground: string;
            };
            secondary: {
                background: string;
                hoverBackground: string;
                disabledBackground: string;
            };
        };
    };
}
/// <amd-module name="@scom/scom-dapp-container/utils/index.ts" />
declare module "@scom/scom-dapp-container/utils/index.ts" {
    import { BigNumber } from '@ijstech/eth-wallet';
    import { match, MatchFunction } from "@scom/scom-dapp-container/utils/pathToRegexp.ts";
    import { Control } from '@ijstech/components';
    const formatNumber: (value: number | string | BigNumber, decimalFigures?: number) => string;
    function getThemeVars(themeVars: any): {
        fontColor: any;
        backgroundColor: any;
        inputFontColor: any;
        inputBackgroundColor: any;
        buttonBackgroundColor: any;
        buttonFontColor: any;
        modalColor: any;
        secondaryColor: any;
        secondaryFontColor: any;
        textSecondary: any;
        primaryButtonBackground: any;
        primaryButtonHoverBackground: any;
        primaryButtonDisabledBackground: any;
        maxButtonBackground: any;
        maxButtonHoverBackground: any;
    };
    function updateTheme(target: Control, theme: any): void;
    export { formatNumber, getThemeVars, updateTheme, match, MatchFunction };
    export * from "@scom/scom-dapp-container/utils/theme.ts";
}
/// <amd-module name="@scom/scom-dapp-container/header.css.ts" />
declare module "@scom/scom-dapp-container/header.css.ts" {
    export const walletModalStyle: string;
    const _default_1: string;
    export default _default_1;
}
/// <amd-module name="@scom/scom-dapp-container/store/index.ts" />
declare module "@scom/scom-dapp-container/store/index.ts" {
    import { IClientSideProvider, ISendTxEventsOptions, IWallet } from '@ijstech/eth-wallet';
    import { IDappContainerData, IExtendedNetwork, IWalletPlugin } from "@scom/scom-dapp-container/interface.ts";
    export enum WalletPlugin {
        MetaMask = "metamask",
        WalletConnect = "walletconnect"
    }
    export const enum EventId {
        ConnectWallet = "connectWallet",
        IsWalletConnected = "isWalletConnected",
        chainChanged = "chainChanged",
        IsWalletDisconnected = "IsWalletDisconnected"
    }
    export function isClientWalletConnected(): boolean;
    export function connectWallet(state: State, walletPlugin: string, triggeredByUser?: boolean): Promise<IWallet>;
    export function switchNetwork(state: State, chainId: number): Promise<void>;
    export function logoutWallet(): Promise<void>;
    export function registerSendTxEvents(sendTxEventHandlers: ISendTxEventsOptions): void;
    export function getWallet(): IWallet;
    export function getWalletProvider(): string;
    export class State {
        networkMap: {
            [key: number]: IExtendedNetwork;
        };
        defaultChainId: number;
        infuraId: string;
        wallets: IWalletPlugin[];
        walletPluginMap: Record<string, IWalletPlugin>;
        rpcWalletId: string;
        isFirstLoad: boolean;
        constructor();
        update(data: IDappContainerData): void;
        initWalletPlugins(): Promise<void>;
        private setNetworkList;
        getSupportedWalletProviders(): IClientSideProvider[];
        getSiteSupportedNetworks(): IExtendedNetwork[];
        getNetworkInfo: (chainId: number) => IExtendedNetwork | undefined;
        getWalletPluginProvider(name: string): IClientSideProvider;
        getRpcWallet(): import("@ijstech/eth-wallet").IRpcWallet;
        getChainId(): number;
        hasMetaMask(): boolean;
    }
    export const viewOnExplorerByTxHash: (state: State, chainId: number, txHash: string) => void;
    export const viewOnExplorerByAddress: (state: State, chainId: number, address: string) => void;
}
/// <amd-module name="@scom/scom-dapp-container/translations.json.ts" />
declare module "@scom/scom-dapp-container/translations.json.ts" {
    const _default_2: {
        en: {
            account: string;
            connect_wallet: string;
            connect: string;
            connected_with: string;
            copy_address: string;
            logout: string;
            no_address_selected: string;
            powered_by: string;
            recommended_wallet_for_chrome: string;
            supported_networks: string;
            switch_wallet: string;
            the_address_has_been_copied: string;
            unsupported_network: string;
            view_on_explorer: string;
            we_support_the_following_networks_please_click_to_connect: string;
            we_support_the_following_networks_please_switch_network_in_the_connected_wallet: string;
        };
        "zh-hant": {
            account: string;
            connect_wallet: string;
            connect: string;
            connected_with: string;
            copy_address: string;
            logout: string;
            no_address_selected: string;
            powered_by: string;
            recommended_wallet_for_chrome: string;
            supported_networks: string;
            switch_wallet: string;
            the_address_has_been_copied: string;
            unsupported_network: string;
            view_on_explorer: string;
            we_support_the_following_networks_please_click_to_connect: string;
            we_support_the_following_networks_please_switch_network_in_the_connected_wallet: string;
        };
        vi: {
            account: string;
            connect_wallet: string;
            connect: string;
            connected_with: string;
            copy_address: string;
            logout: string;
            no_address_selected: string;
            powered_by: string;
            recommended_wallet_for_chrome: string;
            supported_networks: string;
            switch_wallet: string;
            the_address_has_been_copied: string;
            unsupported_network: string;
            view_on_explorer: string;
            we_support_the_following_networks_please_click_to_connect: string;
            we_support_the_following_networks_please_switch_network_in_the_connected_wallet: string;
        };
    };
    export default _default_2;
}
/// <amd-module name="@scom/scom-dapp-container/connectWalletModule.tsx" />
declare module "@scom/scom-dapp-container/connectWalletModule.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { State } from "@scom/scom-dapp-container/store/index.ts";
    interface ConnectWalletElement extends ControlElement {
        onWalletConnected?: () => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['dapp-container-connect-wallet-module']: ConnectWalletElement;
            }
        }
    }
    export class ConnectWalletModule extends Module {
        private state;
        private gridWalletList;
        private walletMapper;
        private currActiveWallet;
        onWalletConnected: () => void;
        setState(state: State): void;
        openLink(link: any): Window;
        connectToProviderFunc: (walletPlugin: string) => Promise<void>;
        isWalletActive(walletPlugin: any): boolean;
        updateDot(connected: boolean): void;
        renderWalletList(): Promise<void>;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-dapp-container/header.tsx" />
declare module "@scom/scom-dapp-container/header.tsx" {
    import { Module, Control, ControlElement, Container } from '@ijstech/components';
    import { State } from "@scom/scom-dapp-container/store/index.ts";
    export class DappContainerHeader extends Module {
        private state;
        private pnlNetwork;
        private imgNetwork;
        private lblNetwork;
        private pnlNetworkMobile;
        private iconNetwork;
        private hsBalance;
        private lblBalance;
        private pnlWalletDetail;
        private pnlWalletAddress;
        private lblWalletAddress;
        private pnlWalletMobile;
        private mdWalletDetail;
        private btnConnectWallet;
        private mdNetwork;
        private connectWalletModule;
        private mdAccount;
        private lblNetworkDesc;
        private lblWalletAddress2;
        private hsViewAccount;
        private gridNetworkGroup;
        private switchTheme;
        private pnlWallet;
        private $eventBus;
        private selectedNetwork;
        private networkMapper;
        private currActiveNetworkId;
        private supportedNetworks;
        isInited: boolean;
        private walletInfo;
        private _showWalletNetwork;
        private walletEvents;
        private observer;
        private _theme;
        constructor(parent?: Container, options?: any);
        get theme(): any;
        set theme(value: any);
        get symbol(): string;
        get shortlyAddress(): string;
        get showWalletNetwork(): boolean;
        set showWalletNetwork(value: boolean);
        set enableThemeToggle(value: boolean);
        onHide(): void;
        registerEvent(): void;
        init(): Promise<void>;
        setState(state: State): void;
        reloadWalletsAndNetworks(): Promise<void>;
        onChainChanged: (chainId: number) => Promise<void>;
        updateConnectedStatus: (isConnected: boolean) => Promise<void>;
        updateDot(connected: boolean, type: 'network' | 'wallet'): void;
        updateList(isConnected: boolean): void;
        private initConnectWalletModule;
        openConnectModal: () => void;
        openNetworkModal: () => void;
        openWalletDetailModal: () => void;
        openAccountModal: (target: Control, event: Event) => void;
        openSwitchModal: (target: Control, event: Event) => void;
        logout: (target: Control, event: Event) => Promise<void>;
        viewOnExplorerByAddress(): void;
        switchNetwork(chainId: number): Promise<void>;
        copyWalletAddress: () => void;
        isWalletActive(walletPlugin: any): boolean;
        isNetworkActive(chainId: number): boolean;
        renderNetworks(): void;
        private onThemeChanged;
        private initTheme;
        render(): any;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['dapp-container-header']: ControlElement;
            }
        }
    }
}
/// <amd-module name="@scom/scom-dapp-container/footer.tsx" />
declare module "@scom/scom-dapp-container/footer.tsx" {
    import { Module, ControlElement, Control } from '@ijstech/components';
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['dapp-container-footer']: ControlElement;
            }
        }
    }
    export class DappContainerFooter extends Module {
        private _footer;
        private lblFooter;
        constructor(parent?: any);
        init(): void;
        get footer(): Control;
        set footer(value: Control);
        render(): any;
    }
}
/// <amd-module name="@scom/scom-dapp-container" />
declare module "@scom/scom-dapp-container" {
    import { ControlElement, Module, Container } from "@ijstech/components";
    import { IWalletPlugin, IDappContainerData, WidgetType } from "@scom/scom-dapp-container/interface.ts";
    export { DappContainerBody } from "@scom/scom-dapp-container/body.tsx";
    export { DappContainerHeader } from "@scom/scom-dapp-container/header.tsx";
    export { DappContainerFooter } from "@scom/scom-dapp-container/footer.tsx";
    export { WidgetType };
    interface INetworkConfig {
        chainName?: string;
        chainId: number;
    }
    interface ScomDappElement extends ControlElement {
        lazyLoad?: boolean;
        networks?: INetworkConfig[];
        wallets?: IWalletPlugin[];
        showHeader?: boolean;
        showFooter?: boolean;
        showWalletNetwork?: boolean;
        rpcWalletId?: string;
        widgetType?: WidgetType;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-dapp-container"]: ScomDappElement;
            }
        }
    }
    export default class ScomDappContainer extends Module {
        private state;
        private pnlLoading;
        private gridMain;
        private dappContainerHeader;
        private dappContainerBody;
        private dappContainerFooter;
        private _data;
        private _rootDir;
        private isInited;
        private _theme;
        tag: any;
        constructor(parent?: Container, options?: any);
        set theme(value: string);
        get theme(): string;
        isEmptyData(value: IDappContainerData): boolean;
        private initData;
        init(): Promise<void>;
        onHide(): void;
        static create(options?: ScomDappElement, parent?: Container): Promise<ScomDappContainer>;
        get networks(): INetworkConfig[];
        set networks(value: INetworkConfig[]);
        get wallets(): IWalletPlugin[];
        set wallets(value: IWalletPlugin[]);
        get showHeader(): boolean;
        set showHeader(value: boolean);
        get showFooter(): boolean;
        set showFooter(value: boolean);
        get widgetType(): WidgetType;
        set widgetType(value: WidgetType);
        get showWalletNetwork(): boolean;
        set showWalletNetwork(value: boolean);
        setRootDir(value: string): void;
        getRootDir(): string;
        getData(): Promise<IDappContainerData>;
        setData(data: IDappContainerData): Promise<void>;
        getModule(): any;
        setModule(module: Module): void;
        getTag(): any;
        private updateTag;
        setTag(value: any): void;
        initTag(value: any): void;
        render(): any;
    }
}
