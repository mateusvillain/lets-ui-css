import { LuiAlert } from './components/alert.js';
import { LuiBreadcrumb } from './components/breadcrumb.js';
import { LuiBreadcrumbItem } from './components/breadcrumb-item.js';
import { LuiButton } from './components/button.js';
import { LuiCard } from './components/card.js';
import { LuiCheckbox } from './components/checkbox.js';
import { LuiIconButton } from './components/icon-button.js';
import { LuiLink } from './components/link.js';
import { LuiModal } from './components/modal.js';
import { LuiSelect } from './components/select.js';
import { LuiTag } from './components/tag.js';
import { LuiTextField } from './components/text-field.js';
import { LuiTooltip } from './components/tooltip.js';

function define(name, elementClass) {
  if (!customElements.get(name)) {
    customElements.define(name, elementClass);
  }
}

define('lui-alert', LuiAlert);
define('lui-breadcrumb', LuiBreadcrumb);
define('lui-breadcrumb-item', LuiBreadcrumbItem);
define('lui-button', LuiButton);
define('lui-card', LuiCard);
define('lui-checkbox', LuiCheckbox);
define('lui-icon-button', LuiIconButton);
define('lui-link', LuiLink);
define('lui-modal', LuiModal);
define('lui-select', LuiSelect);
define('lui-tag', LuiTag);
define('lui-text-field', LuiTextField);
define('lui-tooltip', LuiTooltip);

export {
  LuiAlert,
  LuiBreadcrumb,
  LuiBreadcrumbItem,
  LuiButton,
  LuiCard,
  LuiCheckbox,
  LuiIconButton,
  LuiLink,
  LuiModal,
  LuiSelect,
  LuiTag,
  LuiTextField,
  LuiTooltip,
};
