// @ts-check
import { tasks } from '../state.js';

export class TodoToggleAll extends HTMLElement {
		
	#toggleAll = () => {
		const allDone = tasks.every(task => task.completed);
		if (allDone) tasks.forEach(task => { if (task.completed) task.completed = false; });
		else tasks.forEach(task => { if (!task.completed) task.completed = true; });
	}
	
	connectedCallback() {
		this.innerHTML = `
			<form>
				<input id="toggle-all" class="toggle-all" type="checkbox">
				<label for="toggle-all">Mark all as complete</label>
			</form>
		`;
		const input = this.querySelector('#toggle-all');
		input?.addEventListener('change', this.#toggleAll);	
	}
}

customElements.define('todo-toggle-all', TodoToggleAll);