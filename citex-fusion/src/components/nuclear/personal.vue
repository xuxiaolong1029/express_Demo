<template>
  <div class="nuclear-introduce" :style="{height:(Height-110)+'px'}">
    <div class="nuclear-content">
      <div class="nuclear-left">
        <router-link tag="p" class="goBack" to="/">
          <i class="el-icon-arrow-left"></i>{{$t('lang.nuclear155')}}
        </router-link>
        <div class="top">
          <label>{{$t('lang.nuclear001')[tradeUserInfo.level-1]}}</label> <!--金牌合伙人 -->
          <label>{{username}}</label>
          <p>{{$t('lang.nuclear137')}} :<br><span>{{tradeUserInfo.totalIncome||0}} USDT</span></p>
        </div>
        <el-menu :default-active="active||'11'" class="el-menu-vertical-demo" :default-openeds="['1','2','3','4']">
          <el-submenu index="1">
            <template slot="title">
              <span>{{$t('lang.nuclear002')}}</span><!--我的聚变账户 -->
            </template>
            <el-menu-item-group>
              <el-menu-item index="10" @click="active='10'"><img src="./img/nuicon1.png">{{$t('lang.nuclear003')}}</el-menu-item><!--我的账户资产 -->
              <!-- <el-menu-item index="11" @click="active='11'"><img src="./img/nuicon1.png">{{$t('lang.nuclear171')}}</el-menu-item>
               <el-menu-item index="12" @click="active='12'"><img src="./img/nuicon1.png">{{$t('lang.nuclear172')}}</el-menu-item>-->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>{{$t('lang.nuclear004')}}</span><!--我的好友 -->
            </template>
            <el-menu-item-group>
              <el-menu-item index="20" @click="active='20'"><img src="./img/nuicon2.png">{{$t('lang.nuclear005')}}</el-menu-item><!--直推好友 -->
              <el-menu-item index="21" @click="active='21'"><img src="./img/nuicon2.png">{{$t('lang.nuclear006')}}</el-menu-item><!--其他好友 -->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span>{{$t('lang.nuclear007')}}</span><!--操作记录 -->
            </template>
            <el-menu-item-group>
              <el-menu-item index="30" @click="active='30'"><img src="./img/nuicon3.png">{{$t('lang.nuclear008')}}</el-menu-item><!--聚变记录 -->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <span>{{$t('lang.nuclear009')}}</span><!--详情记录 -->
            </template>
            <el-menu-item-group>
              <el-menu-item index="40" @click="active='40'"><img src="./img/nuicon4.png">{{$t('lang.nuclear010')}}</el-menu-item><!--所有收益 -->
              <el-menu-item index="41" @click="active='41'"><img src="./img/nuicon5.png">{{$t('lang.nuclear011')}}</el-menu-item><!--每日聚变收益 -->
              <el-menu-item index="42" @click="active='42'"><img src="./img/nuicon6.png">{{$t('lang.nuclear134')}}</el-menu-item><!--直推邀请奖励 -->
              <el-menu-item index="43" @click="active='43'"><img src="./img/nuicon7.png">{{$t('lang.nuclear013')}}</el-menu-item><!--合伙人全球分红 -->
              <el-menu-item index="44" @click="active='44'"><img src="./img/nuicon8.png">{{$t('lang.nuclear014')}}</el-menu-item><!--合伙人业绩奖 -->
              <el-menu-item index="45" @click="active='45'"><img src="./img/nuicon9.png">{{$t('lang.nuclear015')}}</el-menu-item><!--合伙人鼓励基金 -->
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="nuclear-right">
        <ul>
          <li class="list-title">
            <div v-for="(item,index) in listHead[active]" :key="index">
              <span>{{item}}</span>
            </div>
          </li>
          <li class="list-list" v-if="currentUrl!=='account/subAccountQuery'&& currentUrl!=='account/mainAccountQuery'" v-for="(item,ind) in dataList" :key='"d"+ind'>
            <div v-for="(key,ind) in dataBody[active]" :key='"sss"+ind'>
              <p v-if='key'>
                <span></span>
                <span>{{item[key] | filtersData(key,active)}}</span>
              </p>
              <p class="color-388" @click="submitAssets(item)" v-else>{{$t('lang.nuclear019')}}</p><!--去划转-->
            </div>
          </li>
          <!-- 我的主账户List -->
          <!-- <li class="list-list" v-else-if="currentUrl==='account/mainAccountQuery'" v-for="(message,index) in dataList" :key='"m"+index'>
             <div class="list-div">
               <p>{{message.username }}</p>
               <p>{{message.status | filterAccountStatus}}</p>
               <p class="color-388 operation">
                 <span v-if="message.status===0" @click="setAuth('nuclear161',message,1)">{{$t('lang.nuclear173')}}</span>
                 <span v-if="message.status===0" @click="setAuth('nuclear164',message,2)">{{$t('lang.nuclear174')}}</span>
                 <span v-if="message.status===1" @click="setAuth('nuclear165',message,3)">{{$t('lang.nuclear175')}}</span>
                 <span v-if="message.status===2||message.status===3">/</span>
               </p>
             </div>
           </li>-->
          <!-- 我的子账户List -->
          <!--  <li class="list-list" :class="lang==='en_US'?'en-row':''" v-if="currentUrl==='account/subAccountQuery'" v-for="(item,ind) in dataList" :key='"a"+ind'>
              <div class="list-div">
                <p v-if="ind===0">{{$t('lang.nuclear166')}}</p>
                <p v-if="ind>0">{{$t('lang.nuclear176')}}</p>
                <p>{{item.username}}</p> <p>{{item.usdtAmount | filtersNum}}</p>
                <p>{{item.cttAmount | filtersNum}}</p>
                <p class="color-388 operation"  v-if="ind===0">
                  <span @click="dialogTitle = $t('lang.nuclear158');">{{$t('lang.nuclear158')}}</span>
                  <span @click="openSubDialog(1)">{{$t('lang.nuclear177')}}</span>
                  <span @click="openSubDialog(2)">{{$t('lang.nuclear178')}}</span>
                  <span @click="openSubDialog(3)">{{$t('lang.nuclear179')}}</span>
                </p>
                <p class="color-388 operation" v-else></p>
              </div>
            </li>-->
          <li class="center mt-68 noData" v-if="dataList.length===0">{{$t('lang.ass090')}}</li><!--暂无数据-->
        </ul>
        <!-- 分页 -->
        <div class="nuclearPage" v-if="totalSize > 15">
          <el-pagination background :current-page="this.currentPage" :page-size="PAGESIZE" @current-change="handleChange" layout="prev, pager, next" :total="totalSize" class="listPage">
          </el-pagination>
        </div>
      </div>
    </div>
    <nuclearGameAssets :dialogTitle="dialogTitle"  :fusionId="assetsList.fusionId" :assetsList="assetsList" @close-dialog='dialogTitle=null' v-if="dialogTitle===$t('lang.nuclear061')"></nuclearGameAssets>
    <!-- <v-account ref="SubAccountDialog" v-show="subDialogType" @subType="getSubType"  :dialogTitle="dialogTitle" :tabType="subDialogType" @close-dialog='closeAccountModal' ></v-account>-->
    <!-- 添加子账户Dialog -->
    <!-- <x-dialog :title="dialogTitle" @close-dialog ="closeDialog" v-if="dialogTitle===$t('lang.nuclear158')">
       <div slot="suffix">
         <x-input suffixInput="suffix-input" class="modal-input" :label="$t('lang.nuclear159')" v-model.trim="addSubAccountValue" :inputErrTip="inputErr.addSubAccountValue" @blur="inputErr.addSubAccountValue=''"></x-input>
         <el-button :loading="loading.addSubAccount" type="primary" class="long-primary-btn" @click="addSubAccount">{{$t('lang.nuclear188')}}</el-button>
       </div>
     </x-dialog>-->
    <!-- 授权操作Dialog -->
    <!-- <x-dialog :title="dialogTitle" @close-dialog ="closeDialog" v-if="activeAuthMessage.username">
       <div slot="suffix">
         <p class="top-tip">
           {{$t('lang.nuclear180',{account:activeAuthMessage.username})}}
         </p>
         &lt;!&ndash; <p class="top-tip">是否授权？</p> &ndash;&gt;
         <x-input suffixInput="suffix-input" maxLength="6" class="modal-input" :label="$t('lang.pec096')" v-model.trim="googleCode" :inputErrTip="inputErr.googleCode" @blur="inputErr.googleCode=''"></x-input>
         <el-checkbox v-if="AuthType===1" v-model="agreeStatus" class="checkbox-row">{{$t('lang.nuclear181')}}</el-checkbox>
         <p class="tips" v-if="AuthType===1">{{$t('lang.nuclear182')}}</p>
         <el-button type="primary" class="long-primary-btn" @click="Authorization" :loading="loading.googleCode">{{AuthType===1?$t('lang.nuclear183'):dialogTitle}}</el-button>
       </div>
     </x-dialog>-->
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import http from "../../api/nuclear.js";
  import nuclearGameAssets from './dialog/nuclearGameAssets'
  import VAccount from './dialog/account'
  import XDialog from './dialog/dialog'
  import formatTime from "../../utils/formatTime.js";
  import { subStringNum } from "../../utils/common";
  import Vue from "vue";
  import i18n from "../../lang/lang.config";
  Vue.filter("filtersData", (value,key,active) => {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    if(key==='type'){
      if(value===0){
        return i18n.t('lang.nuclear011');
      }else if(value===1){
        return i18n.t('lang.nuclear1118');
      }else if(value===2){
        return i18n.t('lang.nuclear052');
      }else if(value===3){
        return i18n.t('lang.nuclear014');
      }else{
        return i18n.t('lang.nuclear015');
      }
    }
    if(key==='currencyId'){
      return value===3?'USDT':'CTT';
    }
    //等级
    if(key==='level'){
      switch(value){
        case '1':
          return i18n.t('lang.nuclear127');
          break;
        case '2':
          return i18n.t('lang.nuclear128');
          break;
        case '3':
          return i18n.t('lang.nuclear129');
          break;
        case '4':
          return i18n.t('lang.nuclear130');
          break;
        default:
      }
    }
    //时间
    if(key==='endTime' || key==='benefitTime' || key==='createTime'|| key==='startTime'){
      if(value){
        if(key==='createTime'){
          return formatTime.formatTime(value, "-");
        }else{
          return formatTime.formatTime(value, "-").substring(0,10);
        }
      }else{
        return '--'
      }
    }
    //截取三位数
    if(key==='availableQty' || key==='fusionQty' || key==='totalQty' || key==='qty'|| key==='totalQtySum'){
      let val = Number(value) || 0;
      if(active==='20'||active==='21'){
        if(val%1!==0){
          return subStringNum(val, 3)+' USDT';
        }else{
          return val+' USDT'
        }
      }else{
        if(val%1!==0){
          return subStringNum(val, 3);
        }else{
          return val
        }
      }
    }
    return value;
  });
  export default {
    components: {
      nuclearGameAssets,
      VAccount,
      XDialog
    },
    data() {
      return {
        currentPage:1,
        dialogTitle:'',
        tradeUserInfo:{},
        active:this.$route.query.open || '10',
        listHead:{},
        dataList:[],
        googleCode:'',
        dataBody:{
          '10':['currencyId','availableQty',''],
          '11':['username','status',''],
          '12':['username','usdtAmount','cttAmount',''],
          '20':['userName','fusionQty','totalQty','level'],//'totalQty',
          '21':['userName','fusionQty','totalQty','level'],//'totalQty',
          '30':['currencyName','qty','createTime'],
          '40':['type','currencyName','totalQtySum'],
          '41':['startTime','currencyName','totalQty'],
          '42':['startTime','currencyName','totalQty'],
          '43':['endTime','currencyName','totalQty'],
          '44':['endTime','currencyName','totalQty'],
          '45':['endTime','currencyName','totalQty'],
        },
        assetsList:{},
        currentUrl:'',
        username:'',
        addSubAccountValue:'', //添加子账户input
        // 防止重复提交loading
        loading:{
          addSubAccount:false,
          googleCode:false,
        },
        agreeStatus:'',//授权提示勾选
        googleCode:'', //谷歌验证码
        activeAuthMessage:'',//当前授权操作信息
        AuthType:'', //2取消授权 | 1授权
        subDialogTitle:'',// 子账户dialog
        subDialogType:'',
      };
    },
    watch:{
      listenLang(val){
        this.getHead()
      },
      active(val){
        this.dataList=[];
        this.$router.push({path: "/nuclear/personal?open="+val});
        this.totalSize=0;
        this.getApiUrl(val);
      },
    },

    mounted () {
      this.username = this.userInfo?this.userInfo.username:'--';
      this.getHead();
      if(this.userInfo){
        this.getApiUrl(this.active);
        this.getTradeUserInfo()
      }
    },
    computed:{
      ...mapState(['lang'])
    },
    methods:{
      // 关闭用户弹窗
      closeAccountModal(update){
        this.subDialogType=null;
        if(update){
          this.getList(1,this.PAGESIZE,this.currentUrl);
        }
      },
      getSubType(type){
        this.dialogTitle = type;
      },
      // 1划入子账户/2参与聚变/3划回我的账户
      openSubDialog(type){
        this.$refs.SubAccountDialog.$emit("emitSubAccountType",type);
        this.subDialogType = type;
      },
      setAuth(title,message,type){
        this.dialogTitle = this.$t('lang.'+title);
        this.activeAuthMessage=message;
        this.AuthType = type;
      },
      // 主账户授权操作请求
      Authorization(){
        if (Object.keys(this.submitFormErr('googleCode', 'err10014')).length!==0) return;
        if(this.AuthType === 1){
          if(!this.agreeStatus){
            this.$toast.error(this.$t('lang.er004'));
            return;
          }
        }
        this.loading.googleCode = true;
        let params = {
          id:this.activeAuthMessage.id,
          googleCode:this.googleCode,
          type:this.AuthType
        };
        http.mainAccountOperation(params).then(res=>{
          this.loading.googleCode = false;
          if(res.code === 0){
            let tip = this.AuthType===1?this.$t('lang.nuclear162'):this.dialogTitle+this.$t('lang.su004');
            this.$toast.success(tip);
            this.googleCode = '';
            this.agreeStatus = false;
            this.activeAuthMessage = '';
            this.dialogTitle = '';
            this.currentPage = 1;
            this.getList(1,this.PAGESIZE,this.currentUrl);
            return;
          }
          this.$toast.error(this.$t('lang.nuclearErr'+ res.code));
        })
      },
      // 添加子账户
      addSubAccount(){
        if (Object.keys(this.submitFormErr('addSubAccountValue','nuclear159')).length===0) {
          this.loading.addSubAccount = true;
          http.insertChildren({username:this.addSubAccountValue}).then(res=>{
            this.loading.addSubAccount = false;
            if(res.code === 0){
              this.dialogTitle = '';
              this.addSubAccountValue = '';
              this.$toast.success(this.$t('lang.nuclear160'));
              return;
            }
            this.$toast.error(this.$t('lang.err'+ res.code));
          })
        }
      },
      submitFormErr(key,tipType){
        this.inputErr={};
        if(!this[key]){
          this.inputErr[key] =  Date.now()+this.$t(`lang.${tipType}`);
        }
        return this.inputErr;
      },
      getApiUrl(val){
        let URL = {
          '10':'trade/fusionAccount',//我的账户资产
          '11':'account/subAccountQuery',//我的子账户
          '12':'account/mainAccountQuery',//我的主账户
          '20':'trade/selectDirectFriends',//直推好友1
          '21':'trade/selectOtherFriends',//其他好友1
          '30':'trade/joinRecord',//聚变记录
          '40':'trade/total',//所有收益
          '41':'trade/everyIncome',//聚变挖矿收益1
          '42':'trade/selectPush',//普世直推奖励1
          '43':'trade/selectGlobal',//合伙人全球分红1
          '44':'trade/selectPerformance',//合伙人业绩奖1
          '45':'trade/selectEncourage',//合伙人鼓励基金1
        };
        this.currentUrl= URL[val];
        this.getList(this.PAGENUM,this.PAGESIZE,this.currentUrl);
      },
      //获取表格头部
      getHead(){
        this.listHead={
          '10':[this.$t('lang.nuclear016'),this.$t('lang.nuclear017'),this.$t('lang.nuclear018')],//币种      可用资产   操作
          '11':[this.$t('lang.nuclear167'),this.$t('lang.nuclear168'),this.$t('lang.nuclear169',{type:'USDT'}),this.$t('lang.nuclear169',{type:'CTT'}),this.$t('lang.ass008')],
          '12':[this.$t('lang.nuclear170'),this.$t('lang.ass036'),this.$t('lang.ass040')],
          '20':[this.$t('lang.nuclear020'),this.$t('lang.nuclear021'),this.$t('lang.nuclear137'),this.$t('lang.nuclear022')],//好友账号  聚变数量  等级
          '21':[this.$t('lang.nuclear020'),this.$t('lang.nuclear021'),this.$t('lang.nuclear137'),this.$t('lang.nuclear022')],//好友账号  聚变数量  等级
          '30':[this.$t('lang.nuclear016'),this.$t('lang.nuclear021'),this.$t('lang.nuclear023')],//币种      聚变数量   日期
          '40':[this.$t('lang.nuclear029'),this.$t('lang.nuclear016'),this.$t('lang.nuclear124')],//类型      币种      累计数量
          '41':[this.$t('lang.tm022'),this.$t('lang.nuclear016'),this.$t('lang.nuclear118')],//日期      币种      聚变收益数量
          '42':[this.$t('lang.tm022'),this.$t('lang.nuclear016'),this.$t('lang.nuclear119')],//日期      币种      直推收益数量
          '43':[this.$t('lang.nuclear120'),this.$t('lang.nuclear016'),this.$t('lang.nuclear121')],//时间      币种      全球分红数量
          '44':[this.$t('lang.nuclear120'),this.$t('lang.nuclear016'),this.$t('lang.nuclear122')],//时间      币种      业绩奖励数量
          '45':[this.$t('lang.tm022'),this.$t('lang.nuclear016'),this.$t('lang.nuclear123')] //日期      币种      鼓励基金数量
        }
      },
      //聚变账户列表
      //用户信息
      getTradeUserInfo(){
        http.getSelectUserInfo({}).then(res => {
          if (res.code === 0) {
            this.tradeUserInfo =res.data;
          }else{
            this.$toast.error(this.$t("lang.err" + res.code));
          }
        });
      },
      getList(pageNum,pageSize,URL){
        if(this.username==='--'){
          return false
        }
        let par={
          pageNum:pageNum,
          pageSize:pageSize
        };
        if(URL){
          http.getNuclearList(par,URL).then(res => {
            if (res.code === 0) {
              if(URL==='account/subAccountQuery'){
                this.dataList=[
                  ...[res.data.fusionSubAccount],
                  ...res.data.fusionSubAccountList
                ];
              }else{
                this.dataList = res.data.list;
                this.totalSize = res.data.total || 0;
              }
            }else{
              this.$toast.error(this.$t("lang.err" + res.code));
            }
          });
        }
      },
      handleChange(v) {
        this.currentPage = v;
        this.getList(v,this.PAGESIZE,this.currentUrl);
      },
      closeDialog(){
        this.inputErr={};
        this.dialogTitle = '';
        this.googleCode = '';
        if(this.activeAuthMessage)this.activeAuthMessage='';
      },
      submitAssets(v){
        this.assetsList=v;
        http.getFusionInfo({}).then(res => {
          if (res.code === 0) {
            this.assetsList.fusionId=res.data.id;
            this.dialogTitle = this.$t('lang.nuclear061');
          }else{
            this.$toast.error(this.$t("lang.err" + res.code));
          }
        });
      }
    },
    filters:{
      filterAccountStatus(status){
        // 0待授权  1已授权  2已取消授权 3已解绑
        switch(status){
          case 1:
            return i18n.t('lang.nuclear184');
            break;
          case 2:
            return i18n.t('lang.nuclear185');
            break;
          case 3:
            return i18n.t('lang.nuclear186');
            break;
          default:
            return i18n.t('lang.nuclear187');
        }
      },
      filterNull(val){
        if(!val){
          return '/';
        }
        return val;
      }
    }
  }
