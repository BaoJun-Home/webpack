### 构建工具简介

**浏览器端模块化过程中存在的问题**

- 精细的模块划分带来了更多的 JS 文件，更多的 JS 文件带来了更多的网络请求，从而降低了页面的访问效率。
- 目前的浏览器只支持 ES6 模块化标准，如果某个第三方库使用 CommonJS 模块化标准的方式导出，则无法使用。
- 目前的浏览器无法直接支持通过 npm 下载的第三方库。
- 等等更多浏览器端模块化的问题。

**浏览器端模块化过程中存在的根本问题**

- 在开发时态我们希望：模块划分得越细越好，支持多种模块化标准，支持各种包管理工具安装的第三方库，还能解决代码的兼容性、执行效率、可维护性、可扩展性等众多问题。
- 在运行时态我们希望：文件越少越好，文件体积越小越好，代码越乱越好，还能解决运行阶段遇到的很多问题，尤其是执行效率的问题。

**构建工具能解决的问题**

可以让开发者在开发阶段专心的编写业务代码，然后通过构建工具，将开发阶段的代码转换成运行阶段的代码，同时还能解决运行阶段遇到的很多问题（如：执行效率的问题）。

**常见的前端工程化构建工具**

- webpack
- gulp
- browserify
- grunt
- fis
- 等等

### 简介

webpack 是一个基于模块化的前端工程化构建工具，它视一切为模块。

为前端工程化而生、支持零配置、灵活、可扩展、基于 NodeJS、支持各种模块化标准。

它会以一个开发阶段的入口模块为起点，通过导入语句分析出所有的依赖，再经过一系列的压缩、打包过程，最终生成运行阶段的代码文件（不存在模块化，只是普通的 JS 代码）

### 安装和使用

**安装 webpack**

```shell
npm i -D webpack webpack-cli
```

- webpack：核心包，包含了构建过程中使用到的所有 webpackApi
- webpack-cli：提供了一个 cli 命令，该命令可以调用 webpackApi 完成打包过程

> 推荐使用本地安装，这样每个项目都可以有自己的 webpack 版本

**使用 webpack**

```shell
npx webpack
```

默认情况下，webpack 会以 `./src/index.js` 作为入口模块分析依赖关系，将最终代码打包到 `./dist/main.js` 文件中

**命令参数**：一个命令中可以书写多个参数，使用 “空格” 分隔

- `--mode`：该参数可以控制最终代码的运行环境，默认生成环境

```shell
npx webpack --mode=production ## 生成环境
npx webpack --mode=development ## 开发环境
```

- `--watch`：该参数用于监测文件的变化，文件一旦发生了改变，则会重新打包

```shell
npx webpack --watch ## 只要文件发生了变化，会重新打包
```

可以将参数配置到脚本中，方便书写命令

```json
"scripts": {
  "dev": "webpack --mode=development --watch", // 开发环境且会监测文件的变化
  "build": "webpack --mode=production --watch", // 生产环境且会监测文件的变化
},
```

执行脚本中的命令

```shell
npm run dev
npm run bulid
```

### 模块化兼容性

由于 webpack 同时支持 CommonJS 模块化标准和 ES6 模块化标准，并且可以支持不同模块化标准的导入导出方式（如：使用 ES6 模块化标准的方式导出，可以使用 CommonJS 模块化标准的方式导入；使用 CommonJS 模块化标准的方式导出，可以使用 ES6 模块化标准的方式导入），webpack 是怎么做到的呢？

**同模块化标准的导入导出**

会按照每个模块化标准的导入导出规则得到结果

```js
module.exports = {
  a: 1,
  b: 2,
  c: 3,
};
```

```js
const result = require("./module.js");
console.log(result); // => { a: 1, b: 2, c: 3 }
```

ES6 模块化标准导入导出

```js
export const a = 1;
export const b = 2;
export default 3;
```

```js
// 全部导入，是一个对象
import * as result from "./module.js";
console.log(result); // => { a: 1, b: 2, default: 3 }

// 导入默认导出
import result from "./module.js";
console.log(result); // => 3

// 导入基本导出
import { a, b } from "./module.js";
console.log(a, b); // => 1 2
```

**CommonJS 模块化标准导出，ES6 模块化标准导入**

```js
module.exports = {
  a: 1,
  b: 2,
  c: 3,
};
```

使用全部导入或默认导入，导入的结果是导出的对象

```js
import * as result from "./common.js";
console.log(result); // => { a: 1, b: 2, c: 3 }

import result from "./common.js";
console.log(result); // => { a: 1, b: 2, c: 3 }
```

使用基本导入，导入的结果就好像解构语法，导出同名变量的值。

