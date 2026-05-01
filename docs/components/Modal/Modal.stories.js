import '../../../packages/lets-ui-tokens/dist/letsui.tokens.css';
import '../../../packages/styles/dist/letsui.css';
import 'lets-ui-icons/dist/lets-ui-icons.css';
import '../../../packages/lets-ui-components/src/index.js';

export default {
  title: 'Components/Modal',
  argTypes: {
    title: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    triggerLabel: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Modals are used to display content in a layer above the app.',
      },
    },
  },
};

const Template = ({ title, size, triggerLabel }) => {
  const attrs = [
    `title="${title ?? 'Modal title'}"`,
    `size="${size ?? 'md'}"`,
    `trigger-label="${triggerLabel ?? 'Open modal'}"`,
  ].join(' ');

  return `
    <lui-modal ${attrs}>
      <p>This is the modal body text. It defines the main content of the modal.</p>
      <button slot="actions" data-modal-close class="btn btn--secondary btn--lg">Cancel</button>
      <button slot="actions" class="btn btn--primary btn--lg">Confirm</button>
    </lui-modal>
  `;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Modal title',
  size: 'md',
  triggerLabel: 'Open modal',
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  title: 'Small Modal',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
  title: 'Large Modal',
  size: 'lg',
};

export const WithoutActions = () => `
  <lui-modal title="Modal without actions" trigger-label="Open modal">
    <p>This modal has no footer actions.</p>
  </lui-modal>
`;
WithoutActions.storyName = 'Without actions';

export const CustomTrigger = () => `
  <lui-modal title="Modal with custom trigger">
    <button slot="trigger" class="btn btn--secondary btn--lg">
      <i class="lui lui-settings" aria-hidden="true"></i>
      Settings
    </button>
    <p>This modal uses a fully custom trigger via <code>slot="trigger"</code>.</p>
    <button slot="actions" data-modal-close class="btn btn--secondary btn--lg">Cancel</button>
    <button slot="actions" class="btn btn--primary btn--lg">Confirm</button>
  </lui-modal>
`;
CustomTrigger.storyName = 'Custom trigger (slot)';
