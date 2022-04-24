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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'eslint', template: './src/index.html' }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:10].css',
    }),
    // 语法检查插件
    new ESLintPlugin({
      fix: true, // 自动修复
      exclude: 'node_modules', // 默认值mode_modules
    }),
  ],
  mode: 'development',
};
