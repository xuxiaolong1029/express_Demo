import http from "../utils/fetch";
export default {
 //公告
  fusionAffiche(p) {
    return http.fetch("/fusion/affiche/selectFusionAffiche", p, "post");
  },
  //判断是否是顶层用户
  getIsTop(p) {
    return http.fetch("/fusion/trade/isTop", p, "post");
  },
  //用户信息
  getSelectUserInfo(par){
    return http.fetch("/fusion/trade/selectUserInfo", par, "post");
  },
  //划转记录
  getTransferRecord(par){
    return http.fetch("/fusion/trade/asset/queryTransferRecord", par, "post");
  },
  //项目信息
  getFusionInfo(par){
    return http.fetch("/fusion/trade/selectFusionInfo", par, "post");
  },
  //资金划转
  getTransfer(par){
    return http.fetch("/fusion/trade/asset/transfer", par, "post");
  },
  //参与聚变
  getApply(par){
    return http.fetch("/fusion/trade/apply", par, "post");
  },
  //绑定邀请关系
  bindInvitee(par){
    return http.fetch("/fusion/trade/bindInvitee", par, "post");
  },
  //聚变表格数据
  getNuclearList(par,URL){
    return http.fetch(`/fusion/${URL}`, par, "post");
  },
  //聚变弹窗信息
  getNuclearObject(par,URL){
    return http.fetch(`/fusion/trade/${URL}`, par, "post");
  },
  // ---------主账户-------------
  // 查询
  mainAccountQuery(par){
    return http.fetch(`/fusion/account/mainAccountQuery`, par, "post");
  },
  // 操作
  mainAccountOperation(par){
    return http.fetch(`/fusion/account/mainAccountOperation`, par, "post");
  },
  // ---------子账户-------------
  // 查询
   subAccountQuery(par){
    return http.fetch(`/fusion/account/subAccountQuery`, par, "post");
  },
  // 弹窗子账户查询
  childAccountInfo(par){
    return http.fetch(`/fusion/account/childAccountInfo`, par, "post");
  },
  // 我的主账户划入子账户
  classifiedAssets(par){
    return http.fetch(`/fusion/account/classifiedAssets`, par, "post");
  },
  // 划回我的账户
  transferMainAccount(par){
    return http.fetch(`/fusion/account/transferMainAccount`, par, "post");
  },
  // 添加子账户
  insertChildren(params){
    return http.fetch(`/fusion/account/insertChildren`, params, "post");
  },
  // 多个账户参与聚变
  subApply(params){
    return http.fetch(`/fusion/account/subApply`, params, "post");
  },
  // 多个账户参与聚变
  dynamicAccountReq(name,params){
    return http.fetch(`/fusion/account/${name}`, params, "post");
  },
  nodeApi(params){
    return http.fetch(`/users/api`, params, "post");
  },
  nodeLogin(params){
    return http.fetch(`/users/login`, params, "post");
  },
  nodeToken(params){
    return http.fetch(`/users/verifyToken`, params, "post");
  },
  account(params){
    return http.fetch(`/users/account`, params, "post");
  }
}
