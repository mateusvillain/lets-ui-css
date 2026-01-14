import '../../../dist/letsui.tokens.css';
import '../../../dist/letsui.css';

export default {
  title: 'Components/Text Field',
  argTypes: {
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
  },
};

const Template = ({ label, placeholder }) => {
  return `
    <div class="form-group">
      <label>${label}</label>
      <input type="text" class="form-size-lg" placeholder="${placeholder}">
    </div>
  `;
};

export const TextField = Template.bind({});
TextField.args = {
  label: 'Name',
  placeholder: 'Type here',
};
