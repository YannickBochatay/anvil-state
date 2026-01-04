import { tasks } from "../todoState.js";

class TodoDestroy extends HTMLButtonElement {
	  	
  handleEvent() {
    tasks.splice(this.getAttribute("index"), 1);
  }
    
  connectedCallback() {
	  this.addEventListener("click", this);
  }
  
}

customElements.define("todo-destroy", TodoDestroy, { extends : "button" });