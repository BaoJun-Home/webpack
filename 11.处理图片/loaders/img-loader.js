const loaderUtils = require("loader-utils");

/**
 * 图片的loader
 * @param {*} buffer 图片的二进制数据
 */
function loader(buffer) {
  const {
    name = "[contenthash:5].[ext]",
    limit = 3000,
  } = loaderUtils.getOptions(this);

  let content = null;
  if (buffer.byteLength >= limit) {
    content = filePath.call(this, buffer, name);
  } else {
    content = toBase64(buffer);
  }
  return `module.exports = \`${content}\``;
}

loader.raw = true; // 保持传入数据格式
module.exports = loader; // 导出 loader

/**
 * 图片转 base64
 * @param {*} buffer 图片的二进制数据
 */
function toBase64(buffer) {
  return "data:image/jpg;base64," + buffer.toString("base64");
}

/**
 * 生成图片路径
 * @param {*} buffer 图片的二进制数据
 */
function filePath(buffer, name) {
  // 生成一个文件名
  const fileName = loaderUtils.interpolateName(this, name, {
    content: buffer,
  });
  this.emitFile(fileName, buffer); // 将文件名加入到总资源列表中
  return fileName;
}
