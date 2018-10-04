import {
  CSSPlugin,
  QuantumPlugin,
  SassPlugin,
  WebIndexPlugin
} from 'fuse-box'

export function FrontendConfig(isProduction = false) {
  return {
    homeDir: '.',
    output: 'build/$name',
    target: 'browser@esnext',
    hash: isProduction,
    cache: !isProduction,
    plugins: [
      WebIndexPlugin({
        author: 'W-Team',
        charset: 'utf-8',
        description: 'an awesome project',
        keywords: 'vutr, w-team',
        template: 'client/index.html'
      }),
      [
        SassPlugin(),
        CSSPlugin({
          inject: file => `${file}`,
          outFile: file => `build/${file}`,
          minify: isProduction
        })
      ],
      isProduction && QuantumPlugin({
        bakeApiIntoBundle: 'client/bundle',
        css: true,
        ensureES5: true,
        removeExportsInterop: true,
        treeshake: true,
        uglify: true
      })
    ],
    sourceMaps: !isProduction,
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
