// @ts-check

/**
 * @typedef {object} ProxyState
 * @property {*} state                – The proxied state object.
 * @property {(callback: (prop: string, value: any) => void) => void} onStateChange
 *                                    – Registers a listener that runs when the state changes.
 * @property {(callback: (prop: string, value: any) => void) => void} offStateChange
 *                                    – Unregisters a previously registered listener.
 */

/**
 * Creates a proxied state object.
 *
 * @param {object} initialState – Plain JavaScript object containing the initial state.
 * @returns {ProxyState}
 */
export function createState(initialState) {

  /** @type {Array<(prop: string, value: any) => void>} */
  const listeners = [];

  /**
   * Recursively creates a proxy around an object.
   * @param {object} target – The object to proxy.
   * @returns {Proxy}
   */
  function createProxy(target) {
    return new Proxy(target, {
      /**
       * @param {*} target               – The proxy's target object.
       * @param {string|symbol} prop     – The property name being set.
       * @param {*} value                – The new value.
       * @returns {boolean}
       */
      set(target, prop, value) {
        target[prop] = value;
        listeners.forEach(callback => callback(String(prop), value));
        return true;
      },
      /**
       * @param {*} target             – The proxy's target object.
       * @param {string|symbol} prop   – The property name being accessed.
       * @returns {*}
       */
      get(target, prop) {
        // from Chris Ferdinandi : https://gomakethings.com/guides/proxies/nesting/ 
        if (prop === '_isProxy') return true;
        if (target[prop]?._isProxy) return target[prop];
        if (target[prop] && typeof target[prop] === 'object') return createProxy(target[prop]);
        return target[prop];
      },
    });
  }
  
  return {
    state: createProxy(initialState),
    onStateChange(callback) {
      listeners.push(callback);
    },
    offStateChange(callback) {
      const index = listeners.indexOf(callback);
      if (index !== -1) listeners.splice(index, 1);
    }
  };
}