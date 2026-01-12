// @ts-check

import { tasks } from '../state.js';

const template = document.createElement('template');
template.innerHTML = `
	<form>
		<input id='toggle-all' class='toggle-all' type='checkbox'>
		<label for='toggle-all'>Mark all as complete</label>
	</form>
`;

class TodoToggleAll extends HTMLElement {
	
	constructor() {
		super();
		this.append(template.content.cloneNode(true));
	}
	
	#toggleAll = () => {
		const allDone = tasks.every(task => task.completed);
		if (allDone) tasks.forEach(task => { if (task.completed) task.completed = false; });
		else tasks.forEach(task => { if (!task.completed) task.completed = true; });
	}
	
	connectedCallback() {
		const input = this.querySelector('#toggle-all');
		input?.addEventListener('change', this.#toggleAll);	
	}
}

customElements.define('todo-toggle-all', TodoToggleAll);