import { tasks } from "../state.js";

class TodoClear extends HTMLButtonElement {

	constructor() {
		super();
		this.textContent = "Clear completed";
	}
	
	handleEvent() {
		let doneIndex;
		while (doneIndex !== -1) {
			doneIndex = tasks.findIndex(task => task.done);
			if (doneIndex !== -1) tasks.splice(doneIndex, 1);
		}
	}

	connectedCallback() {
		this.addEventListener("click", this);
	}
}

customElements.define("todo-clear", TodoClear, { extends : "button" });