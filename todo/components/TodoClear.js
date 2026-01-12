// @ts-check

import { tasks, onStateChange, offStateChange } from '../state.js';

export class TodoClear extends HTMLButtonElement {
	
	constructor() {
		super();
		this.textContent = 'Clear completed';
	}
	
	handleEvent() {
		let doneIndex;
		while (doneIndex !== -1) {
			doneIndex = tasks.findIndex(task => task.completed);
			if (doneIndex !== -1) tasks.splice(doneIndex, 1);
		}
	}
	
	#update() {
		const show = tasks.some(task => task.completed);
		this.style.display = show ? 'inline' : 'none';
	}
	/**
	 * @param {string} prop 
	 */
	#handleStateChange = prop => {
		if (prop === 'completed') this.#update();
	}
	
	connectedCallback() {
		this.#update();
		this.addEventListener('click', this);
		onStateChange(this.#handleStateChange);
	}
	
	disconnectedCallback() {
		offStateChange(this.#handleStateChange);
	}
}

customElements.define('todo-clear', TodoClear, { extends : 'button' });