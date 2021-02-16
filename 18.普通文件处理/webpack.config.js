const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    index: "./src/index.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scripts/[name].[chunkhash:5].js",
  },

  module: {
    rules: [
      {
        test: /\.(jpg)|(png)|(jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5000,
              name: "images/[name].[hash:5].[ext]",
            },
          },
        ],

        // use: [
        //   {
        //     loader: "file-loader",
        //     options: {
        //       name: "[name].[hash:5].[ext]",
        //     },
        //   },
        // ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  devServer: {
    // open: true,
  },

  stats: {
    colors: true,
    modules: false,
  },
};
