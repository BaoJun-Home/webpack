import randomColor from "../util/ramdomColor";
import { getRamdomNumber } from "../util/ramdomColor";

const container = document.querySelector(".container");
const center = document.querySelector(".center");

/**
 * 产生数字到容器中
 * @param {*} n
 * @param {*} isPrime
 */
export default function (n, isPrime) {
  const span = document.createElement("span");
  if (isPrime) {
    let color = randomColor();
    span.style.color = color;
    createCenterNumber(n, color);
  }
  span.innerText = n;
  container.appendChild(span);
  setCenterNumber(n);
}
/**
 * 设置中间div的内容
 * @param {*} n
 * @param {*} isPrime
 * @param {*} color
 */
function setCenterNumber(n, isPrime, color) {
  center.innerHTML = n;
}

/**
 * 中间div是一个素数
 * @param {*} n
 * @param {*} color
 */
function createCenterNumber(n, color) {
  const div = document.createElement("div");
  div.innerText = n;
  div.style.color = color;
  div.classList.add("center");

  document.body.appendChild(div);

  getComputedStyle(div).left;
  div.style.transform = `translate(${getRamdomNumber(
    -300,
    300
  )}px, ${getRamdomNumber(-300, 300)}px)`;
  div.style.opacity = 0;
}
