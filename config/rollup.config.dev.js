/*
 * @Author: indeex
 * @Date: 2019-06-16 21:29:23
 * @Email: indeex@qq.com
 */
import serve from 'rollup-plugin-serve'
import config from './rollup.config'
import livereload from 'rollup-plugin-livereload'

const indexPath = 'public/index.html'

config.plugins = [
    ...config.plugins,
    serve({
        open: true,
        contentBase: 'public',
        host: 'localhost',
        port: 9999,
        onListening: (server) => {
            const address = server.address()
            const host = address.address === '::' ? 'localhost' : address.address
            const protocol = server.https ? 'https' : 'http'
            console.log(`Server listening at ${protocol}://${host}:${address.port}`)
        }
    }),
    livereload(),
]

module.exports = config