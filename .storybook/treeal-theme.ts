import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  // ── Brand ────────────────────────────────────────────────────────────────
  brandTitle: 'Treeal DS',
  brandImage: 'https://joaomuniz98.github.io/treeal-ds/assets/logo-treeal-light.png',
  brandUrl:   'https://figma.com/design/VekfomfsZU4q2iaY1j4VXP',
  brandTarget: '_blank',

  // ── Colors ───────────────────────────────────────────────────────────────
  colorPrimary:   '#0F6C13',
  colorSecondary: '#0F6C13',

  // ── App chrome ───────────────────────────────────────────────────────────
  appBg:           '#F5F5F5',   // sidebar — branco cloud Treeal
  appContentBg:    '#FFFFFF',
  appPreviewBg:    '#FFFFFF',
  appBorderColor:  '#DCE5DE',
  appBorderRadius: 8,

  // ── Typography ───────────────────────────────────────────────────────────
  fontBase: "'Clash Grotesk', 'Inter', sans-serif",
  fontCode: "'JetBrains Mono', 'Fira Code', monospace",

  // ── Text (sidebar) ───────────────────────────────────────────────────────
  textColor:        '#203224',
  textInverseColor: '#FFFFFF',
  textMutedColor:   '#9490AC',

  // ── Toolbar ──────────────────────────────────────────────────────────────
  barTextColor:     '#524E69',
  barHoverColor:    '#0F6C13',
  barSelectedColor: '#0F6C13',
  barBg:            '#FFFFFF',

  // ── Inputs (busca na sidebar) ─────────────────────────────────────────────
  inputBg:           '#FFFFFF',
  inputBorder:       '#DCE5DE',
  inputTextColor:    '#203224',
  inputBorderRadius: 6,

  // ── Buttons ──────────────────────────────────────────────────────────────
  buttonBg:          '#F5F5F5',
  buttonBorder:      '#DCE5DE',
  booleanBg:         '#F5F5F5',
  booleanSelectedBg: '#0F6C13',
});
