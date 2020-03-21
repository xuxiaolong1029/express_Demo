<template>
  <div class="game-assets-nuclear fixed">
    <div class="dialog-box">
      <!-- 活动账户资产 -->
      <p class="fs-16 ac-txt">{{dialogTitle}}</p>
      <div class="assets-items">
        <div class="tab-items">
          <div class="item">
            <!-- 资产划转 -->
            <div :class="tabIndex==='0'?'active':''" @click="tabIndex='0'">{{$t('lang.bonus051')}}</div>
          </div>
          <div class="item">
            <!-- 划转记录 -->
            <div :class="tabIndex==='1'?'active':''" @click="tabIndex='1'">{{$t('lang.bonus096')}}</div>
          </div>
        </div>
        <div class="content">
          <div class="first-content" v-show="tabIndex==='0'">
            <div class="swich-assets rel">
              <div class="left-box">
                <div class="left-box-div fs-16">
                  <div>
                    <!-- 从 -->
                    <span class="lable mr-26">{{$t('lang.game073')}}</span>
                    <!-- 币币账户> 节点账户-->
                    <span>{{accountType===1?$t('lang.bonus035'):$t('lang.nuclear061')}}</span>
                  </div>
                  <div>
                    <!-- 到 -->
                    <span class="lable mr-26">{{$t('lang.game074')}}</span>
                    <!-- 币币账户 >节点账户-->
                    <span>{{accountType===-1?$t('lang.bonus035'):$t('lang.nuclear061')}}</span>
                  </div>
                </div>
              </div>
              <div class="right-box abs">
                <div>
                  <div class="roate-icon" @click="rotate">
                    <div :class="addAnimation?'rotate':''"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-num">
              <!-- 请输入划转数量 (\.\d{1,3})?$-->
              <input type="number" @keyup="inputData" v-model="modelNumber" :placeholder="$t('lang.game081')" />
              <el-select v-model.trim="currencySymbol" size="small" @change="switchMoney" v-if="accountType===1">
                <el-option v-for="(item,index) in options" :key="item.currencyId" v-if="index===0" :label="item.symbol" :value="item.currencyId">
                </el-option>
              </el-select>
              <el-select v-model.trim="currencySymbol" size="small" @change="switchMoney" v-else>
                <el-option v-for="item in options" :key="item.currencyId" :label="item.symbol" :value="item.currencyId">
                </el-option>
              </el-select>
            </div>
            <div class="mt-40 slider">
              <el-slider v-model="sliderValue" @input="sliderComputed" :disabled="balance>0?false:true" :marks="marks" :format-tooltip="formatTooltip"></el-slider>
            </div>
            <div class="fs-14 mt-40 color1358">
              <!-- 币币账户 ||  节点账户 || 可用余额：-->
              <span>{{accountType===1?$t('lang.bonus093'):$t('lang.nuclear151')}}:</span>
              <span class="color-fff">{{balance | filtersNum}} {{currencySymbol}}</span>
              <label class="fr" v-if="currencySymbol==='CTT'">{{$t('lang.nuclear117')}} <span class="color-fff">{{modelNumber|filterModelNumber}} {{currencySymbol}}</span></label>
            </div>
            <div class="transfer">
              <!-- 划转 -->
              <button @click="transfer" type="button" :disabled="isDisabledTwo">{{$t('lang.pos051')}}</button>
            </div>
            <div class="mt-24 colorFFF5 agree">
              <!-- <span @click.stop="ifAgree=!ifAgree" class="img fl" :class="ifAgree?'agreement':'unagreement'"></span> -->
              <span><i class="el-icon-warning mr-8"></i>{{$t('lang.nuclear065')}}</span>
            </div>
          </div>
          <div class="second-content rel" v-show="tabIndex==='1'">
            <ul>
              <li class="title">
                <!-- 时间 -->
                <div class="fl08">{{$t('lang.game082')}}</div>
                <!-- 币种 -->
                <div class="fl05 center">{{$t('lang.game083')}}</div>
                <!-- 数量 -->
                <div class="fl06 right">{{$t('lang.game084')}}</div>
                <!-- 类型 -->
                <div class="right">{{$t('lang.bonus097')}}</div>
              </li>
            </ul>
            <el-scrollbar style="width: 100%;height:93%;" v-if="transferList.length>0">
              <ul>
                <li v-for="(item,index) in transferList" :key="index" class="lists">
                  <div class="fl08">{{item.createTime | filterTime}}</div>
                  <div class="fl05 center">{{item.symbol}}</div>
                  <div class="fl06 right">{{item.amount | filtersNum}}</div>
                  <div class="right">{{item.optType===-1?$t('lang.nuclear036'):$t('lang.nuclear063')}}</div>
                </li>
              </ul>
            </el-scrollbar>
            <div v-if="transferList.length===0" class="no-data">{{$t('lang.ass090')}}</div>
          </div>
        </div>
        <div class="close-assets el-icon-close" @click="closeAssets"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { subStringNum } from "../../../utils/common";
  import bigDecimal from "js-big-decimal";
  import formatTime from "../../../utils/formatTime";
  import nuclearApi from "../../../api/nuclear";
  export default {
    props: {
      dialogTitle: {
        type: String,
        default:'提示'
      },
      fusionId:{
        type: Number,
        default:null
      },
      assetsList:{
        type:Object,
        default:null
      }
    },
    data() {
      return {
        addAnimation: false,
        tabIndex: "0",
        marks:{0:'0', 25: '25%', 50:'50%', 75:'75%', 100:'100%'},
        // 账户类型 1币币账户到节点账户 -1聚变账户到币币账户
        accountType:this.assetsList.currencyId===3?1:-1,
        options:[],
        balance:this.assetsList.availableQty,
        modelNumber: '',
        currencyId:this.assetsList.currencyId,
        currencySymbol:this.assetsList.currencyId===3?'USDT':'CTT',
        sliderValue:0,
        isDisabledTwo:false,
        ifAgree:false,
        transferList:[],
      };
    },
    watch: {
      tabIndex(val){
        if(val==='1'){
          this.getTransferList();
        }
      },
    },
    mounted() {
      if(!this.$store.state.fusionAccount.list){
        this.getFusionAccount();
      }else{
        let list = this.$store.state.fusionAccount.list;
        this.options = list.filter(item=>item.symbol=item.currencyId===3?'USDT':'CTT');
        this.getBalance();
      }
    },
    methods: {
      inputData(){
        let ifNum = (this.modelNumber.toString()).split('.')[1];
        if(ifNum&&ifNum.length>3){
          this.modelNumber = Number(this.modelNumber.split('.')[0]+'.'+ifNum.substr(0,3));
        }
      },
      //获取划转之后的可用余额
      getBalance(){
        for(let item of this.options){
          if(item.currencyId===this.currencyId){
            this.balance = this.accountType===-1?item.availableQty:item.available
          }
        }
      },
      //聚变账户列表
      getFusionAccount(){
        this.$store.dispatch("getFusionAccount").then((res) => {
          let list = this.$store.state.fusionAccount.list;
          this.options = list.filter(item=>item.symbol=item.currencyId===3?'USDT':'CTT');
          this.getBalance();
        });
      },
      //划转记录
      getTransferList(){
        let par={
          pageNum: 1,
          pageSize: 20
        };
        nuclearApi.getTransferRecord(par).then(res => {
          if (res.code === 0) {
            this.transferList = res.data.list;
          }else{
            this.$toast.error(this.$t("lang.err" + res.code));
          }
        });
      },
      // 切换账户
      rotate() {
        this.addAnimation=true;
        // 账户类型 1币币账户到节点账户 -1节点账户到币币账户
        this.accountType = this.accountType===1?-1:1;
        if(this.accountType===1){
          this.currencyId=3;
          this.currencySymbol = 'USDT';
        }
        this.getBalance();
        setTimeout(() => {
          this.addAnimation=false;
        }, 400);
      },
      // 切换交易币种和交易方向
      switchMoney(val) {
        this.currencySymbol=val===3?'USDT':'CTT';
        this.currencyId = val;
        for(let item of this.options){
          if(item.currencyId===val){
            this.balance = this.accountType===-1?item.availableQty:item.available
          }
        }
        this.modelNumber = null;
        this.sliderValue = 0;
      },
      // 资金划转
      transfer() {
        if (!this.modelNumber) {
          this.$toast.error(this.$t("lang.game081"));//请输入划转数量
          return;
        }
        if (this.modelNumber === 0) {
          this.$toast.error(this.$t("lang.game101"));//转账数量不能为0，请输入转账数量
          return;
        }
        if (isNaN(this.modelNumber)) {
          this.$toast.error(this.$t("lang.game102"));//请输入正确的数量
          return;
        }
        let parmas = {
          optType: this.accountType, //'操作方向：1入账;-1出账'
          amount: parseFloat(this.modelNumber), //划转数量
          fusionId:this.fusionId,
          currencyId:this.currencyId,
        };
        this.isDisabledTwo = true;
        nuclearApi.getTransfer(parmas).then(res => {
          this.isDisabledTwo = false;
          this.modelNumber="";
          this.sliderValue=0;
          if (res && res.code === 0) {
            this.$toast.success(this.$t("lang.game100"));
            this.getFusionAccount();
            this.$emit("uploadData","false");
          }else if(res.code === 10204){
            this.$toast.error(this.$t("lang.err" + res.code) + '0.001');//最少划转额度为
          }else if(res.code === 26000){
            this.$toast.error(this.$t("lang.err" + res.code));//可用余额不足
          }else {
            this.$toast.error(this.$t("lang.err" + res.code));
          }
        });
      },
      // 关闭弹框
      closeAssets() {
        this.tabIndex=0;
        this.modelNumber="";
        this.sliderValue = 0;
        this.$emit("close-dialog");
      },
      sliderComputed(val){
        let num = subStringNum(bigDecimal.multiply(this.balance,val/100),3);
        this.modelNumber=Number(num)===0?'':num;
      },
      formatTooltip(val){
        return val+'%'
      },
    },
    filters: {
      filterTime(time) {
        return formatTime.formatTime2(time, "/");
      },
      filterModelNumber(val){
        return bigDecimal.divide(val, 20, 3); // quotient = 11.25
      }
    }
  };
