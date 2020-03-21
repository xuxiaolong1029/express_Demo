import fetch from "../utils/fetch";
//获取计价货币
export const getQueryAccountCurrency = () =>
  fetch.fetch("/common/queryQuotedCurrency", "", "get");
//获取所有货币信息
export const getQueryCurrency = () =>
  fetch.fetch("/common/queryCurrency", "", "get");
//获取所有交易对信息
export const getQueryContract = () =>
  fetch.fetch("/common/queryContract", "", "get"); //queryContract  /queryContractIndex
//获取所有汇率信息
export const getExchangeRate = () =>
  fetch.fetch("/common/exchange/list", "", "get");
//获取所有货币价格
export const getExchangeCoins = () =>
  fetch.fetch("/common/exchange/coins", "", "get");
//获取所有交易对行情
export const getQueryIndicatorList = () =>
  fetch.fetch("/quot/queryIndicatorList", "", "get");
// 获取时间戳
export const getTime = () => fetch.fetch("/mint/mintP/websocket", "", "get");
//获取用户信息
export const getUserInfo = () => fetch.fetch("/users/userInfo", "", "get");
// getGameList
export const getGameList = () => fetch.fetch("/common/getGameList", {}, "post");
//获取聚变账户
export const getFusionAccount= ()=>fetch.fetch("/fusion/trade/fusionAccount", {}, "post");

