import { tasks } from "../state.js";

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
	<todo-edit disabled value=""></todo-edit>
`;

class TodoItem extends HTMLLIElement {
	
	static observedAttributes = ["index", "label", "completed"]
	
	constructor() {
		super();
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
		this.setAttribute("label", label);
	}
	
	get completed() {
		return this.hasAttribute("completed");
	}
	
	set completed(bool) {
		if (bool) this.setAttribute("completed", "");
		else this.removeAttribute("completed");		
	}
	
	#editTask = () => {
		this.classList.add("editing");
		this.querySelector("todo-edit").disabled = false;
	}
	
	#cancelEditTask = () => this.classList.remove("editing");
	
	#validateTask = e => {
		this.classList.remove("editing");
		tasks[this.index].label = e.detail;
	}
	
	connectedCallback() {
		let editNode = this.querySelector("todo-edit");
		editNode.addEventListener("validate", this.#validateTask);
		editNode.addEventListener("cancel", this.#cancelEditTask);
		
		this.querySelector("label").addEventListener("dblclick", this.#editTask);
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "label") {
			this.querySelector("label").textContent = newValue;
			this.querySelector("todo-edit").value = newValue;
		} else if (name === "index") {
			this.querySelectorAll("[index]").forEach(node => node.setAttribute("index", newValue))
		} else if (name === "completed") {
			this.classList[newValue == null ? "remove" : "add"]("completed");
			this.querySelector("input.toggle").checked = newValue != null;
		}
	}
	
}

customElements.define("todo-item", TodoItem, { extends: "li" });