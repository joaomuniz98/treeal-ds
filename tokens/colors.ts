/**
 * Color tokens — extracted directly from Figma (VekfomfsZU4q2iaY1j4VXP)
 * Nodes: BtnsBase (3107:5509), TextField (3105:3885), BaseCheckRadio (3106:4752),
 *        FileUpload (3210:3538), Pagination (3203:662), NavPrimary (3554:548),
 *        Modal (5139:1464), AlertSticky (3114:1706)
 */

export const colors = {
  brand: {
    primary: {
      /** #203224 — Secondary button bg; Fill button text; Check/Radio checked bg */
      base: '#203224',
    },
    secondary: {
      /** #0F6C13 — Outline button border & text */
      base: '#0F6C13',
    },
    tertiary: {
      /** #E7DA10 — Fill button background */
      base: '#E7DA10',
    },
  },
  default: {
    /** #FFFFFF — Secondary button text; input background */
    white: '#FFFFFF',
    /** #524E69 — Disabled text; input active/error text */
    textDark: '#524E69',
    /** #9490AC — Placeholder; input hover/active border; Grayscale/600 */
    textMedium: '#9490AC',
    /** #EFEEF2 — Disabled background; input focus ring; Grayscale/100 */
    disabled: '#EFEEF2',
    /** #DCE5DE — Default input border; Check/Radio border */
    border: '#DCE5DE',
    /** #E0DEED — Grayscale/200 · Default step background */
    stepDefault: '#E0DEED',
    /** #F5F5F5 — Default Colors/White Cloud · Nav sidebar background */
    whiteCloud: '#F5F5F5',
    /** #E0DEED — Grayscale/200 · Modal slot border */
    modalBorder: '#E0DEED',
    /** #757094 — Default Colors/Text medium · Modal slot text, option labels */
    modalTextMedium: '#757094',
  },
  message: {
    info: {
      /** #2472BA — Text button text */
      base: '#2472BA',
    },
    danger: {
      /** #FF3A29 — Error input border & message */
      base: '#FF3A29',
    },
  },
  /** Gray scale — FileUpload / Gray/x00 tokens */
  gray: {
    /** #101828 — Gray/900 · file name, body text */
    900: '#101828',
    /** #475467 — Gray/600 · action icon color */
    600: '#475467',
    /** #667085 — Gray/500 · file size, muted text */
    500: '#667085',
    /** #D0D5DD — Gray/300 · upload drop-zone default border */
    300: '#D0D5DD',
    /** #EAECF0 — Gray/200 · file item border, progress track */
    200: '#EAECF0',
  },
  /** Pagination tokens — Pagination (3203:662) */
  pagination: {
    /** #0F6C13 — active item bg (= brand.secondary.base) */
    active: '#0F6C13',
    /** #CED4DA — Gray/Gray 4 · inactive item border, control border */
    border: '#CED4DA',
    /** #101113 — Dark/Dark 9 · page number text */
    text: '#101113',
  },
  /** Alert tokens — AlertSticky (3114:1706) */
  alert: {
    default: { bg: '#F9F8FC', border: '#DCE5DE', title: '#524E69' },
    info:    { bg: '#F4F9FF', border: '#C9E2FE', title: '#2472BA' },
    success: { bg: '#F5FBF7', border: '#CAE7D5', title: '#2C7D56' },
    warning: { bg: '#FFF9E9', border: '#FFDB90', title: '#A36A00' },
    error:   { bg: '#FFF8F6', border: '#FFCABF', title: '#DE0000' },
  },
  /** Shadow tokens */
  shadow: {
    /** 0px 1px 12px 0px rgba(25,27,35,0.15) — BS-Popper */
    popper: '0px 1px 12px 0px rgba(25,27,35,0.15)',
  },
  /** Blue primary scale — FileUpload / Primary/x00 tokens */
  primary: {
    /** #154FEF — Primary/600 · "browse" link color */
    600: '#154FEF',
    /** #2970FF — Primary/500 · active drop-zone border, progress fill */
    500: '#2970FF',
    /** #5280FF — Primary/400 */
    400: '#5280FF',
    /** #B2C9FF — Primary/200 · file badge background */
    200: '#B2C9FF',
    /** #DBE8FF — Primary/100 · file badge ring, active drop-zone bg */
    100: '#DBE8FF',
  },
} as const;

export type Colors = typeof colors;
