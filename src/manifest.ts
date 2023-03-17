import fs from 'fs-extra'
import type {Manifest} from 'webextension-polyfill'
import type PkgType from '../package.json'
import {isDev, port, r} from '../scripts/utils'
import {format} from "date-fns";

const CSP_STRING_EXAMPLES = [
    "script-src 'self' https://cdn.firebase.com https://*.firebaseio.com; object-src 'self'",
]

export async function getManifest() {
    const pkg = await fs.readJSON(r('package.json')) as typeof PkgType

    // update this file to update this manifest.json
    // can also be conditional based on your need
    const manifest: Manifest.WebExtensionManifest = {
        manifest_version: 3,
        name: pkg.displayName || pkg.name,
        // version: pkg.version,
        // version : format(new Date(), 'MM.dd.HH.mm'),
        version: `${format(new Date(), 'yyyy.M.d.Hm')}`,
        description: pkg.description,
        action: {
            default_icon: './assets/icon-512.png',
            default_popup: './dist/popup/index.html',
        },
        options_ui: {
            page: './dist/options/index.html',
            open_in_tab: true,
        },
        background: {
          service_worker: "dist/background/index.bg.global.js",
        },
        icons: {
            "16": './assets/icon-512.png',
            "48": './assets/icon-512.png',
            "128": './assets/icon-512.png',
        },
        permissions: [
            'tabs',
            'storage',
            'activeTab',
            'http://*/',
            'https://*/',
        ],
        content_scripts: [{
            matches: ['http://*/*', 'https://*/*'],
            js: ['./dist/contentScripts/index.global.js'],
            "css": [
                "dist/contentScripts/style.css"
            ]
        }],
        web_accessible_resources: [
            {
                "matches": [],
                "extension_ids": [],
                resources: [
                    "dist/contentScripts/style.css",
                    "assets/*",
                    "dist/*",
                    "dist/pages/*",
                    "dist/pages/Background/*",
                    "dist/pages/Background/*",
                    "dist/pages/Frame/*",
                    "dist/pages/Options/*",
                    "dist/pages/Popup/*",
                    "dist/pages/Frame/index.html"
                ]
            }
        ],
    }
    let allowedSites = ``

    if (isDev) {
        // for content script, as browsers will cache them for each reload,
        // we use a background script to always inject the latest version
        // see src/background/contentScriptHMR.ts
        var s = manifest.content_scripts
        s.forEach(x => x.js = [])
        manifest.permissions?.push('webNavigation')
        // this is required on dev for Vite script to load
        allowedSites = `http://localhost:${port}`
        /*

                let list = [
                    `script-src 'self' ${allowedSites}` ,
                    `script-src-elem 'self' ${allowedSites}` ,
                    `object-src  'self' `,
                ]

                manifest.content_security_policy = list.join(' ; ')
        */
    } else {
        //   "content_security_policy": "script-src-elem 'self' https://cdn.jsdelivr.net ; script-src 'self' https://cdn.jsdelivr.net ; object-src  'self' https://cdn.jsdelivr.net "
        // manifest.content_security_policy = `script-src-elem 'self' https://cdn.jsdelivr.net ; script-src 'self' https://cdn.jsdelivr.net ; object-src  'self' https://cdn.jsdelivr.net `
    }

    let list = [
        `script-src 'self' ${allowedSites}`,
        `script-src-elem 'self' ${allowedSites}`,
        `object-src  'self' `,
    ]

    manifest.content_security_policy = {
        extension_pages: list.join(' ; ')
    }

    return manifest
}
