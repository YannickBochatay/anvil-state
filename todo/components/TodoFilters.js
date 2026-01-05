import { state } from '../state.js'

let template = document.createElement('template');

template.innerHTML = `
	<ul class='filters'>
		<li><a href='#/'>All</a></li>
		<li><a href='#/active'>Active</a></li>
		<li><a href='#/completed'>Completed</a></li>
	</ul>
`;

class TodoFilters extends HTMLElement {
	
	constructor() {
		super();		
		this.append(template.content.cloneNode(true));
	}
	
	#update = () => {
		this.querySelectorAll('a').forEach(node => node.classList.remove('selected'));
		
		if (location.hash) {
			this.querySelector(`a[href='${location.hash}']`).classList.add('selected');
		} else {
			this.querySelector(`a[href='#/']`).classList.add('selected');
		}
		
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