const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    list: "./src/list/index.js",
    detail: "./src/detail/index.js",
  },

  output: {
    filename: "scripts/[name].[chunkhash:5].js",
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/list.html",
      chunks: ["list"],
      filename: "list.html",
    }),
    new HtmlWebpackPlugin({
      template: "./public/detail.html",
      chunks: ["detail"],
      filename: "detail.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./public/img",
          to: "./img",
        },
        {
          from: "./public/css",
          to: "./css",
        },
      ],
    }),
  ],

  stats: {
    modules: false,
  },
};
