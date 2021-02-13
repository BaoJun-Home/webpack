const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash:5].js",
  },

  module: {
    rules: [
      {
        test: /index\.js$/,
        use: [
          "./loaders/index-loader.js",
          "./loaders/loader1.js",
          "./loaders/loader2.js",
        ],
      },
    ],
  },

  // module: {
  //   rules: [
  //     {
  //       test: /index\.js$/,

  //       // use: ["./loaders/index-loader.js?replaceWithConst=定义变量"],
  //       // use: [
  //       //   {
  //       //     loader: "./loaders/index-loader.js?replaceWithConst=定义变量",
  //       //     // options: {
  //       //     //   replaceWithConst: "定义变量",
  //       //     // },
  //       //   },
  //       // ],
  //     },
  //   ],
  // },
};
