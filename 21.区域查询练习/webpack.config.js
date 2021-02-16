const baseConfig = require("./webpack.base");
const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");

module.exports = (env) => {
  if (env && env.prod) {
    // 生产环境
    const config = {
      ...baseConfig,
      ...prodConfig,
    };

    return config;
  } else {
    // 开发环境
    const config = {
      ...baseConfig,
      ...devConfig,
    };

    return config;
  }
};
