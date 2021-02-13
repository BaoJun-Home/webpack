import createNumber from "../util/createNumber";
import appendNumber from "./appendNumber";

const number = new createNumber(100);

/**
 * 回调函数
 * @param {*} n
 * @param {*} isPrime
 */
number.callback = function (n, isPrime) {
  appendNumber(n, isPrime);
};

let isStart = false;
window.onclick = function () {
  if (isStart) {
    number.stop();
    isStart = false;
  } else {
    number.start();
    isStart = true;
  }
};
