// @ts-check
import { state } from "../state.js";

export class TodoEdit extends HTMLInputElement {
	
	static observedAttributes = ['disabled']
	
	get index() {
    return this.hasAttribute('index') ? Number(this.getAttribute('index')) : null;
  }
			
	#edit() {
		if (this.index == null) return;
		this.value = state.tasks[this.index].title;
		this.focus();
		this.selectionStart = this.selectionEnd = this.value.length;
	}

	#cancel() {
		if (this.index == null) return;
		this.value = state.tasks[this.index].title;
		state.editing = null;
	}
	
	#validate = () => {
		const value = this.value.trim();

		if (value && this.index != null) {
			state.tasks[this.index].title = value;
			state.editing = null;
		}
	}
	
	#update() {
		if (!this.disabled) this.#edit();
	}

	/** @param {KeyboardEvent} e */
	#handleKeyUp = e => {
		if (this.disabled) return;
		
		if (e.key === 'Escape') this.#cancel();
		else if (e.key === 'Enter') this.#validate();
	}
	
	connectedCallback() {
		this.addEventListener('blur', this.#validate);
		window.addEventListener('keyup', this.#handleKeyUp);
		this.#update();
	}

	disconnectedCallback() {
		window.removeEventListener('keyup', this.#handleKeyUp);
	}
	
	attributeChangedCallback() {
		this.#update();
	}
	
}

customElements.define('todo-edit', TodoEdit, { extends : 'input' });