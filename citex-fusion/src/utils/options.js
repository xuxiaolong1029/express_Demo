module.exports = {
  bar: {
    chart: {
      spacing: [40, 0, 50, 0],
      borderColor: "none",
      height: 220
    },
    colors: ["#ffbc32"],
    shadow: true,
    title: {
      floating: true,
      text: "",
      color: "#999",
      styles: {
        fontSize: "14"
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      pie: {
        cursor: "pointer",
        dataLabels: {
          enabled: false
        },
        point: {
          events: {
            mouseOver: e => {
              // e.title.textStr = "显示";
              let charts = this.$refs.highcharts.chart;
              charts.setTitle({
                text: "dfngjdsfbgjdsng"
              });
            },
            mouseOut: () => {
              let charts = this.$refs.highcharts.chart;
              charts.setTitle({
                text: ""
              });
            }
          }
        }
      }
    },
    series: [
      {
        type: "pie",
        innerSize: "80%",
        name: "USD",
        borderColor: "none",
        shadow: false,
        setVisible: false,
        data: [{ name: "0.00USD<br/>CTT", y: 100, url: "" }],
        center: []
      }
    ]
  }
};
