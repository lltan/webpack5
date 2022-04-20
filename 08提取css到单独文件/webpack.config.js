const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { resolve } = require("path");

module.exports = {
    entry: {
        app: './src/js/index.js'
    },
    output: {
        filename: "js/build.js",
        path: resolve(__dirname, "build")
    },
    plugins: [
        new HtmlWebpackPlugin( {template: './src/index.html'}),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            //重命名单独提取出来的css 文件名称
            filename:"css/[name].[hash:10].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    //"style-loader", //在html页面中添加style 标记并且引用编译后的js文件 单独提取css需要去除style-loader
                    //使用插件MiniCssExtractPlugin 中自带的loader
                    MiniCssExtractPlugin.loader,
                    "css-loader" //将css编译到js 文件中
                ]
            }
        ]
    },
    mode:"development"
}