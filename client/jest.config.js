module.exports = {
  silent: true,
  moduleNameMapper: {
    '\\.(css|less|mp3)$': '<rootDir>/test/jest/__mocks__/styleMock.js',
  }
};
  