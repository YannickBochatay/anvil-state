let template = document.createElement("template");
			
template.innerHTML = `
	<form>
		<input class="edit">
	</form>
`;

class TodoEdit extends HTMLElement {

	static observedAttributes = ["disabled", "value"]

	#input

	constructor() {
		super();
		this.append(template.content.cloneNode(true));
		this.#input = this.querySelector("input");
	}

	get disabled() {
		return this.hasAttribute("disabled");
	}

	set disabled(bool) {
		if (Boolean(bool)) return this.setAttribute("disabled", "");
		else this.removeAttribute("disabled");
	}

	get value() {
		return this.getAttribute("value");
	}

	set value(value) {
		this.setAttribute("value", value);
	}
	          
  edit = () => {
		let input = this.#input;
		input.focus();
		input.selectionStart = input.selectionEnd = input.value.length;
  }
  
  validate = e => {
		e.preventDefault();
		let event = new CustomEvent("validate", { detail : this.#input.value });
		this.dispatchEvent(event);
  }

	cancel = e => {
		this.disabled = true;
		this.dispatchEvent(new CustomEvent("cancel"));
	}

	#update() {
		this.#input.value = this.value;
		this.style.display = this.disabled ? "none" : "block";
		if (!this.disabled) this.edit();
	}
  
  connectedCallback() {
		this.#input.addEventListener("blur", this.cancel);
		this.querySelector("form").addEventListener("submit", this.validate);
		this.#update();
  }

	attributeChangedCallback() {
		this.#update();
	}
  
}

customElements.define("todo-edit", TodoEdit);