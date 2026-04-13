import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import type { SelectState } from './Select';

const options = [
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'mg', label: 'Minas Gerais' },
  { value: 'ba', label: 'Bahia' },
  { value: 'pr', label: 'Paraná' },
];

const STATES: SelectState[] = ['Default', 'Disabled', 'Error'];

const meta: Meta<typeof Select> = {
  title: 'Formulários/Select',
  component: Select,
  argTypes: {
    state: { control: 'select', options: STATES },
    label:       { control: 'text' },
    placeholder: { control: 'text' },
    message:     { control: 'text' },
    options:     { control: false },
  },
  args: {
    label: 'Estado',
    placeholder: 'Selecione um estado',
    message: 'Mensagem de apoio',
    state: 'Default',
    options,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const AllStates: Story = {
  name: 'Todos os estados',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {STATES.map((state) => (
        <div key={state} style={{ width: 280 }}>
          <Select
            state={state}
            label={state}
            placeholder="Selecione um estado"
            message={state === 'Error' ? 'Campo obrigatório' : 'Mensagem de apoio'}
            options={options}
          />
        </div>
      ))}
    </div>
  ),
};
