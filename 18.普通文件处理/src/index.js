console.log("index module");

const imgUrl = require("./assets/webpack.jpg").default;

console.log(imgUrl);

if (Math.random() < 0.5) {
  const img = document.createElement("img");
  img.src = imgUrl;
  document.body.appendChild(img);
}
