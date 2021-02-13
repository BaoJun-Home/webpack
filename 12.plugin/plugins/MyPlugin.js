module.exports = class {
  apply(compiler) {
    console.log("插件运行了");
    // 在这里注册钩子函数
    compiler.hooks.done.tap("MyPlugin", (compilation) => {
      console.log("编译完成");
    });
  }
};
