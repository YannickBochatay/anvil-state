// @ts-check
import { tasks, onStateChange, offStateChange } from '../state.js'

export class TodoOnly extends HTMLElement {
  
  #update() {
    this.style.display = tasks.length ? 'block' : 'none';
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

