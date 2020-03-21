<template>
  <div class="nuclear-page">
    <div class="nuclear-banner">
      <img :src='"./img/banner-"+listenLang+".png"' alt="" >
    </div>
    <div style="position: relative">
      <div class="nuclear-tip">
        <p class="notice">
          {{news.name}}<a :href="news.htmlUrl">{{$t('lang.nuclear034')}}&gt;&gt;</a><!--查看详情-->
        </p>
      </div>
      <div class="nuclear-content">
        <div class="button">
          <router-link tag="button" to="/nuclear/introduce">{{$t('lang.nuclear080')}}</router-link><!--我的共振账户-->
          <router-link tag="button" to="/nuclear/personal">{{$t('lang.nuclear002')}}</router-link><!--我的共振账户-->
        </div>
        <div class="nuclear-trad">
          <p class="title">CTT{{$t('lang.nuclear037')}}&nbsp;({{$t('lang.nuclear152')}})</p><!--$t('lang.nuclear037')聚变交易-->
          <span class="status">{{$t('lang.nuclear038')[fusionInfo.projectStatus]}}</span><!--进行中-->
          <div class="trad-num">
            <div>
              <label>{{$t('lang.nuclear039')}}</label><!--我的聚变收益-->
              <p>{{tradeUserInfo.fusionEarnings || 0 | filtersNum}} <span>CTT</span></p>
            </div>
            <div>
              <label>{{$t('lang.nuclear040')}}</label><!--我的直推收益-->
              <p>{{tradeUserInfo.straightEarnings || 0 | filtersNum}}<span>CTT</span></p>
            </div>
          </div>
        </div>
        <div class="nuclear-input">
          <!--我的聚变数量-->  <!--我的剩余额度-->
          <p><label>{{$t('lang.nuclear041')}}<span>&nbsp;{{accountInfo.participationQty || 0 | filtersNum}}&nbsp;</span>USDT</label>
            <label>{{$t('lang.nuclear042')}}<span>&nbsp;{{accountInfo.remainingQty || 0 | filtersNum}}&nbsp;</span>USDT</label>
          <p>
            <input type="number" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" onpaste="return false;" v-model="inputNum" :placeholder="$t('lang.nuclear021')+' '+'200-50000'">
            <span>USDT</span>
            <button @click="goFusion()" :disabled="!(inputNum && !(fusionInfo.projectStatus===2 || fusionInfo.projectStatus===0))|| isDisabled">{{$t('lang.nuclear043')}}</button><!--聚变-->
          </p>
          <p>
            {{$t('lang.nuclear044')}}<span>{{accountInfo.availableQty || 0| filtersNum}}</span>&nbsp;USDT
            <label @click="dialogTitle=$t('lang.nuclear061')">{{$t('lang.nuclear019')}}</label><!--可用余额：--><!--去划转-->
            <router-link tag="a" to="/nuclear/personal?open=30" class="fr color-388">{{$t('lang.nuclear139')}}</router-link><!--我的聚变挖矿记录-->
          </p>
        </div>
        <div class="nuclear-rank">
          <p class="my-rank">{{$t('lang.nuclear045')}} <label>{{$t('lang.nuclear001')[tradeUserInfo.level-1]}}&nbsp;</label>&nbsp;
            <img v-if="accountInfo.level===2" src="./img/rank2.png" alt="" /> <img v-if="accountInfo.level===3" src="./img/rank3.png" alt="" /> <img v-if="accountInfo.level===4" src="./img/rank4.png" alt="" />
          </p><!--我的等级--><!--金牌合伙人-->
          <div class="my-message">
            <p class="inviolable">{{$t('lang.nuclear046')}}</p><!--我的权益：-->
            <div style="margin-right: 30px" class="list-table">
              <div class="list-head">
                <p>{{$t('lang.nuclear029')}}</p><p>{{$t('lang.nuclear047')}}</p><p>{{$t('lang.nuclear1118')}}</p><!--类型--><!--聚变收益--><!--普世直推奖励-->
              </div>
              <div class="list-head">
                <p>{{$t('lang.nuclear048')}}</p>
                <p><span>{{tradeUserInfo.yesterFusionEarnings | filtersNum}}</span> CTT</p>
                <p><span>{{tradeUserInfo.yesterStraightEarnings | filtersNum}}</span> CTT</p><!--昨日收益-->
              </div>
              <div class="list-head">
                <p>{{$t('lang.nuclear049')}}</p>
                <p><span>{{tradeUserInfo.fusionEarnings | filtersNum}}</span> CTT</p>
                <p><span>{{tradeUserInfo.straightEarnings | filtersNum}}</span> CTT</p><!--累计收益-->
              </div>
              <div class="list-head">
                <p>{{$t('lang.nuclear018')}}</p>
                <p><label @click="getNuclearObject($t('lang.nuclear047'),'totalIncome')">{{$t('lang.nuclear050')}}</label>&nbsp;&nbsp;
                  <router-link tag="label" to="/nuclear/personal?open=41">{{$t('lang.nuclear051')}}</router-link>
                </p><!--操作--><!--查看规则-->
                <p><label @click="getNuclearObject($t('lang.nuclear1118'),'pushTotal')">{{$t('lang.nuclear050')}}</label>&nbsp;&nbsp;
                  <router-link tag="label" to="/nuclear/personal?open=42">{{$t('lang.nuclear051')}}</router-link><!--操作--><!--查看规则-->
                </p><!--查看规则--><!--明细-->
              </div>
            </div>
            <div class="list-table">
              <div class="list-head">
                <p>{{$t('lang.nuclear029')}}</p>
                <p>{{$t('lang.nuclear052')}}</p>
                <p>{{$t('lang.nuclear014')}}</p>
                <p>{{$t('lang.nuclear015')}}</p>
                <!--类型--><!--合伙人全球分红奖--><!--合伙人业绩奖--><!--合伙人鼓励基金-->
              </div>
              <div class="list-head">
                <p>{{$t('lang.nuclear053')}}</p>
                <p><span>{{tradeUserInfo.lastWeekBonus | filtersNum}}</span> CTT</p>
                <p><span>{{tradeUserInfo.lastWeekPerformance |filtersNum}}</span> CTT</p>
                <p><span>{{tradeUserInfo.lastWeekEncourage |filtersNum}}</span> CTT</p><!--上周收益-->
              </div>
              <div class="list-head">
                <p>{{$t('lang.nuclear049')}}</p>
                <p><span>{{tradeUserInfo.totalBonus | filtersNum}}</span> CTT</p>
                <p><span>{{tradeUserInfo.totalPerformance | filtersNum}}</span> CTT</p>
                <p><span>{{tradeUserInfo.totalEncourage | filtersNum}}</span> CTT</p><!--累计收益-->
              </div>
              <div class="list-head">
                <p>{{$t('lang.nuclear018')}}</p><p>
                <label @click="getNuclearObject($t('lang.nuclear052'),'selectGlobalPopup')">{{$t('lang.nuclear050')}}</label>&nbsp;&nbsp;
                <router-link tag="label" to="/nuclear/personal?open=43">{{$t('lang.nuclear051')}}</router-link></p><!--操作--><!--查看规则-->
                <p><label @click="getNuclearObject($t('lang.nuclear014'),'selectAchievementPopup')">{{$t('lang.nuclear050')}}</label>&nbsp;&nbsp;
                  <router-link tag="label" to="/nuclear/personal?open=44">{{$t('lang.nuclear051')}}</router-link>
                </p>
                <p><label @click="getNuclearObject($t('lang.nuclear015'),'selectEncouragePopup')">{{$t('lang.nuclear050')}}</label>&nbsp;&nbsp;
                  <router-link tag="label" to="/nuclear/personal?open=45">{{$t('lang.nuclear051')}}</router-link>
                </p>
              </div>
            </div>
          </div>
          <div class="nuclear-invite">
            <div>
              <label class="invite">
                {{$t('lang.nuclear054')}}<span>&nbsp;{{tradeUserInfo.inviter}}</span><!--邀请我的人-->
              </label>
              <!--我的邀请链接-->
             <!-- <p class="invite-link" style="width:890px;">
                {{$t('lang.nuclear055')}}&nbsp;<span>{{inviteLink}}</span>
                <button v-clipboard:copy="inviteLink" v-clipboard:success="onCopy">{{$t('lang.nuclear056')}}</button>&lt;!&ndash;复制&ndash;&gt;
              </p>-->
            </div>
            <div>
              <!--我的邀请方式：-->
              <label class="invite-type">{{$t('lang.nuclear057')}}</label>
              <div style="display: inline-block">
                <p class="invite-link invite-code">
                  {{$t('lang.nuclear058')}}&nbsp;<span>{{tradeUserInfo.inviteCode}}</span><!--我的邀请码-->
                  <button v-clipboard:copy="tradeUserInfo.inviteCode" v-clipboard:success="onCopy">{{$t('lang.nuclear056')}}</button><!--复制-->
                </p>
                <!--我的专属邀请海报-->
                <p class="invite-link invite-code">
                  {{$t('lang.nuclear059')}}
                  <button @click="dialogTitle=$t('lang.nuclear095')">{{$t('lang.nuclear060')}}</button><!--生成-->
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <x-dialog :title="dialogTitle" @close-dialog ='closeDialog' v-if="dialogTitle===$t('lang.nuclear143')" :maskClosed="false">
      <div slot="suffix">
        <x-input suffixInput="suffix-input" :label="$t('lang.nuclear096')" v-model.trim="inviteCode" :inputErrTip="inputErr.inviteCode" @blur="inputErr.inviteCode=''"></x-input>
        <div class="suffix-p">
          <p>{{$t('lang.nuclear148')}}</p>
          <p>{{$t('lang.nuclear149')}}</p>
          <p>{{$t('lang.nuclear150')}}</p>
        </div>
        <div class="suffix-button">
          <button @click="bindInvitee">{{$t('lang.nuclear097')}}</button>
        </div>
        <div class="notice dialog-notice">
          <span>{{news.name}}</span>
          <a :href="news.htmlUrl">{{$t('lang.nuclear034')}}&gt;&gt;</a><!--查看详情-->
        </div>
      </div>
    </x-dialog>
    <IFile :scrollTop="scrollTop" :inviteCode="tradeUserInfo.inviteCode" :dialogTitle="dialogTitle" @close-dialog ='dialogTitle=null' v-if="dialogTitle===$t('lang.nuclear095')"></IFile>
    <Income :dialogTitle="dialogTitle" :popupURL="popupURL" @close='dialogTitle=null' v-if="dialogTitle===$t('lang.nuclear047') || dialogTitle===$t('lang.nuclear1118') || dialogTitle===$t('lang.nuclear052') || dialogTitle===$t('lang.nuclear014') || dialogTitle===$t('lang.nuclear015')"></Income>
    <nuclearGameAssets @uploadData="uploadData"
                       :dialogTitle="dialogTitle"
                       @close-dialog='dialogTitle=null'
                       :fusionId="fusionInfo.id"
                       :assetsList="accountInfo"
                       v-if="dialogTitle===$t('lang.nuclear061')">
    </nuclearGameAssets>
  </div>
