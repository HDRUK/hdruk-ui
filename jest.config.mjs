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
    "\\.svg$": "<rootDir>/test/svgStub.ts",
  },

  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/storybook-static/"],
  clearMocks: true,
};
