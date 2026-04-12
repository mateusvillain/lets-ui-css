import { mountMarkup } from '../internal.js';

export class LuiLink extends HTMLElement {
  static observedAttributes = ['label', 'href', 'aria-label'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const label = this.getAttribute('label') ?? '';
    const href = this.getAttribute('href') ?? '#';
    const ariaLabel = this.getAttribute('aria-label') ?? (label || 'Link');

    mountMarkup(
      this,
      `<a class="link" href="${href}" aria-label="${ariaLabel}">${label}</a>`
    );
  }
}
