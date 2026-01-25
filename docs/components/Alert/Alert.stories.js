import '../../../dist/letsui.tokens.css';
import '../../../dist/letsui.css';

export default {
  title: 'Components/Alert',
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['caution', 'danger', 'info', 'success'],
    },
    title: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
    actions: {
      control: 'boolean',
    },
  },
};

const Template = ({ variant, title, content, actions }) => {
  return `
    <div class="alert alert--${variant}" role="alert">
      <div class="alert__content">
        <div class="alert__text">
          <p class="body--lg">${title}</p>
          <p class="body--lg">${content}</p>
        </div>
      </div>

      ${
        actions
          ? `
            <div class="alert__actions">
              <button class="btn btn--secondary btn--lg">Button</button>
              <button class="btn btn--primary btn--lg">Button</button>
            </div>
          `
          : ''
      }
    </div>
  `;
};

export const Alert = Template.bind({});
Alert.args = {
  variant: 'success',
  title: 'Alert title',
  content: 'Description',
  actions: true,
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  title: 'Alert title',
  content: 'Description',
  actions: true,
};

export const Caution = Template.bind({});
Caution.args = {
  variant: 'caution',
  title: 'Alert title',
  content: 'Description',
  actions: true,
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  title: 'Alert title',
  content: 'Description',
  actions: true,
};

export const Info = Template.bind({});
Info.args = {
  variant: 'info',
  title: 'Alert title',
  content: 'Description',
  actions: true,
};
