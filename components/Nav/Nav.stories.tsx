import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Nav } from './Nav';
import type { NavSection } from './Nav';

function IconHome() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" /><path d="M9 21V12h6v9" /></svg>;
}
function IconChart() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="9" /><rect x="10" y="7" width="4" height="14" /><rect x="17" y="3" width="4" height="18" /></svg>;
}
function IconUsers() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87" /></svg>;
}
function IconSettings() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
}
function IconFolder() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>;
}
function IconBell() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
}

const sections: NavSection[] = [
  {
    title: 'Principal',
    items: [
      { id: 'home',       label: 'Início',        icon: <IconHome /> },
      { id: 'reports',    label: 'Relatórios',    icon: <IconChart />,
        children: [
          { id: 'reports-monthly', label: 'Relatório mensal' },
          { id: 'reports-annual',  label: 'Relatório anual' },
          { id: 'reports-custom',  label: 'Personalizado' },
        ],
      },
      { id: 'candidates', label: 'Candidatos',    icon: <IconUsers /> },
    ],
  },
  {
    title: 'Gerenciar',
    items: [
      { id: 'documents',     label: 'Documentos',     icon: <IconFolder /> },
      { id: 'notifications', label: 'Notificações',   icon: <IconBell /> },
      { id: 'settings',      label: 'Configurações',  icon: <IconSettings /> },
    ],
  },
];

const mobileFooter = {
  userName: 'Carlos Magalhães',
  userRole: 'Suporte Técnico',
  userInitials: 'C',
  onLogout: () => alert('Logout'),
};

const LogoLight = () => (
  <img src="/assets/logo-treeal-light.png" style={{ height: 28, width: 'auto', objectFit: 'contain' }} alt="Treeal" />
);
/** Ícone compacto para o nav recolhido (fundo claro) */
function NavLogoIcon() {
  return (
    <svg width="43" height="32" viewBox="0 0 43 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5.31111 0.320001C4.59616 0.700605 4.16087 1.5806 4.16087 2.57939C4.16087 3.59999 4.41859 3.79877 7.21275 4.71997C9.71023 5.55876 9.90722 5.67998 9.90722 6.31998C9.90722 7.26058 9.3333 7.39876 5.44968 7.39876C2.99111 7.39876 1.72415 7.47875 1.38612 7.66057C0.654147 8.03875 0 9.13936 0 10.0194C0 10.6594 0.119159 10.88 0.851136 11.4594C2.08164 12.4606 10.2841 18.3999 10.6197 18.5405C11.0575 18.7005 11.4928 19.6799 11.4928 20.4605C11.4928 21.8787 10.6611 22.6399 4.79554 26.3805C3.03247 27.5199 1.408 28.6787 1.18913 28.9599C0.654133 29.6387 0.654133 31.0593 1.18913 31.5999C1.56606 31.9805 1.84331 31.9999 12.0861 31.9999C23.6981 31.9999 23.4014 32.0387 24.1747 30.7393C24.6683 29.9393 24.6902 28.9599 24.233 28.4387C24.0361 28.2205 22.7278 27.2193 21.3003 26.1793C17.3583 23.3405 16.8817 22.9405 16.5461 22.2593C16.1497 21.4399 16.4075 20.2593 17.2002 19.3987C17.655 18.8799 28.7125 11.7987 33.1894 9.13936C33.4083 8.99876 33.9822 8.62058 34.4783 8.27876C34.972 7.93937 36.7958 6.78059 38.5394 5.71877C42.3234 3.37939 42.8 2.94059 42.8 1.7406C42.8 1.07878 42.6808 0.758787 42.3452 0.441212L41.8881 0H23.8562C8.32171 0.0193939 5.76586 0.0606076 5.31111 0.320001Z" fill="#203224"/>
    </svg>
  );
}

const meta: Meta<typeof Nav> = {
  title: 'Componentes/Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    type: { control: 'select', options: ['open', 'closed', 'mobile'] },
    activeId: { control: 'text' },
  },
  decorators: [(Story) => <div style={{ height: 600, display: 'flex', background: '#F5F5F5' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Nav>;

export const Interactive: Story = {
  name: 'Interativo (abrir/fechar)',
  render: () => {
    const [open, setOpen] = useState(true);
    const [activeId, setActiveId] = useState('home');
    return (
      <div style={{ height: 600, display: 'flex', background: '#F5F5F5' }}>
        <Nav
          type={open ? 'open' : 'closed'}
          sections={sections}
          activeId={activeId}
          onItemClick={setActiveId}
          onCollapseToggle={() => setOpen((o) => !o)}
          logo={<LogoLight />}
          logoIcon={<NavLogoIcon />}
        />
        <div style={{ flex: 1, padding: 24, fontSize: 14, color: '#524E69' }}>
          <p>Estado: <strong>{open ? 'Aberto' : 'Fechado'}</strong></p>
          <p>Item ativo: <strong>{activeId}</strong></p>
        </div>
      </div>
    );
  },
  decorators: [(Story) => <Story />],
};

export const Mobile: Story = {
  name: 'Mobile',
  render: () => {
    const [activeId, setActiveId] = React.useState('home');
    return (
      <div style={{ height: 620, display: 'flex', background: '#F5F5F5' }}>
        <Nav
          type="mobile"
          sections={sections}
          activeId={activeId}
          onItemClick={setActiveId}
          logoIcon={<NavLogoIcon />}
          mobileFooter={{
            userName: 'Carlos Magalhães',
            userRole: 'Suporte Técnico',
            userInitials: 'C',
            onLogout: () => alert('Logout'),
          }}
        />
      </div>
    );
  },
  decorators: [(Story) => <Story />],
};

export const AllTypes: Story = {
  name: 'Todos os tipos',
  render: () => (
    <div style={{ display: 'flex', gap: 16, background: '#F5F5F5', padding: 16, height: 620 }}>
      {(['open', 'closed', 'mobile'] as const).map((type) => (
        <div key={type} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#9490AC', letterSpacing: 1, textTransform: 'uppercase' }}>{type}</span>
          <div style={{ height: 580 }}>
            <Nav
              type={type}
              sections={sections}
              activeId="home"
              logo={type === 'open' ? <LogoLight /> : undefined}
              logoIcon={<NavLogoIcon />}
              mobileFooter={type === 'mobile' ? mobileFooter : undefined}
            />
          </div>
        </div>
      ))}
    </div>
  ),
  decorators: [(Story) => <div style={{ minWidth: 700 }}><Story /></div>],
};
