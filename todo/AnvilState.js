class AnvilState {

  #listeners = {
		change : {},
		add : {},
    remove : {}  
  }
  
  constructor(initialState) {
		this.state = this.#createProxy(initialState);
  }
  
  #getListeners(action, prefix, prop) {
    let pattern = prefix.replaceAll(/([^.]+)(\.|$)/g, "($1|\\*)$2\\.");
		let reg = new RegExp(`${pattern}(${prop}|\\*)`);
		  
		return Object.entries(this.#listeners[action])
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
				this.#getListeners("change", prefix, prop).forEach(callback => callback(propName, prevValue, value));
				return true;
			},
			get : (state, prop) => {
				if (prop === "_isProxy") return true;
				else if (state[prop]?._isProxy) return state[prop];
				else if (state[prop] && typeof state[prop] === "object") {
					let prefixName = this.#getPropName(prefix, prop);
					return this.#createProxy(state[prop], prefixName);
				} else return state[prop];
			},
			defineProperty : (state, prop, value) => {
				console.log("add", prefix, prop, value);
				let prevValue = state[value];
				let propName = this.#getPropName(prefix, prop);
				state[prop] = value;
				this.#getListeners("add", prefix, prop).forEach(callback => callback(propName, prevValue, value));
				return true;
			},
			deleteProperty : (state, prop) => {
				console.log("delete", prefix, prop);
				let prevValue = state[prop];
				let propName = this.#getPropName(prefix, prop);
				delete state[prop];
				this.#getListeners("remove", prefix, prop).forEach(callback => callback(propName, prevValue));
				return true;
			}
    });
  }
  
  #checkAction(action) {
	if (!(action in this.#listeners)) throw new Error(action + " : unknown action ('add', 'change', 'remove' required)");
  }
  
  subscribe = ({ action = "change", prop = "*", callback }) => {
	this.#checkAction(action);
	if (!this.#listeners[action][prop]) this.#listeners[action][prop] = [];
	this.#listeners[action][prop].push(callback);
  }

  unsubscribe = ({ action = "change", prop = "*", callback }) => {
	this.#checkAction(action);
	if (!this.#listeners[action][prop]) return;
    let index = this.#listeners[action][prop].findIndex(listener => listener === callback);
    this.#listeners[action][prop].splice(index,1);
  }
}

export const { state, subscribe, unsubscribe } = new AnvilState([{ label : "buy a unicorn", done : false }])