/*
 * @Author: indeex
 * @Date: 2019-06-16 21:29:23
 * @Email: indeex@qq.com
 */
module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",//按需加载polyfill
                "corejs": {
                    "version": 3
                },
            }
        ]
    ],
    "plugins": [
        [
            // 与 babelHelpers: 'runtime' 配合使用 
            "@babel/plugin-transform-runtime"
        ]
    ]
}