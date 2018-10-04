import {
  JSONPlugin,
  EnvPlugin,
  UglifyJSPlugin
} from 'fuse-box'

export function BackendConfig(envVars) {
  const isProduction = envVars.NODE_ENV === 'production'
  return {
    homeDir: '.',
    output: 'build/$name.js',
    target: 'server@esnext',
    cache: !isProduction,
    hash: isProduction,
    plugins: [
      JSONPlugin(),
      EnvPlugin(envVars),
      isProduction && UglifyJSPlugin()
    ]
  }
}
