// @ts-check
import { tasks } from '../state.js';

export class TodoToggle extends HTMLInputElement {
  
  constructor() {
    super();
    this.setAttribute('type', 'checkbox');
  }
  
  handleEvent() {
    const { index } = this;
    if (index != null) {
      tasks[index].completed = !tasks[index].completed;
    }
  }
  
  /** @return {number|null} */
  get index() {
    return this.hasAttribute('index') ? Number(this.getAttribute('index')) : null;
  }
  
  connectedCallback() {
    // see https://gomakethings.com/the-handleevent-method-is-the-absolute-best-way-to-handle-events-in-web-components/
    this.addEventListener('click', this);
  }
}

customElements.define('todo-toggle', TodoToggle, { extends : 'input' });