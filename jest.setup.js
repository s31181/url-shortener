import '@testing-library/jest-dom';

module.exports = {
  // ... existing config ...
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};