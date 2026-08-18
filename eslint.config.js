import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import vitestGlobals from 'eslint-plugin-vitest-globals'

export default defineConfig([
  {
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
    }
  },
  { files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser } },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    ...vitestGlobals.configs['flat/recommended']
  }
]);
