// @ts-check
import { state } from '../state.js';

const ESCAPE_KEY = 'Escape';
const ENTER_KEY = 'Enter';

export class TodoEdit extends HTMLInputElement {
	
	static observedAttributes = ['hidden']
	
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
		if (this.index == null) return;

		const value = this.value.trim();

		if (value) state.tasks[this.index].title = value;
		// If it's empty the todo is destroyed
		else state.tasks.splice(this.index, 1);

		state.editing = null;
	}
	
	#update() {
		if (!this.hidden) this.#edit();
	}

	/** @param {KeyboardEvent} e */
	#handleKeyUp = e => {
		if (this.hidden) return;

		if (e.key === ESCAPE_KEY) this.#cancel();
		else if (e.key === ENTER_KEY) this.#validate();
	}
	
	connectedCallback() {
		this.addEventListener('blur', this.#validate);
		addEventListener('keyup', this.#handleKeyUp);
		this.#update();
	}

	disconnectedCallback() {
		removeEventListener('keyup', this.#handleKeyUp);
	}
	
	attributeChangedCallback() {
		this.#update();
	}
	
}

customElements.define('todo-edit', TodoEdit, { extends : 'input' });