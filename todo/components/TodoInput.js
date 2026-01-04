import { state } from "../TodoState.js";

class TodoInput extends HTMLElement {
	
  #form
  
  #submit = e => {
    e.preventDefault();
    let label = this.querySelector("#new-task").value;
    state.push({ label, done : false });
		this.#form.reset();
  }
  
  connectedCallback() {
		let form = document.createElement("form");
		form.innerHTML = `
			<input
			class="new-todo"
			type="text"
			id="new-task"
			placeholder="What needs to be done?"
			autofocus
			/>
		`
		this.append(form);
		this.#form = form;
		this.#form.addEventListener("submit", this.#submit); 
	}
}

customElements.define("todo-input", TodoInput);