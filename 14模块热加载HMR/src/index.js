import print from './js/print';
import './iconfont.css';
import './css/index.css';
import './css/index.less';

console.log('欢迎使用devServer');
console.log(13);
console.log(33);


if (module.hot) {
  module.hot.accept('./js/print.js', () => {
    console.log('print 加载完成是是是');
    print();
  });
}
