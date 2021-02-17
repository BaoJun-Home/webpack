module.exports = {
  mode: "development",
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /lodash/,
        // exclude: /node_modules/,
        // include: /src/,
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: "./cache",
            },
          },
          "babel-loader",
        ],
      },
    ],
  },
};
