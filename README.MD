rollup-ts-sass-template

##### this is rollup typescript sass template

### 初始化

```bash
npm init
```

接着按照步骤填入信息，生成*package.json*，默认入口为*main.js*，暂时写成*main.js*，后面会修改入口文件为编译后的文件


在根目录新建*src*文件夹，在*src*文件夹下新建*main.ts*文件：


```typescript
export function hello () { 
    console.log('hello indeex') 
}
```


### 配置rollup


安装*typescript*、*rollup*：

```bash
npm i -D typescript

npm i -S rollup
```


### 配置eslint


安装*eslint*：

```bash
npm i -D eslint
``` 

生成eslint配置文件（这个过程有点长😁）：

```bash
./node_modules/.bin/eslint --init
```

提示需要：

```bash
Need to install the following packages:
  @eslint/create-config
```


确认后根据需求选择不同配置，有三中配置：


```bash
? How would you like to use ESLint? … 
  To check syntax only
  To check syntax and find problems
❯ To check syntax, find problems, and enforce code style
```


选择*To check syntax, find problems, and enforce code style（检查语法格式、查找问题、统一代码风格）*，详细规则配置见[eslint文档](https://eslint.org/)和[tslint文档](https://typescript-eslint.io/)


接着有三种不同模式：

```bash
? What type of modules does your project use? … 
❯ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
```

选择*JavaScript modules (import/export)*


接着是库的选择：


```bash
? Which framework does your project use? … 
  React
  Vue.js
❯ None of these
```


根据需求选择相应库，也可以不使用库，后期再配置，比如后期配置使用*svelte*库



接着选择编程语言：

```bash
? Does your project use TypeScript? › No / Yes
```

选择*Yes*。*Yes*使用Typescript，*No*使用Javascript（ECMA 262即ECMAScript）



接着选择运行环境：


```bash
? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
✔ Browser
✔ Node
```


选择*Browser*。也可以选择非浏览器环境



接着选择样式：

```bash
? How would you like to define a style for your project? … 
  Use a popular style guide
❯ Answer questions about your style
```


选择*Answer questions about your style*，由于是空项目，这里会少一个检测现有项目并自动生成的选项


接着选择格式化代码方式：

```bash
? What format do you want your config file to be in? … 
❯ JavaScript
  YAML
  JSON
```

选择*JavaScript*


接着选择代码缩进方式：

```bash
? What style of indentation do you use? … 
❯ Tabs
  Spaces
```

选择*Tabs*



接着选择字符串单双引号：

```bash
? What quotes do you use for strings? … 
  Double
❯ Single
```

选择*Single*。依据团队或个人习惯选择。双引号要使用*Shift+单引号* **组合键**，没有单引号按键方便，但双引号是很多团队的代码规范


接着是单纯的询问使用的操作系统：

```bash
? What line endings do you use? … 
❯ Unix
  Windows
```

选择*Unix*



结尾加不加英文分号：

```bash
? Do you require semicolons? › No / Yes
```

选择*Yes*



接着是单纯的询问使用的操作系统：

```bash
? What line endings do you use? … 
❯ Unix
  Windows
```

选择*Unix*。提示需要依赖：

```bash
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
```


接着是询问要不要安装：

```bash
? Would you like to install them now? › No / Yes
```

选择*Yes*



最后还要询问用什么安装：

```bash
? Which package manager do you want to use? … 
❯ npm
  yarn
  pnpm
```


哪个安装的快用哪个。



选择后会显示要安装的依赖：

```bash
Installing eslint-plugin-react@latest, @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest
```


安装完成后，会生成配置文件*.eslintrc.js*，并自动开始安装相应依赖，自动安装失败，就手动安装一遍上面提示的依赖


### 配置忽略文件

在根目录新建*.eslintignore*文件：

```javascript
dist/**
node_modules/**
```


在根目录新建*.gitignore*文件：

```javascript
/node_modules

/dist

# production
/build

# misc
.DS_Store

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env.local
.env.*.local

# typescript
*.tsbuildinfo

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```


### 配置babel


安装依赖：

```bash
# 删除文件依赖
npm i -D rimraf

# typescript编译依赖
npm i -D rollup-plugin-typescript2

# rollup依赖
npm i -D @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup rollup-plugin-terser

# babel依赖
npm i -D @babel/core @rollup/plugin-babel @babel/preset-env @babel/plugin-transform-runtime
```


> *@rollup/plugin-commonjs*依赖为了让打包后的输出文件有*commonjs*、*esm(ecmascript module)*、*umd*三种模式


修改*package.json*：

```json
"main": "./dist/index.js",//rollup.config.js中设置的commonjs模式打包出的文件
"module": "./dist/index.esm.js",
"umd": "./dist/index.umd.js",
"types": "./dist/types/index.d.ts",//类型声明文件入口
```


修改*rollup.config.js*文件：


```javascript
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
import pkg from './package.json'

const env = process.env.NODE_ENV
const name = "RollupTypescript"

const config = {
    input: path.resolve(__dirname, "src/main.ts"),
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
    ],
}

// 对生产环境进行代码压缩
if (env === 'production') {
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
```



在根目录，新建*tsconfig.json*文件：

```bash
{ 
    "compilerOptions": 
        { 
            /* 基础选项 */ 
            "target": "esnext", /* 指定 ECMAScript 目标版本：'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */ 
            "module": "esnext", /* 输出的代码使用什么方式进行模块化： 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */ 
            "lib": [ /* 指定引用的标准库 */ 
                "esnext", 
                "dom", 
                "dom.iterable", 
            ], 
            "allowJs": true,  /* 允许编译 js 文件 */ 
            "removeComments": true, /* 输出不包含注释 */ 
            /* 严格类型检查选项 */ "strict": true, /* 启用所有严格类型检查选项 */ 
            "noImplicitAny": true, /* 检查隐含 any 类型的表达式和声明 */
            "strictNullChecks": false, /* 严格空检查. */ 
            /* 额外检查 */ 
            "noUnusedLocals": true, /* 检查无用的变量. */ 
            /* Module Resolution Options */ 
            "moduleResolution": "node", /* 指定模块查找策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6) */ 
            "baseUrl": "./", /* 查找模块的基础目录 */ 
            "paths": { 
                "@/*": [ 
                    "src/*" 
                ] 
            }, /* 记录 baseUrl 的模块路径查找别名 */ "types": [], /* 类型声明文件 */ 
            "allowSyntheticDefaultImports": true,
            "jsx": "preserve"
        },
    "include": [ 
        /* 指定编译处理的文件列表 */ 
        "src/**/*",
        "src/types.ts"
    ],
    "exclude": ["node_modules", "config", "dist", "public"]
}
```




在根目录，新建*tsconfig.types.json*文件：

```bash
{ 
    // 继承 tsconfig.json 中的通用配置 
    "extends": "./tsconfig.json", 
    "compilerOptions": { 
        "declaration": true, /* 生成相应的 '.d.ts' file. */ 
        "declarationDir": "./dist/types", /* 类型声明文件输出目录 */
        "emitDeclarationOnly": true, /* 只生成声明文件，不生成 js 文件*/ 
        "rootDir": "./src", /* 指定输出文件目录（用于输出），用于控制输出目录结构 */ 
    } 
}
```




在根目录，新建*babel.config.js*文件：

```javascript
module.exports = { 
    "presets": [ 
        [ 
            "@babel/preset-env", 
            { 
                /* Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS，导致 Rollup 的一些处理失败 */ 
                "modules": false 
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
```

> babel.config.js会影响整个项目中的代码，包含node_modules中的代码
> babelrc 只会影响本项目中的代码，注意如果要使用*.babelrc*配置，请在*src*下创建*.babelrc*文件



修改*package.json*中*scripts*字段并增加*files*字段：

```json
"scripts": {
    "clean:dist": "rimraf dist",//清空dist打包目录
    "build:types": "npm run clean:dist && tsc -b ./tsconfig.types.json",//编译ts类型声明文件
    "build": "npm run build:types && rollup -c",
    "test": "node test/test.js",
    "pretest": "npm run build"//执行test命令时禁止该命令
},
"files": ["dist"],
```



在终端测试：


```bash
npm run build
```

会生成*dist*文件夹，文件夹内有*index.js*文件、*index.esm.js*文件、类型声明文件


### test

在根目录新建*test*文件夹，在文件夹下新建*test.js*文件：


```javascript
const { hello } = require('../dist/index.js')
hello()
```


在终端测试：


```bash
npm run test
```

会在终端打印*hello indeex*



### postcss和预处理器

*rollup-plugin-postcss*支持*Sass*、*Less*和*Stylus*

```bash
# postcss
npm i -D postcss rollup-plugin-postcss

# sass
npm i -D node-sass

# or less
npm i -D less

# or stylus
npm i -D stylus
```


> 如果安装*node-sass*有问题，可以更换其他预处理器


修改*rollup.config.js*文件：

```javascript
//...
import postcss from 'rollup-plugin-postcss'
import sass from 'node-sass'


//...
plugins: [
    //...
    postcss({
        modules: true,//开启css modules，.module.css .module.sss .module.scss .module.sass .module.styl .module.stylus .module.less
        extract: true,
        minimize: productEnv,
        extensions: ['css', 'scss', 'sass'],
        process: processSass,
    }),
],
```



### css浏览器自动补全

```bash
npm i -D autoprefixer
```


修改*rollup.config.js*文件：

```javascript
//...
import autoprefixer from 'autoprefixer'


//...
plugins: [
    //...
     postcss({
        //...
        plugins: [
            autoprefixer(),
        ],
    }),
],
```


修改*package.json*文件：

```json
//...
"browserslist": [
    "defaults",
    "not ie < 8",
    "last 2 versions",
    "> 1%",
    "iOS 7",
    "last 3 iOS versions"
]
```


### 本地服务器

```bash
npm install -D rollup-plugin-serve
```


修改*rollup.config.js*文件：

```javascript
//...
import serve from 'rollup-plugin-serve'

//...
plugins: [
    //...
    serve({
        open: true,
        contentBase: "public",
        host: "localhost",
        port: 9999,
    }),
],
```


在根目录下新建*public*文件夹，在此文件夹下新建*index.html*文件，配置页面中的logo icon


### 打包html


运行*npm run build*会启动本地服务器并打开浏览器，并看到页面，但是页面不会被打包到dist文件夹中


```bash
npm i -D rollup-plugin-gen-html
```



修改*rollup.config.js*文件：

```javascript
//...
import html from 'rollup-plugin-gen-html'

//...
plugins: [
    //...
    html({
        template: 'public/index.html',
        target: './../dist/index.html',
        hash: productEnv,
        replaceToMinScripts: productEnv
    })
]
```


修改*index.html*文件：

```html
<!-- ... -->
<body>
    <div id="root"></div>
    <script src="./index.esm.js"></script>
</body>
<!-- ... -->
```



### 开发环境和生产环境


将*rollup.config.js*的*serve*去掉，并在根目录下新建*rollup.config.dev.js*文件：

```javascript
import serve from 'rollup-plugin-serve'
import config from './rollup.config'

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
]

module.exports = config
```



在根目录下新建*rollup.config.prod.js*文件：

```javascript
import config from './rollup.config'

process.env.NODE_ENV = 'production'

config.output.sourcemap = false
config.plugins = [...config.plugins]

module.exports = config
```


将所有的*rollup.config*开头的配置移动到根目录的*config*文件夹下，修改*rollup.config.js*：

```javascript
//修改路径
import pkg from './../package.json'

//修改入口路径
const config = {
    input: path.resolve( path.resolve(__dirname), '..', 'src/main.ts'),
}
```


修改*.eslintrc.js*文件：

```javascript
module.exports = {
	//...
	'settings': {
		'react': {
			'version': 'detect'
		}
	}
};
```


修改*package.json*文件的*scripts*字段：

```json
 "scripts": {
    "dev": "npm run lint && rollup -w -c ./config/rollup.config.dev.js",
    "clean:dist": "rimraf dist",
    "build:types": "npm run clean:dist && tsc -b ./tsconfig.types.json",
    "build": "npm run build:types && npm run lint && rollup -c ./config/rollup.config.prod.js",
    "test": "node test/test.js",
    "pretest": "npm run build",
    "lint": "eslint --fix --ext .ts,.js src"
},
```


### 代码混淆

```bash
npm i -D rollup-plugin-uglify
```


修改*rollup.config.prod.js*文件：

```javascript
//...
import {uglify} from 'rollup-plugin-uglify'

//...
config.plugins = [...config.plugins, uglify({sourcemap: false})]
```


### 热更新

```bash
npm i -D rollup-plugin-livereload
```


修改*rollup.config.dev.js*文件：

```javascript
//...
import livereload from 'rollup-plugin-livereload'

//...
config.plugins = [
    //...
    livereload(),
]
```


### alias别名

```bash
npm i -D @rollup/plugin-alias
```


修改*rollup.config.js*文件：

```javascript
//...
import alias from '@rollup/plugin-alias'

//...
plugins: [
    //...
    alias({
        entries: [
            {
                find: "@",
                replacement: path.resolve(path.resolve(__dirname), "..", "src"),
            },
            {
                find: "src",
                replacement: path.resolve(path.resolve(__dirname), "..", "src"),
            },
        ],
        customResolver,
    }),
],
```


### 代码格式化

```bash
npm i -D prettier rollup-plugin-prettier
```


在根目录下新建*.prettierrc.js*文件：

```javascript
module.exports = {
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'none',
    bracketSpacing: true,
    bracketSameLine: true,
    tabWidth: 4,
    arrowParens: "always",
}
```


修改*rollup.config.js*文件：

```javascript
//...
import prettier from 'rollup-plugin-prettier'
const prettierConfig = path.resolve(path.resolve(__dirname), '..', '.prettierrc.js');

//...
plugins: [
    //...
    prettier(prettierConfig),
],
```


### polyfill

由于*babel*无法转换所有新语法，如*Map*，需要使用*babel-polyfill*：

```bash
npm i -D core-js regenerator-runtime
```



修改*babel.config.js*文件：

```javascript
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
    //...
}
```



如果不需要框架基本完成了，可以直接使用html和编译的js和css文件