const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports={
    entry:'./src/index.js',
    output:{
        filename:'[name]_[hash]_built.js',
        path:resolve(__dirname,"build")
    },
    module:{
        rules:[

        ]
    },
    plugins:[
        //不做任何配置默认创建一个空的html文件，自动引入打包输出的所有资源文件（js/css）
        new HtmlWebpackPlugin({
            //配置template 就会以index.html 为模板复制一个index.html 到打包输出目录中并自动引入所有打包后的资源文件
            template:'./src/index.html'
        }),
        //默认清理插件会清除output.path 指定的路径
        new CleanWebpackPlugin()
    ],
    mode:"development"
}