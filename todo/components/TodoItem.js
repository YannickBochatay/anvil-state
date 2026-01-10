import { tasks } from '../state.js';

const template = document.createElement('template');
		
template.innerHTML = `
	<div class='view'>
		<input
			class='toggle'
			is='todo-toggle'
			index='-1'
		>
		<label></label>
		<button class='destroy' is='todo-destroy' index='-1'></button>
	</div>
	<todo-edit disabled value=''></todo-edit>
`;

class TodoItem extends HTMLLIElement {
	
	static observedAttributes = ['index', 'title', 'completed']
	
	constructor() {
		super();
		this.append(template.content.cloneNode(true));	
	}
	
	get index() {
		return this.hasAttribute('index') ? Number(this.getAttribute('index')) : null;
	}
	
	set index(index) {
		if (isNaN(index)) throw new Error(index + ' is not a valid index');
		return this.setAttribute('index', index);
	}
	
	get title() {
		return this.getAttribute('title');
	}
	
	set title(title) {
		if (typeof title !== 'string') throw new TypeError('title must be a string');
		this.setAttribute('title', title);
	}
	
	get completed() {
		return this.hasAttribute('completed');
	}
	
	set completed(bool) {
		if (bool) this.setAttribute('completed', '');
		else this.removeAttribute('completed');		
	}
	
	#editTask = () => {
		this.classList.add('editing');
		this.querySelector('todo-edit').disabled = false;
	}
	
	#cancelEditTask = () => this.classList.remove('editing');
	
	#validateTask = e => {
		this.classList.remove('editing');
		tasks[this.index].title = e.detail.value;
	}
	
	connectedCallback() {
		const editNode = this.querySelector('todo-edit');
		editNode.addEventListener('validate', this.#validateTask);
		editNode.addEventListener('cancel', this.#cancelEditTask);
		
		this.querySelector('label').addEventListener('dblclick', this.#editTask);
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'title') {
			this.querySelector('label').textContent = newValue;
			this.querySelector('todo-edit').value = newValue;

		} else if (name === 'index') {
			this.querySelectorAll('[index]').forEach(node => node.setAttribute('index', newValue))

		} else if (name === 'completed') {
			const completed = newValue != null;
			this.classList[completed ? 'add' : 'remove']('completed');
			this.querySelector('input.toggle').checked = completed;
		}
	}
	
}

customElements.define('todo-item', TodoItem, { extends: 'li' });