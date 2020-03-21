import { subStringNum } from "../utils/common";
const Mixin={
  data(){
    return{
      Height:window.screen.height,
      Width:window.screen.width,
      userInfo:JSON.parse(localStorage.getItem('userToken')),
      inputErr:{},
      totalSize: 0,
      PAGENUM: 1,
      PAGESIZE: 15,
    }
  },
  computed:{
    listenLang() {
      return this.$store.state.lang;
    }
  },
  methods: {
    filtersNum(val){
      let value = Number(val) || 0;
      if(value%1!==0){
        return subStringNum(value, 3);
      }else{
        return value
      }
    }
  },
  filters: {
    filtersNum(val){
      let value = Number(val) || 0;
      if(value%1!==0){
        return subStringNum(value, 3);
      }else{
        return value
      }
    }
  }
};
export default Mixin
