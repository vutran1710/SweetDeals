import {
  JSONPlugin,
  EnvPlugin,
  UglifyJSPlugin
} from 'fuse-box'

export function BackendConfig() {
  const isProduction = process.env.NODE_ENV === 'production'
  return {
    homeDir: '.',
    output: 'build/$name.js',
    target: 'server@esnext',
    cache: !isProduction,
    hash: isProduction,
    plugins: [
      JSONPlugin(),
      isProduction && UglifyJSPlugin()
    ]
  }
}
