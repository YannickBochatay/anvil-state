import { tasks } from "../state.js";

let template = document.createElement("template");
template.innerHTML = `
	<form>
		<input id="toggle-all" class="toggle-all" type="checkbox">
		<label for="toggle-all">Mark all as complete</label>
	</form>
`

class TodoToggleAll extends HTMLElement {

	constructor() {
		super();
		this.append(template.content.cloneNode(true));
	}
	
	#toggleAll = () => {
		let allDone = tasks.every(task => task.done);
		if (allDone) tasks.forEach(task => { if (task.done) task.done = false; });
		else tasks.forEach(task => { if (!task.done) task.done = true; });
	}

	connectedCallback() {
		let input = this.querySelector("#toggle-all");
		input.addEventListener("change", this.#toggleAll);	
	}
}

customElements.define("todo-toggle-all", TodoToggleAll);