import { ensureElementId, mountMarkup } from '../internal.js';

export class LuiTooltip extends HTMLElement {
  static observedAttributes = ['position', 'text', 'label'];

  connectedCallback() {
    this._isOpen = false;
    this.render();
    this.attachEvents();
  }

  attributeChangedCallback() {
    this.render();
    this.attachEvents();
  }

  getPositionStyle(position) {
    if (position === 'bottom') {
      return 'position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%);z-index:12;';
    }

    if (position === 'left') {
      return 'position:absolute;right:calc(100% + 8px);top:50%;transform:translateY(-50%);z-index:12;';
    }

    if (position === 'right') {
      return 'position:absolute;left:calc(100% + 8px);top:50%;transform:translateY(-50%);z-index:12;';
    }

    return 'position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);z-index:12;';
  }

  attachEvents() {
    const trigger = this.querySelector('[data-tooltip-trigger]');
    const host = this.querySelector('[data-tooltip-host]');

    if (!trigger || !host) {
      return;
    }

    host.onmouseenter = null;
    host.onmouseleave = null;
    trigger.onfocus = null;
    trigger.onblur = null;
    host.onmouseenter = () => {
      this._isOpen = true;
      this.render();
      this.attachEvents();
    };
    host.onmouseleave = () => {
      this._isOpen = false;
      this.render();
      this.attachEvents();
    };
    trigger.onfocus = () => {
      this._isOpen = true;
      this.render();
      this.attachEvents();
    };
    trigger.onblur = () => {
      this._isOpen = false;
      this.render();
      this.attachEvents();
    };
  }

  render() {
    const baseId = ensureElementId(this, 'lui-tooltip');
    const position = this.getAttribute('position') ?? 'top';
    const text = this.getAttribute('text') ?? 'Tooltip';
    const label = this.getAttribute('label') ?? 'Info';
    const open = this._isOpen === true;

    mountMarkup(
      this,
      `
      <span data-tooltip-host style="position:relative;display:inline-flex;align-items:center;">
        <button
          type="button"
          data-tooltip-trigger
          class="btn btn--secondary btn--md"
          aria-describedby="${baseId}-content"
          aria-expanded="${open ? 'true' : 'false'}"
          style="cursor:help;"
        >${label}</button>
        <span
          id="${baseId}-content"
          class="tooltip tooltip--${position}"
          role="tooltip"
          aria-hidden="${open ? 'false' : 'true'}"
          style="${this.getPositionStyle(position)}display:${open ? 'inline-block' : 'none'};"
        >${text}</span>
      </span>
      `
    );
  }
}
