<template>
  <div id="app" :style="{fontWeight:fontWeight}">
    <div class="nuclear-head" v-show="!this.$route.meta.hideHead">
      <nav>
        <router-link tag="div" class="logo" to="/">
          <img src="./components/nuclear/img/logo.png" alt="">
        </router-link>
        <div class="lang">
          <el-dropdown size="small">
            <span class="el-dropdown-link">
                <img src="./assets/earth.png" alt="lang">
                {{value}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in options" :key="index" @click.native="getLang(item.value)"><p class="pl-16 pr-16">{{item.label}}</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="user">
          <button v-if="!userInfo" @click="login()">{{$t('lang.lg002')}}</button>
          <el-dropdown v-else size="small">
            <span class="el-dropdown-link">
                {{userInfo}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <p class="pl-16 pr-16" @click="logOut()">{{$t('lang.hd007')}}</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </nav>
    </div>
    <div style="clear: both;"></div>
    <router-view></router-view>
  </div>
</template>
<script>
  import {strEnc,strDec} from "./utils/aes";
  import env from './utils/env'
  export default {
    name: "App",
    data() {
      return {
        options: [
          {
            value: "zh_CN",
            label: "简体中文"
          },
          {
            value: "en_US",
            label: "English"
          },
          {
            value: "zh_TW",
            label: "繁体中文"
          }
        ],
        value:'',
        isIE: false,
        userInfo:null,
        fontWeight:"Microsoft YaHei",
        hideHead:false
      };
    },
    created() {
      if(this.$route.query.token){
        let Base64 = require("js-base64").Base64;
        let usToken = Base64.decode(this.$route.query.token);
        this.userInfo = JSON.parse(usToken).username;
        localStorage.setItem("userToken", usToken);
      }else{
        if(localStorage.getItem('userToken')){
          this.userInfo = JSON.parse(localStorage.getItem('userToken')).username;
        }else{
          this.userInfo=null
        }
      }
      window.screenHeight = window.screen.availHeight;
      this.value = localStorage.getItem('lang')==='zh_CN'?'简体中文':localStorage.getItem('lang')==='en_US'?'English':'繁体中文';
    },
    methods:{
      getLang(lang) {
        this.value = lang;
        if (lang === "zh_CN") {
          this.value = "简体中文";
        } else if (lang === "en_US") {
          this.value = "English";
        } else if (lang === "ko_KR") {
          this.value = "한국어";
        } else if (lang === "zh_TW") {
          this.value = "繁体中文";
        }
        this.$i18n.locale = lang;
        this.$store.commit("lang", lang);
        localStorage.setItem("lang", lang);
        document.cookie = "lang=" + lang;
        document.cookie = "locale=" + lang;
        if(this.$route.query.lang!==lang && this.$route.path==='/'){
          window.location.href=window.location.href.split('#')[0]+'#/';
        }
      },
      logOut(){
        localStorage.removeItem('userToken');
        this.$router.push({ path: "/" });
        window.location.reload();
      },
      login(){
        window.location.href=env.fusionUrl+'#/login';
      }
    },
    mounted() {
      let lang = localStorage.getItem('lang');
      if(lang==='zh_CN' || lang==='zh_TW'){
        this.fontWeight = 'Microsoft YaHei';
      }else if(lang==='en_US'){
        this.fontWeight = 'Roboto';
      }else{
        this.fontWeight = 'Microsoft YaHei';
      }
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        this.isIE = true;
      } else {
        this.isIE = false;
      }
    },
    watch: {
      lang(val) {
        if(val==='zh_CN' || val==='zh_TW'){
          this.fontWeight = 'Microsoft YaHei';
        }else if(val==='en_US'){
          this.fontWeight = 'Roboto';
        }else{
          this.fontWeight = 'Microsoft YaHei';
        }
      },
    }
  };
</script>
<style scoped lang="scss">
  .nuclear-head{
    width: 100%;
    height: 67px;
    padding: 15px 0;
    background: #2e3359;
    overflow: hidden;
    nav{
      height:37px;line-height: 37px;
      width: 1188px;
      margin: auto;
      .logo{
        display: inline-block;
        img{
          height: 37px;
        }
      }
      .user{
        display: inline-block;float: right;margin-right: 30px;
        button{
          height:27px;line-height:27px;padding: 0 20px;background-color:#409EFF;font-size: 14px;color: #fff;border-radius: 5px;
        }
        span{
          color: #fff;
        }
      }
      .lang{
        display: inline-block;float: right;;
        span{
          color: #fff;cursor: pointer;
        }
        img{
          width: 18px;
          height: 18px;
          line-height:37px;
          vertical-align: middle;
          margin-right: 6px;
        }
      }
    }
  }
</style>
<style>
  #app {
    min-height: 100vh;
    min-width: 1200px;
  }
  .aaaasss a {
    text-decoration: underline;
  }
  *::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: #b5b1b1;
  }
  *::-webkit-scrollbar-track {
    /* //scroll轨道背景 */
    background-color: #fff;
  }
  *::-webkit-scrollbar-thumb {
    /* //滚动条中能上下移动的小块 */
    border-radius: 10px;
    background-color: #b5b1b1;
  }
  /* //小于780px */
  @media screen and (max-width: 780px) {
    #app {
      background: #202B41;
    }
    .el-dialog{
      width: auto!important;
    }
  }
</style>
