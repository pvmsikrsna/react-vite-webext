import {dirname, relative} from 'path'
import {defineConfig, UserConfig} from 'vite'
import react from "@vitejs/plugin-react";
import AutoImport from 'unplugin-auto-import/vite'
import {isDev, port, r} from './scripts/utils'
import packageJson from './package.json'
import UnoCSS from 'unocss/vite'
export const sharedConfig: UserConfig = {
  root: r('src'),
  resolve: {
  
  },
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(packageJson.name),
  },
  plugins: [
    react({
      fastRefresh: true,
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
  },
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
    globals: true,
    environment: 'jsdom',
  },
}))
