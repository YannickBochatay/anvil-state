// @ts-check

import { state } from "../state.js";

const template = document.createElement('template');

template.innerHTML = `
	<form>
		<input class='edit'>
	</form>
`;

export class TodoEdit extends HTMLElement {
	
	static observedAttributes = ['disabled']
	
	#input
	
	constructor() {
		super();
		this.append(template.content.cloneNode(true));
		/** @type {HTMLInputElement} */
		this.#input = this.querySelector('input');
	}

	get index() {
    return this.hasAttribute('index') ? Number(this.getAttribute('index')) : null;
  }

	get disabled() {
		return this.hasAttribute('disabled');
	}

	set disabled(bool) {
		if (bool) this.setAttribute('disabled', '');
		else this.removeAttribute('disabled');
	}
			
	edit = () => {
		const input = this.#input;
		if (!input || this.index == null) return;
		input.value = state.tasks[this.index].title;
		input.focus();
		input.selectionStart = input.selectionEnd = input.value.length;
	}
	
	/**
	 * @param {Event} e 
	 */
	validate = e => {
		e.preventDefault();
		const value = this.#input?.value.trim();

		if (value && this.index != null) {
			state.tasks[this.index].title = value;
			state.editing = null;
		}
	}
	
	cancel = () => state.editing = null;
	
	#update() {
		if (!this.#input) return;

		if (this.disabled) this.style.display = 'none';
		else {
			this.style.display = 'block';
			this.edit();
		}
	}
	
	connectedCallback() {
		this.#input?.addEventListener('blur', this.cancel);
		this.querySelector('form')?.addEventListener('submit', this.validate);
		this.#update();
	}
	
	attributeChangedCallback() {
		this.#update();
	}
	
}

customElements.define('todo-edit', TodoEdit);