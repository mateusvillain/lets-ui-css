import { mountMarkup } from '../internal.js';

export class LuiShortcut extends HTMLElement {
  static observedAttributes = ['keys'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const keys = (this.getAttribute('keys') ?? '')
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
    const label = this.getAttribute('aria-label') ?? keys.join(' + ');

    const keysHtml = keys
      .map((key, i) => {
        const sep =
          i < keys.length - 1
            ? `<span class="shortcut__sep" aria-hidden="true">+</span>`
            : '';
        return `<kbd class="shortcut__key">${key}</kbd>${sep}`;
      })
      .join('');

    mountMarkup(
      this,
      `<span class="shortcut" aria-label="${label}" role="group">${keysHtml}</span>`
    );
  }
}
