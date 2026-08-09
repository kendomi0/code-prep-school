import { defineConfig } from "vite";
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = process.cwd();

export default defineConfig({
  base: "/code-prep-school/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        timeComplexityBasics: resolve(__dirname, "./src/pages/time-complexity-basics/time-complexity-basics.html"),
        builtInMethods: resolve(__dirname, "./src/pages/built-in-methods.html"),
        constantTimeComplexity: resolve(__dirname, "./src/pages/constant-time-complexity.html"),
        linearTimeComplexity: resolve(__dirname, "./src/pages/linear-time-complexity.html"),
        quadraticTimeComplexity: resolve(__dirname, "./src/pages/quadratic-time-complexity.html"),
        timeComplexityQuiz: resolve(__dirname, "./src/pages/time-complexity-quiz/time-complexity-quiz.html"),
        introToAlgorithms: resolve(__dirname, "./src/pages/intro-to-algorithms/intro-to-algorithms.html"),
        insertionSort: resolve(__dirname, "./src/pages/insertion-sort/insertion-sort.html"),
        bubbleSort: resolve(__dirname, "./src/pages/bubble-sort/bubble-sort.html"),
      },
    },
  },
});
