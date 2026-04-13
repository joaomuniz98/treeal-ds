import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BaseCheckRadio } from './BaseCheckRadio';

const meta: Meta<typeof BaseCheckRadio> = {
  title: 'Formulários/Checkbox & Radio',
  component: BaseCheckRadio,
  tags: ['autodocs'],
  argTypes: {
    type:           { control: 'inline-radio', options: ['Check', 'Radio', 'Toggle'] },
    checked:        { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    disabled:       { control: 'boolean' },
  },
  args: { type: 'Check', disabled: false },
};

export default meta;
type Story = StoryObj<typeof BaseCheckRadio>;

export const Interactive: Story = {
  name: 'Interativo',
  render: () => {
    const [check, setCheck] = useState(false);
    const [radio, setRadio] = useState(false);
    const [toggle, setToggle] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {[
          { label: 'Check',  type: 'Check'  as const, checked: check,  set: setCheck  },
          { label: 'Radio',  type: 'Radio'  as const, checked: radio,  set: setRadio  },
          { label: 'Toggle', type: 'Toggle' as const, checked: toggle, set: setToggle },
        ].map(({ label, type, checked, set }) => (
          <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            fontFamily: "'Clash Grotesk', sans-serif", fontSize: 14, color: '#524E69' }}>
            <BaseCheckRadio type={type} checked={checked} onChange={set} />
            {label} — <strong style={{ color: '#203224' }}>{checked ? 'Checked' : 'Default'}</strong>
          </label>
        ))}
      </div>
    );
  },
};

export const AllVariants: Story = {
  name: 'Todos os variantes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['Check', 'Radio', 'Toggle'] as const).map((type) => (
        <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <span style={{ width: 56, fontSize: 13, fontWeight: 600, color: '#9490AC',
            fontFamily: "'Clash Grotesk', sans-serif" }}>{type}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {([false, true] as const).map((checked) => (
              <div key={String(checked)} style={{ display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 8 }}>
                <BaseCheckRadio type={type} defaultChecked={checked} />
                <span style={{ fontSize: 11, color: '#9490AC',
                  fontFamily: "'Clash Grotesk', sans-serif" }}>
                  {checked ? 'Checked' : 'Default'}
                </span>
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <BaseCheckRadio type={type} disabled />
              <span style={{ fontSize: 11, color: '#9490AC',
                fontFamily: "'Clash Grotesk', sans-serif" }}>Disabled</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const InForm: Story = {
  name: 'Em formulário (name + value)',
  render: () => {
    const [submitted, setSubmitted] = useState<Record<string, string> | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24,
        fontFamily: "'Clash Grotesk', sans-serif" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget));
            setSubmitted(data as Record<string, string>);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14,
            color: '#524E69', cursor: 'pointer' }}>
            <BaseCheckRadio type="Check" name="termos" value="aceito" />
            Aceito os termos de uso
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#203224' }}>Plano</span>
            {['basico', 'pro', 'enterprise'].map((v) => (
              <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 10,
                fontSize: 14, color: '#524E69', cursor: 'pointer' }}>
                <BaseCheckRadio type="Radio" name="plano" value={v} />
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </label>
            ))}
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14,
            color: '#524E69', cursor: 'pointer' }}>
            <BaseCheckRadio type="Toggle" name="notificacoes" value="on" />
            Receber notificações
          </label>

          <button type="submit" style={{ alignSelf: 'flex-start', padding: '8px 20px',
            background: '#0F6C13', color: '#FFF', border: 'none', borderRadius: 8,
            cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            Enviar
          </button>
        </form>

        {submitted && (
          <pre style={{ fontSize: 12, background: '#F5F5F5', padding: 12, borderRadius: 6,
            color: '#203224', margin: 0 }}>
            {JSON.stringify(submitted, null, 2)}
          </pre>
        )}
      </div>
    );
  },
};
