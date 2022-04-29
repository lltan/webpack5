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
                useBuiltIns:'usage',
                //指定core-js 版本
                corejs:{
                  version:3
                },
                //指定兼容性做到那个版本浏览器
                targets:{
                  chrome:'60',
                  firefox:'60',
                  ie:'9',
                  safari:'10',
                  edge:'17'
                }
              }
            ]
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'eslint', template: './src/index.html',
    //html 文件压缩配置
     minify:{
      collapseWhitespace:true,//去除空格换行符
      removeComments:true,//去除注释
    }}),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:10].css',
    }),
    // 语法检查插件
    new ESLintPlugin({
      fix: true, // 自动修复
      exclude: 'node_modules', // 默认值mode_modules
      context: 'src',
    }),
  ],
  mode: 'development',
  //mode: 'production', //js压缩
};
