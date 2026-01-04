import { state } from "../todoState.js";

class TodoToggleAll extends HTMLElement {
	
	#toggleAll = () => {
		let allDone = state.every(task => task.done);
		if (allDone) state.forEach(task => { if (task.done) task.done = false; });
		else state.forEach(task => { if (!task.done) task.done = true; });
	}

	connectedCallback() {
		
		let form = document.createElement("form");
		form.innerHTML = `
		  <input id="toggle-all" class="toggle-all" type="checkbox">
		  <label for="toggle-all">Mark all as complete</label>
		`
		this.append(form);
		
		let input = this.querySelector("#toggle-all");
		input.addEventListener("change", this.#toggleAll);	
	}
}

customElements.define("todo-toggle-all", TodoToggleAll);