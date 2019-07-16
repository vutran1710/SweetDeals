import {
  CSSPlugin,
  EnvPlugin,
  QuantumPlugin,
  SassPlugin,
  WebIndexPlugin
} from 'fuse-box'

export function FrontendConfig(isProduction = false) {
  return {
    homeDir: '.',
    output: 'build/$name',
    target: 'browser@esnext',
    hash: false,
    cache: !isProduction,
    plugins: [
      EnvPlugin(process.env),
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
        css: true,
        treeshake: true,
        uglify: true,
        replaceProcessEnv: true,
        bakeApiIntoBundle: 'client/bundle',
      })
    ],
    sourceMaps: !isProduction
  }
}
