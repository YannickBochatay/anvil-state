// @ts-check

import { tasks } from '../state.js';

const template = document.createElement('template');
template.innerHTML = `
	<form>
		<input
			class='new-todo'
			type='text'
			id='new-task'
			placeholder='What needs to be done?'
			autofocus
		/>
	</form>
`;

class TodoInput extends HTMLElement {
	
	#form
	
	constructor() {
		super();
		this.append(template.content.cloneNode(true));
		this.#form = this.querySelector('form');
	}
	
	/**
	 * 
	 * @param {Event} e 
	 */
	#submit = e => {
		e.preventDefault();
		/** @type {HTMLInputElement|null} */
		const input = this.querySelector('#new-task')
		const title = input?.value.trim();
		if (title) {
			tasks.push({ title, completed : false });
			this.#form?.reset();
		}
	}
	
	connectedCallback() {
		this.#form?.addEventListener('submit', this.#submit); 
	}
}

customElements.define('todo-input', TodoInput);