const {
  SassPlugin,
  CSSPlugin,
  CSSResourcePlugin,
  QuantumPlugin,
  CopyPlugin,
  WebIndexPlugin
} = require("fuse-box")

module.exports = function ServerConfig (isProduction) {
  this.isProduction = isProduction
  return {
    target: "server@esnext"
  }
}
