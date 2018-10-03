import {
  CSSPlugin,
  CSSResourcePlugin,
  QuantumPlugin,
  SassPlugin,
  WebIndexPlugin
} from 'fuse-box'

export function FrontendConfig(isProduction) {
  this.isProduction = isProduction
  return {
    target: 'browser',
    hash: this.isProduction,
    autoImport: {
      React: 'react'
    },
    plugins: [
      WebIndexPlugin({
        async: true,
        target: 'build/index.html',
        template: 'build/index.html'
      }),
      [
        SassPlugin(),
        CSSPlugin({
          group: 'app.css',
          outFile: 'build/client/app.css',
          minify: this.isProduction
        })
      ],
      this.isProduction && QuantumPlugin({
        bakeApiIntoBundle: 'client/bundle',
        css: true,
        ensureES5: true,
        removeExportsInterop: true,
        treeshake: true,
        uglify: true
      })
    ],
    sourceMaps: !this.isProduction && {
      inline: false,
      project: !this.isProduction,
      vendor: false
    }
  }
}
