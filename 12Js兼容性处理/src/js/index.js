import '../css/index.css';
/* @babel/polyfill 引入使用
  去除babel/polyfill 的引入
*/
// import '@babel/polyfill';

const add = (x, y) => x + y;
// eslint-disable-next-line
console.log(add(1, 3));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('定时器执行完了');
    resolve();
  }, 1000);
});
// eslint-disable-next-line
console.log(promise);
