const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path");

//process.env.NODE_EVN = "development";
//process.env.NODE_EVN = "production";
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
        }),
        //css 压缩需要下载插件css-minimizer-webpack-plugin
        //配置点1
        new CssMinimizerPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    //"style-loader", //在html页面中添加style 标记并且引用编译后的js文件 单独提取css需要去除style-loader
                    //使用插件MiniCssExtractPlugin 中自带的loader
                    MiniCssExtractPlugin.loader,
                    "css-loader", //将css编译到js 文件中
                    /**
                     * css 兼容性处理 loader postcss-loader 和插件  postcss-preset-env
                     * postcss 的作用是帮忙找到package.json 中的browserslist里面的配置，通过配置加载指定的css 兼容性
                     * "browserslist":{
                     * //生产模式
                            "development":[
                            "last 1 chrome version", 兼容最近的chrome 版本
                            "last 1 firefox version",兼容最近的firefox 版本
                            "last 1 safari version" 兼容最近的safari 版本
                            ],
                            //默认模式
                            "production":[
                            ">0.2%", //兼容市场上的百分之99.8 的浏览器
                            "not dead", //去除已经作废了的浏览器
                            "not op_mini all" //排除opmini浏览器所有版本
                            ]
                        }
                     */
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                   require("postcss-preset-env")()
                                ]
                            }
                            //webpack4 的配置
                            // ident:"postcss",
                            // plugins:()=>[require("postcss-preset-env")()]
                        }
                    },
                    
                ]
            },
            
        ]
    },
    //配置点二
    optimization:{
        minimizer:[
            new CssMinimizerPlugin()
        ]             
    },
    mode:"development"
}