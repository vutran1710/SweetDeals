export const BaseConfig = {
  alias: {
    '@base': '~/client/component/base',
    '@container': '~/client/component/container',
    '@be-service': '~/client/service/backend',
    '@fe-service': '~/client/service/frontend',
    '@style': '~/client/style',
    '@constant': '~/common/constant',
    '@fp': '~/common/fp'
  },
  homeDir: '.',
  output: 'build/$name.js',
  useTypescriptCompiler: true
}
