<template>
  <div class="from-item" :label="label" :class="(focusIndex===true || currentValue)?'focus':''">
    <input :value="currentValue" :type="type" :maxlength="maxlength" :disabled="disabled" :class="suffixInput" @input="handleInput" @focus="focusIndex=true" @blur="handleBlur"/>
    <p class="tip el-icon-circle-close" v-if="errTip">&nbsp;{{errTip.substr(13)}}</p>
    <slot name="suffix"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      label:{ type: String,default: '' },
      value:{ type: String,default: '' },
      type:{ type: String, default:'text'},
      inputErrTip:{ type:String,default: ''},
      disabled:{ type:Boolean,default:false },
      maxlength:{ type:String,default:'500' },
      suffixInput:{type:String,default:''}
    },
    watch: {
      value(value) {
        this.currentValue = value;
        this.errTip = this.inputErrTip;
      },
      inputErrTip(value){
        this.errTip = value;
      }
    },
    data() {
      return {
        currentValue: this.value,
        focusIndex:false,
        errTip:this.inputErrTip
      }
    },
    mounted(){},
    methods: {
      handleInput(e) {
        let value = e.target.value;
        this.currentValue = value;
        this.$emit('input', value);
      },
      handleBlur(){
        this.focusIndex=false;
        this.errTip='';
        this.$emit('blur', '');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "common";
</style>
