module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }],
    "prefer-const": ["error", { "destructuring": "all" }],
    "no-irregular-whitespace": "error",
    "eol-last": ["error", "always"],
  },
}