```js
import { a } from "./common.js";
console.log(a); // => 1
```

**ES6 模块化标准导出，CommonJS 模块化标准导入**

```js
export const a = 1;
export const b = 2;
export default 3;
```

会把基本导出和默认导出放入到一个对象中，把这个对象导入

```js
const result = require("./es6.js");
console.log(result); // => { a: Getter, b: Getter, default: Getter }
```

**总结**

- 绝大多数第三方库都使用 CommonJS 模块化标准的导出方式。
- 在实际开发中，选择一种模块化标准即可，不要 CommonJS 和 ES6 混用。

### 编译结果分析

```js
((modules) => {
  const cacheModule = {}; // 用于模块缓存

  // 导入函数，接受一个模块ID，模块ID就是模块的路径
  function require(moduleId) {
    if (cacheModule[moduleId]) {
      // 缓存中存在相应的模块导出结果，直接返回该结果
      return cacheModule[moduleId];
    }

    // 根据模块ID拿到对应的函数
    const handle = modules[moduleId];
    const module = {
      exports: {},
    };
    // 执行函数传递相应的参数
    handle(module, module.exports, require);
    const result = module.exports; // CommonJS默认返回module.exports
    cacheModule[moduleId] = result; // 缓存

    return result;
  }

  // 执行入口文件
  require("./src/index.js");
})({
  "./src/a.js": function (module, exports, require) {
    eval(
      'console.log("a 模块");\nmodule.exports = "a";\n//# sourceURL=webpack://test/./src/a.js?'
    );
  },
  "./src/index.js": function (module, exports, require) {
    eval(
      'console.log("入口模块");\nconst a = require("./src/a.js");\nconsole.log(a);\n//# sourceURL=webpack://test/./src/index.js?'
    );
  },
});
```

### 编译过程

编译过程：将开发阶段代码编译成运行阶段代码的过程。

**1. 初始化**

webpack 将命令行参数、配置文件、默认配置进行融合，生成一个最终的配置对象。（依靠第三方库 `yargs` 完成），这个阶段只运行一次。

**2. 编译**

1. 创建 chunk

chunk：是 webpack 在内部构建过程中的一个概念，是通过入口模块找到的所有依赖的统称。

一个入口模块会创建一个 chunk，每个 chunk 至少有两个属性

- name：chunk 的名字，默认是 main
- id：chunk 的唯一编号，开发环境中与 name 相同，生成环境中是从 0 开始的数字。

1. 构建所有依赖模块

chunks：用来记录转换后的模块代码（模块 ID：模块路径; 模块转换后的代码）

根据入口模块分析依赖 => 检查 chunks 中是否有记录（记录过直接返回 ID 和转换后的代码）=> 读取模块内容 => loader => AST 抽象语法树分析 => 记录依赖到 dependencies 数组中 => 将模块内容转换成最终代码 => 保存到 chunks 中 => 递归加载 dependencies 中记录的依赖模块 => 检查 chunks 中是否有记录 => 依次循环

最终 chunks 中会记录所有的模块 ID 和每个模块转换后的代码。

3. 生成 chunk assets

webpack 会根据 chunks 中的记录为每个 chunkID（模块 ID、模块路径）生成一个资源列表，即 chunk assets，同时会根据每个 chunk assets 的内容生成一个 chunk hash 字符串。

hash：是一种算法，它的特点是将一个任意长度的字符串转换成另一个固定长度的字符串，同时可以保证：只要原始字符串内容不变，产生的 hash 字符串就不变。

4. 合并 chunk assets

将多个 chunk assets 合并成一个总的 assets，根据总的 assets 内容生成一个总的 hash 字符串。

**3. 输出**

webpack 利用 Node 中的内置模块 fs（该模块用于文件处理），根据总的 assets 中的内容（文件名和文件内容）生成相应的文件。

**术语**

- module：模块
- chunk：通过入口模块分析出依赖的统称
- bundle：最终生成的文件
- hash：总 assets 里面的总 hash 字符串
- chunkhash：每个 chunk 生成的 hash
- chunkname：每个 chunk 的名字，默认是 main
- id：chunk 的唯一编号，开发环境中与 chunkname 相同，生产环境中是从 0 开始的数字

### 配置文件

用于配置 webpack 命令的参数（如：mode、watch 等），参数是为了控制 webpack 的行为。

默认情况下，webpack 会读取 `webpack.config.js` 文件做为配置文件（是我们手动创建的，通常会创建在项目的根目录中），也可以使用 `npx webpack --config 文件名` 命令来指定 webpack 的配置文件。

配置文件需要使用 CommonJS 模块化标准导出一个对象，这个对象就是配置对象。

