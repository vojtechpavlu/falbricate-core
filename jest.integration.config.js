export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__integration_tests__/**/*.test.ts'],
  verbose: true,
  setupFiles: ['<rootDir>/jest.setup.js'],
};
