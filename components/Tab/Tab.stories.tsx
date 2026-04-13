import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tab, TabPanel } from './Tab';

const items = [
  { id: 'overview',  label: 'Visão Geral' },
  { id: 'details',   label: 'Detalhes' },
  { id: 'history',   label: 'Histórico' },
  { id: 'settings',  label: 'Configurações', disabled: true },
];

const meta: Meta<typeof Tab> = {
  component: Tab,
  argTypes: {
    items:    { control: false },
    activeId: { control: 'text' },
  },
  args: { items, activeId: 'overview', onChange: () => {} },
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const Interactive: Story = {
  name: 'Interativo',
  render: () => {
    const [active, setActive] = useState('overview');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <Tab items={items} activeId={active} onChange={setActive} />

        <TabPanel tabId="overview" activeId={active}
          style={{ padding: '20px 0', fontSize: 14, color: '#524E69',
            fontFamily: "'Clash Grotesk', sans-serif" }}>
          Conteúdo de <strong>Visão Geral</strong> — resumo geral do processo.
        </TabPanel>
        <TabPanel tabId="details" activeId={active}
          style={{ padding: '20px 0', fontSize: 14, color: '#524E69',
            fontFamily: "'Clash Grotesk', sans-serif" }}>
          Conteúdo de <strong>Detalhes</strong> — informações aprofundadas.
        </TabPanel>
        <TabPanel tabId="history" activeId={active}
          style={{ padding: '20px 0', fontSize: 14, color: '#524E69',
            fontFamily: "'Clash Grotesk', sans-serif" }}>
          Conteúdo de <strong>Histórico</strong> — linha do tempo de eventos.
        </TabPanel>
      </div>
    );
  },
};

export const SoloTabList: Story = {
  name: 'Só a barra (sem painel)',
  render: () => {
    const [active, setActive] = useState('overview');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Tab items={items} activeId={active} onChange={setActive} />
        <p style={{ fontSize: 13, color: '#9490AC', margin: 0,
          fontFamily: "'Clash Grotesk', sans-serif" }}>
          Aba ativa: <strong style={{ color: '#203224' }}>
            {items.find(i => i.id === active)?.label}
          </strong>
        </p>
      </div>
    );
  },
};
