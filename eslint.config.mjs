import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/storybook-static/**",
      "docs/**",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx,mjs}"],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },

    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs["recommended-latest"].rules,
      ...jsxA11y.flatConfigs.recommended.rules,

      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "react/display-name": "warn",
      "react/jsx-filename-extension": [
        1,
        { extensions: [".ts", ".tsx", ".js", ".jsx"] },
      ],
      "react/function-component-definition": [
        2,
        {
          namedComponents: ["arrow-function", "function-declaration"],
          unnamedComponents: "arrow-function",
        },
      ],

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],

      "import/prefer-default-export": "off",
      "import/extensions": [
        "error",
        "ignorePackages",
        { js: "never", jsx: "never", ts: "never", tsx: "never" },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            { pattern: "react", group: "builtin", position: "before" },
            { pattern: "@/**", group: "internal" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "never",
        },
      ],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "*.config.ts",
            "*.config.mjs",
            ".storybook/**",
            "**/*.stories.tsx",
            "**/*.test.ts",
            "**/*.test.tsx",
            "test/**",
            "jest.setup.ts",
          ],
          peerDependencies: true,
        },
      ],

      camelcase: "off",
      "no-nested-ternary": "off",
      "no-console": "off",
      "no-return-await": "off",
      "no-undef": "off",
    },
  },

  {
    // Border and outline widths are deliberately not covered — the design
    // tokenises those in px (Sizing/Stroke/1, /2).
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "Property[key.name=/^(margin|padding|gap|rowGap|columnGap|top|right|bottom|left|width|height|minWidth|maxWidth|minHeight|maxHeight|fontSize|lineHeight|letterSpacing|borderRadius)/] > Literal[value=/[0-9]px/]",
          message:
            "Use a theme value instead of px — theme.spacing() for spacing and sizing, theme.typography for font sizes, theme.shape.borderRadius for corners.",
        },
      ],
    },
  },

  ...storybook.configs["flat/recommended"],

  prettier,
];
