import React from 'react';
import type { Preview } from '@storybook/react';
import treealTheme from './treeal-theme';
import '../styles/global.css';

const preview: Preview = {
  decorators: [
    (Story) =>
      React.createElement(
        'div',
        {
          style: {
            padding: '32px',
            fontFamily: "'Clash Grotesk', sans-serif",
            minHeight: '100%',
            boxSizing: 'border-box',
          },
        },
        React.createElement(Story),
      ),
  ],
  parameters: {
    // ── Backgrounds ────────────────────────────────────────────────────────
    backgrounds: {
      default: 'Treeal White',
      values: [
        { name: 'Treeal White',      value: '#FFFFFF' },
        { name: 'Treeal Surface',    value: '#F5F5F5' },
        { name: 'Treeal Dark',       value: '#203224' },
      ],
    },

    // ── Viewport ───────────────────────────────────────────────────────────
    viewport: {
      defaultViewport: 'desktop',
      viewports: {
        desktop: {
          name: 'Desktop (1280px)',
          styles: { width: '1280px', height: '800px' },
          type: 'desktop',
        },
        laptop: {
          name: 'Laptop (1064px)',
          styles: { width: '1064px', height: '768px' },
          type: 'desktop',
        },
        mobile: {
          name: 'Mobile (399px)',
          styles: { width: '399px', height: '844px' },
          type: 'mobile',
        },
      },
    },

    // ── Docs theme ─────────────────────────────────────────────────────────
    docs: {
      theme: treealTheme,
    },

    // ── Controls ───────────────────────────────────────────────────────────
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // ── Actions ────────────────────────────────────────────────────────────
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
};

export default preview;
