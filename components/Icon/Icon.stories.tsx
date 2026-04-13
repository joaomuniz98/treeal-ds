import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

// ─── Catálogo de ícones agrupados por categoria ───────────────────────────────

const ICON_CATALOG: Record<string, string[]> = {
  'Navegação': [
    'home', 'menu', 'close', 'arrow_back', 'arrow_forward',
    'chevron_right', 'chevron_left', 'chevron_up', 'expand_more',
    'open_in_new', 'logout', 'login',
  ],
  'Ações': [
    'search', 'add', 'remove', 'edit', 'delete', 'save',
    'download', 'upload', 'send', 'share', 'copy_all',
    'filter_list', 'sort', 'refresh',
  ],
  'Comunicação': [
    'notifications', 'mail', 'chat', 'phone', 'videocam',
    'campaign', 'forum', 'comment', 'inbox',
  ],
  'Status': [
    'check_circle', 'cancel', 'info', 'warning', 'error',
    'pending', 'schedule', 'done', 'done_all', 'block',
  ],
  'Arquivos': [
    'folder', 'folder_open', 'description', 'article',
    'picture_as_pdf', 'image', 'attach_file', 'cloud_upload',
  ],
  'Pessoas': [
    'person', 'group', 'manage_accounts', 'badge',
    'supervisor_account', 'assignment_ind', 'contact_page',
  ],
  'Dados': [
    'bar_chart', 'pie_chart', 'analytics', 'trending_up',
    'leaderboard', 'table_chart', 'dashboard', 'insights',
  ],
  'Configurações': [
    'settings', 'tune', 'build', 'admin_panel_settings',
    'security', 'lock', 'key', 'privacy_tip',
  ],
};

const ALL_ICONS = Object.values(ICON_CATALOG).flat();

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Icon> = {
  title: 'Fundação/Ícones',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name:   { control: 'text',         description: 'Nome do ícone Material Symbols (ex: "search", "home")' },
    size:   { control: 'inline-radio', options: [20, 24, 40, 48], description: 'Tamanho em px' },
    weight: { control: 'select',       options: [100, 200, 300, 400, 500, 600, 700], description: 'Espessura do traço' },
    fill:   { control: 'inline-radio', options: [0, 1], description: '0 = outline · 1 = preenchido' },
  },
  args: {
    name: 'search',
    size: 24,
    weight: 400,
    fill: 0,
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// ─── Catálogo completo ────────────────────────────────────────────────────────

export const Catalog: Story = {
  name: 'Catálogo completo',
  render: () => {
    const [fill, setFill] = useState<0 | 1>(0);
    const [size, setSize] = useState<20 | 24 | 40 | 48>(24);
    const [copied, setCopied] = useState('');

    const copy = (name: string) => {
      navigator.clipboard?.writeText(name).catch(() => {});
      setCopied(name);
      setTimeout(() => setCopied(''), 1500);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

        {/* Controles */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={labelStyle}>Fill</span>
            {([0, 1] as const).map((v) => (
              <button key={v} onClick={() => setFill(v)} style={chipStyle(fill === v)}>
                {v === 0 ? 'Outline' : 'Filled'}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={labelStyle}>Tamanho</span>
            {([20, 24, 40, 48] as const).map((v) => (
              <button key={v} onClick={() => setSize(v)} style={chipStyle(size === v)}>
                {v}px
              </button>
            ))}
          </div>
          {copied && (
            <span style={{ fontSize: 12, color: '#0F6C13', fontWeight: 600 }}>
              "{copied}" copiado!
            </span>
          )}
        </div>

        {/* Grupos */}
        {Object.entries(ICON_CATALOG).map(([group, icons]) => (
          <div key={group}>
            <p style={groupLabelStyle}>{group}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {icons.map((name) => (
                <button
                  key={name}
                  title={`Clique para copiar: ${name}`}
                  onClick={() => copy(name)}
                  style={iconCardStyle}
                >
                  <Icon name={name} size={size} fill={fill} aria-hidden />
                  <span style={{ fontSize: 10, color: '#9490AC', marginTop: 4, textAlign: 'center', wordBreak: 'break-all' }}>
                    {name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ─── Outline vs Filled ────────────────────────────────────────────────────────

export const OutlineVsFilled: Story = {
  name: 'Outline vs Filled',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['home', 'notifications', 'star', 'favorite', 'bookmark', 'check_circle', 'settings', 'person'] as const).map((name) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ width: 160, fontSize: 13, color: '#524E69', fontFamily: "'Clash Grotesk', sans-serif" }}>{name}</span>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Icon name={name} size={24} fill={0} aria-hidden />
              <span style={{ fontSize: 10, color: '#9490AC' }}>outline</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Icon name={name} size={24} fill={1} aria-hidden />
              <span style={{ fontSize: 10, color: '#9490AC' }}>filled</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Tamanhos ─────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Tamanhos',
  render: () => (
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end' }}>
      {([20, 24, 40, 48] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Icon name="home" size={size} aria-hidden />
          <span style={{ fontSize: 11, color: '#9490AC', fontWeight: 600 }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};

// ─── Pesos ────────────────────────────────────────────────────────────────────

export const Weights: Story = {
  name: 'Pesos (weight)',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end' }}>
      {([100, 200, 300, 400, 500, 600, 700] as const).map((weight) => (
        <div key={weight} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Icon name="search" size={32} weight={weight} aria-hidden />
          <span style={{ fontSize: 11, color: '#9490AC', fontWeight: 600 }}>{weight}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── Cores ────────────────────────────────────────────────────────────────────

export const Colors: Story = {
  name: 'Cores (via CSS)',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      {[
        { color: '#203224', label: 'Primary' },
        { color: '#0F6C13', label: 'Secondary' },
        { color: '#E7DA10', label: 'Tertiary', bg: '#203224' },
        { color: '#524E69', label: 'Text' },
        { color: '#9490AC', label: 'Muted' },
        { color: '#DE0000', label: 'Danger' },
      ].map(({ color, label, bg }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          background: bg, padding: bg ? 12 : 0, borderRadius: bg ? 8 : 0 }}>
          <Icon name="favorite" size={32} fill={1} style={{ color }} aria-hidden />
          <span style={{ fontSize: 11, fontWeight: 600, color: bg ? '#fff' : '#9490AC' }}>{label}</span>
          <span style={{ fontSize: 10, color: bg ? 'rgba(255,255,255,0.6)' : '#C6C3D0' }}>{color}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── Estilos auxiliares ───────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9490AC',
  letterSpacing: 1, textTransform: 'uppercase',
  fontFamily: "'Clash Grotesk', sans-serif",
};

const groupLabelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9490AC',
  letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 12px',
  fontFamily: "'Clash Grotesk', sans-serif",
};

const iconCardStyle: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  width: 80, padding: '12px 4px', gap: 0,
  background: '#FFFFFF', border: '1px solid #DCE5DE', borderRadius: 8,
  cursor: 'pointer', transition: 'border-color 0.15s ease, background 0.15s ease',
  color: '#203224',
};

const chipStyle = (active: boolean): React.CSSProperties => ({
  padding: '4px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12,
  fontFamily: "'Clash Grotesk', sans-serif", fontWeight: active ? 600 : 400,
  background: active ? '#203224' : '#F5F5F5',
  color: active ? '#FFFFFF' : '#524E69',
  border: `1px solid ${active ? '#203224' : '#DCE5DE'}`,
  transition: 'all 0.15s ease',
});
