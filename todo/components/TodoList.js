import { state, tasks, onStateChange, offStateChange } from "../state.js";

class TodoList extends HTMLUListElement {
	
  #isHidden(item) {
		return state.filter === "active" && item.completed || state.filter === "completed" && !item.completed;
  }
    
	#render = () => {
		tasks.forEach((task, index) => {
			let li = this.children[index] ?? document.createElement("li", { is : "todo-item" });
			
			if (li.label !== task.label) li.label = task.label;
			if (li.completed !== task.completed) li.completed = task.completed;
			if (li.index !== index) li.index = index;
			
			li.style.display = this.#isHidden(task) ? "none" : "block";
			
			if (!li.parentNode) this.append(li);
		})

		while (this.children.length > tasks.length) this.lastElementChild.remove();
	}
      
  connectedCallback() {
		this.#render();
		onStateChange(this.#render);
  }
  
  disconnectedCallback() {
    offStateChange(this.#render);
  }
}

customElements.define("todo-list", TodoList, { extends : "ul" });