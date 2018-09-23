const {
  SassPlugin,
  CSSPlugin,
  CSSResourcePlugin,
  QuantumPlugin,
  CopyPlugin,
  WebIndexPlugin
} = require("fuse-box")

const isProduction = process.env.NODE_ENV === 'prod'
const assetExtension = 'jpg.png.svg'.split('.').map(ext => `client/asset/*.${ext}`)

module.exports = {
  target: "browser@es5",
  hash: isProduction,
  plugins: [
    WebIndexPlugin({
      template: "client/index.html",
      author: "W-Team",
      charset: "utf-8",
      description: "an awesome project",
      keywords: "vutr, w-team"
    }),
    CopyPlugin({
      files: assetExtension,
      dest: "build/asset"
    }),
    [
      SassPlugin({
        importer: true,
        omitSourceMapUrl: true,
        outputStyle: isProduction ? 'compressed' : 'expanded'
      }),
      CSSPlugin({
        group: "app.css",
        outFile: 'build/client/app.css'
      })
    ],
    isProduction && QuantumPlugin({
      removeExportsInterop: true,
      bakeApiIntoBundle: "app",
      ensureES5: true,
      treeshake: true,
      uglify: true,
      css: true
    })
  ],
  sourceMaps: {
    inline: false,
    project: !isProduction,
    vendor: false
  },
  autoImport: {
    React: "react"
  },
  alias: {
    "@base": "~/client/component/base",
    "@container": "~/client/component/container",
    "@fe-service": "~/client/service/frontend",
    "@be-service": "~/client/service/backend",
    "@style": "~/client/style",
    "@constant": "~/client/manage/constant.js"
  }
}
