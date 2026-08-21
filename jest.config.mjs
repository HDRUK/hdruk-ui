/** @type {import("jest").Config} */
export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: { syntax: "typescript", tsx: true },
          transform: { react: { runtime: "automatic" } },
          target: "es2022",
        },
      },
    ],
  },

  // tsup loads SVGs with the `file` loader, so imports resolve to a URL string.
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.svg$": "<rootDir>/test/svgStub.ts",
  },

  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/storybook-static/"],

  // Without this, coverage only reports files a test already imports, so an
  // untested component reads as absent rather than as 0%.
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.stories.tsx",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
  ],

  clearMocks: true,
};
