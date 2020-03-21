<template>
  <div class="message-box" :class="coverCss">
    <div class="mask" @click="closeMack"></div>
    <div class="message-content">
      <i v-if="maskClosed" class="icon el-icon-close" @click="close"></i>
      <!--<span v-if="!maskClosed" class="pading">（{{$t('lang.pos039')}}）</span>-->
      <h3 class="title">{{titleName}}</h3>
      <div class="dialog-content">
        <slot name="suffix"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default:''
      },
      coverCss:{
        type: String,
        default:''
      },
      maskClosed:{
        type: Boolean,
        default:true
      }
    },
    data(){
      return{
        titleName:this.title||this.$t('lang.ass018')
      }
    },

    watch:{
      title(val){
        this.titleName = this.title;
      }
    },
    methods: {
      closeMack(){
        if(this.maskClosed){
          this.$emit("close-dialog");
        }
      },
      close() {
        this.$emit("close-dialog");
      }
    },
  }
</script>

<style scoped lang="scss">
  .message-box {
    position: relative;
    .mask {
      width: 100%;height:100%;position: fixed;left: 0;top: 0;background: rgba(0, 0, 0, 0.6);z-index: 500;
    }
    .message-content {
      width: 480px;
    }

    .message-content {
      position: fixed;box-sizing: border-box;left: 50%;top: 50%;
      transform: translate(-50%, -50%);border-radius:5px;background-color:#1C2241;z-index: 501;
      .icon {
        position: absolute;top: 25px;right:50px;width: 18px;height:18px;color: #fff;cursor: pointer;
        &:hover {
          color: green;
        }
      }
      .title {
        height: 60px;background-color:#2e3359;color: #fff;font-size:16px;border-top-left-radius:5px;
        border-top-right-radius:5px;line-height: 60px;padding-left: 40px;
        .pading{
          font-size:14px;
        }
      }
      .dialog-content{
        padding:25px 40px;
      }
    }
  }
</style>
