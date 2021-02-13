// const MyPlugin = require("./plugins/MyPlugin");
const OutPutFile = require("./plugins/OutPutFile");
console.log(OutPutFile);

module.exports = {
  mode: "development",
  // watch: true,
  devtool: "source-map",
  // plugins: [new MyPlugin()],
  plugins: [new OutPutFile()],
};
