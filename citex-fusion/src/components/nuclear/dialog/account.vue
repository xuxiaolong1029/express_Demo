<template>
  <x-dialog :title="dialogTitle" @close-dialog="close()" coverCss="cover-css">
    <div slot="suffix" class="suffix-page">
      <div class="suffix-top">
        <ul class="tabList" :class="lang==='en_US'?'en-row':''">
          <li
            v-for="(item) in tabList"
            @click="changeSubType(item.index)"
            :class="tabType===item.index?'active':''"
            :key="item.index"
          >{{item.name}}</li>
        </ul>
        <div class="tab-account">
          <div></div>
          <p v-if="tabType!==3">{{$t('lang.nuclear189',{type:'USDT'})}}： {{mainAvalilableValue}}</p>
          <span v-if="tabType===3">{{$t('lang.nuclear190')}}:&nbsp;&nbsp;</span>
          <el-select
            v-model="coinType"
            v-if="tabType===3"
            class="coin-select"
            style="width:100px"
            size="mini"
          >
            <el-option
              v-for="(item,index) in coinList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="suffix-data">
        <ul class="table-head">
          <li>{{$t('lang.nuclear176')}}</li>
          <li>{{$t('lang.nuclear169',{type:getSubCoinType})}}</li>
          <li>{{$t('lang.nuclear191')}}</li>
        </ul>
        <ul v-for="(item,index) in subAccountList" :key="index" class="table-body">
          <li>{{item.username}}</li>
          <li>{{filtersAmount(item)}}</li>
          <li>
            <input type="text" v-model="item.amount" @keyup="CheckInput(item)" />
          </li>
        </ul>
        <ul>
          <li class="center noData" v-if="subAccountList.length===0">{{$t('lang.ass090')}}</li>
          <!--暂无数据-->
        </ul>
      </div>
      <!-- 分页 -->
      <div class="nuclearPage account-pagination" v-if="totalSize>15">
        <el-pagination
          background
          :current-page="this.currentPage"
          :page-size="pageSize"
          @current-change="handleChange"
          layout="prev, pager, next"
          :total="totalSize"
          class="listPage"
        ></el-pagination>
      </div>
      <div class="suffix-bottom" >
        <el-button v-if="tabType!==1" @click="enterAllBalance">{{$t('lang.nuclear192')}}</el-button>
        <el-button
          :loading="submitLoading"
          class="bg-color"
          :class="tabType!==1?'':'long-btn'"
          @click="submitRequest"
        >{{getButtonFont}}</el-button>
      </div>
    </div>
  </x-dialog>
