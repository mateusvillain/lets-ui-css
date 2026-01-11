import '../../../../dist/letsui.tokens.css';
import '../../../../dist/letsui.css';

export default {
  title: 'Components/Tooltip',
  argTypes: {
    position: {
      control: {
        type: 'select'
      },
      options: [
        'top',
        'bottom',
        'left',
        'right'
      ],
    },
    text: { 
      control: 'text'
    },
  },
};

const Template = ({ position, text }) => {

  return `
    <div class="tooltip tooltip--${position}">
      ${text}
    </div>
  `;
};

export const Tooltip = Template.bind({});
Tooltip.args = {
  position: 'top',
  text: 'Tooltip',
};

export const Primary = () => `
  <div class="alert bc-caution>
    <div class="alert-content">
      <div class="alert-text">
        <p class="body-lg">Title</p>
        <p class="body-lg">Title</p>
      </div>
    </div>
  </div>
`;
