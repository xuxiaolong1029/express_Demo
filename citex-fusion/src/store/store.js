import "babel-polyfill"
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import {
  getQueryAccountCurrency,
  getQueryCurrency,
  getQueryContract,
  getExchangeRate,
  getExchangeCoins,
  getQueryIndicatorList,
  getTime,
  getFusionAccount,
  getUserInfo
} from "../api/commonApi";
const store = new Vuex.Store({
  // 定义状态
  state: {
    isLogin: JSON.parse(localStorage.getItem("userToken")) ? true : false,
    //全局语言
    lang: localStorage.getItem("lang") || "zh_CN",
    // K线时间
    citexTime: JSON.parse(localStorage.getItem("citexTime")) || {
      tab: "15",
      text: "15m",
      flag: 3
    },
    //交易开关灯
    tradeBg: localStorage.getItem("tradeBg"),
    //注册协议是否容易
    fullAgree: false,
    //计价货币
    currencyList: [],
    //所有货币信息
    allCurrencyList: [],
    //所有交易对信息
    contractList: [],
    //所有交易对详细行情
    indicatorList: [],
    //所有汇率信息
    exchangeRateList: [],
    //所有货币价格
    exchangeCoinsList: [],
    //获取聚变账户信息
    fusionAccount:[],
    //商品ID
    contractId: "",
    //计价货币id
    currencyId: "",
    //统计接口加载的个数
    api: {
      count: 0,
      apiName: []
    },
    order: false,
    userToken: "",
    activeTab: "",
    activeTab2: "",
    defultTab: "",
    currentPrice: 0, //当前最新成交价
    userHEAD: "",
    GlobalUserInfo:{}, // 个人中心-用户信息
  },
  getters: {
    tradeBg:state=>state.tradeBg,
    contractList:state=>state.contractList
  },
  mutations: {
     // 更新用户信息
    updateGlobalUserInfo(state,infomations){
      state.GlobalUserInfo = infomations;
    },
    //语言
    lang(state, data) {
      state.lang = data;
    },
    // K线时间
    citexTime(state, data) {
      state.citexTime = data;
    },
    //注册协议
    fullAgree(state, data) {
      state.fullAgree = data;
    },
    // 首页P版默认tab
    activeTab(state, data) {
      state.activeTab = data;
    },
    // 首页主板默认tab
    activeTab2(state, data) {
      state.activeTab2 = data;
    },
    // 交易中心默认tab
    defultTab(state, data) {
      state.defultTab = data;
    },
    userToken(state, data) {
      state.userToken = data;
    },
    userHEAD(state, data) {
      state.userHEAD = data;
    },
    //tradeBg 交易中心背景色
    changeTradeBg(state, data) {
      state.tradeBg = data;
    },
    // 获取计价货币
    currencyList(state, data) {
      state.api.count++;
      state.api.apiName.push("queryQuotedCurrency");
      state.currencyList = data;
    },
    //查询所有货币信息
    allCurrencyList(state, data) {
      state.api.count++;
      state.api.apiName.push("queryCurrency");
      state.allCurrencyList = data;
    },
    //获取所有交易对信息
    contractList(state, data) {
      state.api.count++;
      state.api.apiName.push("queryContract");
      state.contractList = data;
    },
    //获取所有汇率信息
    exchangeRateList(state, data) {
      state.api.count++;
      state.api.apiName.push("exchange");
      state.exchangeRateList = data;
    },
    //获取所有货币价格
    exchangeCoinsList(state, data) {
      state.api.count++;
      state.api.apiName.push("coins");
      state.exchangeCoinsList = data;
    },
    // 获取所有交易对行情
    indicatorList(state, data) {
      state.api.count++;
      state.api.apiName.push("queryIndicatorList");
      state.indicatorList = data;
    },
    // 获取聚变账户
    fusionAccount(state, data){
      state.api.count++;
      state.api.apiName.push("fusionAccount");
      state.fusionAccount = data;
    },
    order(state, data) {
      state.order = !state.order;
    }
  },
  actions: {
    //获取聚变账户金额
    async getFusionAccount({commit}) {
      await getFusionAccount({}).then(data => {
        commit("fusionAccount", data.data);
      });
    },
    // 获取时间
    getTime(txt) {
      getTime().then(data => {
        txt.commit("getTime", data);
      });
    }
  }
});

export default store;
