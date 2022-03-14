import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import commonConfig from './common';
import { extensions } from './common';

const { input, output = {}, plugins = [] } = commonConfig;

const finalPlugins = [
  ...plugins,
  // babel({
  //   babelHelpers: 'runtime',
  //   exclude: 'node_modules/**',
  //   include: 'src/**',
  //   extensions,
  // }),
  postcss({
    plugins: [
      autoprefixer(),
      cssnano(), // 压缩 css
    ],
    extract: 'css/style.css',
  }),
  cleanup({
    comments: 'none',
    extensions: ['.ts', '.tsx'],
  }),
  terser(), // 压缩 js
];

export default {
  input,
  output: {
    sourcemap: true,

    ...output,
  },
  external: ['vue', '@wangeditor/editor'],
  plugins: finalPlugins,
};
