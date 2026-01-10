import '../../../../dist/letsui.tokens.css';
import '../../../../dist/letsui.css';

export default {
  title: 'Components/Tag',
  tags: ['autodocs'],
  argTypes: {
    label: { 
      control: 'text'
    },
    style: {
      control: {
        type: 'select'
      },
      options: [
        'surface',
        'container'
      ],
    },
    variant: {
      control: {
        type: 'select'
      },
      options: [
        'primary',
        'caution',
        'danger',
        'success',
        'neutral'
      ],
    },
    size: {
      control: { 
        type: 'select' 
      },
        options: [
          'lg',
          'md',
          'sm'
        ],
    }
  },
};

const Template = ({ label, style, variant, size }) => {
  const classes = [
    style && `tag-${style}-${variant}`,
    size && `tag-${size}`,
  ]
    .filter(Boolean)
    .join(' ');

  return `
    <div class="${classes}">${label}</div>
  `;
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Tag',
  style: 'surface',
  variant: 'primary',
  size: 'md'
};

export const Caution = () => `
  <div class="tag-surface-caution tag-md">Surface caution</div>
  <div class="tag-container-caution tag-md">Container caution</div>
`;

export const Danger = () => `
  <div class="tag-surface-danger tag-md">Surface danger</div>
  <div class="tag-container-danger tag-md">Container danger</div>
`;

export const Success = () => `
  <div class="tag-surface-success tag-md">Surface success</div>
  <div class="tag-container-success tag-md">Container success</div>
`;

export const Neutral = () => `
  <div class="tag-surface-neutral tag-md">Surface neutral</div>
  <div class="tag-container-neutral tag-md">Container neutral</div>
`;

export const Size = () => `
  <div class="tag-surface-primary tag-lg">Large tag</div>
  <div class="tag-surface-primary tag-md">Medium tag</div>
  <div class="tag-surface-primary tag-sm">Small tag</div>
`;
