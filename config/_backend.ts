export function BackendConfig(isProduction) {
  this.isProduction = isProduction
  return {
    target: "server@esnext"
  }
}
