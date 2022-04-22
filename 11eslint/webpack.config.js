
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path");
const {ESLintPlugin} = require('eslint-webpack-plugin');
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/[name]-[hash:6].js",
        path: resolve(__dirname, "bulid")
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ]
            },
            //webpak4 eslint-loader 未作废前使用的方式
            // {
            //     //添加js 语法提示eslint
            //     exclude: /node_modules/,
            //     test: /\.js$/,
            //     loader: "eslint-loader",
            //     options: {
            //         fix:true
            //     }
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ title: "eslint", template: './index.html' }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name]-[hash:10].css"
        }),
        new ESLintPlugin({
            fix:true,
            extensions:'js'
        })

    ],
    mode:"development"
}