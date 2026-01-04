import { Anvil, html } from "../Anvil.js"
import { calculateWinner } from "../utils.js";
import { state, subscribe, unsubscribe } from "../state.js";

let template = html(`
<style>
  div {
    display:none;
  }
</style>
<div>
  Les <span></span> ont gagné.
</div>
`);

class Result extends Anvil {

  constructor() {
    super(template);
  }

  #update = squares => {
    if (calculateWinner(squares)) {
      this.shadowRoot.querySelector("div").style.display = "block";
      this.shadowRoot.querySelector("span").textContent = state.player;
    }
  }

  connectedCallback() {
    subscribe("squares", this.#update);
  }

  disconnectedCallback() {
    unsubscribe("squares", this.#update);
  }
}

customElements.define("demo-result", Result);