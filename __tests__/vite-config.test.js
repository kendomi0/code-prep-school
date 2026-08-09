import defineConfig from "../vite.config.js";
import { readdirSync } from "fs";

describe("vite config", () => {
  it("includes every HTML page in rollupOptions.input", () => {
    const htmlFiles = readdirSync("./src", { recursive: true }).filter((f) => f.endsWith(".html"));
    htmlFiles.push("index.html");
    const configuredInputs = Object.values(
      defineConfig.build.rollupOptions.input,
    ).map((path) => path.replace("./", ""));

    let slicedHtmlFiles = [];
    let slicedConfiguredInputs = [];

    function getFileName(originalList, newList) {
      originalList.forEach((input) => {
        for (let i = input.length - 1; i >= 0; i--) {
          if (input.charAt(i-1) === "\\") {
            newList.push(input.slice(i));
            break;
          }
        }
      }
    );
  }

    getFileName(htmlFiles, slicedHtmlFiles);
    getFileName(configuredInputs, slicedConfiguredInputs);

    slicedHtmlFiles.forEach((file) => {
      expect(slicedConfiguredInputs).toContain(file);
    });
  });
});
