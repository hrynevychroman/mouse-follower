import type { RollupOptions } from 'rollup'
import { defineConfig } from 'rollup'
import terser from '@rollup/plugin-terser'
import ts from 'rollup-plugin-ts'
import scss from 'rollup-plugin-scss'
import pkg from './package.json' assert { type: 'json' }

const srcDir = './src'
const distDir = './dist'
const input = `${srcDir}/index.ts`

// eslint-disable-next-line node/prefer-global/process
const productionMode = !process.env.ROLLUP_WATCH

export const banner = `/*!
* ${pkg.name} ${pkg.version}
* ${pkg.repository.url}
* Author ${pkg.author}
* Released under the ${pkg.license} License
*/
`

export const terserPlugin = terser({
  toplevel: true,
  format: {
    quote_style: 1,
    comments: /^!/,
  },
  mangle: {
    properties: {
      regex: /^_/,
      reserved: ['__esModule', '_ccRun'],
      keep_quoted: true,
    },
  },
  compress: {
    passes: 3,
    pure_funcs: ['_log', 'console.log'],
  },
})

export default defineConfig([
  {
    input,
    output: [
      {
        file: pkg.main,
        format: 'umd',
        name: pkg.shortName,
        banner,
      },
      {
        file: pkg.module,
        format: 'esm',
        exports: 'named',
        banner,
      },
    ],
    plugins: [ts(), productionMode && terserPlugin],
  },
  {
    input: `${srcDir}/styles/index.scss`,
    output: {
      file: `${distDir}/css/${pkg.shortName}.css`,
    },
    plugins: scss({
      fileName: `${pkg.shortName}.css`,
      sourceMap: false,
      outputStyle: 'compressed',
    }),
    onwarn(warning, warn) {
      if (warning.code === 'FILE_NAME_CONFLICT')
        return
      warn(warning)
    },
  },
] as RollupOptions[])
