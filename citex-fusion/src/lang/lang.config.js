import Vue from "vue";
import VueI18n from "vue-i18n";
import en from '../../static/lang/en'
import cn from '../../static/lang/cn'
import ko from '../../static/lang/ko'
import tw from '../../static/lang/tw'
import vn from '../../static/lang/vn'
import store from "../store/store";
import { urlParams } from "../utils/common";
Vue.use(VueI18n);
// 以下为语言包单独设置的场景，单独设置时语言包需单独引入
const messages = {
  zh_CN:cn, // 中文语言包
  en_US:en, // 英文语言包
  ko_KR:ko, // 韩文语言包
  zh_TW:tw, // 繁体中文语言包
  vi_VN:vn // 越南语言包
};
let lang = urlParams().lang || urlParams().locale;
if (!lang) {
  let locale = localStorage.getItem("lang");
  if (locale && locale !== "null") {
    lang = locale;
  } else {
    lang = navigator.language || navigator.browserLanguage || "en_US";
  }
}
if (lang.indexOf("-") != -1) {
  let langArr = lang.split("-");
  lang = langArr[0] + "-" + langArr[1].toUpperCase();
} else if (lang.indexOf("_") != -1) {
  let langArr = lang.split("_");
  lang = langArr[0] + "-" + langArr[1].toUpperCase();
}
lang = lang.replace("-", "_");
if (lang === "ko_KR" || lang === "ko") {
  lang = "ko_KR";
  //document.title = "极昼资本";
} else if (lang === "zh_TW") {
  //document.title = "极昼资本";
} else if (lang === "zh_CN") {
 // document.title = "极昼资本";
}
/*else if(lang === 'vi_VN'){
  document.title = "CITEX | số tài sản nền tảng thỏa thuận trên toàn thế giới.";
}*/
else {
  lang = "en_US";
  document.title = "极昼资本";
}
store.commit("lang", lang);
localStorage.setItem("lang", lang);
document.cookie = "locale=" + lang;

/*---------使用语言包-----------*/
export default new VueI18n({
  locale: lang, // 语言标识
  messages:messages
});
