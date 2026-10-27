import nx from '@nx/eslint-plugin';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import globals from 'globals';
import path from 'node:path';
import rootConfig from '../../eslint.config.js';

const eslintConfig = [
  ...nx.configs['flat/react-typescript'].map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  })),
  ...nextCoreWebVitals,
  ...rootConfig,
  // The root config ignores every file: opt this project back in, then restore
  // the ESLint and eslint-config-next ignores that `!**/*` also overrides.
  {
    ignores: [
      '!**/*',
      '**/node_modules/',
      '.next/',
      'out/',
      'build/',
      'next-env.d.ts',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },

    rules: {
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],

    rules: {
      '@next/next/no-html-link-for-pages': [
        'error',
        path.join(import.meta.dirname, 'pages'),
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {},
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  },
];

export default eslintConfig;
