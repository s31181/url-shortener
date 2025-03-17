// eslint-disable-next-line import/no-anonymous-default-export
export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@images/(.*)$': '<rootDir>/src/images/$1',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!nanoid)', // Ensure nanoid is transformed
  ],
  testPathIgnorePatterns: [
    '<rootDir>/cypress/', // Ignore Cypress tests
  ],
};