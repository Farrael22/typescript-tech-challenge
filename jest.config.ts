module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/../src/$1',
  },
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest'],
  },
  modulePathIgnorePatterns: ['__mocks__'],
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.module.{ts,js}',
    '!**/main.{ts,js}',
    '!**/*.type.{ts,js}',
    '!**/*.dto.{ts,js}',
    '!**/*.decorator.{ts,js}',
    '!**/**/migrations/*.{ts,js}',
    '!**/*.config.{ts,js}',
    '!**/entities/*.{ts,js}',
    '!**/test.utils.{ts,js}',
    '!**/*.controller.{ts,js}',
    '!**/index.{ts,js}',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 65,
      lines: 65,
      statements: 65,
    },
  },
  globalSetup: '<rootDir>/.config/jest-setup.config.ts',
}
