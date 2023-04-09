module.exports = {
    preset: 'jest-playwright-preset',
    testEnvironment: 'jest-playwright-preset/PlaywrightEnvironment',
    testRunner: 'jest-circus/runner',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  