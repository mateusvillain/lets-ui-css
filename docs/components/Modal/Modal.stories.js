import '../../../dist/letsui.tokens.css';
import '../../../dist/letsui.css';

export default {
  title: 'Components/Modal',
  argTypes: {
    title: {
      control: 'text',
    },
    body: {
      control: 'text',
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'md', 'sm'],
    },
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

const Template = ({ title, body, size }) => {
  const dialogClasses = ['modal', size && `modal--${size}`]
    .filter(Boolean)
    .join(' ');

  return `
      <div class="${dialogClasses}" tabindex="-1" role="dialog">
        <div class="modal__header">
          ${title}
        </div>
        <div class="modal__body">
          <p>${body}</p>
        </div>
        <div class="modal__footer">
          <button class="btn btn--secondary btn--lg">Cancel</button>
          <button class="btn btn--primary btn--lg">Confirm</button>
        </div>
      </div>
  `;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Modal title',
  body: 'This is the modal body text. It defines the main content of the modal.',
  size: 'md',
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
  size: 'lg',
  title: 'Large Modal',
};

export const Medium = Template.bind({});
Medium.args = {
  ...Default.args,
  size: 'md',
  title: 'Medium Modal',
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  size: 'sm',
  title: 'Small Modal',
};
