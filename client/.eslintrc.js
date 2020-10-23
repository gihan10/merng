module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es2021: true,
    },
    extends: [
      'airbnb-base',
      'eslint-plugin-import',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'eslint-plugin-jsx-a11y',
      'prettier',
    ],
    parserOptions: {
      ecmaVersion: 12,
    },
    rules: {
    },
  };
  