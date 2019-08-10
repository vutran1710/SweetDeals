import { FuseBox } from 'fuse-box'
import { src, task } from 'fuse-box/sparky'
import { BackendConfig, FrontendConfig } from './config'

const isProduction = process.env.NODE_ENV === 'production'

const alias = {
  '@base': '~/client/component/base',
  '@constant': '~/common/constant',
  '@http': '~/common/http',
  '@container': '~/client/component/container',
  '@be-service': '~/client/service/backend',
  '@fe-service': '~/client/service/frontend',
  '@model': '~/server/model',
  '@style': '~/client/style',
  'common': '~/common'
}

const backendServe = () => {
  const config = BackendConfig(isProduction)
  const fuse = FuseBox.init({ ...config, alias })
  const bundle = isProduction ? fuse.bundle('server/bundle') : fuse.bundle('server/bundle').watch('server/**/*.(ts|tsx)')
  bundle.instructions('> [server/index.tsx]').completed(proc => proc.start())
  return fuse.run()
}

const frontendServe = () => {
  const config = FrontendConfig(isProduction)
  const fuse = FuseBox.init({ ...config, alias })
  !isProduction && fuse.dev({ httpServer: false, hmr: true, port: 4444 })
  const bundle = isProduction ? fuse.bundle('client/bundle') : fuse.bundle('client/bundle').watch('client/**/*.(ts|tsx)').hmr()
  bundle.splitConfig({ dest: 'client' }).instructions('> client/App.tsx')
  return fuse.run()
}

task('clean_all', () => src('build').clean('build').exec())
task('fe_serve', frontendServe)
task('be_serve', backendServe)

/* Default task: use fuse to run both server and client in dev mode */
task('default', ['clean_all', 'fe_serve', 'be_serve'])
