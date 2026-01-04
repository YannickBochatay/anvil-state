import { tasks, onStateChange, offStateChange } from "../state.js";

class TodoUl extends HTMLUListElement {
	
  #isHidden(item) {
		return location.hash === "#/active" && item.done || location.hash === "#/completed" && !item.done;
  }
    
	#render = () => {

		tasks.forEach((task, index) => {
			let li = this.children[index] ?? document.createElement("li", { is : "todo-li" });
			
			if (li.label !== task.label) li.label = task.label;
			if (li.done !== task.done) li.done = task.done;
			if (li.index !== index) li.index = index;
			
			li.style.display = this.#isHidden(task) ? "none" : "block";
			
			if (!li.parentNode) this.append(li);
		})

		while (this.children.length > tasks.length) this.lastElementChild.remove();
	}
      
  connectedCallback() {
		this.#render();
		onStateChange(this.#render);
		addEventListener("hashchange", this.#render);
  }
  
  disconnectedCallback() {
    offStateChange(this.#render);
		removeEventListener("hashchange", this.#render);
  }
}

customElements.define("todo-ul", TodoUl, { extends : "ul" });