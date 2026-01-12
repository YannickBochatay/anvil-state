// @ts-check

import { tasks } from '../state.js';

class TodoDestroy extends HTMLButtonElement {
  
  handleEvent() {
    if (this.index != null) tasks.splice(this.index, 1);
  }

  get index() {
    return this.hasAttribute('index') ? Number(this.getAttribute('index')) : null;
  }
  
  connectedCallback() {
    this.addEventListener('click', this);
  }
  
}

customElements.define('todo-destroy', TodoDestroy, { extends : 'button' });