</script>
<style lang="scss">
  .el-scrollbar__wrap{
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .game-assets-nuclear {
    .el-input__inner {
      background-color: #1C2241 !important;
      border: 0 none;
      text-align: right;
      color: rgba(255, 255, 255, 0.5);
    }
    .slider{
      p{
        color:rgba(255,255,255,0.5);
        span{
          width: 20%;
        }
      }
      .el-slider__runway {
        margin: 0 0 7px!important;
        background-color: #2E3459!important;
      }
      .el-slider__runway.disabled .el-slider__button,.el-slider__button{
        color: #388CFF!important;
        border-color: #388CFF!important;
        background-color: #388CFF!important;
      }
    }
  }
</style>
<style scoped lang="scss">
  @mixin fontColor() {
    // color: rgba(255, 255, 255, 1);
    background: linear-gradient(0deg, rgba(216, 179, 111, 1) 0%, rgba(200, 159, 93, 1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .game-assets-nuclear {
    width: 100%;height: 100%;
    background: rgba(0, 0, 0, 0.6);
    top: 0;left: 0;
    padding-top: 140px;
    z-index: 999;
    .color1358{
      color: rgba(255,255,255,0.5);
    }
    .dialog-box {
      width: 481px;
      margin: 0 auto;
      position: relative;
      background: #1C2241;
      overflow: hidden;
      border-radius: 5px;
      height: 594px;
      .ac-txt {
        height: 60px;
        line-height: 60px;
        padding-left: 40px;
        text-align: left;
        background: #2e3359;
        color: #FFFFFF;
      }
      .assets-items {
        padding: 0 40px 0 40px;
        margin-top:15px;
      }
      .tab-items {
        padding-top: 6px;
        width: 100%;
        height: 45px;
        display: flex;
        .item {
          height: 100%;
          flex: 1;
          cursor: pointer;
          line-height: 28px;
          position: relative;
          font-size: 16px;
          color:#8C9FAD;
          > div {
            padding: 0 4px;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
          }
          > div.active {
            color: #388CFF;
            border-bottom: 2px solid #388CFF;
          }
        }
      }
      .content {
        height: 460px;
        .first-content {
          .bb {
            margin-bottom: 6px;
            flex: 2;
          }
          .swich-assets {
            height: 99px;
            margin: 10px 26px 0;
            background:#151836;
            border-radius: 10px;
            overflow: hidden;
            padding: 4px 0 4px 15px;
            .left-box {
              padding-right: 76px;
              .left-box-div {
                padding-right: 10px;
                > div {
                  padding: 12px 0;
                }
                > div:first-child {
                  border-bottom: 1px solid #2E3459;
                }
                .lable {
                  color:#FFFFFF;
                  font-size: 16px;
                  width: 30px;
                  display: inline-block;
                }
                span{
                  color:rgba(255,255,255,0.5);
                }
              }
            }
            .right-box {
              top: 0;
              right: 0;
              width: 76px;
              height: 100%;
              //   background: #1db286;
              padding: 4px 0;
              > div {
                width: 100%;
                height: 100%;
                border-left: 1px solid #2E3459;
              }
              .roate-icon {
                width: 50px;
                height: 50px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                border-radius: 50%;
                > div {
                  width: 100%;
                  height: 100%;
                  background: url("../img/switch.png") no-repeat center;
                }
              }
              .rotate {
                transition: all 0.3s;
                animation: rrotate 0.3s linear;
              }
              .rotates {
                transition: all 0.3s;
                animation: rrrotate 0.3s linear;
              }
              @keyframes rrotate {
                from {
                  transform: rotate(0);
                }
                to {
                  transform: rotate(360deg);
                }
              }

              @keyframes rrrotate {
                from {
                  transform: rotate(360deg);
                }
                to {
                  transform: rotate(0);
                }
              }
            }
          }
          .input-num {
            width: 100%;
            height: 40px;
            margin-top: 10px;
            border-bottom: solid 1px #2E3459;
            input {
              width: 70%;
              height: 100%;
              line-height: 40px;
              box-shadow:0 0 0 0 #fff;
              color: rgba(255,255,255,0.5);
            }
            .el-select {
              float: right;
              width: 100px;margin-top:6px;
            }
          }
          .transfer {
            margin: 31px auto 0;
            button{
              width: 183px;
              color: #fff;
              margin-left: 109px;
              text-align: center;
              border-radius: 2px;
              background:rgba(56,140,255,0.5);
              font-size: 14px;
              height: 40px;
              line-height: 40px;
              cursor: pointer;
              &:disabled{
                // background-color: rgba(56,140,255,0.5);
                border-color: #a0cfff;
                cursor: no-drop;
              }
            }
          }
          .agree{
            width: 100%;margin-top:15px;color:#596A7A;font-size:12px;
            .el-icon-warning{
              font-size: 18px;
            }
            span{
              float: left;
            }
            .fl{
              width: 15px;
            }
            .fr{
              width: 375px;
              margin-left: 5px;
            }
            .treaty{
              color:#388CFF;cursor: pointer;
            }
            .img{
              width: 15px;
              height: 15px;
              vertical-align: -3px;
              margin-right: 5px;
            }
            .agreement {
              background: url("../../../assets/newpage/checked.png") no-repeat center;
              background-size: contain;
            }
            .unagreement {
              background: url("../../../assets/newpage/uncheck.png") no-repeat center;
              background-size: contain;
            }
          }
          .colorFFF5{
            color:rgba(255,255,255,0.5);
          }
        }
        .second-content {
          // height: 100%;
          height: 443px;
          overflow: hidden;
          .el-scrollbar__wrap {
            overflow-x: hidden;
          }
          ul{
            margin-right: 15px;
          }
          .title {
            color:#FFFFFF;
            font-size: 16px;
            padding: 10px 0;
          }
          .lists {
            color:rgba(255,255,255,0.5);
            font-size: 12px;
            padding:8px 0;
          }
          li {
            display: flex;
            > div {
              flex: 1;
            }
            .fl05 {
              flex: 0.5;
            }
            .fl08 {
              flex: 0.8;
            }
            .fl06 {
              flex: 0.6;
            }
          }
        }
      }
    }
    .close-assets {
      cursor: pointer;
      width: 19px;
      height: 20px;
      position: absolute;
      right: 53px;
      top: 22px;
      font-size: 18px;
      color: #ffffff;
    }
  }
</style>
