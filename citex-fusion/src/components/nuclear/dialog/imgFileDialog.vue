<template>
  <x-dialog :title="dialogTitle" @close-dialog="close()" coverCss="cover-css">
    <div slot="suffix" style="display: flex">
      <div class="invitePosterPage" v-for="item in posterList">
        <div class="inviteList">
          <img v-if="item.posterDataUrl" :src="item.posterDataUrl" class="poster-bg" alt=""><!-- 这里是你生成完成的海报，背景图+二维码 -->
        </div>
        <p class="button">
          <a :href="item.posterDataUrl" download="post.png">{{$t('lang.mi006')}}</a>
        </p>
      </div>
    </div>
  </x-dialog>
</template>
<script>
  import { strToHexCharCode } from "../../../utils/common";
  import env from '../../../utils/env'
  import XDialog from './dialog'
  export default {
    props: {
      dialogTitle: {
        type: String,
        default:'提示'
      },
      inviteCode:{
        type: String,
        default:''
      },
      scrollTop:{
        type: Number,
        default:0
      }
    },
    components: {
      XDialog,
    },
    data() {
      return {
        posterList:[
          {index:1,posterDataUrl:''},
          {index:2,posterDataUrl:''},
          {index:3,posterDataUrl:''}
        ]
      }
    },
    created(){
      for(let item of this.posterList){
        this.getCreatPoster(item);
      }
    },
    methods: {
      getCreatPoster(item){
        let inviterLink = env.fusionUrl+'#/register/register';
        item.posterDataUrl = location.origin+"/fusion/banner/poster?inviteLink="+strToHexCharCode(inviterLink)+"&type="+item.index+'&inviteCode='+this.inviteCode;
      },
      close(){
        this.$emit("close-dialog");
      }
    }
  };
</script>
<style lang="scss">
  .cover-css.message-box{
    .message-content {
      width: 900px!important;
      height: 610px;
    }
  }
</style>
<style scoped lang="scss">
  .invitePosterPage{
    flex:1;justify-content: space-between;margin-right: 40px;
    &:nth-of-type(3){
      margin-right:0;
    }
    .inviteList{
      height:390px;width:242px;
      background:rgba(46,52,89,1);
      padding:30px;box-sizing: border-box;
    }
    .poster-bg{
      width:184px;
      height:328px;
    }
    .button{
      width:183px; margin: auto;
      a{
        width: 100%;
        display: inline-block;
        height:40px;
        line-height:40px;
        background:rgba(56,140,255,.5);
        border-radius:2px;
        color: #fff;
        text-align: center;
        margin-top: 40px;
        margin-bottom: 10px;
      }
    }
  }
</style>

