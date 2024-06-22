<template>
  <div ref="piechart" id="pieChart" style="height: 300px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "PieChart",
  data() {
    return {
      model: false,
      options: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          top: "bottom",
          bottom: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access source",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "35%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "15",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "case-workers" },
              { value: 735, name: "case-supervisors" },
              { value: 580, name: "case-participants" },
              { value: 484, name: "invitee's" },
              { value: 300, name: "Assignee's" },
            ],
          },
        ],
      },
      pie_chart: null,
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    "$q.dark.isActive": function () {
      this.init();
    },
  },
  methods: {
    init() {
      let pieChart = document.getElementById("pieChart");
      echarts.dispose(pieChart);
      let theme = this.model ? "dark" : "light";
      this.pie_chart = echarts.init(pieChart, theme);
      this.pie_chart.setOption(this.options);
    },
    onResize() {
      if (this.pie_chart) {
        this.pie_chart.resize();
      }
    },
  },
};
</script>

<style scoped></style>
