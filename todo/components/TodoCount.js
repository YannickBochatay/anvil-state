import { tasks, onStateChange, offStateChange } from "../state.js";

class TodoCount extends HTMLSpanElement {
	
	get #count() {
	  return tasks.reduce((sum, item) => item.completed ? sum : sum+1, 0);
	}
	
	#update() {
		let count = this.#count;
		this.innerHTML = `<strong>${count}</strong> item${count === 1 ? "" : "s"} left`;
	}

	#handleStateChange = prop => {
		if (prop === "completed" || prop === "length") this.#update();
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