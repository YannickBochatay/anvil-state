import { tasks } from "../todoState.js";

class TodoClear extends HTMLButtonElement {
	
	handleEvent() {
		let doneIndex;
		while (doneIndex !== -1) {
			doneIndex = tasks.findIndex(task => task.done);
			if (doneIndex !== -1) tasks.splice(doneIndex, 1);
		}
	}

	connectedCallback() {
		this.textContent = "Clear completed";
		this.addEventListener("click", this);
	}
}

customElements.define("todo-clear", TodoClear, { extends : "button" });