export class Anvil extends HTMLElement {

  constructor(template) {
    super()
    this.attachShadow({ mode : "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

export function html(str) {
  const template = document.createElement("template")

  template.innerHTML = str

  return template
}

export class AnvilState {

  #listeners

  constructor(initialState) {
    this.#listeners = Object.keys(initialState).reduce((obj, key) => (obj[key] = [], obj), {})

    this.state = new Proxy(initialState, {
      get(target, property) {
        return target[property]
      },
      set : (target, property, value) => {
        for (const callback of this.#listeners[property]) callback(value, target[property])
        target[property] = value
        return true
      }
    })
  }

  #checkProperty(property) {
    if ((!property in this.state)) throw new Error(property + " does not exist")
  }

  subscribe = (property, callback) => {
    this.#checkProperty(property)
    this.#listeners[property].push(callback)
  }

  unsubscribe = (property, callback) => {
    this.#checkProperty(property)
    const arr = this.#listeners[property]
    arr.splice(arr.indexOf(callback), 1)
  }
}