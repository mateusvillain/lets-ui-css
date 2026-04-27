import { mountMarkup } from '../internal.js';

export class LuiBreadcrumb extends HTMLElement {
  static observedAttributes = ['items', 'label', 'aria-label'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const itemNodes = Array.from(this.children).filter(
      (child) => child.tagName.toLowerCase() === 'lui-breadcrumb-item'
    );

    if (itemNodes.length > 0) {
      const itemsHtml = itemNodes
        .map((item) => {
          const label = item.innerHTML.trim();
          const href = item.getAttribute('href');
          const active =
            item.hasAttribute('active') &&
            item.getAttribute('active') !== 'false';

          if (!active && href) {
            return `<li><a class="link" href="${href}">${label}</a></li>`;
          }

          if (active) {
            return `<li aria-current="page">${label}</li>`;
          }

          return `<li>${label}</li>`;
        })
        .join('');

      const ariaLabel = this.getAttribute('aria-label') ?? 'Breadcrumb';
      mountMarkup(
        this,
        `<nav aria-label="${ariaLabel}"><ul class="breadcrumb" role="list">${itemsHtml}</ul></nav>`
      );
      return;
    }

    const label = this.getAttribute('label') ?? 'Page';
    const rawItems = this.getAttribute('items') ?? 'Item 1,Item 2,Item 3';
    const items = rawItems
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const linkItems = items.map(
      (item) => `<li><a class="link">${item}</a></li>`
    );

    const ariaLabel = this.getAttribute('aria-label') ?? 'Breadcrumb';
    mountMarkup(
      this,
      `<nav aria-label="${ariaLabel}"><ul class="breadcrumb" role="list">${linkItems.join('')}<li aria-current="page">${label}</li></ul></nav>`
    );
  }
}
