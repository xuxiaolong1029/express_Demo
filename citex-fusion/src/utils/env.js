/* global process */
/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 */
let baseUrl = "";
let fusionUrl = '';
let pcUrl = window.location.origin;
let url = window.location.href;
if (process.env.NODE_ENV === "production") {
  baseUrl = "";
  fusionUrl = 'https://citex.co.kr/';
  if (url.search("pre") != -1) {
    fusionUrl = 'https://pre.citex.co.kr/';
  } else if (url.search("pt") != -1) {
    fusionUrl = 'https://pt.citex.co.kr/';
  }
} else if (process.env.NODE_ENV == "testing") {
  baseUrl = "";
  fusionUrl = 'http://10.1.1.61:8090/';
  pcUrl = "http://10.1.1.61:8090/";

} else {
  fusionUrl = 'http://10.1.1.200:8090/';
  pcUrl = "http://10.1.1.61:8090/";
}
export default { baseUrl,fusionUrl,pcUrl};

