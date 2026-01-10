// @ts-check

/**
 * @typedef {Object} ProxyState
 * @property {object} state                     – The proxied state object.
 * @property {(callback: (prop: string, value: any) => void) => void} onStateChange
 *                                            – Registers a listener that runs when the state changes.
 * @property {(callback: (prop: string, value: any) => void) => void} offStateChange
 *                                            – Unregisters a previously registered listener.
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
   *
   * @param {object} target – The object to proxy.
   * @returns {object}
   */
  function createProxy(target) {
    return new Proxy(target, {
      /**
       * Intercepts property assignments.
       *
       * @param {object} target          – The proxy's target object.
       * @param {string|symbol} prop     – The property name being set.
       * @param {*} value                – The new value.
       * @returns {boolean}
       */
      set(target, prop, value) {
        // @ts-ignore – allow symbols as keys
        target[prop] = value;
        listeners.forEach(cb => cb(String(prop), value));
        return true;
      },

      /**
       * Intercepts property reads.
       *
       * @param {object} target          – The proxy's target object.
       * @param {string|symbol} prop     – The property name being accessed.
       * @returns {*}
       */
      get(target, prop) {
        // Internal marker used to detect proxies
        if (prop === "_isProxy") return true;

        // If the value already has the marker, return it unchanged
        // @ts-ignore – dynamic property access
        if (target[prop]?._isProxy) return target[prop];

        // If the value is an object, wrap it recursively
        // @ts-ignore – dynamic property access
        if (target[prop] && typeof target[prop] === "object") {
          // @ts-ignore – we know it's an object
          return createProxy(target[prop]);
        }

        // Otherwise return the raw value
        // @ts-ignore – dynamic property access
        return target[prop];
      },
    });
  }

  return {
    /** @type {object} */
    state: createProxy(initialState),

    /**
     * Registers a callback that will be called on every state change.
     *
     * @param {(prop: string, value: any) => void} callback
     */
    onStateChange(callback) {
      listeners.push(callback);
    },

    /**
     * Removes a previously registered callback.
     *
     * @param {(prop: string, value: any) => void} callback
     */
    offStateChange(callback) {
      const idx = listeners.indexOf(callback);
      if (idx !== -1) listeners.splice(idx, 1);
    },
  };
}