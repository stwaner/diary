const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin')
const { styles } = require('@ckeditor/ckeditor5-dev-utils')

function resolve (dir) {
  return path.join(__dirname, dir)
}
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // publicPath: isProd ? './' : '/',
  publicPath: '/',
  outputDir: 'dist', // 打包文件输出目录
  // assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: isProd, // eslint-loader 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // runtimeCompiler: true,
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // webpack配置
  transpileDependencies: [
    /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/
  ],
  chainWebpack: (config) => {
    // 对vue-cli内部的 webpack 配置进行更细粒度的修改
    config.optimization.minimizer('terser').tap((args) => {
      // 去除生产环境console
      args[0].terserOptions.compress.drop_console = true
      return args
    })
    config.resolve.alias.set('@$', resolve('src'))
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

    svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'))

    config.module
      .rule('cke-svg')
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use('raw-loader')
      .loader('raw-loader')

    config.module
      .rule('cke-css')
      .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
      .use('postcss-loader')
      .loader('postcss-loader')
      .tap(() => {
        return styles.getPostCssConfig({
          themeImporter: {
            themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
          },
          minify: true
        })
      })

    // if prod is on
    // assets require on cdn
    if (isProd) {
      console.log('当前环境为生产环境production')
      // config.plugin('html').tap(args => {
      //   args[0].cdn = assetsCDN
      //   return args
      // })
    } else {
      console.log('当前为development')
    }
  },
  configureWebpack: (config) => {
    // plugins: [
    //   // CKEditor needs its own plugin to be built using webpack.
    //   new CKEditorWebpackPlugin({
    //     // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
    //     language: 'en',
    //     // Append translations to the file matching the `app` name.
    //     translationsOutputFile: /app/
    //   })
    // ]
    config.externals = {
      AMap: 'AMap' // 高德地图配置
    }
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      // 将每个依赖包打包成单独的js文件
      const optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        },
        minimizer: [
          new UglifyJsPlugin({
            parallel: true,
            cache: true,
            uglifyOptions: {
              ie8: false,
              ecma: 5,
              compress: {
                keep_fnames: true,
                warnings: false
              },
              mangle: {
                keep_fnames: true
              }
            }
          })
        ]
      }
      Object.assign(config, {
        optimization
      })
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src')
        } // 别名配置
      }
    })
  },
  // css相关配置
  css: {
    // extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    requireModuleExtension: false, // 启用 CSS modules for all css / pre-processor files.
    // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
    loaderOptions: {
      sass: {
        // sass-loader v7之前使用data:''，之后使用prependData:''
        prependData: '@import "~@/assets/css/_variable.scss";'
      },
      css: {}, // 这里的选项会传递给 css-loader
      postcss: {} // 这里的选项会传递给 postcss-loader
    }
  },
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // webpack-dev-server 相关配置
  devServer: {
    // open: true,
    host: 'localhost',
    port: 8888, // 端口
    hot: true, // 开启热更新
    https: false, // 是否开启https模式
    // 错误、警告在页面弹出
    overlay: {
      warnings: true,
      errors: true
    },
    // 请求代理服务器 代理转发配置，用于调试环境
    proxy: {
      '/api': { // 带上api前缀的
        // target: 'http://139.199.126.30:8080/', //代理目标地址
        target: 'http://daily.zhuyelong.cn/', // 代理目标地址
        changeOrigin: true,
        logLevel: 'debug' // 控制台打印真是请求地址
        // secure: false, //如果是https，需要加此参数
        // pathRewrite: { // 在发出请求后将/api替换为''空值，这样不影响接口请求
        //   '^/api': ''
        // }
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {}
}
