import { state } from "../AnvilState.js";

class AnvilClear extends HTMLButtonElement {
	
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

customElements.define("anvil-clear", AnvilClear, { extends : "button" });