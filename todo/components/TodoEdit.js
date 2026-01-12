// @ts-check

const template = document.createElement('template');

template.innerHTML = `
	<form>
		<input class='edit'>
	</form>
`;

export class TodoEdit extends HTMLElement {
	
	static observedAttributes = ['disabled', 'value']
	
	#input
	
	constructor() {
		super();
		this.append(template.content.cloneNode(true));
		/** @type {HTMLInputElement} */
		this.#input = this.querySelector('input');
	}
	
	get disabled() {
		return this.hasAttribute('disabled');
	}
	
	set disabled(bool) {
		if (bool) this.setAttribute('disabled', '');
		else this.removeAttribute('disabled');
	}
	
	/**
	 * @return {string|null}
	 */
	get value() {
		return this.getAttribute('value');
	}
	
	/**
	 * @param {string} value
	 */
	set value(value) {
		this.setAttribute('value', value);
	}
	
	edit = () => {
		const input = this.#input;
		if (!input) return;
		input.focus();
		input.selectionStart = input.selectionEnd = input.value.length;
	}
	
	/**
	 * @param {Event} e 
	 */
	validate = e => {
		e.preventDefault();
		const value = this.#input?.value.trim();

		if (value) {
			const event = new CustomEvent('validate', { detail : { value } });
			this.dispatchEvent(event);
		}
	}
	
	/**
	 * 
	 * @param {Event} e 
	 */
	cancel = e => {
		this.disabled = true;
		this.dispatchEvent(new CustomEvent('cancel'));
	}
	
	#update() {
		if (!this.#input) return;
		this.#input.value = this.value ?? "";
		this.style.display = this.disabled ? 'none' : 'block';
		if (!this.disabled) this.edit();
	}
	
	connectedCallback() {
		this.#input?.addEventListener('blur', this.cancel);
		this.querySelector('form')?.addEventListener('submit', this.validate);
		this.#update();
	}
	
	attributeChangedCallback() {
		this.#update();
	}
	
}

customElements.define('todo-edit', TodoEdit);