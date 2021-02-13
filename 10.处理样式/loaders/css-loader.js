module.exports = function (sourceCode) {
  console.log("css-loader运行了", sourceCode);
  const code = `
  const style = document.createElement("style");
  style.innerHTML = \`${sourceCode}\`;
  document.body.appendChild(style);
  module.exports = \`${sourceCode}\`
  `;

  return code;
};
