import { state } from "../TodoState.js";

class TodoLi extends HTMLLIElement {

	static observedAttributes = ["index", "label", "done"]

	constructor() {
		super();
		let template = document.createElement("template");
			
		template.innerHTML = `
			<div class="view">
				<input
					class="toggle"
					is="todo-toggle"
					index="-1"
				>
				<label></label>
				<button class="destroy" is="todo-destroy" index="-1"></button>
			</div>
			<form>
				<input class="edit">
			</form>
		`;
		
		this.append(template.content.cloneNode(true));	
	}
	      
  get index() {
		return this.hasAttribute("index") ? Number(this.getAttribute("index")) : null;
  }

	set index(index) {
		if (isNaN(index)) throw new Error(index + " is not a valid index");
		return this.setAttribute("index", index);
	}

	get label() {
		return this.getAttribute("label");
	}

	set label(label) {
		if (typeof label !== "string") throw new TypeError("label must be a string");
		return this.setAttribute("label", label);
	}

	get done() {
		return Boolean(this.getAttribute("done"));
	}

	set done(bool) {
		if (typeof bool !== "boolean") throw new TypeError("done must be a boolean");
		if (bool) return this.setAttribute("done", "done");
		else this.removeAttribute("done");		
	}
    
  #editTask = () => {
		this.classList.add("editing");
		
		let input = this.querySelector(".edit");
		input.value = state[this.index].label;
		input.focus();
		input.selectionStart = input.selectionEnd = input.value.length;
  }
  
  #cancelEditTask = () => {
		this.classList.remove("editing");
  }
  
  #validateTask = e => {
		e.preventDefault();
		this.classList.remove("editing");
		let label = this.querySelector(".edit").value;
		state[this.index].label = label;
  }
  
  connectedCallback() {
		this.querySelector("label").addEventListener("dblclick", this.#editTask);
		this.querySelector(".edit").addEventListener("blur", this.#cancelEditTask);
		this.querySelector("form").addEventListener("submit", this.#validateTask);
  }

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "label") this.querySelector("label").textContent = newValue;
		else if (name === "index") {
			this.querySelectorAll("[index]").forEach(node => node.setAttribute("index", newValue))
		} else if (name === "done") {
			this.classList[newValue ? "add" : "remove"]("completed");
			this.querySelector("input.toggle").checked = newValue;
		}
	}
  
}

customElements.define("todo-li", TodoLi, { extends: "li" });