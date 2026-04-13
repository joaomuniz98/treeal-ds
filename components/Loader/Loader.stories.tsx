import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';
import { Button } from '../Button';

const meta: Meta<typeof Loader> = {
  title: 'Componentes/Loadings',
  component: Loader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

// ─── Interactive (com overlay real) ──────────────────────────────────────────

function Demo() {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{ padding: 40, display: 'flex', gap: 12 }}>
      <Button variant="fill" onClick={() => setVisible(true)}>
        Abrir loader
      </Button>
      <Loader visible={visible} overlay />
      {visible && (
        <Button variant="outline" onClick={() => setVisible(false)}>
          Fechar
        </Button>
      )}
    </div>
  );
}

export const WithOverlay: Story = {
  name: 'Com overlay',
  render: () => <Demo />,
};

// ─── Só o spinner (sem overlay) ───────────────────────────────────────────────

export const SpinnerOnly: Story = {
  name: 'Só o spinner',
  parameters: { layout: 'centered' },
  render: () => <Loader visible overlay={false} />,
};
