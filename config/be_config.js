module.exports = function ServerConfig (isProduction) {
  this.isProduction = isProduction
  return {
    target: "server@esnext",
    autoImport: {
      React: "react",
      express: "express",
      path: "path",
      fs: "fs"
    }
  }
}
