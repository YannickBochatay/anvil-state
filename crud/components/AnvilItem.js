// @ts-check

import { state } from "../state.js"

const template = document.createElement('template')

template.innerHTML = `
  <td></td>
  <td></td>
  <td></td>
  <td>
    <form action="edit.html">
      <input type="hidden" name="item" value=""/>
      <input type="submit" value="✎">
    </form>
    <a href="#" title="Delete">🗑</a>
  </td>
`;

export class AnvilItem extends HTMLTableRowElement {

  static observedAttributes = ['firstName', 'lastName', 'email']

  constructor() {
    super()
    this.append(template.content.cloneNode(true))
  }

  get index() {
    return this.getAttribute('index')
  }

  #update = () => {
    AnvilItem.observedAttributes.forEach((attr, index) => {
      this.children[index].textContent = this.getAttribute(attr)
    })
  }

  /**
   * 
   * @param {Event} e 
   */
  #handleClickRemove = e => {
    e.preventDefault()
    state.list.splice(this.index, 1)
  }

  connectedCallback() {
    /** @type {?HTMLInputElement} */
    const hiddenField = this.querySelector('input[type=hidden]')
    if (hiddenField) hiddenField.value = this.index ?? ''

    const deleteNode = this.querySelector('a[title*=Delete]')
    deleteNode?.addEventListener('click', this.#handleClickRemove)

    this.#update()
  }

  attributeChangedCallback() {
    this.#update()
  }
}

customElements.define('anvil-item', AnvilItem, { extends : 'tr' })