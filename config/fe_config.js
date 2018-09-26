const {
  SassPlugin,
  CSSPlugin,
  CSSResourcePlugin,
  QuantumPlugin
} = require("fuse-box")

module.exports = function FrontendConfig (isProduction) {
  this.isProduction = isProduction
  return {
    target: "browser",
    hash: this.isProduction,
    autoImport: {
      React: "react"
    },
    plugins: [
      [
        SassPlugin(),
        CSSPlugin({
          group: "app.css",
          outFile: 'build/client/app.css',
          minify: this.isProduction
        })
      ],
      this.isProduction && QuantumPlugin({
        removeExportsInterop: true,
        bakeApiIntoBundle: "client/bundle",
        ensureES5: true,
        treeshake: true,
        uglify: true,
        css: true
      })
    ],
    sourceMaps: {
      inline: false,
      project: !this.isProduction,
      vendor: false
    }
  }
}
