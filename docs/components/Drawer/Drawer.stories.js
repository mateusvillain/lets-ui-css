import '../../../packages/lets-ui-tokens/dist/letsui.tokens.css';
import '../../../packages/styles/dist/letsui.css';
import 'lets-ui-icons/dist/lets-ui-icons.css';
import '../../../packages/lets-ui-components/src/index.js';

export default {
  title: 'Components/Drawer',
  argTypes: {
    title: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    triggerLabel: { control: 'text' },
    primaryButton: { control: 'text' },
    secondaryButton: { control: 'text' },
    closeOnBackdrop: { control: 'boolean' },
  },
};

const Template = ({
  title,
  size,
  triggerLabel,
  primaryButton,
  secondaryButton,
  closeOnBackdrop,
}) => {
  const attrs = [
    `title="${title ?? 'Drawer title'}"`,
    `size="${size ?? 'md'}"`,
    `trigger-label="${triggerLabel ?? 'Abrir drawer'}"`,
    primaryButton ? `primary-button="${primaryButton}"` : '',
    secondaryButton ? `secondary-button="${secondaryButton}"` : '',
    closeOnBackdrop ? 'close-on-backdrop' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return `
    <lui-drawer ${attrs}>
      <p>Conteúdo do drawer. Pode ser qualquer elemento HTML ou componente.</p>
      <p style="margin-top: 12px;">Use o drawer para exibir detalhes, configurações ou ações secundárias sem sair do contexto da página principal.</p>
    </lui-drawer>
  `;
};

export const Drawer = Template.bind({});
Drawer.args = {
  title: 'Título do drawer',
  size: 'md',
  triggerLabel: 'Abrir drawer',
  primaryButton: 'Confirmar',
  secondaryButton: 'Cancelar',
  closeOnBackdrop: true,
};

export const Small = Template.bind({});
Small.args = {
  ...Drawer.args,
  title: 'Drawer pequeno',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  ...Drawer.args,
  title: 'Drawer grande',
  size: 'lg',
};

export const WithoutActions = Template.bind({});
WithoutActions.args = {
  ...Drawer.args,
  title: 'Drawer sem ações',
  primaryButton: '',
  secondaryButton: '',
};
WithoutActions.storyName = 'Sem ações';

export const CloseOnBackdropOff = Template.bind({});
CloseOnBackdropOff.args = {
  ...Drawer.args,
  title: 'Fechar apenas pelo X ou botão',
  closeOnBackdrop: false,
};
CloseOnBackdropOff.storyName = 'close-on-backdrop: false';

export const CustomTrigger = () => `
  <lui-drawer title="Drawer com trigger customizado" primary-button="Confirmar" secondary-button="Cancelar" close-on-backdrop>
    <button slot="trigger" class="btn btn--secondary btn--lg">
      <i class="lui lui-settings" aria-hidden="true"></i>
      Configurações
    </button>
    <p>Conteúdo do drawer com trigger totalmente customizado via <code>slot="trigger"</code>.</p>
    <p style="margin-top: 12px;">Qualquer elemento ou componente pode ser o trigger — basta adicionar o atributo <code>slot="trigger"</code>.</p>
  </lui-drawer>
`;
CustomTrigger.storyName = 'Trigger customizado (slot)';