</template>
<script>
  import {mapState} from 'vuex';
  import { subStringNum } from "../../../utils/common";

  import http from "../../../api/nuclear";
  import XDialog from "./dialog";
  export default {

    components: {
      XDialog
    },
    data() {
      return {
        tabList: [],
        tabIndex: 0,
        currentPage: 1,
        totalSize: 0,
        mainAvalilableValue: 0,
        subAccountList: [],
        pageSize: 15,
        // 1划入子账户/2参与聚变/3划回我的账户
        tabType: 1,
        coinType: 3,
        coinList: [{ name: "USDT", id: 3 }, { name: "CTT", id: 24 }],
        submitLoading: false,
        participationLower:null,
        participationUpper:null
      };
    },
    created() {
      this.getFusionInfo();
      this.$on("emitSubAccountType", type => {
        this.tabType = type;
        this.getSubAccountList(1, this.pageSize);
        this.tabList = [
          { name: this.$t('lang.nuclear177'), index: 1 },
          { name: this.$t('lang.nuclear178'), index: 2 },
          { name: this.$t('lang.nuclear179'), index: 3 }
        ];


      });
    },
    computed: {
      ...mapState(['lang']),
      getButtonFont() {
        switch (this.tabType) {
          case 2:
            return this.$t('lang.nuclear178');
            break;
          case 3:
            return this.$t('lang.nuclear193');
            break;
          default:
            return this.$t('lang.nuclear177');
        }
      },
      getSubCoinType(){
        return this.coinType === 24 ? 'CTT':'USDT';
      },
      dialogTitle(){
        try{
          return this.tabList.find(i=>i.index == this.tabType).name;
        }catch(e){
          return this.$t('lang.nuclear177');
        }
      }
    },

    methods: {
      getFusionInfo(){
        http.getFusionInfo({}).then(res => {
          if (res.code === 0) {
            this.participationLower = res.data.participationLower;
            this.participationUpper = res.data.participationUpper;
          }
        });
      },
      CheckInput(item) {
        let str = item.amount;
        let reg = RegExp(`^\\d+(\\.\\d{0,3})?$`);
        if (!reg.test(str)) {
          document.execCommand("delete");
        }
        if (str.indexOf(".") > -1) {
          str = str.substring(0, str.indexOf(".") + 3 + 1);
        }
        if (str.length > 0) {
          str = str.replace(/[^\d\.]/g, "");
        }
        // 处理2个以上小数点
        let start = str.indexOf(".");
        let end = str.lastIndexOf(".");
        if (start !== end) {
          str = str.substring(0, end);
          if (str.indexOf(".") !== str.lastIndexOf(".")) {
            str = str.substring(0, start + 1);
          }
        }
        this.$set(item, "amount", str);
      },
      filtersAmount(item) {
        let amount = this.coinType === 24 ? item.cttAmount : item.usdtAmount;
        let value = Number(amount) || 0;
        if (value % 1 !== 0) {
          return subStringNum(value, 3);
        } else {
          return value;
        }
      },
      // 发送操作请求
      submitRequest() {
        if (
          Array.isArray(this.subAccountList) &&
          this.subAccountList.length > 0
        ) {
          let Flag = false;
          this.subAccountList.some(item => {
            if (item.amount && parseFloat(item.amount) > 0) {
              Flag = true;
              return true;
            }
          });

          if (!Flag) {
            this.$toast.error(this.$t("lang.nuclear159"));
            return;
          }
          this.submitLoading = true;
          // classifiedAssets 划入子账户
          // getApply 参与聚变
          // transferMainAccount 划回主账户
          let url =
            this.tabType === 1
              ? "classifiedAssets"
              : this.tabType === 2
              ? "subApply"
              : "transferMainAccount";
          // 参数拼接
          let params = null;
          switch (this.tabType) {
            case 2:
              params = this.filterData("qty") ;
              for(let item of params){
                if(this.participationLower && parseFloat(item.qty) < parseFloat(this.participationLower)){
                  let account = this.subAccountList.find(i=>i.id===item.id).username;
                  this.$toast.error(this.$t("lang.nuclearErr100000",{account,amount:this.participationLower}));
                  this.submitLoading = false;
                  return;
                }

                if(this.participationUpper && parseFloat(item.qty) > parseFloat(this.participationUpper)){
                  let account = this.subAccountList.find(i=>i.id===item.id).username;
                  this.$toast.error(this.$t("lang.nuclearErr100001",{account,amount:this.participationUpper}));
                  this.submitLoading = false;
                  return;
                }
              }
              break;
            case 3:
              params = {
                currencyId: this.coinType,
                transfers: this.filterData("amount")
              };
              break;
            default:
              params = this.filterData("delimitValue");
          }
          http.dynamicAccountReq(url, params).then(res => {
            this.submitLoading = false;
            if (res.code === 0) {
              this.close(true);
              this.$toast.success(this.$t("lang.nuclear144"));

            }else if(res.code === 100000){
              this.$toast.error(this.$t("lang.nuclearErr" + res.code));
            }else{
              this.$toast.error(this.$t("lang.nuclearErr" + res.code));
            }
          });
        }
      },
      filterData(key) {
        let params = [];
        for (let item of this.subAccountList) {
          if (parseFloat(item.amount) > 0) {
            params.push({
              id: item.id,
              [key]: item.amount
            });
          }
        }
        return params;
      },
      // 填入所有余额
      enterAllBalance() {
        if (
          Array.isArray(this.subAccountList) &&
          this.subAccountList.length > 0
        ) {
          // 填入CTT余额
          if (this.coinType === 24 && this.tabType === 3) {
            this.subAccountList.forEach((item, index) => {
              this.subAccountList[index].amount = item.cttAmount;
              this.$set(this.subAccountList, index, this.subAccountList[index]);
            });
            return;
          }
          // 填入USDT
          this.subAccountList.forEach((item, index) => {
            this.subAccountList[index].amount = item.usdtAmount;
            this.$set(this.subAccountList, index, this.subAccountList[index]);
          });
        }
      },
      changeSubType(type) {
        this.tabType = type;
        this.coinType = 3;
        this.clearInputValue();
      },
      clearInputValue() {
        if (
          Array.isArray(this.subAccountList) &&
          this.subAccountList.length > 0
        ) {
          for (let item of this.subAccountList) {
            item.amount = "";
          }
        }
      },
      // 获取子账户列表
      getSubAccountList(pageNum, pageSize) {
        http.childAccountInfo({ pageSize, pageNum }).then(res => {
          if (res.code === 0) {
            this.totalSize = res.data.total || 0;
            let list = res.data.mainAvalilableValue;

            this.mainAvalilableValue = res.data.mainAvalilableValue; //我的账户usdt余额
            if (Array.isArray(this.mainAvalilableValue)) {
              for (let i of this.mainAvalilableValue) {
                i.amount = "";
              }
            }
            try {
              this.subAccountList = res.data.pageBean.list;
            } catch (e) {}
          }
        });
      },
      // update - 父组件是否更新子列表
      close(update=false) {
        this.clearInputValue();
        this.coinType = 3;
        this.$emit("close-dialog",update);
      },
      handleChange(pageNum) {
        this.currentPage = pageNum;
        this.getSubAccountList(pageNum, this.pageSize);
      }
    }
  };
