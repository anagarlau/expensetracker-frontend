module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-multiple-empty-lines': [0,{ max: 0 }],
    'object-curly-spacing': [0, 'always'],
    'comma-spacing': [0, 'always'],
    'space-before-blocks': [0, 'always'],
    indent: 'off',
    quotes: 0,
    'keyword-spacing': 0,
    'no-trailing-spaces': 0,
    'padded-blocks': 0,
    'arrow-spacing': 0,
    'no-unused-vars': 0,
    'spaced-comment': 0,
    'space-infix-ops': 0,
    'no-useless-return': 0,
    'key-spacing': 0,
    'space-before-function-paren': 0,
    'block-spacing': 0

  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
