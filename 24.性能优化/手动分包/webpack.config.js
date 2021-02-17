const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "source-map",

  entry: {
    index: "./src/index.js",
    a: "./src/a.js",
  },

  output: {
    filename: "[name].[chunkhash:5].js",
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/*"],
      // "**/*"：清空所有文件
      // "!dll"：排除掉dll目录
      // "!dll/*"：排除掉dll目录下的所有文件
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    new webpack.DllReferencePlugin({
      manifest: require("./dll/jquery.mainfest.json"),
    }),
    new webpack.DllReferencePlugin({
      manifest: require("./dll/lodash.mainfest.json"),
    }),
  ],
};
