/*
 * @Author: indeex
 * @Date: 2022-06-16 17:02:29
 * @Email: indeex@qq.com
 */
import config from './rollup.config'
import {uglify} from 'rollup-plugin-uglify'

process.env.NODE_ENV = 'production'

config.output.sourcemap = false
config.plugins = [...config.plugins, uglify({sourcemap: false})]

module.exports = config