配置文件会参与 webpack 的运行，因为 webpack 在 Node 中运行，所以配置文件中的代码必须是有效的 Node 代码。（运行阶段的代码：只是 webpack 做分析依赖关系用的，并不会参与 webpack 的运行）

当命令行中的参数与配置文件中的配置冲突时，以命令行中的参数为准。

##### mode

编译模式：配置最终代码的运行环境，不同的配置将影响最终代码的格式，值是一个字符串。

```js
module.exports = {
  mode: "development" | "production", // 开发环境 | 生成环境
};
```

##### watch

用于监测文件内容的变化，文件内容变化重新编译，取值：true | false

```js
module.exports = {
  watch: true | false, // 用于监测文件的变量
};
```

##### entry

入口，值是一个对象，用于配置每个 chunk 的名字和对应的入口模块路径

```js
module.exports = {
  entry: {
    // 一个chunk对应一个入口模块
    index: "./src/index.js",
    // 一个chunk对应多个入口模块，两个入口模块依次执行，最终文件还是一个
    main: ["./src/main1.js", "./src/main2.js"],
  },
};
```

##### output

出口，值是一个对象，用于配置最终文件（总资源列表）的名称和路径

`./`：如果在模块中使用，表示当前 JS 文件所在目录；如果在路径处理中，表示 Node 环境所运行目录（当前执行目录）
`__dirname`：总表示当前 JS 文件所在目录，是一个绝对路径
`path`：Node 的内置模块，里面的 `path.resolve()` 方法会根据多段字符串生成一个绝对路径。

```js
const path = require("path");

module.exports = {
  output: {
    // 将最终文件放置到哪个目录中，默认是dist，值必须是一个绝对路径
    path: path.resolve(__dirname, "目录名称"),

    // 配置每个chunk的名字
    filename: "bundle.js", // 适用于入口只有一个chunk

    // 下面适用于入口中有多个 chunk，其中 hash 可以控制长度
    filename: "[name].js", // 根据不同 chunk 名称生成最终文件
    filename: "[hash:5].js", // 根据总 hash 生成最终文件，解决浏览器缓存问题
    filename: "[chunkhash:5].js", // 根据 chunkhash 生成最终文件

    // 不推荐使用 id，因为 chunkID 在开发环境和生成环境中的表现形式不一样
    filename: "[id].js", // 根据 chunkID 生成最终文件，

    library: "abc", // 将编译过程中的立即执行函数赋值给变量 abc

    // 用于控制如何暴露变量 abc
    libraryTarget: "var", // var abc = (() => {})()
    libraryTarget: "window", // window.abc = (() => {})()
    libraryTarget: "this", // this.abc = (() => {})()
    libraryTarget: "global", // self.abc = (() => {})()
    libraryTarget: "commonjs", // exports.abc = (() => {})()
  },
};

// - library：output 里面的配置，会将 webpack 编译过程的立即执行函数的结果赋值给 library 的值（入口文件的导出结果），通常用于暴露一些东西。
// - libraryTarget：output 里面的配置，该配置用于更精细的控制如何暴露 library 的结果。
//   - var：默认值，使用 var 关键字定义暴露的变量
//   - window：向 window 上添加一个暴露变量的属性。
//   - this：向 this 上添加一个暴露变量的属性
//   - global：向 self 上添加一个暴露变量的属性
//   - commonjs：向 exports 上添加一个暴露变量的属性
//   -
// libraryTarget: "var", // => var temp = (() => {})()
//     libraryTarget: "window", // => window.temp = (() => {})()
//     libraryTarget: "this", // => this.temp = (() => {})()
//     libraryTarget: "global", // => self.temp = (() => {})()
//     libraryTarget: "commonjs", // => exports.temp = (() => {})()
```

- path：表示最终生成的文件要放置到哪个目录中，默认是 dist，值必须是一个绝对路径。
- filename：用于设置每个 chunk 生成最终文件的规则。
- library：将编译过程的立即执行函数赋值给变量，通常用于暴露一些东西。
- libraryTarget：和 library 联用，用于控制如何暴露变量。https://www.webpackjs.com/configuration/output/#output-librarytarget

##### devtool

用于解决生产环境中代码难以调试的问题，也称源码地图。

参考文档：https://www.webpackjs.com/configuration/devtool/

```js
module.exports = {
  devtool: "source-map", // 开发环境推荐
  devtool: "none", // 生成环境推荐，生成环境中默认值
};
```

##### loader

是 webpack 的扩展功能，本质是一个函数，用于将一个源码字符串转换成另一个源码字符串返回，返回的字符串必须是可执行的 JS 代码。

