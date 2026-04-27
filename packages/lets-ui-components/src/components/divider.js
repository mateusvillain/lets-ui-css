import { mountMarkup } from '../internal.js';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export class LuiDivider extends HTMLElement {
  static observedAttributes = ['label', 'orientation'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const label = this.getAttribute('label') ?? '';
    const vertical = this.getAttribute('orientation') === 'vertical';
    const verticalClass = vertical ? ' divider--vertical' : '';

    if (label) {
      mountMarkup(
        this,
        `<div class="divider divider--labeled${verticalClass}" role="separator" aria-label="${escapeHtml(label)}">
          <span class="divider__label">${escapeHtml(label)}</span>
        </div>`
      );
    } else {
      mountMarkup(
        this,
        `<div class="divider${verticalClass}" role="separator"></div>`
      );
    }
  }
}
