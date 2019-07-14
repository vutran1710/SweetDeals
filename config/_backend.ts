import {
  EnvPlugin,
  JSONPlugin,
  QuantumPlugin,
} from 'fuse-box'

export function BackendConfig(isProduction) {
  return {
    homeDir: '.',
    output: 'build/$name.js',
    target: 'server@esnext',
    cache: !isProduction,
    hash: isProduction,
    plugins: [
      EnvPlugin(process.env),
      JSONPlugin(),
      isProduction && QuantumPlugin({
        target: 'server',
        replaceProcessEnv: true,
        bakeApiIntoBundle: true,
        extendServerImport: true,
      })
    ]
  }
}
