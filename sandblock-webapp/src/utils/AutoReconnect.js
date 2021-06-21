

// Helps with auto-reconnection.
// N.B. Actual connection logic must be implemented outside,
// and be invoked if shouldReconnect() returns true.
class AutoReconnect {
    lastConnectKey = "lastConnected";
    timeout = 5 * 60 * 1000; // ms (min * 60s * 1000ms)
    timerId;

    onConnect() {
        localStorage.setItem(this.lastConnectKey, Date.now().toString());
        const refreshTimeout = this.timeout * 0.9; // Make a little bit smaller
        // console.log("setting timer to refresh at " + Date.now().toString() + refreshTimeout.toString())
        this.timerId = setTimeout(() => {
            // Repeteadly refresh expiration timeout
            this.onConnect();
        }, refreshTimeout);
    }

    onDisconnect() {
        localStorage.removeItem(this.lastConnectKey);
        clearTimeout(this.timerId);
    }

    shouldReconnect() {
        let result = false;
        const lastConnection = localStorage.getItem(this.lastConnectKey);
        if (lastConnection) {
            // If last connection is found and is less than the timeout, should reconnect
            if (Date.now() - Number(lastConnection) <= this.timeout) {
                result = true;
            }
        }
        return result;
    }
}

export default AutoReconnect;