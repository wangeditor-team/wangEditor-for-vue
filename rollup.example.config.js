import path from 'path'
import htmlTemplate from 'rollup-plugin-generate-html-template'
import serve from 'rollup-plugin-serve'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'
import devConfig from './build/config/dev'
import { merge } from 'lodash'

// 继续生成 rollup config
const name = 'WangEditorForVue'
const input = path.resolve(__dirname, './example', 'index.ts')
const file = 'dist-example/index.js'
const port = 8883

const config = {
  input,
  output: {
    file,
    format: 'umd',
    name,
  },
  plugins: [
    serve({
      // open: true,
      contentBase: ['dist-example'],
      port,
      onListening: function () {
        console.log(`\nExample is running on http://localhost:${port}/\n`)
      },
    }),
    htmlTemplate({
      template: 'example/index.html',
      target: 'dist-example/index.html',
    }),
    del({ targets: 'dist-example/*' }),
  ],
}

export default merge(devConfig, config)
