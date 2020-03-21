<template>
  <x-table :columnsData="dataList" :columns="columns" :open="open">
    <div slot="operation" slot-scope="scope">
      <button @click="deleteRow(scope.$index,dataList)">删除</button>
      <!--look(scope.$index,scope.row)-->
      <button @click="openLook(scope.$index)">查看</button>
    </div>
     <div slot="slot-open">
       asdfasf
     </div>
  </x-table>
</template>

<script>
  export default {

    data(){
      return{
        open:null,
        columns:[
          {text:'序号',value:'index'},
          {text:'名字',value:'name'},
          {text:'时间',value:'time'},
          {text:'币种',value:'BName'},
          {text:'操作',value:'operation',type:'button'}
        ],
        dataList:[
          {index:0,name:'王大',time:'2019-07-24',BName:'CTT',operation:''},
          {index:1,name:'王大',time:'2019-07-24',BName:'COCOS',operation:''},
          {index:2,name:'王大',time:'2019-07-24',BName:'BTC',operation:''},
          {index:3,name:'王大',time:'2019-07-24',BName:'WOW',operation:''},
        ]
      }
    },
    methods:{
      openLook(index){
        if(this.open===index){
          this.open = null
        }else{
          this.open = index
        }
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    }
  }
</script>

<style scoped>

</style>