</template>

<script>
  import http from "../../api/nuclear.js";
  import env from '../../utils/env'
  import { MathRandom,getNavigator } from "../../utils/common";
  import {strDec} from "../../utils/aes";
  import XDialog from './dialog/dialog'
  import Income from './dialog/incomeDialog'
  import IFile from './dialog/imgFileDialog'
  import nuclearGameAssets from './dialog/nuclearGameAssets'
  export default {
    components: {
      Income,
      nuclearGameAssets,
      IFile,
      XDialog
    },
    data() {
      return {
        dialogTitle:'',
        inviteCode:'',
        fusionInfo:{},
        popupURL:'',
        popupObject:{},
        accountInfo:{},
        tradeUserInfo:{},
        inputNum:'',
        scrollTop:0,
        isDisabled:false,
        isTop:10,
        news:{}
      }
    },
    watch:{
      listenLang(val){
        this.getFusionAffiche();
      }
    },
    created(){
      //this.getFusionAffiche();
      if(this.userInfo){
      //  this.getIsTop();
       // this.getFusionInfo();
      }
    },
    mounted () {
      this.$store.state.fusionAccount.list = null;
      window.addEventListener('scroll', this.handleScroll, true)
    },
    methods: {
      getFusionAffiche(){
        http.fusionAffiche({}).then(res => {
          if (res.code === 0) {
            this.news = res.data[0];
          }else{
            this.$toast.error(res.msg);
          }
        });
      },
      //uploadData 划转之后刷新数据
      uploadData(val){
        this.getTradeUserInfo(val);
      },
      handleScroll(){
        // 滚动条距离底部的距离scrollBottom
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      },
      //弹窗信息
      getNuclearObject(title,URL){
        if(this.userInfo){
          this.dialogTitle=title;
          this.popupURL = URL;
        }else{
          window.location.href=env.fusionUrl;
        }
      },
      submitFormErr(){
        this.inputErr={};
        let time = new Date().getTime();
        if(!this.inviteCode){
          this.inputErr.inviteCode =  time+this.$t('lang.nuclear096');
        }
        return this.inputErr;
      },
      //绑定邀请关系
      bindInvitee(){
        if (Object.keys(this.submitFormErr()).length===0) {
          http.bindInvitee({code:this.inviteCode}).then(res => {
            if (res.code === 0) {
              this.$toast.success(this.$t('lang.nuclear157'));
              this.getTradeUserInfo('');
            }else{
              this.$toast.error(this.$t('lang.nuclearErr'+ res.code));
            }
          });
        }
      },
      //判断是否是顶层用户
      getIsTop(){
        if(this.isTop===10){
          http.getIsTop({}).then(res => {
            if (res.code === 0) {
              this.isTop = res.data;
              this.getTradeUserInfo('');
            }else{
              this.$toast.error(this.$t("lang.err" + res.code));
            }
          });
        }else{
          this.getTradeUserInfo('');
        }
      },
      //用户信息
      getTradeUserInfo(val){
        http.getSelectUserInfo({}).then(res => {
          if (res.code === 0) {
            this.tradeUserInfo =res.data;
            this.getFusionAccount();
            if(this.isTop===0){
              if(res.data.inviter){
                if(val!=='false'){
                  this.dialogTitle=null; //说明不用关闭弹窗，只做更新数据用
                }
              }else {
                this.dialogTitle = this.$t("lang.nuclear143");
              }
            }else{
              if(val!=='false'){
                this.dialogTitle=null; //说明不用关闭弹窗，只做更新数据用
              }
            }
          }else{
            this.$toast.error(this.$t("lang.err" + res.code));
          }
        });
      },
      //聚变按钮
      goFusion(){
       if(parseFloat(this.inputNum)<parseFloat(this.fusionInfo.participationLower)){
          this.$toast.error(`${this.$t("lang.nuclear145")}${this.filtersNum(this.fusionInfo.participationLower)}USDT`);
          return false
        }
        if(parseFloat(this.inputNum)>parseFloat(this.accountInfo.remainingQty)){
          this.$toast.error(`${this.$t("lang.nuclear146")}${this.filtersNum(this.accountInfo.remainingQty)}USDT`);
          return false
        }
        if(parseFloat(this.inputNum)>parseFloat(this.accountInfo.availableQty)){
          this.$toast.error(this.$t("lang.nuclear147"));
          return false
        }
        let uuid = MathRandom(20);
        let par={
          fusionId:this.fusionInfo.id,
          qty:parseInt(this.inputNum),
          uuid:uuid
        };
        this.isDisabled=true;
        http.getApply(par).then(res => {
          this.isDisabled=false;
          this.inputNum='';
          if (res.code === 0) {
            this.$toast.success(this.$t("lang.nuclear144"));
            this.$store.state.fusionAccount.list=null;
            this.getFusionAccount();
          }else{
            this.$toast.error(this.$t("lang.err" + res.code));
          }
        })
      },
      //聚变账户列表
      getFusionAccount(){
        this.$store.dispatch("getFusionAccount").then((res) => {
          this.accountInfo = this.$store.state.fusionAccount.list[0];
        });
      },
      //项目信息
      getFusionInfo() {
        http.getFusionInfo({}).then(res => {
          if (res.code === 0) {
            this.fusionInfo = res.data;
          }else{
            this.$toast.error(this.$t("lang.err" + res.code));
          }
        });
      },
      closeDialog(){
        history.go(-1);
      },
      onCopy() {
        this.$toast.success(this.$t("lang.su001"));
      },
    },
    destroyed() {
      window.addEventListener('scroll', this.handleScroll, true)
    }
  }
