<template>
  <x-dialog :title="dialogTitle" @close-dialog="close">
    <div slot="suffix" class="dialog">
      <h3>{{$t('lang.nuclear066')}}</h3><!--奖励规则-->
      <div class="introduce">
        <p v-for="(item,index) in rule[dialogTitle]" :key="'zx'+index">{{item}}</p>
      </div>
      <div class="table index1" v-if="dialogTitle===$t('lang.nuclear052')|| dialogTitle===$t('lang.nuclear015')|| dialogTitle===$t('lang.nuclear014')">
        <p class="p2">
          <label v-for="(item,index) in dataObject[dialogTitle]" :key="'rer'+index">
            {{item.name}}<br><span>{{popupObject[item.value] | filtersNum}} CTT</span>
          </label>
        </p>
      </div>
      <div class="table index2" style="padding-top: 1px;" v-else>
        <p>
          <label>{{dataObject[dialogTitle][0].name}}<br>
            <span v-if="!dataObject[dialogTitle][0].type">{{popupObject[dataObject[dialogTitle][0].value] | filtersNum}}</span>
            <span v-else>{{popupObject[dataObject[dialogTitle][0].value] | filtersNum}}</span>
            <span v-if="!dataObject[dialogTitle][0].type"> CTT</span><span v-else> {{dataObject[dialogTitle][0].type}}</span>
          </label>
        </p><!--累计收益-->
        <p class="p2">
          <label>{{dataObject[dialogTitle][1].name}}<br><span>{{popupObject[dataObject[dialogTitle][1].value] | filtersNum}} CTT</span></label>
          <label>{{dataObject[dialogTitle][2].name}}<br><span>{{popupObject[dataObject[dialogTitle][2].value] | filtersNum}} CTT</span></label>
        </p>
      </div>
      <div class="button">
        <button @click="goToOpen">{{$t('lang.nuclear074')}}</button><!--查看明细-->
        <button @click="close">{{$t('lang.nuclear073')}}</button><!--关闭-->
      </div>
    </div>
  </x-dialog>
</template>

<script>
  import http from "../../../api/nuclear.js";
  import XDialog from './dialog'
  export default {
    props: {
      dialogTitle: {
        type: String,
        default:'提示'
      },
      popupURL:{
        type: String,
        default:''
      }
    },
    components: {
      XDialog,
    },
    data() {
      return {
        popupObject:{},
        rule:{
          [this.$t('lang.nuclear047')]:[this.$t('lang.nuclear067'),this.$t('lang.nuclear069')],//聚变收益
          [this.$t('lang.nuclear1118')]:[this.$t('lang.nuclear098')],//20%直推邀请奖励
          [this.$t('lang.nuclear052')]:[this.$t('lang.nuclear101'),this.$t('lang.nuclear102'),this.$t('lang.nuclear103')],//合伙人全球分红
          [this.$t('lang.nuclear014')]:[this.$t('lang.nuclear104'),this.$t('lang.nuclear105'),this.$t('lang.nuclear106')],//合伙人业绩奖
          [this.$t('lang.nuclear015')]:[this.$t('lang.nuclear132'),'',this.$t('lang.nuclear133')],//合伙人鼓励基金
        },
        dataObject:{
          [this.$t('lang.nuclear047')]:[
            {name:this.$t('lang.nuclear072'),value:'amount',type:'USDT'},
            {name:this.$t('lang.nuclear048'),value:'yesterdayTotalAmount'},
            {name:this.$t('lang.nuclear049'),value:'totalAmount'}
          ],
          [this.$t('lang.nuclear1118')]:[
            {name:this.$t('lang.nuclear079'),value:'friendCount',type:this.$t('lang.nuclear125')},
            {name:this.$t('lang.nuclear048'),value:'yesterdayTotal'},
            {name:this.$t('lang.nuclear049'),value:'totalAmount'}
          ],
          [this.$t('lang.nuclear052')]:[
            {name:this.$t('lang.nuclear053'),value:'totalMoney'},
            {name:this.$t('lang.nuclear049'),value:'totalEarnings'}
          ],
          [this.$t('lang.nuclear014')]:[
            {name:this.$t('lang.nuclear053'),value:'totalMoney'},
            {name:this.$t('lang.nuclear049'),value:'totalEarnings'}
          ],
          [this.$t('lang.nuclear015')]:[
            {name:this.$t('lang.nuclear053'),value:'totalMoney'},
            {name:this.$t('lang.nuclear049'),value:'totalEarnings'}
          ]
        }
      };
    },
    mounted () {
      http.getNuclearObject({},this.popupURL).then(res => {
        if (res.code === 0) {
          this.popupObject = res.data;
        }else{
          this.$toast.error(this.$t("lang.err" + res.code));
        }
      });
    },
    methods:{
      close(){
        this.$emit("close");
      },
      goToOpen(){
        let openId={[this.$t('lang.nuclear047')]:41,[this.$t('lang.nuclear012')]:42,[this.$t('lang.nuclear052')]:43, [this.$t('lang.nuclear014')]:44,[this.$t('lang.nuclear015')]:45,};
        this.$router.push({ path:'/nuclear/personal?open='+openId[this.dialogTitle]});
      }
    }
  }
</script>

<style scoped lang="scss">
  button{
    color: #fff;
    background:rgba(56,140,255,.5);
  }
  .dialog{
    color: rgba(255,255,255,.5);
    h3{
      font-size: 16px;margin-bottom:8px;
    }
    .introduce{
      font-size: 12px;color:rgba(255,255,255,.5);
      p{
        line-height: 20px;min-height: 20px;
      }
      div{
        margin-top: 20px;
      }
    }
    .table{
      border:2px solid rgba(46,52,89,1);margin-top: 50px;
      border-radius:4px;text-align: center;font-size:13px;
      p{
        width:396px;margin: 0;height: 65px;border-top:2px solid rgba(46,52,89,1);
        &:nth-of-type(1){
          border-top:none;
        }
        label{padding-top: 13px;height:50px;display: inline-block;line-height:22px;}
        span{
          color: #fff;font-size: 15px;
        }
      }
      .p2{
        display: flex;
        label{
          flex: 1;border-left:2px solid rgba(46,52,89,1);
          &:nth-of-type(1){
            border-left:none;
          }
        }
      }
    }
    .button{
      margin-top: 60px;margin-bottom: 14px;
      button{
        width: 183px;height: 40px;line-height: 40px;
        &:nth-of-type(2){
          background-color: #828EA1;margin-left: 20px;
        }
      }
    }
  }
</style>
