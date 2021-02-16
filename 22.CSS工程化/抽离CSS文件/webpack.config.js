const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  // devtool: "source-map",

  entry: {
    index: "./src/assets/index.css",
    a: "./src/assets/a.css",
    b: "./src/assets/b.css",
  },

  output: {
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader?modules"],
      },
      {
        test: /\.(jpg)|(png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./img/[hash:5].[ext]",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],

  devServer: {
    open: true,
  },
};
