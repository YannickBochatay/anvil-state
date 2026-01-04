import { tasks, subscribe, unsubscribe } from "../todoState.js";

class TodoCount extends HTMLSpanElement {
	
	get #count() {
	  return tasks.reduce((sum, item) => item.done ? sum : sum+1, 0);
	}
	
	#update = () => {
	  let count = this.#count;
	  this.innerHTML = `<strong>${count}</strong> item${count === 1 ? "" : "s"} left`;
	}
	
	connectedCallback() {
	  this.#update();
	  subscribe("tasks.*.done", this.#update);
	}
	
	disconnectedCallback() {
	  unsubscribe("tasks.*.done", this.#update);
	}
}

customElements.define("todo-count", TodoCount, { extends : "span" });