import { state, subscribe, unsubscribe } from "../AnvilState.js";

class AnvilCount extends HTMLSpanElement {
	
	get #count() {
	  return state.reduce((sum, item) => item.done ? sum : sum+1, 0);
	}
	
	#update = () => {
	  let count = this.#count;
	  this.innerHTML = `<strong>${count}</strong> item${count === 1 ? "" : "s"} left`;
	}
	
	connectedCallback() {
	  this.#update();
	  subscribe({ prop : "*.done", callback : this.#update });
	}
	
	disconnectedCallback() {
	  unsubscribe({ prop : "*.done", callback : this.#update });
	}
}

customElements.define("anvil-count", AnvilCount, { extends : "span" });