</script>
<style scoped lang="scss">
  .suffix-page {
    .account-pagination {
      margin: 0;
      text-align: center;
      border: 1px solid #2f3456;
      display: flex;
      justify-content: center;
      padding: 20px 0 10px 0;
      border-top: none;
    }

    .suffix-top {
      width: 100%;
      padding: 27px 27px 0 28px;
      box-sizing: border-box;
      height: 114px;
      border: 1px solid rgba(47, 52, 86, 1);
      .tabList {
        display: flex;
        li {
          flex: 1;
          padding:0 10px;
          text-align: center;
          border: 1px solid rgba(47, 52, 86, 1);
          font-size: 12px;
          height: 39px;
          line-height: 39px;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.5);
          border-right: none;
          &:nth-last-of-type(1) {
            border-right: 1px solid rgba(47, 52, 86, 1);
          }
        }
        .active {
          height: 39px;
          border-right: 1px solid rgba(53, 87, 155, 1);
          background: rgba(53, 87, 155, 1);
          color: #fff;
        }

      }
      .en-row.tabList li{
        width: 100%/3;
        flex:none;
      }
      .tab-account {
        color: rgba(255, 255, 255, 0.5);
        margin-top: 10px;
      }
    }
    .suffix-data {
      border: 1px solid rgba(47, 52, 86, 1);
      border-top: none;
      color: rgba(255, 255, 255, 0.5);
      border-bottom: none;
      ul {
        display: flex;
        li {
          flex: 1;
          text-align: center;
          height: 50px;
          line-height: 50px;
          &:nth-of-type(3) {
            flex: 1.5;
          }
          input {
            width: 130px;
            padding: 0 10px;
            height: 30px;
            color: rgba(255, 255, 255, 0.5);
            border: 1px solid rgba(47, 52, 86, 1);
          }
        }
      }
    }
    .suffix-bottom {
      display: flex;
      justify-content: space-around;
      border: 1px solid rgba(47, 52, 86, 1);
      border-top: none;
      display: flex;
      padding: 15px;
      button {
        color: rgba(255, 255, 255, 1);
        min-width: 170px;
        height: 40px;
        background: rgba(224, 224, 224, 0.5);
        border-radius: 2px;
      }
      button.long-btn {
        width: 100%;
      }
      .bg-color {
        background: rgba(78, 140, 247, 0.5);
      }
    }
  }
</style>
