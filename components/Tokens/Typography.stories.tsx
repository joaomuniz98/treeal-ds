import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { typography } from '../../Fundamentos/Tipografia';

const SAMPLE = 'The quick brown fox jumps over the lazy dog';
const SAMPLE_PT = 'Configuração de tipografia do sistema Treeal';

// ─── Row ─────────────────────────────────────────────────────────────────────

function TypeRow({
  token,
  family,
  weight,
  size,
  lineHeight,
  note,
}: {
  token: string;
  family: string;
  weight: number;
  size: string | number;
  lineHeight: string | number;
  note?: string;
}) {
  const sizeStr  = typeof size       === 'number' ? `${size * 16}px` : size;
  const lhStr    = typeof lineHeight === 'number' ? String(lineHeight) : lineHeight;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        gap: 24,
        padding: '20px 0',
        borderBottom: '1px solid #E0DEED',
        alignItems: 'start',
      }}
    >
      {/* Metadata column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <code
          style={{
            fontFamily: 'monospace',
            fontSize: 11,
            color: '#0F6C13',
            background: '#F5FBF7',
            padding: '2px 6px',
            borderRadius: 4,
            display: 'inline-block',
            marginBottom: 4,
          }}
        >
          {token}
        </code>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#9490AC' }}>
          family: <span style={{ color: '#524E69' }}>{family.replace(/'/g, '')}</span>
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#9490AC' }}>
          weight: <span style={{ color: '#524E69' }}>{weight}</span>
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#9490AC' }}>
          size: <span style={{ color: '#524E69' }}>{sizeStr}</span>
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#9490AC' }}>
          lh: <span style={{ color: '#524E69' }}>{lhStr}</span>
        </div>
        {note && (
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#9490AC', marginTop: 2, fontStyle: 'italic' }}>
            {note}
          </div>
        )}
      </div>

      {/* Sample text column */}
      <p
        style={{
          fontFamily: family,
          fontWeight: weight,
          fontSize: typeof size === 'number' ? `${size * 16}px` : size,
          lineHeight: lineHeight,
          color: '#203224',
          margin: 0,
          wordBreak: 'break-word',
        }}
      >
        {SAMPLE}
        <br />
        <span style={{ opacity: 0.6 }}>{SAMPLE_PT}</span>
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h3
        style={{
          fontFamily: "'Clash Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: 14,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: '#9490AC',
          borderBottom: '2px solid #E0DEED',
          paddingBottom: 8,
          marginBottom: 0,
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

// ─── Main render ─────────────────────────────────────────────────────────────

function TypographyTokens() {
  return (
    <div style={{ padding: 32 }}>
      <h1
        style={{
          fontFamily: "'Clash Display Variable', sans-serif",
          fontWeight: 600,
          fontSize: 28,
          color: '#203224',
          marginBottom: 8,
        }}
      >
        Typography Tokens
      </h1>
      <p style={{ color: '#9490AC', fontSize: 14, marginBottom: 48 }}>
        Extraído de <code>Fundação/Tipografia.ts</code> · 4 famílias tipográficas
      </p>

      {/* Headings — Clash Display */}
      <Section title="Clash Display Variable (Headings)">
        <TypeRow
          token="fontFamily.clashDisplay + H4"
          family={typography.fontFamily.clashDisplay}
          weight={typography.fontWeight.semibold}
          size="21px"
          lineHeight={1.25}
          note="Headings/H4 · Steps num, Modal title"
        />
        <TypeRow
          token="fontFamily.clashDisplay + H5"
          family={typography.fontFamily.clashDisplay}
          weight={typography.fontWeight.semibold}
          size="18px"
          lineHeight={1.25}
          note="Headings/H5 · Header mobile title"
        />
      </Section>

      {/* Clash Grotesk — base */}
      <Section title="Clash Grotesk (Body)">
        <TypeRow
          token="fontSize.md · Semibold"
          family={typography.fontFamily.base}
          weight={typography.fontWeight.semibold}
          size={typography.fontSize.md}
          lineHeight={typography.lineHeight.button}
          note="Body Texts/Button · 16px"
        />
        <TypeRow
          token="fontSize.md · Regular"
          family={typography.fontFamily.base}
          weight={typography.fontWeight.regular}
          size={typography.fontSize.md}
          lineHeight={typography.lineHeight.text}
          note="Body Texts/Text · 16px"
        />
        <TypeRow
          token="fontSize.sm · Semibold"
          family={typography.fontFamily.base}
          weight={typography.fontWeight.semibold}
          size={typography.fontSize.sm}
          lineHeight={typography.lineHeight.text}
          note="Body Texts/Text Small Bold · 14px · Alert title"
        />
        <TypeRow
          token="fontSize.sm · Regular"
          family={typography.fontFamily.base}
          weight={typography.fontWeight.regular}
          size={typography.fontSize.sm}
          lineHeight={typography.lineHeight.text}
          note="Body Texts/Text Small · 14px · Alert message"
        />
        <TypeRow
          token="Label XSmall · Semibold 10px"
          family={typography.fontFamily.base}
          weight={typography.fontWeight.semibold}
          size="10px"
          lineHeight={typography.lineHeight.text}
          note="Header account label, user role"
        />
      </Section>

      {/* Inter — FileUpload */}
      <Section title="Inter (FileUpload — Paragraph)">
        <TypeRow
          token="fontFamily.inter · bodySm · Regular"
          family={typography.fontFamily.inter}
          weight={typography.fontWeight.regular}
          size={typography.fontSize.bodySm}
          lineHeight={typography.lineHeight.body}
          note="Paragraph/SM/Regular · 12px · FileUpload caption"
        />
        <TypeRow
          token="fontFamily.inter · bodyXs · Regular"
          family={typography.fontFamily.inter}
          weight={typography.fontWeight.regular}
          size={typography.fontSize.bodyXs}
          lineHeight={typography.lineHeight.body}
          note="Paragraph/XS/Regular · 10px · FileUpload subcaption"
        />
      </Section>

      {/* Roboto — Pagination */}
      <Section title="Roboto (Pagination)">
        <TypeRow
          token="fontFamily.roboto · paginationXs"
          family={typography.fontFamily.roboto}
          weight={typography.fontWeight.regular}
          size={typography.fontSize.paginationXs}
          lineHeight={typography.lineHeight.paginationXs}
          note="Text/xs · 12px"
        />
        <TypeRow
          token="fontFamily.roboto · paginationMd"
          family={typography.fontFamily.roboto}
          weight={typography.fontWeight.regular}
          size={typography.fontSize.paginationMd}
          lineHeight={typography.lineHeight.paginationMd}
          note="Text/md · 16px"
        />
        <TypeRow
          token="fontFamily.roboto · paginationLg"
          family={typography.fontFamily.roboto}
          weight={typography.fontWeight.regular}
          size={typography.fontSize.paginationLg}
          lineHeight={typography.lineHeight.paginationLg}
          note="Text/lg · 18px"
        />
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

export const AllTypography: Story = {
  name: 'All typography tokens',
  render: () => <TypographyTokens />,
};
