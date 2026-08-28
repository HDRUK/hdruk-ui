import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "tsup";

const CLIENT_ENTRIES = { index: "src/index.ts" };
const SERVER_SAFE_ENTRIES = { theme: "src/theme/index.ts" };

export default defineConfig({
  entry: { ...CLIENT_ENTRIES, ...SERVER_SAFE_ENTRIES },
  format: ["esm", "cjs"],
  dts: {
    compilerOptions: {
      jsx: "react-jsx",
      incremental: false,
    },
  },
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "@mui/material",
    "@mui/system",
    "@mui/utils",
    "@emotion/react",
    "@emotion/styled",
  ],
  tsconfig: "tsconfig.build.json",
  // A `file` asset leaves an import path no consumer serves — file:// under
  // SSR, a 404 against the page's origin in the browser.
  loader: {
    ".svg": "dataurl",
  },
  // Prepended here rather than via `banner`, which the treeshake pass strips.
  onSuccess: async () => {
    for (const name of Object.keys(CLIENT_ENTRIES)) {
      for (const ext of ["js", "cjs"]) {
        const full = resolve(`dist/${name}.${ext}`);
        const content = readFileSync(full, "utf8");
        if (!content.startsWith('"use client"')) {
          writeFileSync(full, `"use client";\n${content}`);
        }
      }
    }
  },
});
