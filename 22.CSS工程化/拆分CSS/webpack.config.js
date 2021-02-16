module.exports = {
  mode: "development",
  devtool: "source-map",
  watch: true,

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg)|(png)/,
        use: ["file-loader"],
        // use: "url-loader",
      },
    ],
  },
};
