import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
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
    "@emotion/react",
    "@emotion/styled",
  ],
  tsconfig: "tsconfig.build.json",
  loader: {
    ".svg": "file",
  },
  esbuildOptions(options) {
    options.assetNames = "assets/[name]-[hash]";
  },
});
