const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  devServer: {
    port: 8000,
    open: true,
    index: "index.html",
    proxy: {
      "/api": {
        target: "http://open.duyiedu.com",
        changeOrigin: true,
      },
    },
    stats: {
      modules: false,
      colors: true,
    },
  },
};
