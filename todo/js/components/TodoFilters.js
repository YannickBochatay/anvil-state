// @ts-check

import { state } from '../state.js';

export class TodoFilters extends HTMLElement {

	constructor() {
		super();
		// this component is called only once so we can define innerHTML in the instance
		this.innerHTML = `
			<ul class="filters">
				<li><a href="#/">All</a></li>
				<li><a href="#/active">Active</a></li>
				<li><a href="#/completed">Completed</a></li>
			</ul>
		`;
	}
		
	#update = () => {
		// add class on selected item
		this.querySelectorAll('a').forEach(node => {
			const method = (location.hash === node.getAttribute('href')) ? 'add' : 'remove';
			node.classList[method]('selected');
		});
		// set reactive property (only keyword) to update list
		state.filter = location.hash.split('/')[1];
	}
	
	connectedCallback() {
		this.#update();
		addEventListener('hashchange', this.#update);
	}
	
	disconnectedCallback() {
		removeEventListener('hashchange', this.#update);
	}
}

customElements.define('todo-filters', TodoFilters);