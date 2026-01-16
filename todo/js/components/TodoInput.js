// @ts-check

import { tasks } from '../state.js';

export class TodoInput extends HTMLElement {
	
	/** @type {?HTMLFormElement} */
	#form

	constructor() {
		super();
		// this component is called only once so we can define innerHTML in the instance
		this.innerHTML = `
			<form>
				<input
					class="new-todo"
					type="text"
					id="new-task"
					placeholder="What needs to be done?"
					autofocus
				/>
			</form>
		`;
		this.#form = this.querySelector('form');
	}
		
	/** @param {Event} e */
	#submit = e => {
		e.preventDefault();
		/** @type {?HTMLInputElement} */
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