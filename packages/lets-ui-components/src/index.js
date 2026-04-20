import { LuiAlert } from './components/alert.js';
import { LuiBreadcrumb } from './components/breadcrumb.js';
import { LuiBreadcrumbItem } from './components/breadcrumb-item.js';
import { LuiButton } from './components/button.js';
import { LuiCard } from './components/card.js';
import { LuiCheckbox } from './components/checkbox.js';
import { LuiIconButton } from './components/icon-button.js';
import { LuiInput } from './components/input.js';
import { LuiLink } from './components/link.js';
import { LuiModal } from './components/modal.js';
import { LuiNativeSelect, LuiSelect } from './components/select.js';
import { LuiShortcut } from './components/shortcut.js';
import { LuiTag } from './components/tag.js';
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
define('lui-input', LuiInput);
define('lui-link', LuiLink);
define('lui-modal', LuiModal);
define('lui-select', LuiSelect);
define('lui-native-select', LuiNativeSelect);
define('lui-shortcut', LuiShortcut);
define('lui-tag', LuiTag);
define('lui-tooltip', LuiTooltip);

export {
  LuiAlert,
  LuiBreadcrumb,
  LuiBreadcrumbItem,
  LuiButton,
  LuiCard,
  LuiCheckbox,
  LuiIconButton,
  LuiInput,
  LuiLink,
  LuiModal,
  LuiNativeSelect,
  LuiSelect,
  LuiShortcut,
  LuiTag,
  LuiTooltip,
};
