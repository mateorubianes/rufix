const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'warn',
    },
  },
]);
