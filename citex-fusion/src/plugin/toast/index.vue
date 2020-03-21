
<template>
  <div
    :style="{borderLeft:icon==='success'?'3px solid #388CFF':'3px solid #D74E5A'}"
    class="wrap"
    v-if="showWrap"
    :class="showContent ?'fadein':'fadeout'"
  >
    <i :class="`el-icon-${icon}`" :style="{color:icon==='success'?'#388CFF':'#D74E5A'}"></i>
    <span class="wrap-text">{{text}}</span>
  </div>
</template>
<style scoped lang="scss">
.wrap {
  position: fixed;
  right: 5px;
  top: 88px;
  min-width: 280px;
  z-index: 9999;
  padding: 22px 20px 22px 0 ;
  background-color: #f8fbff;
  border-radius: 2px;
  color: #1e3e58;
  font-size: 14px;
  box-sizing: content-box;
  max-width: 400px;
  overflow: hidden;
  white-space: normal;
  i {
    display: inline-block;
    width: 16px;
    height: 16px;
    top:25px;
    position: absolute;
    left: 22px;
  }
  span{
    display: inline-block;
    padding-left:45px;
  }
}
.fadein {
  animation: animate_in 0.25s;
}
.fadeout {
  animation: animate_out 10s;
  opacity: 0;
}
@keyframes animate_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes animate_out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
