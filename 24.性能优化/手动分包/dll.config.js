const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "production",

  entry: {
    jquery: "jquery",
    lodash: "lodash",
  },

  output: {
    filename: "dll/[name].js",
    library: "[name]",
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, "dll", "[name].mainfest.json"),
      name: "[name]",
    }),
  ],
};
