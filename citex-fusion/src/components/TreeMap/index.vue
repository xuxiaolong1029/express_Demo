<template>
  <div class="tree-map">
    <div id="TreeMap" :class="JSON.stringify(dataList)!=='{}'?'':'render-bg'"></div>
    <div class="uid-message">
      <div>
        <el-date-picker
            class="date-picker"
            v-model="timer"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            size="small"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            end-placeholder="结束日期">
        </el-date-picker>
        <el-input type="test" size="small" v-model="value" class="uid-input" placeholder="请输入uid"></el-input>
        <el-button :loading="btnLoading" type="primary" size="small" @click="InquireUID">查询</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Echarts from "echarts";
import http from "../../utils/fetch";

export default {
  props: {},
  data() {
    return {
      EchartsContainer: null,
      value: "",
      dataList: {},
      timer: [],
      btnLoading:false,
      state:true
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.setMapWidth();
  },
  methods: {
    onChange(data, dateString) {
      this.timer = dateString;
    },
    InquireUID() {
      if (!this.value) {
        this.$message.error("请填写uid！");
        return;
      }
      if (!this.timer || this.timer.length <= 0) {
        this.$message.error("请选择时间间隔！");
        return;
      }
      this.btnLoading = true;
      this.EchartsContainer.showLoading();
      http.fetch("/fusion/tree/node",
        {
          startTime: this.timer[0],
          endTime: this.timer[1],
          userId: this.value
        },
        "post",
      )
        .then(res => {
          if (res.code === 0) {
            this.dataList = res.data;
            this.drawChart();
          }
        })
        .catch(err => {
          this.$message.error("查询失败！");
        })
        .finally(() => {
          this.btnLoading = false;
          this.EchartsContainer.hideLoading();
        });
    },
    setMapWidth() {
      let TreeMap = document.getElementById("TreeMap");
      const That = this;
      TreeMap.style.minWidth = window.innerWidth + "px";
      TreeMap.style.height = window.innerHeight + "px";
      this.EchartsContainer = Echarts.init(document.getElementById("TreeMap"));
      window.onresize = function() {
        That.setMapWidth();
        That.EchartsContainer.resize();
      };
    },
    drawChart() {
      this.EchartsContainer = Echarts.init(document.getElementById("TreeMap"));
      this.EchartsContainer.setOption(this.getGlobalTreeOption(),true);
    },
    getGlobalTreeOption() {
      var option = {
        title: {
          text: "树状关系图展示",
          textStyle: {
            color: "white"
          },
          x: "center",
          y: "20"
        },
        backgroundColor: "rgba(8,24,42,0.8)",
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
          formatter: function(params) {
            const { value, name } = params.data;
            return `UID_当前数量：${name?name:'---'}<br/>团队数量：${value ? value : "---"}`;
          }
        },
        series: [
          {
            name: "柱状图",
            type: "tree",
            roam: true, //是否可拖动、缩放
            initialTreeDepth: 3, //默认：2，树图初始展开的层级（深度）。根节点是第 0 层，然后是第 1 层、第 2 层，... ，直到叶子节点
            data: [this.dataList],
            nodePadding: 80,
            left: "2%",
            right: "2%",
            top: "15%",
            bottom: "20%",
            symbolSize: 10,
            symbol: "emptyCircle",
            orient: "vertical",
            expandAndCollapse: true,
            label: {
              normal: {
                position: "top",
                verticalAlign: "middle",
                align: "right",
                fontSize: 14
              }
            },
            leaves: {
              label: {
                normal: {
                  position: "bottom",
                  verticalAlign: "middle",
                  align: "center",
                  fontSize: 12,
                  offset: [0, 8]
                }
              },
              itemStyle: {
                borderColor: "#1890ff"
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "right",
                  textStyle: {
                    color: "#eee",
                    fontSize: 14
                  }
                },
                lineStyle: {
                  color: "#999",
                  width: 1,
                  type: "solid" // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                }
              }
            },
            animationDurationUpdate: 750
          }
        ]
      };
      return option;
    },
    getJson(){
        return {"children":[{"children":[{"children":[],"name":"50302_201","value":"201"},{"children":[{"children":[],"name":"52758_0","value":"0"},{"children":[{"children":[],"name":"50625_0","value":"0"}],"name":"49369_0","value":"0"},{"children":[],"name":"50919_200","value":"200"}],"name":"47482_200","value":"400"},{"children":[{"children":[],"name":"52818_11005","value":"11005"}],"name":"52810_9000","value":"20005"},{"children":[{"children":[{"children":[],"name":"53019_0","value":"0"}],"name":"51521_200","value":"200"},{"children":[{"children":[],"name":"50474_20050","value":"20050"},{"children":[],"name":"50469_20050","value":"20050"},{"children":[],"name":"39532_20100","value":"20100"}],"name":"39512_10050","value":"70250"}],"name":"50292_0","value":"70450"},{"children":[{"children":[{"children":[{"children":[{"children":[],"name":"52454_5712","value":"5712"},{"children":[],"name":"52199_1406","value":"1406"}],"name":"51404_7151","value":"14269"}],"name":"51850_4990","value":"19259"}],"name":"51588_5995","value":"25254"},{"children":[],"name":"52822_1426","value":"1426"},{"children":[{"children":[],"name":"45089_600","value":"600"},{"children":[],"name":"50851_5189","value":"5189"},{"children":[],"name":"50845_1921","value":"1921"}],"name":"51149_11369","value":"19079"}],"name":"50315_5000","value":"50759"}],"name":"40161_5040","value":"146855"},{"children":[{"children":[],"name":"40800_0","value":"0"},{"children":[],"name":"49268_280","value":"280"},{"children":[{"children":[],"name":"51752_1400","value":"1400"}],"name":"49803_700","value":"2100"},{"children":[{"children":[],"name":"53231_0","value":"0"}],"name":"40571_5002","value":"5002"},{"children":[{"children":[{"children":[{"children":[],"name":"52808_2850","value":"2850"}],"name":"52807_1500","value":"4350"}],"name":"52814_750","value":"5100"}],"name":"51158_255","value":"5355"},{"children":[{"children":[],"name":"37042_709","value":"709"}],"name":"35696_918","value":"1627"},{"children":[{"children":[],"name":"42096_705","value":"705"},{"children":[],"name":"53222_0","value":"0"}],"name":"52913_0","value":"705"}],"name":"49654_0","value":"15069"},{"children":[{"children":[{"children":[{"children":[],"name":"52986_0","value":"0"}],"name":"51222_0","value":"0"},{"children":[{"children":[],"name":"52991_0","value":"0"}],"name":"52412_5001","value":"5001"},{"children":[{"children":[],"name":"52524_0","value":"0"}],"name":"52466_0","value":"0"}],"name":"50297_201","value":"5202"},{"children":[{"children":[],"name":"53229_0","value":"0"}],"name":"50295_0","value":"0"},{"children":[{"children":[],"name":"51724_1345","value":"1345"}],"name":"48096_700","value":"2045"}],"name":"49260_5000","value":"12247"}],"name":"49275_201","value":"174372"};
    },
    getJson2(){
        return {"children":[
            {"children":[
                {"children":[{"children":[{"children":[],"name":"50625_0","value":"0"}],"name":"49369_0","value":"0"},{"children":[],"name":"50919_200","value":"200"}],"name":"47482_200","value":"400"},{"children":[{"children":[],"name":"52818_11005","value":"11005"}],"name":"52810_9000","value":"20005"},{"children":[{"children":[{"children":[],"name":"53019_0","value":"0"}],"name":"51521_200","value":"200"},{"children":[{"children":[],"name":"50474_20050","value":"20050"},{"children":[],"name":"50469_20050","value":"20050"},{"children":[],"name":"39532_20100","value":"20100"}],"name":"39512_10050","value":"70250"}],"name":"50292_0","value":"70450"},{"children":[{"children":[{"children":[{"children":[{"children":[],"name":"52454_5712","value":"5712"},{"children":[],"name":"52199_1406","value":"1406"}],"name":"51404_7151","value":"14269"}],"name":"51850_4990","value":"19259"}],"name":"51588_5995","value":"25254"},{"children":[],"name":"52822_1426","value":"1426"},{"children":[{"children":[],"name":"45089_600","value":"600"},{"children":[],"name":"50851_5189","value":"5189"},{"children":[],"name":"50845_1921","value":"1921"}],"name":"51149_11369","value":"19079"}],"name":"50315_5000","value":"50759"}],"name":"40161_5040","value":"146855"},{"children":[{"children":[],"name":"40800_0","value":"0"},{"children":[],"name":"49268_280","value":"280"},{"children":[{"children":[],"name":"51752_1400","value":"1400"}],"name":"49803_700","value":"2100"},{"children":[{"children":[],"name":"53231_0","value":"0"}],"name":"40571_5002","value":"5002"},{"children":[{"children":[{"children":[{"children":[],"name":"52808_2850","value":"2850"}],"name":"52807_1500","value":"4350"}],"name":"52814_750","value":"5100"}],"name":"51158_255","value":"5355"},{"children":[{"children":[],"name":"37042_709","value":"709"}],"name":"35696_918","value":"1627"},{"children":[{"children":[],"name":"42096_705","value":"705"},{"children":[],"name":"53222_0","value":"0"}],"name":"52913_0","value":"705"}],"name":"49654_0","value":"15069"},{"children":[{"children":[{"children":[{"children":[],"name":"52986_0","value":"0"}],"name":"51222_0","value":"0"},{"children":[{"children":[],"name":"52991_0","value":"0"}],"name":"52412_5001","value":"5001"},{"children":[{"children":[],"name":"52524_0","value":"0"}],"name":"52466_0","value":"0"}],"name":"50297_201","value":"5202"},{"children":[{"children":[],"name":"53229_0","value":"0"}],"name":"50295_0","value":"0"},{"children":[{"children":[],"name":"51724_1345","value":"1345"}],"name":"48096_700","value":"2045"}],"name":"49260_5000","value":"12247"}],"name":"49275_201","value":"174372"};
    }
  
  }
};
</script>

<style scoped>
.tree-map{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
}
.tree-map .uid-message {
  position: absolute;
  width: 100%;
  top: 15px;
  right: 0;
  z-index: 99;
}
.tree-map .uid-message > div {
  display: flex;
  justify-content: flex-end;
  padding-right: 100px;
}
.tree-map .date-picker {
  width: 300px;
  margin-right: 10px;
}
.tree-map .uid-input {
  width: 150px;
  margin-right: 5px;
}
#TreeMap {
  width: auto;
  
  /* height: 100%; */
}
#TreeMap.render-bg{
  background: rgba(8,24,42,0.8);
}
</style>
