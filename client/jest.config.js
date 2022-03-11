module.exports = {
  silent: true,
  verbose: true,
  detectOpenHandles: true,
  snapshotSerializers: [
      "enzyme-to-json/serializer"
  ],
  moduleNameMapper: {
    '\\.(css|less|mp3)$': '<rootDir>/test/jest/__mocks__/styleMock.js',
  }
};
  