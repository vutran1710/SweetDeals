import { FuseBox } from 'fuse-box'
import { src, task } from 'fuse-box/sparky'
import { BackendConfig, FrontendConfig } from './config'

const envVars = {
  NODE_ENV: 'development',
  PORT: 3000,
  DB: 'mongodb://root:1234@localhost:27017/dev'
}

const backendServe = () => {
  const config = BackendConfig(envVars)
  const fuse = FuseBox.init(config)
  fuse.bundle('server/bundle')
    .watch('server/**')
    .instructions('> [server/index.tsx]')
    .completed(proc => proc.start())
  return fuse.run()
}

const frontendServe = () => {
  const config = FrontendConfig(envVars.NODE_ENV === 'production')
  const fuse = FuseBox.init(config)
  fuse.dev({ httpServer: false, hmr: true, port: 4445 })
  fuse.bundle('client/bundle')
    .watch('client/**')
    .hmr()
    .instructions('> client/App.tsx')
  return fuse.run()
}

task('clean_all', () => src('build').clean('build').exec())
task('fe_serve', frontendServe)
task('be_serve', backendServe)

/* Default task: use fuse to run both server and client in dev mode */
task('default', ['clean_all', 'fe_serve', 'be_serve'])
