const {
  FuseBox,
  SassPlugin,
  CSSPlugin,
  CSSResourcePlugin,
  QuantumPlugin,
  CopyPlugin,
  WebIndexPlugin
} = require("fuse-box")

const {
  src,
  task,
  watch,
  context,
  fuse
} = require("fuse-box/sparky")

const assetExtension = 'jpg.png.svg'.split('.').map(ext => `client/asset/*.${ext}`)

context(
  class {
    getConfig() {
      return FuseBox.init({
        homeDir: "client",
        target: "browser@es5",
        output: "build/$name.js",
        useTypescriptCompiler: true,
        hash: this.isProduction,
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
              outputStyle: this.isProduction ? 'compressed' : 'expanded'
            }),
            CSSPlugin({
              group: "app.css",
              outFile: 'build/app.css'
            })
          ],
          this.isProduction && QuantumPlugin({
            removeExportsInterop: true,
            bakeApiIntoBundle: "app",
            ensureES5: true,
            treeshake: true,
            uglify: true,
            css: true
          })
        ],
        allowSyntheticDefaultImports: true,
        sourceMaps: {
          inline: false,
          project: !this.isProduction,
          vendor: false
        },
        autoImport: {
          React: "react"
        },
        alias: {
          "@base": "~/component/base",
          "@container": "~/component/container",
          "@fe-service": "~/service/frontend",
          "@be-service": "~/service/backend",
          "@style": "~/style",
          "@constant": "~/manage/constant.js"
        }
      })
    }
    createBundle(fuse) {
      const app = fuse.bundle("app")
      if (!this.isProduction) {
        app.watch()
        app.hmr()
      }
      app.instructions(">index.jsx")
      return app
    }
  })

task("clean", () => src("build").clean("build").exec())

task("default", ["clean"], async context => {
  const fuse = context.getConfig()
  fuse.dev()
  context.createBundle(fuse)
  await fuse.run()
})

task("build", ["clean"], async context => {
  context.isProduction = true
  const fuse = context.getConfig()
  context.createBundle(fuse)
  await fuse.run()
})
