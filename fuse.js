const { FuseBox } = require('fuse-box')
const { src, task, watch } = require('fuse-box/sparky')
const FrontendConfig = require('./config/fe_config')
const ServerConfig = require('./config/be_config')

const baseConfig = {
  homeDir: '.',
  output: 'build/$name.js',
  useTypescriptCompiler: true,
  allowSyntheticDefaultImports: true,
  alias: {
    '@base': '~/client/component/base',
    '@container': '~/client/component/container',
    '@fe-service': '~/client/service/frontend',
    '@be-service': '~/client/service/backend',
    '@style': '~/client/style',
    '@constant': '~/client/manage/constant.js'
  }
}

task('clean_all', () => src('build').clean('build').exec())
task('clean_fe', () => src('build').clean('build/client').exec())
task('clean_be', () => src('build').clean('build/server').exec())
task('config', () => { fuse = FuseBox.init(baseConfig) })

task('fe_serve', ['clean_fe'], async () => {
  const frontendConfig = new FrontendConfig()
  const fuse = FuseBox.init({ ...baseConfig, ...frontendConfig })
  fuse.dev()
  fuse.bundle('client/bundle')
      .watch('client/**')
      .hmr()
      .instructions('> client/App.jsx')
  await fuse.run()
})

task('be_serve', ['clean_be'], () => {
  const serverConfig = new ServerConfig()
  const fuse = FuseBox.init({ ...baseConfig, ...serverConfig })
  fuse.dev({ port: 3000, httpServer: false })
  fuse.bundle('server/bundle')
      .watch('server/**')
      .instructions('> [server/index.js]')
      .completed(proc => proc.start())
  fuse.run()
})

/* Default task: use fuse to run both server and client in dev mode */
task('default', ['clean', 'config', 'client', 'server'], () => {
  // Start the whole app
})