```js
module.exports = (sourceCode) => {
  // sourceCode：模块的源码
  // 对 sourceCode 一顿操作
  return `处理过后的sourceCode`;
};
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, // 使用正则匹配
        use: [
          {
            loader: "./loaders/test-loader.js",
            // require => require("./loaders/test-loader.js")
            options: {
              key: value, // 用于给 loader 传递参数
            },
            // 也可以这样给 loader 传递参数
            loader: "./loaders/test-loader.js?key=value",
          },
          // ... 其他 loader
        ],
        // 如果 loader 只是一个字符串，可以这样书写
        user: ["loader1", "loader2", ...],
      },
      // ... 其他规则
    ],

    noParse: /jquery/, // 不解析jquery库
  },
};
```

- module：在该选项中配置 loader
- rules：规则数组，用于定义匹配模块的规则，每项是一个对象，表示每个规则
- test：用于匹配模块，值是一个正则表达式
- use：匹配成功后使用哪些 loader，是一个数组，每项是一个对象，表示 loader 的配置
- loader：值是一个字符串，书写 loader 的路径，最终会被 require
- options：值是一个对象，可以向 loader 传递参数。
- noParse：值是一个正则表达式，表示不解析匹配的模块，通常用于忽略大型的单模块库（该库不在依赖任何库），以提高构建性能。

loader 函数将在 webpack 解析模块的过程中被调用，发生在 webpack 读取模块内容之后，AST 抽象语法树分析之前（webpack 会将模块内容交给 loader 处理，将 loader 返回的字符串进行 AST 抽象语法树分析）

**loader 的解析流程**

1. 查看当前模块是否满足某个 `test` 匹配规则，如果不满足，则 loaders 会是一个空数组，表示没有 loader 处理。
2. 如果满足某个 `test` 匹配，则读取对应 `use` 下的 loader 加入到 loaders 数组中。
3. webpack 会将读取到的模块内容交给数组中最后一个 loader 进行处理，最后一个 loader 将处理的结果交给前一个 loader，依此类推，数组中第一个 loader 将最终的处理结果交给 webpack 做 AST 抽象语法树分析。

可以使用 loader 的第三方库 `loader-utils` 操作 loader，使用 npm 安装

```js
const loaderUtils = require("loader-utils");

module.exports = function (sourceCode) {
  const { replaceWithConst } = loaderUtils.getOptions(this); // 得到参数
  const reg = new RegExp(replaceWithConst, "g");
  return sourceCode.replace(reg, "const"); // 将参数替换成 const 返回
};
```

##### plugin

是 webpack 的扩展功能，本质是一个带有 apply 方法的对象，用于在 webpack 的编译流程中嵌入一些功能（就像事件一样，当什么时候去做什么事）

```js
const myPlugin = {
  apply: function (compiler) {},
};
```

- compiler：是在初始化阶段构建的一个对象，在整个打包过程中只有一个，后续的编译和输出工作都是由 compiler 内部创建的 compilation 对象完成的，当重新编译时，会重新创建 compilation 对象完成编译和输出。
- apply：该方法会在 compiler 对象构建完成后自动执行，并把 compiler 对象作为参数传递给它，实际上它是注册钩子函数用的，它的功能就好像 `window.onload` 一样。

通常我们会使用 ES6 中的类来书写，通过构造函数创建一个 plugin

```js
class MyPlugin {
  apply(compiler) {}
}
```

配置文件中加入如下配置

```js
const MyPlugin = require("./plugins/MyPlugin"); // 引入模块

module.exports = {
  plugins: [new MyPlugin(), ...], // 创建对象加入到数组中
};
```

compiler 对象中提供了一个 hooks 对象，其中有大量的钩子函数（可以理解成事件），开发者可以注册这些钩子函数，从而参与 webpack 的编译和输出。可以在 apply 方法中使用下面的代码注册钩子函数，格式如下

```js
class MyPlugin {
  apply(compiler) {
    compiler.hooks.钩子名称.事件类型(name, [async] (compilation, [callback]) => {
      // 事件处理函数
    });
  }
}
```

- 钩子名称：https://www.webpackjs.com/api/compiler-hooks/
- 事件类型：
  - tap：注册一个同步的钩子函数，函数运行完毕则表示事件处理结束。
  - tapAsync：注册一个基于回调的异步钩子函数，事件处理结束会调用这个回调函数。[callback]
  - tapPromise：注册一个基于 Promise 的异步钩子函数，事件处理结束，Promise 进入已决状态。[async]
- name：调试时会使用到，通常填写插件的名字，是一个字符串。

