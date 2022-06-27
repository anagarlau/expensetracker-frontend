module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    "\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  automock: false,
  resetMocks: false,
  setupFiles: [
    './setupJest.js'
  ]

}
