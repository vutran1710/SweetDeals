export function ServerConfig(isProduction) {
  this.isProduction = isProduction
  return {
    target: "server@esnext"
  }
}
