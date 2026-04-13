import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

// ─── Helper: botão reabrir modal ─────────────────────────────────────────────

function ReopenBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
        padding: '8px 20px', background: '#0F6C13', color: '#FFF',
        border: 'none', borderRadius: 8, cursor: 'pointer',
        fontFamily: "'Clash Grotesk', sans-serif", fontSize: 14, fontWeight: 600,
        zIndex: 10,
      }}
    >
      Abrir Modal
    </button>
  );
}

// ─── Sample slot item (radio option row — mirrors Figma modal__body slot) ─────

function SlotItem({ label, sublabel, value }: { label: string; sublabel?: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        background: '#FFFFFF',
        border: '1px solid #E0DEED',
        borderRadius: 8,
        padding: '13px 17px',
        boxShadow: '0px 4px 24px 0px rgba(36,49,92,0.16)',
        width: '100%',
        boxSizing: 'border-box',
        cursor: 'pointer',
      }}
    >
      {/* Radio dot placeholder */}
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: '1px solid #C6C3D0',
          background: '#FFFFFF',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: '1 0 0', minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: "'Clash Grotesk', sans-serif",
            fontSize: 16,
            color: '#757094',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ fontWeight: 600 }}>{label}</span>
            {sublabel && <span style={{ fontWeight: 400 }}>{sublabel}</span>}
          </div>
          <span style={{ fontWeight: 400 }}>{value}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Modal> = {
  title: 'Componentes/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    onClose: { action: 'onClose' },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          background: '#E0DEED',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ─── Default (heading + body + actions) ──────────────────────────────────────

export const Default: Story = {
  name: 'Default (heading + body + actions)',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            style={{
              position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
              padding: '8px 20px', background: '#0F6C13', color: '#FFF',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'sans-serif', fontSize: 14,
            }}
          >
            Abrir Modal
          </button>
        )}
        <Modal
          isOpen={open}
          title="Título do Modal"
          description="Descrição curta de contexto do modal, deve ser de até duas linhas"
          onClose={() => setOpen(false)}
          secondaryAction={{ label: 'Cancelar', onClick: () => setOpen(false) }}
          primaryAction={{ label: 'Confirmar', onClick: () => setOpen(false) }}
        >
          <SlotItem label="Avaliação" sublabel="(Teste por 7 dias)" value="R$ 0,00" />
          <SlotItem label="Básico" sublabel="(Mensal)" value="R$ 49,90" />
          <SlotItem label="Pro" sublabel="(Anual)" value="R$ 39,90" />
        </Modal>
      </>
    );
  },
};

// ─── Only primary action ──────────────────────────────────────────────────────

export const OnlyPrimary: Story = {
  name: 'Only primary action',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        {!open && <ReopenBtn onClick={() => setOpen(true)} />}
        <Modal
          isOpen={open}
          title="Confirmação"
          description="Tem certeza que deseja continuar com esta ação?"
          onClose={() => setOpen(false)}
          primaryAction={{ label: 'Entendi', onClick: () => setOpen(false) }}
        />
      </>
    );
  },
};

// ─── No actions (info only) ───────────────────────────────────────────────────

export const InfoOnly: Story = {
  name: 'Info only (no actions)',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        {!open && <ReopenBtn onClick={() => setOpen(true)} />}
        <Modal
          isOpen={open}
          title="Informação importante"
          description="Este conteúdo é apenas informativo e não requer uma ação imediata da sua parte."
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
};

// ─── No description ───────────────────────────────────────────────────────────

export const NoDescription: Story = {
  name: 'No description',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        {!open && <ReopenBtn onClick={() => setOpen(true)} />}
        <Modal
          isOpen={open}
          title="Escolha um plano"
          onClose={() => setOpen(false)}
          secondaryAction={{ label: 'Voltar', onClick: () => setOpen(false) }}
          primaryAction={{ label: 'Selecionar', onClick: () => setOpen(false) }}
        >
          <SlotItem label="Básico" sublabel="(Mensal)" value="R$ 49,90" />
          <SlotItem label="Pro" sublabel="(Anual)" value="R$ 39,90" />
        </Modal>
      </>
    );
  },
};

// ─── Interactive ──────────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (toggle)',
  render: () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('');

    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#F5F5F5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          fontFamily: 'sans-serif',
        }}
      >
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 24px', background: '#0F6C13', color: '#FFF',
            border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14,
          }}
        >
          Abrir Modal
        </button>
        {selected && (
          <p style={{ fontSize: 13, color: '#524E69' }}>
            Selecionado: <strong>{selected}</strong>
          </p>
        )}
        <Modal
          isOpen={open}
          title="Escolha seu plano"
          description="Selecione o plano ideal para o seu processo seletivo."
          onClose={() => setOpen(false)}
          secondaryAction={{ label: 'Cancelar', onClick: () => setOpen(false) }}
          primaryAction={{
            label: 'Confirmar',
            onClick: () => { setSelected(selected || 'Básico'); setOpen(false); },
          }}
        >
          {['Avaliação (7 dias) — R$ 0,00', 'Básico Mensal — R$ 49,90', 'Pro Anual — R$ 39,90'].map(
            (opt) => (
              <div
                key={opt}
                onClick={() => setSelected(opt)}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  background: '#FFFFFF',
                  border: `1px solid ${selected === opt ? '#0F6C13' : '#E0DEED'}`,
                  borderRadius: 8,
                  padding: '13px 17px',
                  boxShadow: '0px 4px 24px 0px rgba(36,49,92,0.16)',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  width: '100%',
                  fontFamily: "'Clash Grotesk', sans-serif",
                  fontSize: 16,
                  color: '#757094',
                }}
              >
                <div
                  style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${selected === opt ? '#0F6C13' : '#C6C3D0'}`,
                    background: '#FFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {selected === opt && (
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0F6C13' }} />
                  )}
                </div>
                <span>{opt}</span>
              </div>
            ),
          )}
        </Modal>
      </div>
    );
  },
  decorators: [(Story) => <Story />],
};
