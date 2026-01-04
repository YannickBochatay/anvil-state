class TodoFilters extends HTMLElement {
	
	#update = () => {
		this.querySelectorAll("a").forEach(node => node.classList.remove("selected"));
		
		if (location.hash) {
			this.querySelector(`a[href="${location.hash}"]`).classList.add("selected");
		} else {
			this.querySelector(`a[href="#/"]`).classList.add("selected");
		}
	}
	
	connectedCallback() {
		let template = document.createElement("template");
		
		template.innerHTML = `
			<ul class="filters">
				<li>
					<a href="#/">All</a>
				</li>
				<li>
					<a href="#/active">Active</a>
				</li>
				<li>
					<a href="#/completed">Completed</a>
				</li>
			</ul>
		`;
		
		this.append(template.content.cloneNode(true));
		this.#update();
		window.addEventListener("hashchange", this.#update);
	}
	
	disconnectedCallback() {
		window.removeEventListener("hashchange", this.#update);
	}
}

customElements.define("todo-filters", TodoFilters);