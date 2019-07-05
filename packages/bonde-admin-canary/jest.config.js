module.exports = {
  verbose: false,
  moduleNameMapper: {
    '\\.(scss|css|less|png)$': '<rootDir>/src/emptyModule.js'
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js'
  ]
}
