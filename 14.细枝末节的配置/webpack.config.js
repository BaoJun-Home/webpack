const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",

  entry: {
    index: "./src/index.js",
    // a: "./src/a.js",
  },
  // context: path.resolve(__dirname, "src"),

  // output: {
  //   library: "temp",
  //   libraryTarget: "commonjs",
  // },

  // module: {
  //   noParse: /jquery/,
  // },

  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".json", ".css", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  // externals: {
  //   jquery: "$",
  //   lodash: "_",
  // },

  stats: {
    assets: false,
    hash: true,
    modules: false,
    builtAt: true,
  },
};
