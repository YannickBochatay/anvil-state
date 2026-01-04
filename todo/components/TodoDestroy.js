import { state } from "../TodoState.js";

class TodoDestroy extends HTMLButtonElement {
	  	
  handleEvent() {
    state.splice(this.getAttribute("index"), 1);
  }
    
  connectedCallback() {
	  this.addEventListener("click", this);
  }
  
}

customElements.define("todo-destroy", TodoDestroy, { extends : "button" });