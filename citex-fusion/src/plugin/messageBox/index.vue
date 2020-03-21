<template>
  <div class="message-box" v-show="isShowMessageBox">
    <div class="mask" @click="cancel"></div>
    <div class="message-content">
      <i class="icon el-icon-close" @click="cancel"></i>
      <h3 class="title">{{ title }}</h3>
      <div class="dialog-content">
        <p style="color: #8C9FAD"> {{content}}</p>
        <div class="input">
          <input type="text" maxlength="6" v-model="inputValue" v-if="isShowInput" ref="input" @keyup.enter="confirm" />
        </div>
        <div class="btn-group">
          <button class="btn-default" @click="cancel" v-show="isShowCancelBtn">{{ cancelBtnText }}</button>
          <button class="btn-primary btn-confirm" :disabled="buttonDisabled" @click="confirm" v-show="isShowConfimrBtn">{{ confirmBtnText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default:'提示'
      },
      content: {
        type: String,
        default: '这是弹框内容'
      },
      isShowInput: false,
      inputValue: '',
      isShowCancelBtn: {
        type: Boolean,
        default: true
      },
      isShowConfimrBtn: {
        type: Boolean,
        default: true
      },
      cancelBtnText: {
        type: String,
        default:'取消'
      },
      confirmBtnText: {
        type: String,
        default:'确定'
      }
    },
    data () {
      return {
        buttonDisabled:true,
        isShowMessageBox: false,
        resolve: '',
        reject: '',
        promise: '' // 保存promise对象
      };
    },
    watch:{
      inputValue(val){
        if(val.length===6){
          this.buttonDisabled = false
        }
      }
    },
    methods: {
      // 确定,将promise断定为resolve状态
      confirm() {
        this.isShowMessageBox = false;
        if (this.isShowInput) {
          this.resolve(this.inputValue);
        } else {
          this.resolve('confirm');
        }
        this.remove();
      },
      // 取消,将promise断定为reject状态
      cancel() {
        this.isShowMessageBox = false;
        this.reject('cancel');
        this.remove();
      },
      // 弹出messageBox,并创建promise对象
      showMsgBox() {
        this.isShowMessageBox = true;
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        // 返回promise对象
        return this.promise;
      },
      remove() {
        setTimeout(() => {
          this.destroy();
        }, 300);
      },
      destroy() {
        this.$destroy();
        document.body.removeChild(this.$el);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .message-box {
    position: relative;
    .mask {
      width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: rgba(0, 0, 0, 0.6);z-index: 10001;
    }
    .message-content {
      position: fixed;box-sizing: border-box;width: 480px;height: 250px;left: 50%;top: 50%;
      transform: translate(-50%, -50%);border-radius:5px;background-color: #fff;z-index: 50001;
      .icon {
        position: absolute;top: 20px;right:50px;width: 16px;height:16px;color: #1E3E58;cursor: pointer;
        &:hover {
          color: green;
        }
      }
      .title {
        height: 60px;background-color: #F8FBFF;color: #1E3E58;font-size:16px;border-top-left-radius:5px;
        border-top-right-radius:5px;line-height: 60px;padding-left: 40px;
      }
      .dialog-content{
        padding: 35px 40px;
        .input{
          width: 400px;height: 29px;position: relative;
          span{
            display: inline-block;height: 29px;line-height: 29px;width: 100px;top: 0px;right: 0px;
            position: absolute;text-align: right;color:#388cff;cursor: pointer;z-index: 10;
          }
          input{
            display: inline-block;height: 29px;line-height: 29px;width: 400px;border-bottom:2px solid #EAEDEF;padding: 0 100px 0 2px;
            &:focus{
              border-bottom:2px solid #388CFF;
            }
          }
        }
      }
      .btn-group {
        margin-top:38px;
        float: right;
        overflow: hidden;
        .btn-default{
          font-size:14px;
          color:rgba(56,140,255,1);width: 90px;text-align: center;
        }
        .btn-confirm {
          width:90px;
          height:40px;margin-left: 11px;
          background-color:#388CFF;
          border-radius:2px;
          color: #fff;
          &:disabled{
            background-color: #828EA1;
          }
        }
      }
    }
  }
</style>
