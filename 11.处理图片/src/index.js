const src = require("./assets/webpack.jpg");
console.log(src);
const img = document.createElement("img");
img.src = src;
document.body.appendChild(img);
