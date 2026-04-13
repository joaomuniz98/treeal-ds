import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.mdx',
    '../components/**/*.stories.@(ts|tsx)',
  ],
  staticDirs: [{ from: './assets', to: '/assets' }],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.base = '/treeal-ds/';
    }
    return config;
  },
};

export default config;
