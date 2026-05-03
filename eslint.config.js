import { readdirSync } from "node:fs";

import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

const foldersUnderSrc = readdirSync("src", { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

export default [
  {
    ignores: ["node_modules/**", "dist/**", "dev-dist/**", "**/*.json", "**/*.yml", "**/*.html"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": tsPlugin,
      "simple-import-sort": simpleImportSort,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      "react/react-in-jsx-scope": "off",
      "comma-dangle": ["error", "always-multiline"],
      "no-redeclare": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      // TypeScript handles these — disabling avoids false positives on globals/types it knows about.
      "no-undef": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"],
            [`^(${foldersUnderSrc.join("|")})(/.*|$)`],
            ["^[^.]"],
            ["^\\."],
          ],
        },
      ],
    },
  },
];
