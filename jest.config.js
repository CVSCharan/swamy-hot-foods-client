// jest.config.js
module.exports = {
  testEnvironment: "jsdom", // or 'node' if you're not testing UI
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Optional setup file
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // For absolute imports
  },
};
