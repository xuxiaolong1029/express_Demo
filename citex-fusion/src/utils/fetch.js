/**
 * axios配置，封装有错误码和错误描述
 */
// let baseUrl = '';
import axios from "axios";
import "es6-promise";
import base from "./env";

export default {
  fetch(url, params, type) {
    return new Promise((resolve, reject) => {
      let baseUrl = base.baseUrl + url;
      let parmarsStr = "";
      if (JSON.stringify(params) != "{}") {
        parmarsStr += "?";
        for (const key in params) {
          parmarsStr += key + "=" + params[key] + "&";
        }
        parmarsStr = parmarsStr.substring(0, parmarsStr.length - 1);
      }
      if (type === "post") {
        axios.post(baseUrl, params).then(
          response => {
              resolve(response.data);
            }, err => {
              reject(err);
          }).catch(error => {
            reject(error);});
      }else {
        axios.get(baseUrl + parmarsStr).then(response => {
          resolve(response.data);
        },err => {
          reject(err);
        }
        ).catch(error => {
          reject(error);
        });
      }
    });
  }
};
