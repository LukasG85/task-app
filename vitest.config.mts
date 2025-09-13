import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "v8",
      all: false,
      include: ["**/app/**/*.{ts,tsx}", "**/utils/**/*.{ts,tsx}"],
      exclude: [
        "coverage/**",
        "**/*.d.ts",
        "**/__x00__*",
        "**/\x00*",
        "/*",
        "**/.next/**/*",
        "**/tests/**/*",
        "**/*.styles.ts",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/index.ts",
        "**/public/**/*",
        "**/page.tsx",
        "**/types/*.ts",
        "**/types/**/*.ts",
        "**/config/**/*",
        "**/PlaywrightWatcher/*",
        "scripts/*",
        "**/layout.tsx",
        "**/not-found.tsx",
        "**/loading.tsx",
        "**/types.ts",
        "**/constants/*.ts",
        "page.tsx",
        "loading.tsx",
        "locales.ts",
        ".eslintrc.js",
        "next.config.js",
      ],
      thresholds: {
        lines: 88,
        functions: 82,
        branches: 86,
      },
    },
  },
});
