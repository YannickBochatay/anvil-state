// @ts-check

import { tasks } from '../state.js';

export class TodoInput extends HTMLElement {
	
	/** @type {HTMLFormElement|null} */
	// @ts-ignore property is not initialized in the constructor but that's ok
	#form
		
	/** @param {Event} e */
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
		this.#form?.addEventListener('submit', this.#submit); 
	}
}

customElements.define('todo-input', TodoInput);