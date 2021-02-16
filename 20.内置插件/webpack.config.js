const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "source-map",

  entry: {
    index: "./src/index.js",
  },

  output: {
    filename: "[name].[chunkhash:5].js",
  },

  plugins: [
    new webpack.DefinePlugin({
      // 常量名：值必须是一个字符串，字符串中的值会作为常量的值
      PI: `Math.PI`, // 相当于 const PI = Math.PI
      VERSION: `"1.1.1"`, // 相当于 cosnt VERSION = "1.1.1"
      DOMAIN: JSON.stringify("www.baidu.com"), // 相当于 const DOMAIN = "www.baidu.com"
      // JSON.stringify("www.baidu.com") => ""www.baidu.com""
    }),

    new webpack.BannerPlugin({
      banner: ` 
        hash:[hash],
        chunkhash:[chunkhash],
        name:[name],
        filebase:[filebase],
        auther:surongbao,
        file:[file]`,
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      _: "lodash",
    }),
  ],
};
