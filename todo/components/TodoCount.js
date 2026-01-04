import { state, subscribe, unsubscribe } from "../TodoState.js";

class TodoCount extends HTMLSpanElement {
	
	get #count() {
	  return state.reduce((sum, item) => item.done ? sum : sum+1, 0);
	}
	
	#update = () => {
	  let count = this.#count;
	  this.innerHTML = `<strong>${count}</strong> item${count === 1 ? "" : "s"} left`;
	}
	
	connectedCallback() {
	  this.#update();
	  subscribe("*.done", this.#update);
	}
	
	disconnectedCallback() {
	  unsubscribe("*.done", this.#update);
	}
}

customElements.define("todo-count", TodoCount, { extends : "span" });