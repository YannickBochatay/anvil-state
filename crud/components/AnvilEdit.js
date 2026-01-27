// @ts-check

import { state } from "../state.js"

class AnvilEdit extends HTMLFormElement {

  constructor() {
    super()
    this.setAttribute('action', 'index.html')
    this.innerHTML = `
      <label>
        <span>First Name</span>
        <input type="text" name="firstName" required>
      </label>
      <label>
        <span>Last Name</span>
        <input type="text" name="lastName" required>
      </label>
      <label>
        <span>E-mail</span>
        <input type="email" name="email" required>
      </label>
      <a href="index.html">Annuler</a>
      <input type="submit" value="valider">
    `
  }

  connectedCallback() {
    const match = location.search.match(/item=(\d+)/)

    /** @type {import('../state.js').Person|undefined} */
    let item

    /** @type {?number} */
    let index

    if (match) {
      index = Number(match[1])
      item = state.list[index]

      if (item) {
        for (const key in item) this[key].value = item[key]
      }
    } else {
      item = { firstName : '', lastName : '', email : '' }
    }

    this.addEventListener('submit', e => {
      e.preventDefault()
      const data = new FormData(this)

      for (const [key, value] of data.entries()) item[key] = value
      if (index == null) state.list.push(item)
      this.submit()
    })
  }
}

customElements.define('anvil-edit', AnvilEdit, { extends : 'form' })