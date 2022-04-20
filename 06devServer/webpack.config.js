const {join,resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const { type } = require('os');

module.exports={
    entry:'./src/index.js',
    output:{
        filename:'[name]_[hash]_built.js',
        path:resolve(__dirname,"build")
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    "css-loader",
                ]
            },
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                exclude:/\.(css|js|css)/,
                test:"/\.(ttf|eot|woff2)$/",
                type:"asset/resource",
                generator:{
                    filename:"font/[name].[host:6].[ext]"
                }
            }
            // //打包其他资源（html/js/css）//webpack4 配置方式
            // {
            //     exclude:/\.(css|js|css)/,
            //     loader:'file-loader'
            // },
            
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
                
            // }
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
    mode:"development",
    //开发服务器devServer 用来自动化编译
    //特点只在内存中打包，不会有任何输出
    devServer:{
        //contentBase:resolve(__dirname,'build'),webpack5不在支持contentBase这个属性
        //webpack5写法如下：
        static:{
            directory:join(__dirname,'build')
        },
        //启动gzip压缩
        compress:true,
        port:3000,
        //自动打开浏览器
        open:true
    }
}