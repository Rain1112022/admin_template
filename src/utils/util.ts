export function deepCopy(obj: any) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Object.prototype.toString.call(obj) === '[Object Date]')
    return new Date(obj);
  if (Object.prototype.toString.call(obj) === '[Object RegExp]')
    return new RegExp(obj);
  if (Object.prototype.toString.call(obj) === '[Object Undefined]')
    return new Error(obj);
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      newObj[key] = deepCopy(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

//节流函数:fn函数， interval延迟执行时间（毫秒）， type 1时间戳版 2定时器版;
export function _throttle(
  fn: Function,
  interval: number = 200,
  type: number
): any {
  if (type === 1) {
    var previous: number = 0;
  } else {
    var timeout: number | null;
  }
  return function (this: any, ...args: any[]) {
    var th = this;
    if (type === 1) {
      let now: number = Date.now();
      if (now - previous > interval) {
        fn.apply(th, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = window.setTimeout(() => {
          timeout = null;
          fn.apply(th, args);
        }, interval);
      }
    }
  };
}

//防抖函数:fn 函数, delay 延迟执行毫秒数, immediate true 表立即执行，false 表非立即执行;
export function _debounce(
  fn: Function,
  delay: number = 200,
  immediate: boolean
): any {
  var timer: number | null;
  return function (this: any, ...args: any[]) {
    var th = this;
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      var callNow = !timer;
      timer = window.setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) fn.apply(th, args);
    } else {
      timer = window.setTimeout(() => {
        timer = null;
        fn.apply(th, args);
      }, delay);
    }
  };
}

export const formatTime = (
  time: string | number | Date,
  fmt: string
): string => {
  if (!time) return '';
  const date = new Date(time);
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
};
