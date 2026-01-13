// @ts-check
import { state } from '../state.js';

const template = document.createElement('template');

template.innerHTML = `
  <div class="view">
    <input class="toggle" is="todo-toggle" index="-1">
    <label></label>
    <button class="destroy" is="todo-destroy" index="-1"></button>
  </div>
  <todo-edit index="-1" disabled></todo-edit>
`;

export class TodoItem extends HTMLLIElement {

  static observedAttributes = ['index', 'label', 'completed', 'editing'];

  constructor() {
    super();
    this.append(template.content.cloneNode(true));
  }

  /**
   * Index de la tâche dans le tableau `tasks`.
   * @type {?number}
   */
  get index() {
    return this.hasAttribute('index') ? Number(this.getAttribute('index')) : null;
  }

  /** @param {?number} index */
  set index(index) {
    if (index == null) {
      this.removeAttribute('index');
      return;
    }
    if (isNaN(index)) throw new Error(`${index} is not a valid index`);

    this.setAttribute('index', String(index));
  }

  /**
   * Titre de la tâche.
   * @type {?string}
   */
  get label() {
    return this.getAttribute('label');
  }

  /** @param {string} str */
  set label(str) {
    if (typeof str !== 'string') throw new TypeError('label must be a string');
    this.setAttribute('label', str);
  }

  /**
   * Indique si la tâche est terminée.
   * @type {boolean}
   */
  get completed() {
    return this.hasAttribute('completed');
  }

  /** @param {boolean} bool */
  set completed(bool) {
    if (bool) this.setAttribute('completed', '');
    else this.removeAttribute('completed');
  }

  get editing() {
    return this.hasAttribute('editing');
  }

  set editing(bool) {
    if (bool) this.setAttribute('editing', '');
    else this.removeAttribute('editing');
  }

  connectedCallback() {
    const label = this.querySelector('label');
    if (label) label.addEventListener('dblclick', () => state.editing = this.index);
  }

  /**
   * @param {string} name
   * @param {string|null} oldValue
   * @param {string|null} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'label': {
        const label = this.querySelector('label');
        if (label) label.textContent = newValue ?? '';
        const edit = this.querySelector('todo-edit');
        if (edit) edit.setAttribute('value', newValue ?? '');
        break;
      }
      case 'index': {
        this.querySelectorAll('[index]').forEach((node) => {
          node.setAttribute('index', newValue ?? '');
        });
        break;
      }
      case 'completed': {
        const completed = newValue != null;
        this.classList[completed ? 'add' : 'remove']('completed');
        /** @type {HTMLInputElement|null} */
        const input = this.querySelector('input.toggle');
        if (input) input.checked = completed;
        break;
      }
      case 'editing': {
        const editing = newValue != null;

        this.classList[editing ? 'add' : 'remove']('editing');
        
        /** @type {import('./TodoEdit').TodoEdit|null} */
        const editNode = this.querySelector('todo-edit');
        if (editNode) editNode.disabled = !editing;
      }
    }
  }
}

customElements.define('todo-item', TodoItem, { extends: 'li' });