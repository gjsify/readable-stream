// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import nodePolyfills from 'rollup-plugin-node-polyfills'

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
        nodePolyfills(),
        resolve({
            browser: true,
            preferBuiltins: false,
        }),
    ],
    external: []
}