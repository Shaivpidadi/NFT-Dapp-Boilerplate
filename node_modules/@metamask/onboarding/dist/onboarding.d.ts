/**
 * A library to initiate the MetaMask onboarding process.
 *
 * @remarks
 * See {@link https://docs.metamask.io/guide/onboarding-library.html|the MetaMask Docs website} for usage information.
 *
 * @packageDocumentation
 */


/**
 * @internal
 */
declare enum FORWARDER_MODE {
    INJECT = "INJECT",
    OPEN_TAB = "OPEN_TAB"
}

/**
 * @public
 */
declare class Onboarding {
    /**
     * @public
     */
    static FORWARDER_MODE: typeof FORWARDER_MODE;
    private readonly forwarderOrigin;
    private readonly downloadUrl;
    private readonly forwarderMode;
    private state;
    /**
     * @param forwarderOrigin - the origin to use
     * @param forwarderMode - the forwarder mode from {@link Onboarding.FORWARDER_MODE}
     *
     * @public
     */
    constructor({ forwarderOrigin, forwarderMode }?: {
        forwarderOrigin?: string | undefined;
        forwarderMode?: FORWARDER_MODE | undefined;
    });
    /**
     * @internal
     */
    _onMessage(event: MessageEvent): Promise<void> | undefined;
    /**
     * @internal
     */
    _onMessageFromForwarder(event: MessageEvent): Promise<void>;
    /**
     * Starts onboarding by opening the MetaMask download page and the Onboarding forwarder
     *
     * @public
     */
    startOnboarding(): void;
    /**
     * Stops onboarding registration, including removing the injected forwarder (if any)
     *
     * @remarks
     * Typically this function is not necessary, but it can be useful for cases where
     * onboarding completes before the forwarder has registered.
     *
     * @public
     */
    stopOnboarding(): void;
    /**
     * @internal
     */
    _openForwarder(): void;
    /**
     * @internal
     */
    _openDownloadPage(): void;
    /**
     * Checks whether the MetaMask extension is installed
     *
     * @public
     */
    static isMetaMaskInstalled(): boolean;
    /**
     * @internal
     */
    static _register(): any;
    /**
     * @internal
     */
    static _injectForwarder(forwarderOrigin: string): void;
    /**
     * @internal
     */
    static _removeForwarder(): void;
    /**
     * @internal
     */
    static _detectBrowser(): "FIREFOX" | "CHROME" | null;
}
export default Onboarding;

export { }
