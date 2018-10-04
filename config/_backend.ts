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
    cache: false,
    hash: isProduction,
    plugins: [
      JSONPlugin(),
      EnvPlugin(envVars),
      isProduction && UglifyJSPlugin()
    ],
    alias: {
      '@base': '~/client/component/base',
      '@container': '~/client/component/container',
      '@be-service': '~/client/service/backend',
      '@fe-service': '~/client/service/frontend',
      '@style': '~/client/style',
      '@constant': '~/common/constant',
      '@fp': '~/common/fp'
    }
  }
}
