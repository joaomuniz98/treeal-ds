import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { SSOButton } from '../SSOButton';

const Icon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M10 3a7 7 0 1 1 0 14A7 7 0 0 1 10 3zm0 1.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM10 8a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 8zm0-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Componentes/Botões',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'fill', 'secondary', 'text'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    iconLeft:  { control: false },
    iconRight: { control: false },
    children:  { control: 'text' },
  },
  args: {
    children: 'Botão',
    variant: 'outline',
    size: 'md',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const AllVariants: Story = {
  name: 'Todos os variantes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {(['md', 'sm'] as const).map((size) => (
        <div key={size}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#9490AC', margin: '0 0 12px', letterSpacing: 1, textTransform: 'uppercase' }}>
            Size {size}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            {(['outline', 'fill', 'secondary', 'text'] as const).map((variant) => (
              <Button key={variant} variant={variant} size={size} iconLeft={<Icon />}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            ))}
            <Button size={size} disabled iconLeft={<Icon />}>Disabled</Button>
          </div>
        </div>
      ))}
      <div>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#9490AC', margin: '0 0 12px', letterSpacing: 1, textTransform: 'uppercase' }}>
          Combinações de ícone
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Button variant="outline" size="md">Sem ícone</Button>
          <Button variant="outline" size="md" iconLeft={<Icon />}>Ícone esquerda</Button>
          <Button variant="outline" size="md" iconRight={<Icon />}>Ícone direita</Button>
          <Button variant="fill" size="md" iconLeft={<Icon />} iconRight={<Icon />}>Ambos</Button>
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#9490AC', margin: '0 0 12px', letterSpacing: 1, textTransform: 'uppercase' }}>
          Login / SSO
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <SSOButton size="md">Cadastrar com</SSOButton>
          <SSOButton size="sm">Entrar com</SSOButton>
        </div>
      </div>
    </div>
  ),
};
