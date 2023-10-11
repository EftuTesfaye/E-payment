export default {
    transform:{
      "^.+\\.jsx?$": "babel-jest"
    },
    resolver: 'jest-resolver',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!axios)'],
  };