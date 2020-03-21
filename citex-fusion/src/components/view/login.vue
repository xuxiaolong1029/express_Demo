<template>
  <div class="page">
    <div class="content">
      <p class="title">{{$t('lang.reg000')}}</p>
      <div class="from">
        <!--邮箱-->
        <x-input :label="$t('lang.lab001')" v-model.trim="loginForm.email" :inputErrTip="inputErr.email" @blur="inputErr.email=''"></x-input>
        <!--密码-->
        <x-input :label="$t('lang.ass104')" :type="isShowPsw?'text':'password'" v-model.trim="loginForm.pass" :inputErrTip="inputErr.pass" @blur="inputErr.pass=''">
          <div slot="suffix">
            <div class="show-hide-psw" :class="isShowPsw===false?'hide-psw':'show-psw'" @click="isShowPsw=!isShowPsw"></div>
          </div>
        </x-input>
      </div>
      <el-button @click="login()" :disabled="disabled" type="primary" class="but" :loading="fullscreenLoading">{{$t('lang.lg002')}}</el-button>
    </div>
  </div>
</template>

<script>
 import http from "../../api/nuclear.js";
  export default {
    data() {
      return{
        loginForm: {
          email: "",
          pass: "",
        },
        fullscreenLoading: false,
        disabled: false,
        inputErr:{},
        isShowPsw: false,
      }
    },
    mounted(){

    },
    methods:{
      submitFormErr(){
        this.inputErr={};
        let time = new Date().getTime();
        if(!this.loginForm.email){
          this.inputErr.email = time + this.$t('lang.err401');
        }
        if(!this.loginForm.pass){
          this.inputErr.pass = time + this.$t('lang.er003');
        }else{
          if(this.loginForm.pass.length<8){
            this.inputErr.pass = time + this.$t('lang.er006');
          }
        }
        return this.inputErr;
      },
      //
      getApi(){
        http.nodeApi({pageSize:10,pageNum:1}).then(res => {
        if (res.code === 200) {

          }else{
            this.$message.error(res.msg);
          }
        });
      },
      getAccount(){
        http.account({}).then(res => {
          if (res.code === 200) {

          }else{
            this.$message.error(res.msg);
          }
        });
      },
      login(){
        if(Object.keys(this.submitFormErr()).length===0){
          this.fullscreenLoading = true;
          http.nodeLogin({username:this.loginForm.email,password:this.loginForm.pass}).then(res => {
            this.fullscreenLoading = false;
            if (res.code === 200) {
             // this.$router.push({path: "/"});
              localStorage.setItem("userToken", JSON.stringify(res.data));
              document.cookie = "token=" + res.data.access_token;
              this.verifyToken();
              this.getApi();
              this.getAccount()
            }else{
              this.$message.error(this.$t("lang.err" + res.code));
            }
          });
        }
      },
      verifyToken(){
        http.nodeToken({}).then(res => {
          if (res.code === 200) {

          }else{
            this.$message.error(res.msg);
          }
        });
      }
    }
  }

</script>

<style scoped lang="scss">
  @import "../../plugin/input/common";
  .login-img{
    width:460px;height: 100px;margin: auto;
    img{
      width: 100%;height: 100px; margin-top: 13px;
    }
  }
  .forget-password{
    color: #388CFF;margin-top: 15px;cursor: pointer;
  }
  .show-hide-psw {
    width: 16px;
    height:25px;
    position: absolute;
    top:40px;
    right: 16px;
    background-size: 18px 12px;
  }
  .show-psw {
    background: url("../../assets/show-psw.png") no-repeat center;
    background-size: contain;
  }
  .hide-psw {
    background: url("../../assets/hide-psw.png") no-repeat center;
    background-size: contain;
  }
</style>
