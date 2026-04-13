# Treeal Design System

React + TypeScript component library generated from the Treeal Figma file  
(`VekfomfsZU4q2iaY1j4VXP` · node `3107:5509` · BtnsBase).

## Tokens

All values come directly from Figma variables — do not edit by hand.

| Token | Value | Usage |
|---|---|---|
| `colors.brand.secondary.base` | `#0F6C13` | Outline border & text |
| `colors.brand.primary.base` | `#203224` | Secondary bg; Fill text |
| `colors.brand.tertiary.base` | `#E7DA10` | Fill background |
| `colors.default.white` | `#FFFFFF` | Secondary text |
| `colors.default.textDark` | `#524E69` | Disabled text |
| `colors.default.disabled` | `#EFEEF2` | Disabled background |
| `colors.message.info.base` | `#2472BA` | Text variant text |
| `typography.fontFamily.button` | `Clash Grotesk Variable` | All button labels |

## Button

```tsx
import { Button } from '@treeal/design-system/components/Button';

<Button variant="fill" size="md" iconLeft={<Icon />}>
  Label
</Button>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'outline' \| 'fill' \| 'secondary' \| 'text'` | `'outline'` | Visual style |
| `size` | `'sm' \| 'md'` | `'sm'` | `sm` = 36 px height · `md` = 48 px height |
| `iconLeft` | `ReactNode` | — | Leading icon (24×24 px slot) |
| `iconRight` | `ReactNode` | — | Trailing icon (24×24 px slot) |
| `disabled` | `boolean` | `false` | Renders disabled visual + HTML disabled |

All standard `<button>` HTML attributes are also forwarded.

## Storybook

```bash
npm install
npm run storybook
```
