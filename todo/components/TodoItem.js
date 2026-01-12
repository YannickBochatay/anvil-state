// @ts-check

import { tasks } from '../state.js';

/**
 * @typedef {import('../state.js').Task} Task
 */

/**
 * @type {HTMLTemplateElement}
 */
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

/**
 * Élément custom représentant une tâche « todo ».
 *
 * @extends {HTMLLIElement}
 */
export class TodoItem extends HTMLLIElement {
  /** @type {string[]} */
  static observedAttributes = ['index', 'label', 'completed'];

  /**
   * Crée une instance du composant.
   */
  constructor() {
    super();
    // Clone le contenu du template dans le <li> personnalisé.
    this.append(template.content.cloneNode(true));
  }

  /**
   * Index de la tâche dans le tableau `tasks`.
   * @type {?number}
   */
  get index() {
    return this.hasAttribute('index') ? Number(this.getAttribute('index')) : null;
  }

  /**
   * @param {?number} index
   */
  set index(index) {
    if (index == null) {
      this.removeAttribute('index');
      return;
    }
    if (Number.isNaN(index)) {
      throw new Error(`${index} is not a valid index`);
    }
    this.setAttribute('index', String(index));
  }

  /**
   * Titre de la tâche.
   * @type {?string}
   */
  get label() {
    return this.getAttribute('label');
  }

  /**
   * @param {string} txt
   */
  set label(txt) {
    if (typeof txt !== 'string') {
      throw new TypeError('label must be a string');
    }
    this.setAttribute('label', txt);
  }

  /**
   * Indique si la tâche est terminée.
   * @type {boolean}
   */
  get completed() {
    return this.hasAttribute('completed');
  }

  /**
   * @param {boolean} flag
   */
  set completed(flag) {
    if (flag) {
      this.setAttribute('completed', '');
    } else {
      this.removeAttribute('completed');
    }
  }

  /**
   * Passe le composant en mode édition.
   */
  #editTask = () => {
    this.classList.add('editing');
    /** @type {?HTMLElement & { disabled?: boolean }} */
    const editNode = this.querySelector('todo-edit');
    if (editNode) editNode.disabled = false;
  };

  /**
   * Annule le mode édition.
   */
  #cancelEditTask = () => this.classList.remove('editing');

  /**
   * Valide la modification d’une tâche.
   *
   * @param {CustomEventInit} e
   */
  #validateTask = e => {
    this.classList.remove('editing');

    const { index } = this;
    if (index != null && tasks[index]) {
      tasks[index].title = e.detail.value;
    }
  };

  connectedCallback() {
    /** @type {?import('./TodoEdit.js').TodoEdit} */
    const editNode = this.querySelector('todo-edit');
    if (editNode) {
      editNode.addEventListener('validate', this.#validateTask);
      editNode.addEventListener('cancel', this.#cancelEditTask);
    }

    const label = this.querySelector('label');
    if (label) {
      label.addEventListener('dblclick', this.#editTask);
    }
  }

  /**
   * Réagit aux changements d’attributs observés.
   *
   * @param {string} name
   * @param {string|null} oldValue
   * @param {string|null} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'label': {
        const lbl = this.querySelector('label');
        if (lbl) lbl.textContent = newValue ?? '';
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
    }
  }
}

/**
 * Enregistrement du custom element « todo-item » qui étend `<li>`.
 */
customElements.define('todo-item', TodoItem, { extends: 'li' });