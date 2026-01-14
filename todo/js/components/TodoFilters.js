// @ts-check

import { state } from '../state.js'

export class TodoFilters extends HTMLElement {
		
	#update = () => {
		this.querySelectorAll('a').forEach(node => node.classList.remove('selected'));
		
		if (location.hash) {
			this.querySelector(`a[href='${location.hash}']`)?.classList.add('selected');
		} else {
			this.querySelector(`a[href='#/']`)?.classList.add('selected');
		}
		
		state.filter = location.hash.split('/')[1];
	}
	
	connectedCallback() {
		this.innerHTML = `
			<ul class="filters">
				<li><a href="#/">All</a></li>
				<li><a href="#/active">Active</a></li>
				<li><a href="#/completed">Completed</a></li>
			</ul>
		`;
		this.#update();
		addEventListener('hashchange', this.#update);
	}
	
	disconnectedCallback() {
		removeEventListener('hashchange', this.#update);
	}
}

customElements.define('todo-filters', TodoFilters);