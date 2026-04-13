import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const user = {
  workspaceName: 'Best Buy Eletronics',
  workspaceAccount: 'Conta Atual',
  userName: 'Iago Lima',
  userRole: 'Suporte Treeal',
};

const meta: Meta<typeof Header> = {
  title: 'Componentes/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant:          { control: 'select', options: ['Default', 'Mobile', 'MobileOpen'] },
    pageTitle:        { control: 'text' },
    workspaceName:    { control: 'text' },
    workspaceAccount: { control: 'text' },
    userName:         { control: 'text' },
    userRole:         { control: 'text' },
  },
  args: { variant: 'Default', pageTitle: 'Portal de Gestão', ...user },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const AllVariants: Story = {
  name: 'Todos os variantes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, background: '#F5F5F5' }}>
      {[
        { label: 'Default (desktop)', node: <Header variant="Default" pageTitle="Portal de Gestão" {...user} /> },
        { label: 'Mobile', node: <div style={{ maxWidth: 399 }}><Header variant="Mobile" pageTitle="Portal de Gestão" {...user} /></div> },
        { label: 'MobileOpen', node: <div style={{ maxWidth: 399 }}><Header variant="MobileOpen" {...user} primaryAction={{ label: 'Ação', onClick: () => {} }} /></div> },
      ].map(({ label, node }) => (
        <div key={label} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#9490AC', margin: '0 0 4px 0', padding: '0 16px', letterSpacing: 1, textTransform: 'uppercase' }}>
            {label}
          </p>
          {node}
        </div>
      ))}
    </div>
  ),
  decorators: [(Story) => <Story />],
};

export const Interactive: Story = {
  name: 'Interativo (toggle mobile)',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ maxWidth: 399, background: '#F5F5F5', minHeight: '100vh' }}>
        <Header
          variant={open ? 'MobileOpen' : 'Mobile'}
          pageTitle="Portal de Gestão"
          {...user}
          primaryAction={{ label: 'Ação 1', onClick: () => setOpen(false) }}
          onMenuToggle={() => setOpen((v) => !v)}
          onNotifications={() => {}}
        />
        <div style={{ padding: 16, fontSize: 13, color: '#9490AC' }}>
          Clique em "Menu" para expandir / recolher.
        </div>
      </div>
    );
  },
  decorators: [(Story) => <Story />],
};
