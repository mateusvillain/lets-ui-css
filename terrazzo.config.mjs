import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import sass from "@terrazzo/plugin-sass";

export default defineConfig({
  tokens: [
    './tokens/brand/colors.json',
    './tokens/brand/foundation.json',
    './tokens/global/primitive.json',
    './tokens/global/semantic.json',
    './tokens/global/colors.json'
  ],
  outDir: './dist/',
  plugins: [
    css({
      filename: "tokens.css",
      modeSelectors: [
        { mode: "light", selectors: ["@media (prefers-color-scheme: light)"] },
        { mode: "dark", selectors: ["@media (prefers-color-scheme: dark)"] },
      ],
    }),
    sass({
      filename: "tokens.scss",
    }),
  ],
});