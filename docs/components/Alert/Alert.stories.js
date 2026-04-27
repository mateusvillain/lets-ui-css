import '../../../packages/lets-ui-tokens/dist/letsui.tokens.css';
import '../../../packages/styles/dist/letsui.css';
import '../../../packages/lets-ui-components/src/index.js';

export default {
  title: 'Components/Alert',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['caution', 'danger', 'info', 'success'],
    },
    title: { control: 'text' },
    content: { control: 'text' },
    primaryButton: { control: 'text' },
    secondaryButton: { control: 'text' },
  },
};

const Template = ({
  variant,
  title,
  content,
  primaryButton,
  secondaryButton,
}) => {
  const attrs = [
    `variant="${variant ?? 'success'}"`,
    `title="${title ?? ''}"`,
    `content="${content ?? ''}"`,
    primaryButton ? `primary-button="${primaryButton}"` : '',
    secondaryButton ? `secondary-button="${secondaryButton}"` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return `<lui-alert ${attrs}></lui-alert>`;
};

const baseArgs = {
  variant: 'success',
  title: 'Alert title',
  content: 'Description',
  primaryButton: 'Button',
  secondaryButton: 'Button',
};

export const Alert = Template.bind({});
Alert.args = { ...baseArgs };

export const Success = Template.bind({});
Success.args = { ...baseArgs, variant: 'success' };

export const Caution = Template.bind({});
Caution.args = { ...baseArgs, variant: 'caution' };

export const Danger = Template.bind({});
Danger.args = { ...baseArgs, variant: 'danger' };

export const Info = Template.bind({});
Info.args = { ...baseArgs, variant: 'info' };
