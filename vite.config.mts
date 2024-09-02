import {dirname, relative} from 'path'
import {defineConfig, UserConfig} from 'vite'
import react from "@vitejs/plugin-react";
import AutoImport from 'unplugin-auto-import/vite'
import {isDev, port, r} from './scripts/utils'
import packageJson from './package.json'
import { configDefaults } from "vitest/config";
import path from 'path'

import UnoCSS from 'unocss/vite'
export const sharedConfig: UserConfig = {
  root: r('src'),
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(packageJson.name),
  },
  plugins: [
    react({
      fastRefresh: false,
      // jsxRuntime: 'classic'
    }),
    AutoImport({
      imports: [
        {
          'webextension-polyfill': [
            ['=', 'default', 'browser'],
          ],
        },
      ],
      dts: r("src/auto-imports.d.ts"),
    }),

    // https://github.com/unocss/unocss
    // UnoCSS(),

    // rewrite assets to use relative path
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }) {
        return html.replace(/"\/assets\//g, `"${relative(dirname(path), '/assets')}/`)
      },
    },
  ],
  optimizeDeps: {
    include: [
      'webextension-polyfill',
    ],
    exclude: [
    ],
  }
}

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
    origin: `http://localhost:${port}`,
  },
  build: {
    watch: isDev
      ? {}
      : undefined,
    outDir: r("extension/dist"),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        // background: r("src/background/index.html"),
        options: r("src/options/index.html"),
        popup: r("src/popup/index.html"),
        sidepanel: r("src/sidepanel/index.html"),
      },
    },
  },
  test: {
  environment: "jsdom",
    setupFiles: ['./setupTests.ts'],
    mockReset: true,
    globals: true,
    // setupFiles: "./src/setupTests.ts",
    watch: false,
    // Need to concat with config defaults otherwise node_modules get tested
    exclude: [...configDefaults.exclude, "src/e2e/*"],
    coverage: {
    provider: "istanbul",
      exclude: [".eslintrc.cjs", "src/index.tsx", "playwright.config.ts", ".github/*"],
      all: true,
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
      reporter: ["json", "lcov", "text", "cobertura"],
  },
},
}))
