import { Anvil, html } from "../Anvil.js"
import { togglePlayer, play, subscribe, unsubscribe } from "../state.js"

let template = html(`
  <style>
    button {
      width:30px;
      height:30px;
    }
  </style>
  <button></button>
`);

class Square extends Anvil {

  #button

  constructor() {
    super(template);
    this.#button = this.shadowRoot.querySelector("button");
  }

  #handleClick = () => {
    if (this.#button.textContent) return;

    togglePlayer();
    play(this.getAttribute("index"));    
  }

  #update = squares => {
    let index = this.getAttribute("index");
    this.#button.textContent = squares[index];
  }

  connectedCallback() {
    subscribe("squares", this.#update);
    this.#button.addEventListener("click", this.#handleClick);
  }

  disconnectedCallback() {
    unsubscribe("squares", this.#update);
    this.#button.removeEventListener("click", this.#handleClick);
  }
}

customElements.define("demo-square", Square);