import { CopyPlugin, FuseBox, WebIndexPlugin } from 'fuse-box'

export const StaticConfig = {
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
}
