import { tasks, onStateChange, offStateChange } from "../state.js";

class TodoCount extends HTMLSpanElement {
	
	get #count() {
	  return tasks.reduce((sum, item) => item.done ? sum : sum+1, 0);
	}

	#handleStateChange = prop => {
		if (prop === "done" || prop === "length") this.#update();
	}
	
	#update() {
		let count = this.#count;
		this.innerHTML = `<strong>${count}</strong> item${count === 1 ? "" : "s"} left`;
	}
	
	connectedCallback() {
	  this.#update();
	  onStateChange(this.#handleStateChange);
	}
	
	disconnectedCallback() {
	  offStateChange(this.#handleStateChange);
	}
}

customElements.define("todo-count", TodoCount, { extends : "span" });