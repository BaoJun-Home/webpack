module.exports = {
  map: false,
  plugins: {
    "postcss-preset-env": {
      // 插件配置
      // browsers: ["last 2 version", "> 1%"],
      preserve: false,
    },
    "postcss-apply": {},
    "postcss-color-function": {},
    stylelint: {},
  },
};
