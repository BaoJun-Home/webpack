const loaderUtils = require("loader-utils");

module.exports = function (sourceCode) {
  console.log(sourceCode);
  console.log("index-loader运行了");
  const { replaceWithConst } = loaderUtils.getOptions(this);
  console.log(replaceWithConst);
  const reg = new RegExp(replaceWithConst, "g");
  return sourceCode.replace(reg, "const");
};
