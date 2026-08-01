import { defineConfig } from "vite";

export default defineConfig({
  base: "/code-prep-school/",
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        timeComplexityBasics: "./time-complexity-basics.html",
        builtInMethods: "./built-in-methods.html",
        constantTimeComplexity: "./constant-time-complexity.html",
        linearTimeComplexity: "./linear-time-complexity.html",
        quadraticTimeComplexity: "./linear-time-complexity.html",
        timeComplexityQuiz: "./time-complexity-quiz.html",
        introToAlgorithms: "./intro-to-algorithms.html",
        insertionSort: "./insertion-sort.html",
        bubbleSort: "./bubble-sort.html",
      },
    },
  },
});
