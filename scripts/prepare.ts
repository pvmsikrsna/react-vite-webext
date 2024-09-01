// generate stub index.html files for dev entry
import {execSync} from 'child_process'
import fs from 'fs-extra'
import chokidar from 'chokidar'
import {r, port, isDev, log} from './utils'
import viteReact from "@vitejs/plugin-react";
import preambleCode = viteReact.preambleCode;

/**
 * Stub index.html to use Vite in development
 */
async function stubIndexHtml() {
  const views = [
    'options',
    'popup',
    'sidepanel',
  ]
  for (const view of views) {
    await fs.ensureDir(r(`extension/dist/${view}`))
    let data = await fs.readFile(r(`src/${view}/index.html`), 'utf-8')
    data = data
      .replace('"./main.tsx"', `"http://localhost:${port}/${view}/main.tsx"`)
      .replace('/<div id="(.+?)"></div>/', `<div id="$1">Vite server did not start. Check port ${port}</div>`)

    //--- preamble fix
    let fixPreambleErrorCode = `<script type="module" src="http://localhost:${port}/fix-preamble.js"></script>`
    let addPreambleFix = (data: string) => data.replace('</head>', ` ${fixPreambleErrorCode} </head>`)
    data = addPreambleFix(data)
    // --- end of preamble fix
    await fs.writeFile(r(`extension/dist/${view}/index.html`), data, 'utf-8')
    log('PRE', `stub ${view} \n ${data}`)
  }
}

function writeManifest() {
  execSync('npx esno ./scripts/manifest.ts', {stdio: 'inherit'})
}

writeManifest()

if (isDev) {
  console.log(`Stubbing index.html`)
  stubIndexHtml()
  chokidar.watch(r('src/**/*.html'))
    .on('change', () => {
      stubIndexHtml()
    })
  chokidar.watch([r('src/manifest.ts'), r('package.json')])
    .on('change', () => {
      writeManifest()
    })
}
