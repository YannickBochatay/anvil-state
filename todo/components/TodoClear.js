import { state } from "../TodoState.js";

class TodoClear extends HTMLButtonElement {
	
	handleEvent() {
		let doneIndex;
		while (doneIndex !== -1) {
			doneIndex = state.findIndex(task => task.done);
			if (doneIndex !== -1) state.splice(doneIndex, 1);
		}
	}

	connectedCallback() {
		this.textContent = "Clear completed";
		this.addEventListener("click", this);
	}
}

customElements.define("todo-clear", TodoClear, { extends : "button" });