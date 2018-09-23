const { FuseBox } = require("fuse-box")

const {
  src,
  task,
  watch
} = require("fuse-box/sparky")

let fuse

const frontendConfig = require("./config/fe_config")
const serverConfig = { target: "server@esnext" }
const baseConfig = {
  homeDir: ".",
  output: "build/$name.js",
  useTypescriptCompiler: true
}

task("clean", () => src("build").clean("build").exec())

task("config", () => {
  fuse = FuseBox.init(baseConfig)
})

task("client", () => {
  fuse.opts = { ...baseConfig, ...frontendConfig }
  fuse
    .bundle("client/bundle")
    .target("browser@esnext")
    .watch("client/**")
    .hmr()
    .instructions("> client/index.jsx")
})

task("server", () => {
  fuse.opts = { ...baseConfig, ...serverConfig }
  fuse
    .bundle("server/bundle")
    .watch("server/**")
    .target("server@esnext")
    .instructions("> [server/index.js]")
    .completed(proc => {
      proc.require({
        close: ({ FuseBox }) => FuseBox.import(FuseBox.mainFile).shutdown()
      })
    })
})

task("default", ["clean", "config", "client", "server"], () => {
  fuse.run()
})
