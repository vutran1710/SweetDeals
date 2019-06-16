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
        treeshake: true,
        uglify: true,
        replaceProcessEnv: true,
      })
    ],
    sourceMaps: !isProduction
  }
}
