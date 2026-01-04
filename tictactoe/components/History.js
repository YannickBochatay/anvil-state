import { Anvil, html } from "../Anvil.js"
import { subscribe, moveTo } from "../state.js"

let template = html(`
  <ul></ul>
`)

class History extends Anvil {

  constructor() {
    super(template);
  }

  #update = (history) => {
    let ul = this.shadowRoot.querySelector("ul");
    let li = document.createElement("li");
    
    let button = document.createElement("button");
    let index = history.length - 1
    button.textContent = "Go to move #" + index;
    button.addEventListener("click", () => moveTo(index));

    li.appendChild(button);
    ul.appendChild(li);

  }

  connectedCallback() {
    subscribe("history", this.#update);
  }

  disconnectedCallback() {
    unsubscribe("history", this.#update);
  }
}

customElements.define("demo-history", History)