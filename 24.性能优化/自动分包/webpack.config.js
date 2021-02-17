const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",

  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //     // maxSize: 2000,

  //     cacheGroups: {
  //       styles: {
  //         test: /\.css$/,
  //         minSize: 0,
  //         minChunks: 2,
  //       },
  //       // vendors: {
  //       //   test: /[\\/]node-modules[\\/]/, //
  //       // },
  //       // default: {},
  //     },
  //   },
  // },

  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        styles: {
          test: /\.css$/, // 匹配样式模块
          minSize: 0, // 覆盖默认的最小尺寸，这里仅仅是作为测试
          minChunks: 2, // 覆盖默认的最小chunk引用数
        },
      },
    },
  },

  entry: {
    page1: "./src/page1.js",
    page2: "./src/page2.js",
  },

  output: {
    filename: "[name].[chunkhash:5].js",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:5].css",
      // chunkFilename是配置来自于分割chunk的文件名
      chunkFilename: "[hash:5].css",
    }),
  ],

  stats: {
    modules: false,
  },
};
