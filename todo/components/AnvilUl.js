import { state, subscribe, unsubscribe } from "../AnvilState.js";

class AnvilUl extends HTMLUListElement {
	
  #isHidden(item) {
		return location.hash === "#/active" && item.done || location.hash === "#/completed" && !item.done;
  }
    
	#render = () => {

		state.forEach((task, index) => {
			let li = this.children[index] ?? document.createElement("li", { is : "anvil-li" });
			
			if (li.label !== task.label) li.label = task.label;
			if (li.done !== task.done) li.done = task.done;
			if (li.index !== index) li.index = index;
			
			li.style.display = this.#isHidden(task) ? "none" : "block";
			
			if (!li.parentNode) this.append(li);
		})

		while (this.children.length > state.length) this.lastElementChild.remove();
	}
      
  connectedCallback() {
		this.#render();
		subscribe("*.*", this.#render);
		addEventListener("hashchange", this.#render);
  }
  
  disconnectedCallback() {
    unsubscribe("*.*", this.#render);
		removeEventListener("hashchange", this.#render);
  }
}

customElements.define("anvil-ul", AnvilUl, { extends : "ul" });