import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  argTypes: {
    sizes:        { control: 'inline-radio', options: ['xs', 'md', 'lg'] },
    currentPage:  { control: { type: 'number', min: 1 } },
    totalPages:   { control: { type: 'number', min: 1 } },
    withControls: { control: 'boolean' },
    withEdges:    { control: 'boolean' },
  },
  args: { sizes: 'md', currentPage: 1, totalPages: 10, withControls: true, withEdges: true },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Interactive: Story = {
  name: 'Interativo',
  render: (args) => {
    const [page, setPage] = useState(1);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <Pagination {...args} currentPage={page} onChange={setPage} />
        <p style={{ fontSize: 13, color: '#9490AC', margin: 0 }}>
          Página atual: <strong style={{ color: '#203224' }}>{page}</strong>
        </p>
      </div>
    );
  },
  args: { sizes: 'md', totalPages: 10, withControls: true, withEdges: true },
};

export const AllSizes: Story = {
  name: 'Todos os tamanhos',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      {(['xs', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#9490AC', letterSpacing: 1, textTransform: 'uppercase' }}>
            {size} · withControls + withEdges
          </span>
          <Pagination sizes={size} currentPage={5} totalPages={10} withControls withEdges />
        </div>
      ))}
    </div>
  ),
};
