
const path = require("path");

module.exports={
    entry:{
        app:'./src/index.js'
    },
    output:{
        filename:'bulit.js',
        path:path.resolve(__dirname,"build")
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    "css-loader"
                ]
            },
            //less loader 配置需要安装 less-loader 和less
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins:[

    ],
    mode:"development"
}