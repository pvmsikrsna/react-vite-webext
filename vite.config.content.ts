import {defineConfig} from "vite";
import {sharedConfig} from "./vite.config";
import {r, isDev} from "./scripts/utils";
import packageJson from "./package.json";
import deepmerge from "deepmerge";

// bundling the content script using Vite
export default defineConfig(({command}) => deepmerge(sharedConfig, {
  build: {
    watch: isDev
      ? {
        include: [r("src/contentScripts/**/*"), r("src/components/**/*")],
      }
      : undefined,
    outDir: r("extension/dist/contentScripts"),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false,
    lib: {
      entry: r("src/contentScripts/index.tsx"),
      name: packageJson.name,
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "index.global.js",
        extend: true,
      },
    },
  },
  plugins: [...sharedConfig.plugins!],
}));