</script>
<style lang="scss">
  .el-menu-vertical-demo{
    background-color: #1C2241!important;
    border-right: none!important;
    .el-submenu{
      padding-top: 15px; background-color: #1C2241!important;
    }
    .el-submenu__title{
      color: #FEFEFE;
      font-size: 14px!important;
      margin-left: 20px;
    }
    .el-submenu__title i{
      color: #FEFEFE!important;
    }
    .el-submenu__title:hover{background-color:#1C2241;}
    .el-submenu .el-menu-item{
      color:rgba(255,255,255,0.5) !important;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      img{
        vertical-align: sub;
        margin-right: 15px;
      }
    }
    .el-menu-item.is-active {
      color: #409EFF!important;
    }
    .el-submenu .el-menu-item:hover,.el-submenu .el-menu-item:focus{
      background-color:#1C2241!important;
    }
    .el-menu-item-group{
      background-color: #1C2241!important;
      div{
        display: none;
      }
    }
  }
  .nuclearPage{
    overflow: hidden;
    margin-right: 110px;
    margin-bottom:20px;
    margin-top: 20px;
    .el-pagination{
      float: right;
    }
  }
</style>
<style scoped lang="scss">
  .nuclear-introduce {
    background-color: #151836;width: 100%;padding: 17px 0 23px 0;box-sizing: border-box;
    .long-primary-btn{
      padding:10px 20px;
      display: block;
      width: 100%;
      margin-top:50px;
    }
    .checkbox-row{
      color: #eee;
      margin:30px 0 10px 0;
    }
    .tips{
      color: #999;
    }
    .top-tip{
      text-align: center;
      color: #eee;
    }
    .nuclear-content{
      width:1188px;margin: auto;
      background:rgba(28,34,65,1);min-height: 798px;
      border-radius:0 30px 30px 0;
      display: flex;
      .nuclear-left{
        width: 270px;border-right: 1px solid #151836;
        .goBack{
          height: 53px;line-height: 53px;border-bottom: 1px solid #151836;
          font-size:14px;color:rgba(254,254,254,1);padding-left: 40px;cursor: pointer;
          text-shadow:0px 1px 2px rgba(0, 0, 0, 0.6), 0px 1px 1px rgba(0, 0, 0, 0.25);
        }
        .top{
          background: url("./img/vator.png") no-repeat top 15px left 40px;
          background-size:50px 50px;height:130px;
          border-bottom: solid 1px #151836;
          label{
            display: block;padding-left:100px;
            &:nth-of-type(1){
              padding-top: 20px;color: #fff;font-size: 14px;font-weight: bold;
            }
            &:nth-of-type(2){
              padding-top:5px;color: rgba(255,255,255,.8);font-size: 12px;
            }
          }
          p{
            color: rgba(255,255,255,.8);font-size: 12px; padding-left: 40px;margin-top:20px;line-height:20px;
            span{
              font-size: 14px;
            }
          }
        }
      }
      .nuclear-right{
        width: calc(100% - 273px);
        .list-title{
          display: flex;
          border-bottom: solid 1px #151836;
          margin-bottom: 12px;
          div{
            flex: 1;
            color:#FFFFFF;
            line-height:83px;
            font-size: 14px;
            padding: 0 10px;
            white-space:nowrap;
            text-align: center;
          }
          div:last-child{
            text-align: right;
            margin-right: 110px;
          }
        }
        ul{
          min-height: 745px;
        }
        .list-list{
          display: flex;
          div{
            flex: 1;
            color:rgba(255,255,255,0.5);
            font-size: 14px;
            padding: 12px 10px;
            text-align: center;
            &:last-child{
              text-align: right;
              margin-right: 110px;
            }
          }
          .color-388{
            cursor: pointer;
          }
          .operation{
            span:nth-of-type(2n+1){
              margin-right: 10px;
            }
          }
        }
        .en-row.list-list{
          display: flex;
          flex-direction: column;
          div:last-child{
            margin-right: 0;
          }
          .operation{
            display:flex;
            align-items: center;
            flex-direction:column;
            span{
              margin-bottom: 5px;
              word-break: break-all;
            }
          }
        }
        .list-div{
          display: flex;
          p{
            flex: 1;text-align: center;
            &:last-child{
              text-align: right;
            }
          }
        }
        .noData{
          color:rgba(255,255,255,0.5);
        }
      }
    }
  }
</style>
