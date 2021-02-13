module.exports = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(jpg)|(png)$/,
        use: [
          {
            loader: "./loaders/img-loader.js",
            options: {
              name: "img-[contenthash:7].[ext]",
              limit: 3000,
            },
          },
        ],
      },
    ],
  },
};
