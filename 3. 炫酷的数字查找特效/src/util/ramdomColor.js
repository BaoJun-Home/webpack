const colors = [
  "#0ff",
  "#ff0",
  "#0f0",
  "#f00",
  "00f",
  "f0f",
  "pink",
  "chocolate",
  "darkmagenta",
];

/**
 * 产生一个随机数
 * @param {*} min
 * @param {*} max
 */
export function getRamdomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 用于得到一个随机的颜色
 */
export default function () {
  const index = getRamdomNumber(0, colors.length);
  return colors[index];
}
