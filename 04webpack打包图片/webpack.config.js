const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { type } = require('os');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name]_[hash]_built.js',
        path: resolve(__dirname, "build"),
        //图片保存位置assetModuleFilename属性是会将所有通过assetModule处理的资源都生成在img里面
        //assetModuleFilename:"img/[name].[hash:6][ext]"
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },

            //方式1
            // {
            //     //配置解析样式中的图片 这里需要安装两个loader url-loader 和file-loader,但配置是只需要配置一个url-loader
            //     test:/\.(jpg|png|gif)$/,
            //     use:[
            //     {
            //         //url-loader 默认是es6模块化解析，而html-loader引入图片是commonjs  
            //         loader:'url-loader',
            //         options:{
            //             //图片小于100kb，就会被base64处理
            //             //优点：减少请求数量，减轻服务器压力
            //             //缺点：图片体积会更大，文件请求速度更慢
            //             limit:100*1024,
            //             //关闭es6模块化图片资源引用如下并且无法显示图片：
            //             //url("file:///F:/personal/webpack-demo/04webpack%E6%89%93%E5%8C%85%E5%9B%BE%E7%89%87/build/[object%20Module]")
            //             //关闭es6模块化后如下：
            //             //url(file:///F:/personal/webpack-demo/04webpack%E6%89%93%E5%8C%85%E5%9B%BE%E7%89%87/build/e46eace840aa8920685daac716018c43.jpg)
            //             esModule:false,
            //             name:'[hash:10].[ext]'
            //         }
            //     }],
            //     //webpack 图片打包弃用了 url-loader 和file-loader ,需要配置type='javascript/auto'
            //     type:'javascript/auto'
            // },
            // {
            //     //这个loader针对html 页面中使用的img 标记绑定的图片，配置后可以动态绑定打包后的图片路径
            //     test:/\.html$/,
            //     use:[
            //     {
            //         //html-loader 负责引入img,url-loader进行处理
            //         loader:'html-loader',
            //         options:{
            //             //如果不禁用es6语法图片无法显示
            //             esModule:false
            //         }
            //     }]
            //  }

            //方式2
            /*
            1 asset/resource 发送一个单独的文件并导出URL，替代file-loader
            2asset/inline 导出一个资源的data URL，替代url-loader
            3asset/source 到处资源的源代码，之前通过使用raw-loader实现。
            4 asset在导出一个data URL和发送一个单独的文件之间做选择，之前通过url-loader+limit属性实现。
            */
            {
                //与file-loader 类似
                test: /\.(jpg|png|jpeg|gif|svg)/,
                type: "asset/resource",
                generator: {
                    filename: "img/[name].[hash:6][ext][query]"
                }
            },
            //webpack5 打包Html 中的图片需要安装下面loader html-withimg-loader 
            {
                test: /\.html$/,
                loader: 'html-withimg-loader'
            }
            // {
            //     //功能类似url-loader 转base64
            //     test: /\.(jpg|png|jpeg|gif|svg)/,
            //     type: "asset/inline"
            // }
            // {
            //     test: /\.(jpg|png|jpeg|gif|svg)/,
            //     type: "asset",
            //     parser: {
            //         dataUrlCondition: {
            //             maxSize: 100 * 1024
            //         }
            //     },
            //     generator: {
            //         filename: "img/[name].[hash:6][ext]]"
            //     }
            // }
        ]
    },
    plugins: [
        //不做任何配置默认创建一个空的html文件，自动引入打包输出的所有资源文件（js/css）
        new HtmlWebpackPlugin({
            //配置template 就会以index.html 为模板复制一个index.html 到打包输出目录中并自动引入所有打包后的资源文件
            template: './src/index.html'
        }),
        //默认清理插件会清除output.path 指定的路径
        new CleanWebpackPlugin()
    ],
    mode: "development"
}