在 compiler 的 beforeRun 钩子中可以为 compilation 注册钩子 `compilation.hooks.xxx`

##### context

入口模块和 loaders 的相对路径会以 context 设置的值作为基准路径

```js
const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),
  // ./index.js 就相当于 ./src/index.js
};
```

##### target

用于配置解析依赖关系时，要在什么环境中解析

```js
module.exports = {
  target: "web", // 浏览器环境
  target: "node", // Node 环境
};
```

其他环境：https://www.webpackjs.com/configuration/target/

##### resolve

这个配置主要是用于控制模块的解析过程

```js
const path = require("path");

module.exports = {
  resolve: {
    // 如果模块路径不是以 ./ 或 ../ 开头时，会从这个配置的目录中寻找模块
    modules: ["node_modules", ...],

    // 如果遇到没有书写后缀名的模块，会使用这个配置测试模块的后缀名
    extensions: [".js", ".json", ...],

    // 为路径配置别名，为了很方便的导入路径过深的模块
    alias: {
      // 使用 @/index.js 就相当于 ./src/index.js 目录
      "@": path.resolve(__dirname, "src"),

      // 使用 _/index.js 就相当于使用工程根目录中的 index.js
      `_`: __dirname,
    },
  },
};
```

##### externals

这个配置会影响第三方库的打包结果，配合页面 cdn 一起使用，最终代码体积会更小，也不会影响源代码的编写。

```js
module.exports = {
  externals: {
    jquery: "$", // 编译结果：module.exports = $
    lodash: "_", // 编译结果：module.exports = _
  },
};
```

##### stats

控制 webpack 构建过程中，控制台的输出内容。

参考文档：https://www.webpackjs.com/configuration/stats/

```js
module.exports = {
  stats: {
    // 配置控制台输出内容
  },
};
```

##### 入口和出口的最佳实践

**一个页面对应一个 JS 文件**

适用于页面与页面之间的功能差异巨大、公共代码较少。

这种情况下生产的最终结果不会有太多的重复代码。

公共代码会导致单个文件体积增加，从而导致传输速度变慢。

```js
const path = require("path");
module.exports = {
  entry: {
    pageA: "./src/pageA/index.js",
    pageB: "./src/pageB/index.js",
    pageC: ["./src/pageC/index1.js", "./src/pageC/index2.js"],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash:5].js",
  },
};
```

**一个页面对应多个 JS 文件**

适用于有一个独立的功能，需要被其他模块使用（如：统计的功能）

这种情况下使用一个 chunk 抽离这个独立功能，更有利于浏览器缓存。

```js
const path = require("path");
module.exports = {
  entry: {
    pageA: "./src/pageA/index.js",
    pageB: "./src/pageB/index.js",
    statistics: "./src/statistics/index.js", // 用于统计
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash:5].js",
  },
};
```

**单页应用**

是指一个网站或网站中的某一块，只有一个页面，页面中的内容全部靠 JS 创建和控制。

```js
const path = require("path");
module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.[hash:5].js",
  },
};
```

### 区分环境

如果需要针对开发环境和生产环境书写不同的 webpack 配置，这时可以导出一个函数。

在开始构建时，webpack 如果发现导出的是一个函数，则会调用这个函数，将函数返回的对象作为配置对象。

```js
module.exports = (env) => {
  if (开发环境) {
    console.log("开发环境");
    return {
      mode: "development",
      devtool: "source-map",
    };
  } else {
    console.log("生成环境");
    return {
      mode: "production",
    };
  }
};
```

在调用函数时，webpack 会向函数传递一个 env 作为参数，该参数的值来自于 webpack 命令给 env 参数指定的值，在函数中判断值来判断是什么环境即可。

```shell
npx webpack --env abc ## => { abc: true }
npx webpack --env abc bcd ## =>  { abc: true, bcd: true }
```

### 插件 - 清空输出目录

插件：clean-webpack-plugin，通过 npm 下载

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash:5].js",
  },
  plugins: [new CleanWebpackPlugin()],
};
```

### 插件 - 自动生成页面

插件：html-webpack-plugin，通过 npm 下载

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "target"),
    filename: "[name].[chunkhash:5].js",
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()],
};
```

可以给插件传递一个参数作为配置

```js
new HtmlWebpackPlugin({
  template: "./public/index.html", // 文件模板路径，根据模板样式生成html文件
  chunks: ["index"], // 引入哪个 chunk 生成的 js 文件
  filename: "index.html", // 生成的 html 文件的名字
});
```

如果需要根据多个 chunk 生成多个页面，多生成几个 plugin 即可。

更多配置参考 github 地址：https://github.com/jantimon/html-webpack-plugin
