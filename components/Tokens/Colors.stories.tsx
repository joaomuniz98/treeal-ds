import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { colors } from '../../tokens/colors';

// ─── Swatch ───────────────────────────────────────────────────────────────────

function Swatch({ name, value }: { name: string; value: string }) {
  const isLight =
    value === '#FFFFFF' || value === '#F5F5F5' || value === '#F9F8FC' ||
    value === '#F4F9FF' || value === '#F5FBF7' || value === '#FFF9E9' ||
    value === '#FFF8F6' || value === '#EFEEF2' || value === '#E0DEED' ||
    value === '#DBE8FF';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        minWidth: 120,
      }}
    >
      <div
        style={{
          width: '100%',
          height: 56,
          borderRadius: 6,
          background: value,
          border: isLight ? '1px solid #E0DEED' : 'none',
        }}
      />
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#9490AC' }}>
        {name}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#524E69', fontWeight: 600 }}>
        {value}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3
        style={{
          fontFamily: "'Clash Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: 16,
          color: '#203224',
          borderBottom: '2px solid #E0DEED',
          paddingBottom: 8,
          marginBottom: 20,
        }}
      >
        {title}
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {children}
      </div>
    </div>
  );
}

// ─── Alert swatch (bg + border + title) ──────────────────────────────────────

function AlertSwatch({ name, tokens }: { name: string; tokens: { bg: string; border: string; title: string } }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 140 }}>
      <div
        style={{
          width: '100%',
          height: 56,
          borderRadius: 6,
          background: tokens.bg,
          border: `2px solid ${tokens.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 600, color: tokens.title }}>
          {name}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#9490AC' }}>bg: {tokens.bg}</div>
        <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#9490AC' }}>border: {tokens.border}</div>
        <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#9490AC' }}>title: {tokens.title}</div>
      </div>
    </div>
  );
}

// ─── Renderer ────────────────────────────────────────────────────────────────

function ColorTokens() {
  return (
    <div style={{ padding: 32, fontFamily: "'Clash Grotesk', sans-serif" }}>
      <h1 style={{ fontFamily: "'Clash Display Variable', sans-serif", fontWeight: 600, fontSize: 28, color: '#203224', marginBottom: 8 }}>
        Color Tokens
      </h1>
      <p style={{ color: '#9490AC', fontSize: 14, marginBottom: 40 }}>
        Extraído de <code>tokens/colors.ts</code> · Figma VekfomfsZU4q2iaY1j4VXP
      </p>

      {/* Brand */}
      <Section title="Brand">
        <Swatch name="brand.primary.base"   value={colors.brand.primary.base} />
        <Swatch name="brand.secondary.base" value={colors.brand.secondary.base} />
        <Swatch name="brand.tertiary.base"  value={colors.brand.tertiary.base} />
      </Section>

      {/* Default */}
      <Section title="Default">
        <Swatch name="default.white"           value={colors.default.white} />
        <Swatch name="default.textDark"        value={colors.default.textDark} />
        <Swatch name="default.textMedium"      value={colors.default.textMedium} />
        <Swatch name="default.disabled"        value={colors.default.disabled} />
        <Swatch name="default.border"          value={colors.default.border} />
        <Swatch name="default.stepDefault"     value={colors.default.stepDefault} />
        <Swatch name="default.whiteCloud"      value={colors.default.whiteCloud} />
        <Swatch name="default.modalBorder"     value={colors.default.modalBorder} />
        <Swatch name="default.modalTextMedium" value={colors.default.modalTextMedium} />
      </Section>

      {/* Message */}
      <Section title="Message">
        <Swatch name="message.info.base"   value={colors.message.info.base} />
        <Swatch name="message.danger.base" value={colors.message.danger.base} />
      </Section>

      {/* Alert */}
      <Section title="Alert">
        {(Object.entries(colors.alert) as [string, { bg: string; border: string; title: string }][]).map(
          ([key, val]) => (
            <AlertSwatch key={key} name={`alert.${key}`} tokens={val} />
          )
        )}
      </Section>

      {/* Gray */}
      <Section title="Gray">
        {(Object.entries(colors.gray) as [string, string][]).map(([key, val]) => (
          <Swatch key={key} name={`gray.${key}`} value={val} />
        ))}
      </Section>

      {/* Pagination */}
      <Section title="Pagination">
        <Swatch name="pagination.active" value={colors.pagination.active} />
        <Swatch name="pagination.border" value={colors.pagination.border} />
        <Swatch name="pagination.text"   value={colors.pagination.text} />
      </Section>

      {/* Primary (blue) */}
      <Section title="Primary (Blue)">
        {(Object.entries(colors.primary) as [string, string][]).map(([key, val]) => (
          <Swatch key={key} name={`primary.${key}`} value={val} />
        ))}
      </Section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;
type Story = StoryObj;

export const AllColors: Story = {
  name: 'All color tokens',
  render: () => <ColorTokens />,
};
