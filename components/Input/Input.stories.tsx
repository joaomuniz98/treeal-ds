import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import type { InputState, InputType } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Formulários/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    inputType: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'date'] satisfies InputType[],
      description: 'Tipo semântico do campo',
    },
    state: {
      control: 'select',
      options: ['Default', 'Hover', 'Active', 'Disabled', 'Error'] satisfies InputState[],
      description: 'Estado visual',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    label:       { control: 'text' },
    placeholder: { control: 'text' },
    message:     { control: 'text' },
    iconLabel:   { control: false },
    iconLeft:    { control: false },
    iconRight:   { control: false },
  },
  args: {
    label:       'Label',
    placeholder: 'Placeholder',
    message:     'Mensagem de apoio',
    state:       'Default',
    inputType:   'text',
    size:        'md',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ─── Tipos ────────────────────────────────────────────────────────────────────

const TYPES: { type: InputType; label: string; placeholder: string }[] = [
  { type: 'text',     label: 'Texto',  placeholder: 'Digite aqui...' },
  { type: 'email',    label: 'E-mail', placeholder: 'seu@email.com' },
  { type: 'password', label: 'Senha',  placeholder: '••••••••' },
  { type: 'search',   label: 'Busca',  placeholder: 'Pesquisar...' },
  { type: 'date',     label: 'Data',   placeholder: '' },
];

export const AllTypes: Story = {
  name: 'Todos os tipos',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
      {TYPES.map(({ type, label, placeholder }) => (
        <div key={type} style={{ width: 280 }}>
          <Input
            inputType={type}
            label={label}
            placeholder={placeholder}
            message="Mensagem de apoio"
          />
        </div>
      ))}
    </div>
  ),
};

// ─── Estados ──────────────────────────────────────────────────────────────────

const STATES: { state: InputState; message?: string }[] = [
  { state: 'Default' },
  { state: 'Hover' },
  { state: 'Active' },
  { state: 'Disabled' },
  { state: 'Error', message: 'Campo obrigatório' },
];

export const AllStates: Story = {
  name: 'Todos os estados',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
      {STATES.map(({ state, message }) => (
        <div key={state} style={{ width: 280 }}>
          <Input
            state={state}
            label={state}
            placeholder="Placeholder"
            message={message ?? 'Mensagem de apoio'}
          />
        </div>
      ))}
    </div>
  ),
};

// ─── Tamanhos ─────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Tamanhos',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
      <div style={{ width: 280 }}>
        <Input size="md" label="Medium (padrão)" placeholder="48px de altura" />
      </div>
      <div style={{ width: 280 }}>
        <Input size="sm" label="Small" placeholder="36px de altura" />
      </div>
    </div>
  ),
};
