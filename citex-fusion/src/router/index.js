import Vue from "vue";
import Router from "vue-router";
//聚变
import Nuclear from "@/components/nuclear/nuclear"
import NuclearPersonal from "@/components/nuclear/personal"
import NuclearIntroduce from "@/components/nuclear/introduce"
import TreeMap from "@/components/TreeMap"
Vue.use(Router);

export default new Router({
  linkExactActiveClass:'active',
  routes: [
    //聚变
    {
      path: "/",
      name: "nuclear",
      component: Nuclear,
    },{
      path: "/nuclear/personal",
      name: "personal",
      component: NuclearPersonal,
    },{
      path: "/nuclear/introduce",
      name: "introduce",
      component: NuclearIntroduce,
    },
    {
      path: "/Citex/TreeMap",
      name: "TreeMap",
      component: TreeMap,
      meta:{
        hideHead:true
      }
    },{
      path: '/nuclear/login', component: resolve => require(['@/components/view/login'], resolve),
    }
  ]
});



