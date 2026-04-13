/**
 * Typography tokens — extracted directly from Figma (VekfomfsZU4q2iaY1j4VXP)
 * Tokens: Body Texts/Button, Body Texts/Label, Body Texts/Text, Body Texts/Text Small,
 *         Paragraph/SM/Regular, Paragraph/XS/Regular (FileUpload 3210:3538),
 *         Text/xs, Text/md, Text/lg (Pagination 3203:662)
 */

export const typography = {
  fontFamily: {
    /** Clash Grotesk Variable — buttons, inputs, labels */
    base: "'Clash Grotesk Variable', sans-serif",
    /** Inter — FileUpload text (Paragraph/SM and Paragraph/XS) */
    inter: "'Inter', sans-serif",
    /** Roboto — Pagination numbers and controls */
    roboto: "'Roboto', sans-serif",
    /** Clash Display Variable — Steps step number (Headings/H4 · 21px) */
    clashDisplay: "'Clash Display Variable', sans-serif",
    /** @deprecated use fontFamily.base */
    button: "'Clash Grotesk Variable', sans-serif",
  },
  fontWeight: {
    regular: 400,
    semibold: 600,
  },
  fontSize: {
    /** 16px — Body Texts/Button & Body Texts/Text */
    md: '1rem',
    /** 14px — Body Texts/Label & Body Texts/Text Small */
    sm: '0.875rem',
    /** 12px — Paragraph/SM/Regular (Inter · FileUpload) */
    bodySm: '0.75rem',
    /** 10px — Paragraph/XS/Regular (Inter · FileUpload) */
    bodyXs: '0.625rem',
    /** 12px — Text/xs (Roboto · Pagination xs) */
    paginationXs: '0.75rem',
    /** 16px — Text/md (Roboto · Pagination md) */
    paginationMd: '1rem',
    /** 18px — Text/lg (Roboto · Pagination lg) */
    paginationLg: '1.125rem',
    /** @deprecated use fontSize.md */
    button: '1rem',
  },
  lineHeight: {
    /** 1.5 — Body Texts/Button */
    button: 1.5,
    /** 1.43 — Body Texts/Label (Semibold 14px) */
    label: 1.43,
    /** 1.30 — Body Texts/Text & Body Texts/Text Small */
    text: 1.3,
    /** 1.60 — Paragraph/SM/Regular & Paragraph/XS/Regular (Inter · FileUpload) */
    body: 1.6,
    /** 14px — Text/xs (Roboto · Pagination xs) */
    paginationXs: '14px',
    /** 18px — Text/md (Roboto · Pagination md) */
    paginationMd: '18px',
    /** 20px — Text/lg (Roboto · Pagination lg) */
    paginationLg: '20px',
  },
  letterSpacing: {
    /** 0 — all tokens */
    none: 0,
    /** @deprecated use letterSpacing.none */
    button: 0,
  },
} as const;

export type Typography = typeof typography;
