// @ts-check
import { tasks, onStateChange, offStateChange } from '../state.js';

export class TodoToggleAll extends HTMLElement {

	/** @type {HTMLInputElement|null} */
	// @ts-ignore property is not initialized in the constructor but that's ok
	#input

	#areAllDone() {
		return tasks.every(task => task.completed);
	}
		
	#toggleAll = () => {
		const allDone = this.#areAllDone();
		tasks.forEach(task => task.completed = !allDone || !task.completed);
	}
	
	connectedCallback() {
		this.innerHTML = `
			<form>
				<input id="toggle-all" class="toggle-all" type="checkbox">
				<label for="toggle-all">Mark all as complete</label>
			</form>
		`;
		this.#input = this.querySelector('#toggle-all');
		this.#input?.addEventListener('change', this.#toggleAll);
		onStateChange(this.#handleStateChange);
	}

	disconnectedCallback() {
		offStateChange(this.#handleStateChange);
	}

	/** @param {string} prop */
	#handleStateChange = prop => {
		if (!this.#input) return;

		if (prop === 'completed' || prop === 'length') {
			this.#input.checked = this.#areAllDone();
		}
	}
}

customElements.define('todo-toggle-all', TodoToggleAll);