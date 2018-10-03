import { CopyPlugin, FuseBox, WebIndexPlugin } from 'fuse-box'
import { src, task, watch } from 'fuse-box/sparky'

import { ServerConfig } from './config/be_config'
import { FrontendConfig } from './config/fe_config'

const baseConfig = {
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

/* Define tasks and functions and flow-through fuse instance */
const servingStatic = () => {
  const fuse = FuseBox.init({
    homeDir: '.',
    output: 'build/$name.js',
    plugins: [
      WebIndexPlugin({
        author: 'W-Team',
        charset: 'utf-8',
        description: 'an awesome project',
        keywords: 'vutr, w-team',
        template: 'client/index.html'
      }),
      CopyPlugin({
        dest: 'build/asset',
        files: 'jpg.png.svg'.split('.').map(ext => `client/asset/*.${ext}`)
      })],
    target: 'browser'
  })
  fuse.run()
}

const backendServe = (port = 3000, isProduction = false) => () => {
  const serverConfig = ServerConfig(isProduction)
  const fuseConfig = { ...baseConfig, ...serverConfig }
  const fuse = FuseBox.init(fuseConfig)
  fuse.dev({ port, httpServer: false })
  fuse.bundle('server/bundle')
    .watch('server/**')
    .instructions('> [server/index.tsx]')
    .completed(proc => proc.start())
  return fuse.run()
}

const frontendServe = (shouldRunDev = false, isProduction = false) => () => {
  const frontendConfig = FrontendConfig(isProduction)
  const fuseConfig = { ...baseConfig, ...frontendConfig }
  const fuse = FuseBox.init(fuseConfig)
  if (shouldRunDev) {
    fuse.dev()
  }
  fuse.bundle('client/bundle')
    .watch('client/**')
    .hmr()
    .instructions('> client/App.tsx')
  return fuse.run()
}

task('clean_all', () => src('build').clean('build').exec())
task('clean_fe', () => src('build').clean('build/client').exec())
task('clean_be', () => src('build').clean('build/server').exec())
task('fe_serve', ['clean_fe', 'static'], frontendServe())
task('be_serve', ['clean_be', 'static'], backendServe())
task('static', servingStatic)

/* Default task: use fuse to run both server and client in dev mode */
task('default', ['clean_all', 'static', 'fe_serve', 'be_serve'])
