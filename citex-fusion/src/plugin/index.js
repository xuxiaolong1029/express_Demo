import XInput from "./input/index"
import XTable from "./table/index"
const components = {
  'x-input':XInput,
  'x-table':XTable
};
const CITEX = {
  install(Vue){

    Object.keys(components).forEach(key => {
      Vue.component(key, components[key]);
    });
  }
};
export default CITEX
