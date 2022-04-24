/* eslint-disable linebreak-style */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name]-[hash:6].js',
    path: resolve(__dirname, 'bulid'),
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      // webpak4 eslint-loader 未作废前使用的方式
      // {
      //     //添加js 语法提示eslint
      //     exclude: /node_modules/,
      //     test: /\.js$/,
      //     loader: "eslint-loader",
      //     options: {
      //         fix:true
      //     }
      // }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'eslint', template: './src/index.html' }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:10].css',
    }),

    // webpack5 中配置eslint js 语法检查 放弃使用 eslint-loader 改为使用插件形式的 eslint-webpack-plugin
    // eslint-disable-next-line max-len
    // 但是检查js 语法需要规则，这规则一般使用 airbnb ，这也是大家公认可靠的 使用airbnb 需要安装eslint-config-airbnb-base，eslint-plugin-import
    // 安装号后还需要在package.json 中添加配置项 eslintConfig:{ extends:"airbnb-base"}
    // 安装 eslint-webpack-plugin 通过 const ESLintPlugin = require('eslint-webpack-plugin')
    // .eslintrc.js 配置文件
    // env: {
    // node: true,
    // browser: true,
    // es6: true,
    // },
    // root - 限定配置文件的使用范围
    // parser - 指定eslint的解析器
    // parserOptions - 设置解析器选项
    // extends - 指定eslint规范
    // plugins - 引用第三方的插件
    // env - 指定代码运行的宿主环境
    // rules - 启用额外的规则或覆盖默认的规则
    // globals - 声明在代码中的自定义全局变量
    // module.exports = {
    //     root: true,
    //     env: {
    //         node: true,
    //         browser: true,
    //         es6: true
    //     },
    //     extends: "airbnb-base",
    //     rules: {
    //         'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //         'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //     }
    // };
    new ESLintPlugin({
      fix: true, // 自动修复
      exclude: 'node_modules', // 默认值mode_modules
    }),
  ],
  mode: 'development',
};
