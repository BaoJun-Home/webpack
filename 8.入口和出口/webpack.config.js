const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.js",
    index: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "target"),
    // filename: "bundle.js",
    // filename: "[name].js",
    // filename: "[name]-[hash:10].js",
    // filename: "[name].[chunkhash].js",
    filename: "[id].js",
  },
  // devtool: "source-map",
};
