import a from "./a";

console.log(a);

// 是否开启了热更新
if (module.hot) {
  module.hot.accept(); // 接受热更新
}
