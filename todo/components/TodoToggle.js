import { tasks } from "../todoState.js";

class TodoToggle extends HTMLInputElement {
	
  constructor() {
    super();
    this.setAttribute("type", "checkbox");
  }
	
  handleEvent() {
    let { index } = this;
	  tasks[index].done = !tasks[index].done;
  }
    
  get index() {
	  return this.getAttribute("index");
  }
  
  connectedCallback() {
    this.addEventListener("click", this);
  }
}

customElements.define("todo-toggle", TodoToggle, { extends : "input" });