import '../../../dist/letsui.tokens.css';
import '../../../dist/letsui.css';

export default {
  title: 'Components/Select',
  argTypes: {
    label: { control: 'text' },
    options: { control: 'text' },
    selected: { control: 'number' },
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['lg', 'md'],
    },
  },
};

const Template = ({
  label,
  options = 'Option 1,Option 2',
  selected = 0,
  disabled,
  size = 'lg',
}) => {
  const opts = options
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  const optionsHtml = opts
    .map(
      (opt, i) =>
        `<option ${i === Number(selected) ? 'selected' : ''}>${opt}</option>`
    )
    .join('');
  const sizeClass = `form__${size}`;

  return `
    <div class="form__group ${sizeClass}">
      <label>${label || ''}</label>
      <select ${disabled ? 'disabled' : ''}>
        ${optionsHtml}
      </select>
    </div>
  `;
};

export const Select = Template.bind({});
Select.args = {
  label: 'Choose an option',
  options: 'Option 1,Option 2,Option 3',
  selected: 0,
  disabled: false,
  size: 'lg',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Label',
  options: 'Option 1,Option 2,Option 3',
  selected: 0,
  disabled: false,
  size: 'md',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Label',
  options: 'Option 1,Option 2,Option 3',
  selected: 0,
  disabled: true,
  size: 'md',
};
