import { state } from "../AnvilState.js";

class AnvilDestroy extends HTMLButtonElement {
	  	
  handleEvent() {
    state.splice(this.parentNode.parentNode.index, 1);
  }
    
  connectedCallback() {
	  this.addEventListener("click", this);
  }
  
}

customElements.define("anvil-destroy", AnvilDestroy, { extends : "button" });