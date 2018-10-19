import { FuseBox } from 'fuse-box'
import { src, task } from 'fuse-box/sparky'
import { BackendConfig, FrontendConfig } from './config'

const envVars = {
  NODE_ENV: 'development',
  PORT: 3000,
  DB: 'mongodb://root:1234@localhost:27017/dev'
}

const alias = {
  '@base': '~/client/component/base',
  '@constant': '~/common/constant',
  '@container': '~/client/component/container',
  '@be-service': '~/client/service/backend',
  '@fe-service': '~/client/service/frontend',
  '@model': '~/server/model',
  '@style': '~/client/style',
  'common': '~/common'
}

const backendServe = () => {
  const config = BackendConfig(envVars)
  const fuse = FuseBox.init({ ...config, alias })
  fuse.bundle('server/bundle')
    .watch('server/**/*.(ts|tsx)')
    .instructions('> [server/index.tsx]')
    .completed(proc => proc.start())
  return fuse.run()
}

const frontendServe = () => {
  const config = FrontendConfig(envVars.NODE_ENV === 'production')
  const fuse = FuseBox.init({ ...config, alias })
  fuse.dev({ httpServer: false, hmr: true, port: 4444 })
  fuse.bundle('client/bundle')
    .watch('client/**/*.(ts|tsx)')
    .hmr()
    .instructions('> client/App.tsx')
  return fuse.run()
}

task('clean_all', () => src('build').clean('build').exec())
task('fe_serve', frontendServe)
task('be_serve', backendServe)

/* Default task: use fuse to run both server and client in dev mode */
task('default', ['clean_all', 'fe_serve', 'be_serve'])
