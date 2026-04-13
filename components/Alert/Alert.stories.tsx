import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import type { AlertType } from './Alert';

const MSG = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.';
const TYPES: AlertType[] = ['Default', 'Info', 'Success', 'Warning', 'Error'];

const meta: Meta<typeof Alert> = {
  title: 'Componentes/Alertas',
  component: Alert,
  argTypes: {
    type:        { control: 'select', options: TYPES },
    title:       { control: 'text' },
    message:     { control: 'text' },
    addonLeft:   { control: 'boolean' },
    closeIcon:   { control: 'boolean' },
    actions:     { control: 'boolean' },
    actionLabel: { control: 'text' },
  },
  args: {
    type: 'Info',
    title: 'Título do alerta',
    message: MSG,
    addonLeft: true,
    closeIcon: true,
    actions: false,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const AllVariants: Story = {
  name: 'Todos os tipos',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {TYPES.map((type) => (
        <Alert key={type} type={type} title="Título do alerta" message={MSG} />
      ))}
    </div>
  ),
};

export const FullFeatured: Story = {
  name: 'Com todas as opções (ícone + título + ação + fechar)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {TYPES.map((type) => (
        <Alert key={type} type={type} title="Título do alerta" message="Mensagem curta de alerta." addonLeft closeIcon actions actionLabel="Desfazer" />
      ))}
    </div>
  ),
};

export const Dismissible: Story = {
  name: 'Interativo (dismissível)',
  render: () => {
    const [visible, setVisible] = useState<Record<AlertType, boolean>>(
      Object.fromEntries(TYPES.map((t) => [t, true])) as Record<AlertType, boolean>,
    );
    const reset = () => setVisible(Object.fromEntries(TYPES.map((t) => [t, true])) as Record<AlertType, boolean>);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {TYPES.filter((t) => visible[t]).map((type) => (
          <Alert key={type} type={type} title="Título do alerta" message={MSG}
            onClose={() => setVisible((p) => ({ ...p, [type]: false }))} />
        ))}
        {TYPES.every((t) => !visible[t]) && (
          <p style={{ color: '#9490AC', fontSize: 13, margin: 0 }}>Todos os alertas foram fechados.</p>
        )}
        <button onClick={reset} style={{
          alignSelf: 'flex-start', padding: '8px 20px', background: '#0F6C13', color: '#FFF',
          border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontFamily: "'Clash Grotesk', sans-serif",
        }}>
          Resetar
        </button>
      </div>
    );
  },
};
