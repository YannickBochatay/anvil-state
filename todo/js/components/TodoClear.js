// @ts-check
import { tasks, onStateChange, offStateChange } from '../state.js';

export class TodoClear extends HTMLButtonElement {
		
	handleEvent() {
		let doneIndex;
		while (doneIndex !== -1) {
			doneIndex = tasks.findIndex(task => task.completed);
			if (doneIndex !== -1) tasks.splice(doneIndex, 1);
		}
	}
	
	#update() {
		this.hidden = tasks.every(task => !task.completed);
	}

	/** @param {string} prop */
	#handleStateChange = prop => {
		if (prop === 'completed' || prop === 'length') this.#update();
	}
	
	connectedCallback() {
		this.textContent = 'Clear completed';
		this.#update();
		this.addEventListener('click', this);
		onStateChange(this.#handleStateChange);
	}
	
	disconnectedCallback() {
		offStateChange(this.#handleStateChange);
	}
}

customElements.define('todo-clear', TodoClear, { extends : 'button' });