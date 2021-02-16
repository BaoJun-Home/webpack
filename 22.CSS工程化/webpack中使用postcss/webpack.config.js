const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.pcss$/,
        use: ["style-loader", "css-loader?modules", "postcss-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  devServer: {
    open: true,
  },
};
