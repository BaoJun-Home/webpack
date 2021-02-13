import isPrime from "./isPrime";

/**
 * 用于产生一个数字
 */
export default class {
  constructor(duration = 300) {
    this.duration = duration; // 定时器的间隔时间
    this.timer = null; // 产生数字的定时器
    this.n = 1; // 当前的数字
    this.callback = null; // 产生数字后的回调函数，需要用户赋值
  }

  /**
   * 开始产生数字
   */
  start() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      if (this.callback) {
        this.callback(this.n, isPrime(this.n));
      }
      this.n++;
    }, this.duration);
  }

  /**
   * 停止产生数字
   */
  stop() {
    clearInterval(this.timer);
    this.timer = null;
  }
}
