/**
 * 向总资源列表中加入一个文件
 */
module.exports = class OutPutFile {
  constructor(filename = "fileList.txt") {
    this.filename = filename;
  }

  apply(compiler) {
    compiler.hooks.emit.tap("OutPutFile", (compilation) => {
      // compilation.assets：资源列表
      // size：文件大小，字节数
      const fileList = [];
      for (const key in compilation.assets) {
        let str = `【${key}】 文件大小：${
          compilation.assets[key].size() / 1000
        }`;
        fileList.push(str);
      }
      const result = fileList.join("\n");
      // 向资源列表中添加一项
      compilation.assets[this.filename] = {
        source() {
          return result;
        },
        size() {
          return result.length;
        },
      };
    });
  }
};
