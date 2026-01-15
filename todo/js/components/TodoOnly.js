// @ts-check
import { tasks, onStateChange, offStateChange } from '../state.js';

export class TodoOnly extends HTMLElement {
  
  #update() {
    this.hidden = !tasks.length;
  }
  
  /** @param {string} prop */
  #handleStateChange = prop => {
    if (prop === 'length') this.#update();
  }
  
  connectedCallback() {
    this.#update();
    onStateChange(this.#handleStateChange);
  }
  
  disconnectedCallback() {
    offStateChange(this.#handleStateChange);
  }
}

customElements.define('todo-only', TodoOnly);

