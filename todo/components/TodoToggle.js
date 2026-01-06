import { tasks } from '../state.js';

class TodoToggle extends HTMLInputElement {
  
  constructor() {
    super();
    this.setAttribute('type', 'checkbox');
  }
  
  handleEvent() {
    const { index } = this;
    tasks[index].completed = !tasks[index].completed;
  }
  
  get index() {
    return this.getAttribute('index');
  }
  
  connectedCallback() {
    this.addEventListener('click', this);
  }
}

customElements.define('todo-toggle', TodoToggle, { extends : 'input' });