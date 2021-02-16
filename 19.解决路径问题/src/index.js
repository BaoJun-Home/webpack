import url from "./assets/webpack.jpg";
console.log(url);

const img = document.createElement("img");
img.src = url;
document.body.appendChild(img);
