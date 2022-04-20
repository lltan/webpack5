import _ from 'lodash';
//import './index.css';
import data from './data.json'
/*
当前项目指令
..\node_modules\.bin\webpack ./src/index.js -o ./build/main.js --mode=development
index.js :webpack 入口文件
1.运行指令：
开发模式：
webpack ./src/index.js -o ./build/main.js --mode=development 
生产模式：
webpack ./src/index.js -o ./build/main.js --mode=production 

结论：
1：webpack 可以识别js/json文件和 不能识别css/其他文件
2：开发环境与生产环境的区别暂时只有开发环境对打包后的文件进行了压缩处理
*/

function component() {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello','webpack']);
    console.log(data);
    return element;
}

document.body.appendChild(component());