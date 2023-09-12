import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "text-summary", "html"],
      reportsDirectory: "coverage",
      include: ["src/**/*.ts"],
      exclude: ["src/index.ts", "**/*.bench.*"],
      all: true,
    },
    environment: "node",
    benchmark: {
      reporters: ["default"],
    },
  },
});
