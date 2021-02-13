const { ChunkGraph } = require("webpack");

module.exports = (env) => {
  console.log(env);
  if (env.prod) {
    console.log("生产环境");
    return {
      mode: "production",
    };
  } else {
    console.log("开发环境");
    return {
      mode: "development",
      devtool: "source-map",
    };
  }
};
