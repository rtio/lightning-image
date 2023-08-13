module.exports = {
    preset: 'ts-jest',  // Use ts-jest for TypeScript
    testEnvironment: 'node',  // Test environment
    moduleFileExtensions: [
      'ts',  // Allow TypeScript files
      'js'   // Allow JavaScript files
    ],
    transform: {
      '^.+\\.(ts|tsx)$': [
        'ts-jest',
        {
          tsconfig: './tsconfig.json'  // Point to your TypeScript config file
        }
      ]
    },
    testMatch: [
      '**/__tests__/**/*.ts',  // Run tests from any .ts file inside a __tests__ folder
      '**/?(*.)+(spec|test).ts'  // Also consider any .ts file ending in .spec.ts or .test.ts
    ],
    collectCoverage: true,  // Collect code coverage information
    coverageDirectory: 'coverage',  // Store coverage reports in a 'coverage' directory
    coveragePathIgnorePatterns: [
      '/node_modules/'  // Ignore node_modules for coverage
    ],
    globalSetup: './__tests__/global-setup.js',
    globalTeardown: './__tests__/global-teardown.js',
  };
  