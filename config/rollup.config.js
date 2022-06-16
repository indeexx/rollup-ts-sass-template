/*
 * @Author: indeex
 * @Date: 2019-06-16 21:29:23
 * @Email: indeex@qq.com
 */
import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import rollupTypescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import { terser } from 'rollup-plugin-terser'
import pkg from './../package.json'

import postcss from 'rollup-plugin-postcss'
import sass from 'node-sass'
import autoprefixer from 'autoprefixer'

import serve from 'rollup-plugin-serve'

import alias from '@rollup/plugin-alias'

import prettier from 'rollup-plugin-prettier'

const prettierConfig = path.resolve(path.resolve(__dirname), '..', '.prettierrc.js');

const env = process.env.NODE_ENV
const productEnv = env === 'production'

const customResolver = resolve({
    extensions: ['.js', '.ts', '.tsx', '.json', '.scss', '.sass', '.html', '.png', '.jpg', '.jpeg', '.svg']
})

const processSass = (context, payload) => {
    return new Promise((resolve, reject) => {
        sass.render({
            file: context,
        }, (err, result) => {
            if (!err) resolve(result)
            else reject(err)
        });
    });
}

const config = {
    input: path.resolve( path.resolve(__dirname), '..', 'src/main.ts'),
    output: [
        //commonjs
        {
            file: pkg.main,
            format: 'cjs',
        },
        //esm
        {
            file: pkg.module,
            format: 'es',
        },
        //umd
        // {
        //     file: pkg.umd,
        //     format: 'umd'
        // },
    ],
    plugins: [
        resolve(),//解析第三方依赖
        commonjs(),//识别commonj和第三方依赖
        rollupTypescript(),//rollup编译typescript
        babel({
            babelHelpers: 'runtime',//使用runtime编译库
            exclude: 'node_modules/**',
            extensions: [
                ...DEFAULT_EXTENSIONS,
                '.ts',
            ],
        }),
        postcss({
            modules: true,
            extract: true,
            minimize: productEnv,
            extensions: ['css', 'scss', 'sass'],
            process: processSass,
            plugins: [
                autoprefixer(),
            ],
        }),
        serve({
            open: true,
            contentBase: 'public',
            host: 'localhost',
            port: 9999,
        }),
        alias({
            entries: [
                {
                    find: "@",
                    replacement: path.resolve(path.resolve(__dirname), '..', 'src'),
                },
                {
                    find: "src",
                    replacement: path.resolve(path.resolve(__dirname), '..', 'src'),
                },
            ],
            customResolver,
        }),
        prettier(prettierConfig),
    ],
}

// 对生产环境进行代码压缩
if (productEnv) {
    config.plugins.push(terser({
        compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false,
        },
    }))
}

export default config