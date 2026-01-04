export class State {

  #listeners = {}
  
  constructor(initialState) {
		this.state = this.#createProxy(initialState);
  }
  
  #getListeners(prefix, prop) {
    let pattern = prefix.replaceAll(/([^.]+)(\.|$)/g, "($1|\\*)$2\\.");
		let reg = new RegExp(`${pattern}(${prop}|\\*)`);
		  
		return Object.entries(this.#listeners)
			.filter(([name, value]) => reg.test(name))
			.flatMap(([name, value]) => value);
  }
  
  #getPropName(prefix, prop) {
		return prefix ? prefix + "." + prop : prop;
  }
    
  #createProxy(state, prefix = "") {
		return new Proxy(state, {
			set : (state, prop, value) => {
				let prevValue = state[value];
				let propName = this.#getPropName(prefix, prop);
				state[prop] = value;
				this.#getListeners(prefix, prop).forEach(callback => callback(propName, prevValue, value));
				return true;
			},
			get : (state, prop) => {
				if (prop === "_isProxy") return true;
				else if (state[prop]?._isProxy) return state[prop];
				else if (state[prop] && typeof state[prop] === "object") {
					let prefixName = this.#getPropName(prefix, prop);
					return this.#createProxy(state[prop], prefixName);
				} else return state[prop];
			}
    });
  }
  
	subscribe = (prop, callback) => {
		if (!this.#listeners[prop]) this.#listeners[prop] = [];
		this.#listeners[prop].push(callback);
  }

  unsubscribe = (prop, callback) => {
		if (!this.#listeners[prop]) return;
		let index = this.#listeners[prop].findIndex(listener => listener === callback);
		this.#listeners[prop].splice(index,1);
	}
}
