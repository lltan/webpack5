//清除打包后的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//配置index.html 模板和html压缩
const HtmlWebpackPlugin = require('html-webpack-plugin');
//将css 文件打包到单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { resolve } = require('path');
//js语法检查 还需在package.json 文件中配置"eslintConfig": {"extends": "airbnb-base"}
const {default:ESLintPlugin}= require('eslint-webpack-plugin');


//定义nodejs 环境变量，决定使用browserslist的那个环境 默认使用的是production
process.env.NODE_ENV = "production";

const commonCssLoader = [
  //'style-loader',会在html中添加style 标记
  MiniCssExtractPlugin.loader,//提取成css 单独文件
  'css-loader',
  {//css 兼容性配置
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          require("postcss-preset-env")()
        ]
      }
    }
  }
]
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name]-[hash:6].js',
    path: resolve(__dirname, 'bulid'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [
          ...commonCssLoader,
          'less-loader'
        ],
      },
      {
        //js兼容性处理 babel-loader @babel/core @babel/preset-env
        //1:基本js兼容性处理使用 @babel/preset-env
        // 问题：无法处理Promise 对象等高级语法
        //2：全部js兼容性处理 @babel/polyfill，不需要配置，只需要在使用页面引入就可以，这种方法现在已经不推荐使用，因为打包后的文件很大
        //问题：我只需要解决部分兼容性问题，但是将所有的兼容性代码全部引入，体检太呆
        //3:按需加载 -->core-js
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设: 指示babel做怎样的兼容性处理
          //presets: ['@babel/preset-env'],
          presets: [
            [
              '@babel/preset-env',
              {
                //按需加载
                useBuiltIns: 'usage',
                //指定core-js 版本
                corejs: {
                  version: 3
                },
                //指定兼容性做到那个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ],
        },
      },
      {//处理样式中的图片
        test: /\.(jpg|png|jpeg|gif)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        },
        generator: {
          filename: "img/[name].[hash:6][ext][query]"
        }
      },
      {//html 图片处理
        test: /\.html$/,
        loader: 'html-withimg-loader'
      },
      {
        //其他资源处理
        exclude: /\.(css|js|html|png|jpg|jpeg|gif|less)$/,
        type: "asset/resource",
        generator: {
          filename: "media/[name].[hash:6][ext][query]"
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '生产环境配置', template: './src/index.html',
      //html 文件压缩配置
      minify: {
        collapseWhitespace: true,//去除空格换行符
        removeComments: true,//去除注释
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:10].css',
    }),
    new CssMinimizerPlugin(),
    // js语法检查插件
    new ESLintPlugin({
      fix: true, // 自动修复
      exclude: 'node_modules', // 默认值mode_modules
      context: 'src',
    }),
  ],
  //mode: 'development',
  mode: 'production', //js压缩
  //css 文件压缩
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ]
  }
};
