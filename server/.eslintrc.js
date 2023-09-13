module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['standard-with-typescript', 'prettier'],
  overrides: [],
  parserOptions: {
    project: './tsconfig.json',
=======
    // project: './tsconfig.json',
    project: './c13-34-t-node-react/server/tsconfig.json',
>>>>>>> partialupdateMR
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off'
  }
}
