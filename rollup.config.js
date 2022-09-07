// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
    input: ['lib/ours/browser.js'],
    output: {
        file: 'out/browser.js',
        format: 'es',
        sourcemap: true,
        globals: {}
    },
    plugins: [
        commonjs({ }),
        resolve({
            browser: true,
            preferBuiltins: true,
        }),
    ],
    external: []
}