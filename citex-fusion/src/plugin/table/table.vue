<template>
    <table class="wk-table">
      <thead>
        <tr>
          <td :colspan="columns.length"><div v-for="(item,index) of columns" :key="'h'+index">{{item.text}}</div></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) of columnsData" :key="'r'+index">
          <td :colspan="columns.length">
            <div class="tdList" v-for="(row,ix) of columns" :key="'h'+ix">
              <slot name="operation" v-if="row.type==='button'" :$index="index" :row="item"></slot>
              <div v-else>
                {{item[row.value]}}
              </div>
            </div>
          </td>
          <td :colspan="columns.length" v-if="open===index">
            <slot name="slot-open"></slot>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
  export default {
    props: {
      columns:{
        type:Array,
        default:[]
      },
      columnsData:{
        type: Array,
        default:[]
      },
      open:{
        type:Number,
        default:null
      }
    }
  }
</script>

<style scoped lang="scss">
  .wk-table {
    background-color: #ffffff;
    width: 100%;
    font-size: 14px;
    tr {
      color: #555;
      td {
        color: #1f3f59;padding: 5px 8px;
        border-bottom: 1px solid #eaedef;
        text-align: center;display: flex;
        div{flex: 1;}
      }
    }
    thead{
      td{
        color: #8c9fad
      }
    }
  }
</style>
