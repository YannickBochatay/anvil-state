let listeners = [];

function createState(state) {
  return new Proxy(state, {
    set : (state, prop, value) => {
      let prevValue = state[value];
      state[prop] = value;
      listeners.forEach(callback => callback(prop, prevValue, value));
      return true;
    },
    get : (state, prop) => {
      if (prop === "_isProxy") return true;
      else if (state[prop]?._isProxy) return state[prop];
      else if (state[prop] && typeof state[prop] === "object") return createState(state[prop]);
      else return state[prop];
    }
  });
}
  
export function onStateChange(callback) {
	listeners.push(callback);
}

export function offStateChange(callback) {
	let index = listeners.findIndex(listener => listener === callback);
	if (index !== -1) listeners.splice(index,1);
}

export const state = createState({
  tasks : [],
  filter : null
});

export const { tasks } = state;