import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import sass from "@terrazzo/plugin-sass";

export default defineConfig({
  tokens: ["./letsui.resolver.json"],
  outDir: './dist/',
  plugins: [
    css({
      filename: "tokens.css",
      baseScheme: "light dark",
      modeSelectors: [
        {
          mode: "light",
          selectors: [
            "@media (prefers-color-scheme: light)",
            '[data-theme="light"]'
          ],
          scheme: "light",
        },
        {
          mode: "dark",
          selectors: [
            "@media (prefers-color-scheme: dark)",
            '[data-theme="dark"]'
          ],
          scheme: "dark",
        },
      ],
    }),
    sass({
      filename: "tokens.scss",
    }),
  ],
});