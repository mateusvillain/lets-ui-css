import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import sass from "@terrazzo/plugin-sass";

export default defineConfig({
  tokens: ["./letsui.resolver.json"],
  outDir: "./dist/",
  plugins: [
    css({
      filename: "letsui.tokens.css",
      permutations: [
        {
          input: {},
          prepare: (cssOutput) => `:root {\n${cssOutput}\n}`,
        },
        {
          input: { brandTheme: "lets-ui-light" },
          include: ["lui.brand.color.**"],
          prepare: (cssOutput) => `[data-brand="lets-ui"][data-theme="light"] {\n  color-scheme: light;\n${cssOutput}\n}`,
        },
        {
          input: { brandTheme: "lets-ui-light" },
          include: ["lui.brand.color.**"],
          prepare: (cssOutput) => `@media (prefers-color-scheme: light) {\n  [data-brand="lets-ui"] {\n    color-scheme: light;\n${cssOutput}\n  }\n}`,
        },
        {
          input: { brandTheme: "lets-ui-dark" },
          include: ["lui.brand.color.**"],
          prepare: (cssOutput) => `[data-brand="lets-ui"][data-theme="dark"] {\n  color-scheme: dark;\n${cssOutput}\n}`,
        },
        {
          input: { brandTheme: "lets-ui-dark" },
          include: ["lui.brand.color.**"],
          prepare: (cssOutput) => `@media (prefers-color-scheme: dark) {\n  [data-brand="lets-ui"] {\n    color-scheme: dark;\n${cssOutput}\n  }\n}`,
        },
        {
          input: { brandTheme: "nova-ui-light" },
          include: ["lui.brand.color.**"],
          prepare: (cssOutput) => `[data-brand="nova-ui"][data-theme="light"] {\n  color-scheme: light;\n${cssOutput}\n}`,
        },
        {
          input: { brandTheme: "nova-ui-light" },
          include: ["lui.brand.color.**"],
          prepare: (cssOutput) => `@media (prefers-color-scheme: light) {\n  [data-brand="nova-ui"] {\n    color-scheme: light;\n${cssOutput}\n  }\n}`,
        },
        {
          input: { brandTheme: "nova-ui-dark" },
          include: ["lui.brand.color.**"],
          prepare: (cssOutput) => `[data-brand="nova-ui"][data-theme="dark"] {\n  color-scheme: dark;\n${cssOutput}\n}`,
        },
        {
          input: { brandTheme: "nova-ui-dark" },
          include: ["lui.brand.color.**"],
          prepare: (cssOutput) => `@media (prefers-color-scheme: dark) {\n  [data-brand="nova-ui"] {\n    color-scheme: dark;\n${cssOutput}\n  }\n}`,
        },
      ],
    }),
    sass({
      filename: "letsui.tokens.scss",
    }),
  ],
});
