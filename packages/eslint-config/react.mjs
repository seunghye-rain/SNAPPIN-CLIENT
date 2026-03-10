import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';

import baseConfig from './base.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const toPosixPath = (value) => value.replaceAll('\\', '/');

export default [
  ...baseConfig,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: [
            toPosixPath(path.join(repoRoot, 'apps/*/tsconfig.json')),
            toPosixPath(path.join(repoRoot, 'packages/*/tsconfig.json')),
          ],
        },
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
    },
  },
];
