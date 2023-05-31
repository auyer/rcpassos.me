module.exports = {
  root: true,
  extends: ['plugin:svelte/recommended'],
  plugins: ['plugin:svelte/recommended'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  }
}
