// @ts-check

import { state, onStateChange, offStateChange } from '../state.js'

class AnvilList extends HTMLTableElement {

  #body

  constructor() {
    super()
    this.innerHTML = `
      <caption>Mon beau tableau</caption>
      <thead>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">E-mail</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `
    this.#body = this.querySelector('tbody')
  }
  
  /**
   * 
   * @param {number} index 
   * @returns {HTMLTableRowElement}
   */
  #createNode(index) {
    const node = document.createElement('tr', { is : 'anvil-item' })
    node.setAttribute('index', String(index))
    this.#body?.append(node)
    return node
  }

  #update = () => {
    const { list } = state
    const nodes = this.#body?.children ?? []

    
    list.forEach((/** @type {{ [x: string]: string; }} */ item, /** @type {number} */ index) => {
      const node = nodes[index] ?? this.#createNode(index)

      for (const attr in item) {
        if (node.getAttribute(attr) !== item[attr]) {
          node.setAttribute(attr, item[attr])
        }
      }
    })

    while (nodes.length > list.length) this.#body?.lastElementChild?.remove()
  }

  connectedCallback() {
    this.#update()
    onStateChange(this.#update)
  }

  disconnectedCallback() {
    offStateChange(this.#update)
  }
}

customElements.define('anvil-list', AnvilList, { extends : 'table' })