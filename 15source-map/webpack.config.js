const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const  ESLintPlugin  = require('eslint-webpack-plugin');
// const { webpack } = require('webpack');
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        loader: 'postcss-loader',
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
    entry: './src/index.js',
    output: {
        filename: 'js/[name]_[hash]_built.js',
        path: resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            {
                test: /\.less$/,
                use: [
                    ...commonCssLoader,
                    "less-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: "usage",
                                corejs: {
                                    version: "3",
                                    //提案
                                    proposals: true
                                },
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
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
            {//字体
                test: /\.(ttf|eot|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: "font/[name].[hash:6].[ext]"
                }
            },
            {//其他资源
                exclude: /\.(ttf|eot|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: "sources/[name].[hash:6].[ext]"
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
    plugins: [
        //不做任何配置默认创建一个空的html文件，自动引入打包输出的所有资源文件（js/css）
        new HtmlWebpackPlugin({
            //配置template 就会以index.html 为模板复制一个index.html 到打包输出目录中并自动引入所有打包后的资源文件
            template: './src/index.html',
            title: "source-map"
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[hash:10].css',
        }),
        //默认清理插件会清除output.path 指定的路径
        new CleanWebpackPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: "css/[name][hash:10].css"
        // }
        // ),
        new ESLintPlugin({
            fix: true, // 自动修复
            exclude: 'node_modules', // 默认值mode_modules
            context: 'src',
        })
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NamedModulesPlugin(),
    ],
    mode: "development",
    //开发服务器devServer 用来自动化编译
    //特点只在内存中打包，不会有任何输出
    devServer: {
        //contentBase:resolve(__dirname,'build'),webpack5不在支持contentBase这个属性
        //安装webpack-dev-server插件
        //webpack5写法如下：de
        static: {
            directory: join(__dirname, 'build')
        },
        //启动gzip压缩
        compress: true,
        port: 3000,
        //自动打开浏览器
        open: true,
        //开启HMR模块热加载
        hot: true
    },
    devtool: "source-map"
};

/**
 * source-map :一种 提供源代码到构建后代码的映射技术，（如果构建后的代码出错，通过映射可以追踪到源代码错误的地方）
 * source-map:外部,
 * [inline-|hidden-|evel-][nosource-][cheap-][module-]source-map
 * inline-source-map :内联，只会生产一个打包后的文件，source-map文件信息会在打包后文件的最下面
 * hidden-source-map:外部，打包后会生产两个文件一个是打包后的源码文件，一个是source-map 映射内容文件
 * evel-source-map:内联，打包后只有一个文件，source-map映射内容会在每个打包后文件内容的最后面
 * 
 * nosource-source-map:外部
 * cheap-source-map:外部
 * cheap-module-source-map:外部
 * 
 * 
 * 开发环境：速度快，调试友好
 * 速度快（eval>inline>cheap>...）
 * eval-cheap-source-map
 * eval-source-map
 * 调试友好
 * source-map
 * cheap-module-source-map
 * cheap-source-map
 * 综合考虑开发环境优先选择 eval-source-map
 * -->eval-source-map / eval-cheap-module-source-map
 * 
 * 
 * 生产环境： 源代码隐藏，调试友好
 * 内联会导致打包后代码体积变大，所以在生产环境中不使用内联
 * nosource-source-map :源代码全部隐藏
 * hidden-source-map :只隐藏源代码，会提示构建后代码错误信息
 * 综合考虑选择 source-map
 * --> source-map/cheap-module-source-map
 * 
 */