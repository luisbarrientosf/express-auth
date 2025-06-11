const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  testTimeout: 30000,
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    
  },
  testPathIgnorePatterns: [
    "<rootDir>/prisma/"
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/prisma/"
  ]
};