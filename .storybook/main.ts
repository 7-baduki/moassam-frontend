import type { StorybookConfig } from '@storybook/nextjs-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-vitest', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      image: {
        excludeFiles: ['**/*.svg'],
      },
    },
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    return {
      ...config,
      plugins: [svgr({ include: '**/*.svg' }), ...(config.plugins ?? [])],
    };
  },
};
export default config;
