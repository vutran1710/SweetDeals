const { FuseBox } = require("fuse-box")

const {
  src,
  task,
  watch
} = require("fuse-box/sparky")

let fuse

const FrontendConfig = require("./config/fe_config")
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
  const frontendConfig = new FrontendConfig()
  fuse.opts = { ...baseConfig, ...frontendConfig }
  fuse
    .bundle("client/bundle")
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

/* Default task: use fuse to run both server and client in dev mode */
task("default", ["clean", "config", "client", "server"], () => {
  fuse.run()
})

/* Production task */
task("build_client", () => {
  const frontendConfig = new FrontendConfig(true)
  fuse = FuseBox.init({ ...baseConfig, ...frontendConfig })
  fuse.bundle("client/bundle").instructions("> client/index.jsx")
})

task("build", ["build_client"], () => {
  fuse.run()
})
