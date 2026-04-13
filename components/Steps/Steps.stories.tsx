import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Steps } from './Steps';
import type { StepItem } from './Steps';

const steps5: StepItem[] = [
  { label: 'Inscrição' },
  { label: 'Triagem' },
  { label: 'Avaliação' },
  { label: 'Recursos' },
  { label: 'Resultado' },
];

const steps3: StepItem[] = [
  { label: 'Inscrição' },
  { label: 'Avaliação' },
  { label: 'Resultado' },
];

const meta: Meta<typeof Steps> = {
  title: 'Componentes/Steps',
  component: Steps,
  argTypes: {
    current:  { control: { type: 'number', min: 0 } },
    minified: { control: 'boolean' },
    steps:    { control: false },
  },
  args: { steps: steps5, current: 2 },
  decorators: [(Story) => <div style={{ maxWidth: 800 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Steps>;

export const Interactive: Story = {
  name: 'Interativo',
  render: () => {
    const [current, setCurrent] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 700 }}>
        <Steps steps={steps5} current={current} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            style={{ padding: '8px 20px', border: '1px solid #DCE5DE', borderRadius: 6, cursor: 'pointer', background: '#FFF', fontSize: 13, fontFamily: "'Clash Grotesk', sans-serif" }}
          >
            ← Anterior
          </button>
          <button
            onClick={() => setCurrent((c) => Math.min(steps5.length, c + 1))}
            disabled={current === steps5.length}
            style={{ padding: '8px 20px', border: 'none', borderRadius: 6, cursor: 'pointer', background: '#0F6C13', color: '#FFF', fontSize: 13, fontFamily: "'Clash Grotesk', sans-serif" }}
          >
            Próximo →
          </button>
        </div>
        <p style={{ fontSize: 13, color: '#9490AC', margin: 0 }}>
          Passo <strong style={{ color: '#203224' }}>{current + 1}</strong> de {steps5.length}
          {current >= steps5.length ? ' — concluído ✓' : ''}
        </p>
      </div>
    );
  },
};

export const AllStates: Story = {
  name: 'Todos os estados',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 700 }}>
      {[0, 1, 2, 3].map((current) => (
        <div key={current} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#9490AC', letterSpacing: 1, textTransform: 'uppercase' }}>
            current={current}{current > 2 ? ' (todos concluídos)' : ''}
          </span>
          <Steps steps={steps3} current={current} />
        </div>
      ))}
      <div style={{ borderTop: '1px solid #DCE5DE', paddingTop: 20 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#9490AC', letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
          Minified · current=2
        </span>
        <div style={{ width: 200 }}>
          <Steps steps={steps3} current={2} minified />
        </div>
      </div>
    </div>
  ),
};
