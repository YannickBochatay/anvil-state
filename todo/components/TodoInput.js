import { tasks } from "../state.js";

let template = document.createElement("template");
template.innerHTML = `
	<form>
		<input
			class="new-todo"
			type="text"
			id="new-task"
			placeholder="What needs to be done?"
			autofocus
		/>
	</form>
`

class TodoInput extends HTMLElement {
	
  #form

	constructor() {
		super();
		this.append(template.content.cloneNode(true));
		this.#form = this.querySelector("form");
	}
  
  #submit = e => {
    e.preventDefault();
    let label = this.querySelector("#new-task").value;
    tasks.push({ label, completed : false });
		this.#form.reset();
  }
  
  connectedCallback() {
		this.#form.addEventListener("submit", this.#submit); 
	}
}

customElements.define("todo-input", TodoInput);