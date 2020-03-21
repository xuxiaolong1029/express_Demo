
let checkInt = {}
checkInt.install = function(Vue,options){
  Vue.directive('Int',{
    inserted:function(el){
      const input = el
      input.onkeyup= function(e){
        if(input.value.length === 1){
          input.value = input.value.replace(/[^1-9]/g,"")
        }else{
          input.value = input.value.replace(/[^\d]/g,"")
        }
      }
    }
  })
}
export default checkInt;
