const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "scripts/[name].[chunkhash:5].js",
    // publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(png)|(jpg)|(jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[hash:5].[ext]",
            },

            // loader: "url-loader",
            // options: {
            //   limit: 3000,
            //   name: "images/[name].[hash:5].[ext]",
            // },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "html/index.html",
    }),
  ],

  devServer: {
    open: true,
    openPage: "html/index.html",
  },
};