</script>
<style lang="scss">
  .suffix-input{
    color: #fff!important;
  }
  @media screen and (max-width: 780px) {
    .suffix-input{
      width: 100%;border-bottom: 2px solid rgba(151,173,193,.43);
      height: 25px;line-height: 25px;font-size:22px;
      &:focus{
        border-bottom: 1px solid #388CFF;
      }
      &:disabled{
        cursor:not-allowed;
        color: #97ADC1
      }
    }
    .tip{
      bottom:0;height:25px;width:calc(100% - 80px);line-height:25px;position: absolute;
      top:108px;color: #EF5656;border-top: 2px solid #EF5656;left: 40px;
    }
  }
</style>
<style scoped lang="scss">
  .nuclear-page{
    background-color:#151836;padding-bottom: 60px;width: 100%;height: 100%;
    .suffix-p{
      font-size:14px;
      color:rgba(255,255,255,.5);
      line-height:24px;
      margin-top: 22px;
    }
    .suffix-button{
      height:40px;line-height: 40px; margin-top:10px;margin-bottom:22px;
      button{
        background:rgba(56,140,255,1);border-radius:2px;float: right;padding: 0 15px;height: 100%;
      }
    }
    .nuclear-tip{
      height:50px;width:100%;line-height:50px;position: absolute;background:rgba(28,34,65,.9);top: -50px;font-size: 14px;
    }
    .notice{
      background:url("./img/notice.png") no-repeat center left;display: block;
      background-size: 18px 17px; width: 1194px;margin: auto;height:50px;line-height: 50px;
      color: rgba(255,255,255,.9);padding-left: 22px;
      a{
        margin-left: 40px;color: #388CFF;
      }
    }
    .dialog-notice{
      width:400px;height:21px;line-height:21px;
      a{
        margin-left:20px;float: right;
      }
      span{
        overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
        display: inline-block;width: 270px;height:21px;line-height:21px;background-color:#1C2241;
      }
    }
    button{color: #fff;background:rgba(56,140,255,.5);
      &:disabled{
        background:rgba(56,140,255,.2);cursor: not-allowed;
      }
    }
    .nuclear-banner{
      width: 100%;background-color:#151836;
      img{width: 100%;}
    }
    .nuclear-content{
      width: 1194px;margin: auto;position: relative;color: rgba(255,255,255,.7);background-color: #151836;
      .button{
        position: absolute;right: 0;top: 30px;
        button{
          height: 35px;line-height: 35px;font-size: 12px;padding: 0 15px;border-radius:2px;
          &:nth-of-type(1){
            margin-right: 20px;
          }
        }
      }
      .nuclear-trad{
        width: 100%; color: #fff;padding-top: 30px;
        .title{font-size: 20px;}
        .status{
          font-size: 14px;display: inline-block;margin: 10px 0 20px 0;color:rgba(255,255,255,.5);
        }
        .trad-num{
          display: flex;width: 100%;height:120px;
          div{
            width:571px;
            flex-direction: column;
            height:120px;
            box-sizing: border-box;
            padding: 20px 25px;
            background:rgba(28,34,65,1);
            border-radius:10px;
            &:hover{
              box-shadow:0px 0px 9px 0px rgba(48,136,255,1);
            }
            &:nth-of-type(1){
              margin-right: 45px;
            }
            label{
              font-size: 17px;position: relative;padding-left: 13px;display: block;
              &:before{
                content: "";height:17px;position: absolute;top:4px;left: 0;
                width: 4px;display: block;background-color: #388cff;
              }
            }
            p{
              color: #fff;font-size: 32px;display: block;margin-top: 20px;padding-left: 15px;
              span{
                float: right;height: 38px;
                display: inline-block;
                font-size:19px;
                color:rgba(142,145,160,1);
                line-height: 50px;
              }
            }
          }
        }
      }
      .nuclear-input{
        width: calc(100% - 145px);
        margin:20px 70px 20px 75px;
        p{
          font-size: 16px;
          &:nth-of-type(1){
            text-align: right;
            label{
              margin-left:25px;
              span{
                color: #fff;
              }
            }
          }
          &:nth-of-type(2){
            height: 77px;margin: 10px 0;position: relative;
            input{
              width:847px;
              height:77px;line-height: 77px;
              border:2px solid rgba(46,52,89,1);
              padding-left: 17px;
              border-radius:4px 0px 0px 4px;
              border-right: none;padding-right: 100px;
              color: #fff;font-size: 18px;
            }
            span{
              position: absolute;right:230px;color: #fff;display: inline-block;height: 77px;line-height: 77px;
            }
            button{
              width:203px;
              height:77px;
              border-radius:0px 4px 4px 0px;
              position: absolute;right: 0;
            }
          }
          &:nth-of-type(3){
            label{
              margin-left:20px;color: #388CFF;cursor: pointer;
            }
          }
        }
      }
      .nuclear-rank{
        width:100%;
        padding: 20px;
        background:rgba(28,34,65,1);
        border-radius:10px;
        .my-rank{
          font-size: 18px;
          label{
            margin-left:10px;color: #EEC827;
          }
          img{
            vertical-align: middle;width: 18px;
          }
        }
        .inviolable{
          font-size: 18px;margin: 30px 0;
        }
        .my-message{
          .list-table{
            border:1px solid rgba(46,52,89,1);border-radius:4px;display: inline-block;
            width: 500px;
            &:nth-of-type(2){
              width:617px;
            }
            .list-head {
              display: flex;height: 55px;line-height:55px;
              p{
                flex: 1;border:1px solid rgba(46,52,89,1);height: 55px;line-height:55px;
                width:160px;text-align: center;font-size: 16px;margin: 0;padding: 0;overflow: hidden;
                &:nth-of-type(1){
                  width: 135px;
                }
                span{
                  color: #fff;
                }
                label{
                  color: #388CFF;cursor: pointer;
                }
              }
            }
          }
        }
      }
      .nuclear-invite{
        margin-top: 45px;font-size: 18px;
        .invite{
          display: block;margin-bottom: 20px;
          span{
            color: #fff;
          }
        }
        .invite-type{
          font-size: 16px;
        }
        .invite-link{
          height:60px;
          line-height: 60px;
          border:2px solid rgba(46,52,89,1);
          border-radius:4px;
          margin-top: 25px;
          padding-left:20px;
          button{
            float: right;padding: 0 15px;height:32px;margin-top: 14px;margin-right: 20px;line-height: 32px;
          }
          span{
            color: #fff;
          }
        }
        .invite-code{
          width: 428px;display: inline-block;
          &:nth-of-type(2){
            margin-left:30px;
          }
          span{
            color: #fff;
          }
        }
      }
      .nuclear-introduce{
        margin-top: 30px;
        padding-bottom: 40px;
        h2{
          font-size:18px;color:rgba(255,255,255,1);
        }
        .introduce{
          color:rgba(255,255,255,.7);
          h3{
            font-size: 16px;line-height:40px;margin-top: 10px;
          }
          h4{
            font-size: 16px;line-height:35px;margin-top:2px;
          }
          p{
            font-size: 14px;line-height:22px;
          }
          .plate{
            margin-left: 30px;font-weight: bold;color: #bbb;
          }
          .img{
            margin:10px 10px;
          }
        }
      }
    }
  }
</style>
