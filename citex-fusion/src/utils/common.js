import axios from "../utils/fetch";
import pako from "pako";
import bigDecimal from "js-big-decimal";
//获取连接后的参数
export const urlParams = () => {
  const fullUrl = location.href;
  const url = fullUrl.substr(fullUrl.indexOf("?")); //获取url中"?"符后的字串
  const theRequest = new Object();
  if (url.indexOf("?") != -1) {
    const str = url.substr(1);
    const strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
};
export const getUrlparam = name => {
  // 获取参数
  let url = window.location.search;
  // 正则筛选地址栏
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // 匹配目标参数
  let result = url.substr(1).match(reg);
  //返回参数值
  return result ? decodeURIComponent(result[2]) : null;
};
//生成短连接
export const shortLink = url => {
  const parmars = {
    url: url
  };
  return axios.fetch("/common/getShortURL", parmars, "post");
};

export const countTime = (time, flag) => {
  let d, hour, min, sec, msec;
  if (time >= 0) {
    d = Math.floor(time / 1000 / 60 / 60 / 24);
    d >= 10 ? "" : (d = "0" + d);
    hour = d * 24 + Math.floor((time / 1000 / 60 / 60) % 24);
    hour >= 10 ? "" : (hour = "0" + hour);
    min = Math.floor((time / 1000 / 60) % 60);
    min >= 10 ? "" : (min = "0" + min);
    sec = Math.floor((time / 1000) % 60);
    sec >= 10 ? "" : (sec = "0" + sec);
    if (flag == true) {
      msec = Math.floor(time % 1000);
      msec >= 10 ? "" : (msec = "0" + msec);
    }
  } else {
    d = "00";
    hour = "00";
    min = "00";
    sec = "00";
    if (flag == true) {
      msec = "00";
    }
  }
  let TimeData = {
    day: d,
    hour: hour,
    min: min,
    sec: sec,
    msec: msec
  };
  if (flag == true) {
    TimeData = Object.assign({ msec: msec }, TimeData);
  }
  return TimeData;
};
export const MathRandom = length => {
  let str = Math.random()
    .toString(36)
    .substr(2);
  if (str.length >= length) {
    return str.substr(0, length);
  }
  str += MathRandom(length - str.length);
  return str;
};
// 解压数据
export const inflateData = data => {
  let transferData = new Uint8Array(data);
  return JSON.parse(pako.inflate(transferData,{ to: "string" })).data;
};
// 截取字符串小数位数
export const subStringNum = (a, num) => {
  const a_type = typeof a;
  const num_type = typeof num;
  var aStr;
  var numStr;
  if(num_type != "number"){
    num = Number(num);
  }
  if (a_type == "number") {
    aStr = a.toString();
    var aArr = aStr.split(".");
  } else if (a_type == "string") {
    aStr = a;
    var aArr = a.split(".");
  }
  if (aArr.length > 1) {
    a = aArr[0] + "." + aArr[1].substr(0, num);
  }
  let strVal = a.toString();
  let searchVal = strVal.indexOf(".");
  if (searchVal < 0) {
    searchVal = strVal.length;
    strVal += ".";
  }
  while (strVal.length <= searchVal + num) {
    strVal += "0";
  }
  return strVal == 0 ? bigDecimal.round(0, num) : strVal;
};

//防抖
export function debounce(fn, interval = 500) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  };
};
//检测设备
export const getNavigator = () => {
  let ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  };
};

export function strToHexCharCode(str) {
  if (str === "" || str == null) return "";
  let hexCharCode = [];
  hexCharCode.push("0x");
  for (var i = 0; i < str.length; i++) {
    hexCharCode.push(str.charCodeAt(i).toString(16));
  }
  return hexCharCode.join("");
}

