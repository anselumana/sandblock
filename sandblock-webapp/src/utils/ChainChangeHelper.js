

// Helps with auto-reconnection.
// N.B. Actual connection logic must be implemented outside,
// and be invoked if shouldReconnect() returns true.
class ChainChangeHelper {
    isFirstChange = true;
    lastChainId;

    hasChanged(chainId) {
        let changed = false;
        if (chainId) {
            if (this.isFirstChange) {
                // Do nothing, means it's the first connect
                this.isFirstChange = false;
            }
            else {
                if (chainId !== this.lastChainId) {
                    changed = true;
                    this.lastChainId = chainId;
                }
            }
        }
        return changed;
    }

    reset() {
        this.isFirstChange = true;
        this.lastChainId = undefined;
    }
}

export default ChainChangeHelper;