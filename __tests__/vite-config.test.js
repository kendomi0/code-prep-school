import defineConfig from "../vite.config.js";
import { readdirSync } from "fs";

describe("vite config", () => {
  it("includes every HTML page in rollupOptions.input", () => {
    const htmlFiles = readdirSync(".").filter((f) => f.endsWith(".html"));
    const configuredInputs = Object.values(
      defineConfig.build.rollupOptions.input,
    ).map((path) => path.replace("./", ""));

    htmlFiles.forEach((file) => {
      expect(configuredInputs).toContain(file);
    });
  });
});
