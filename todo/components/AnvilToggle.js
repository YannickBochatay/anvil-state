import { state } from "../AnvilState.js";

class AnvilToggle extends HTMLInputElement {
	
  constructor() {
    super();
    this.setAttribute("type", "checkbox");
  }
	
  handleEvent() {
    let { index } = this;
	  state[index].done = !state[index].done;
  }
    
  get index() {
	  return this.getAttribute("index");
  }
  
  connectedCallback() {
    this.addEventListener("click", this);
  }
}

customElements.define("anvil-toggle", AnvilToggle, { extends : "input" });