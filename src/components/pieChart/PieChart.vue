<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    r1: {
    type: Number,
    default:30,
  },
  r2: {
    type: Number,
    default:40,
  },
  r3: {
    type: Number,
    default:32,
  },
  r4: {
    type: Number,
    default:38,
  },
    showText: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: "96px"
    },
    height: {
      type: String,
      default: "96px"
    },
    shadowColor: {
      type: String,
      default: "rgba(38, 201, 255, 0.2)"
    },
    labelColor: {
      type: String,
      default: "#26C9FF"
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.initChart(val);
      }
    }
  },
  mounted() {
    this.initChart(this.chartData);
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHanlder);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart(data) {
      this.chart = echarts.init(this.$el, "macarons");
      let mytext = data.text?data.text:data.crude;
      if(!this.showText) {
        mytext = ''
      }
      let myOption = {
        backgroundColor: "#fff",
        title: {
          text: mytext,
          x: "center",
          y: "center",
          textStyle: {
            color: this.labelColor,
            fontSize: 16,
            fontWeight: "normal"
          },
          subtextStyle: {
            color: "rgba(255,255,255,.45)",
            fontSize: 14,
            fontWeight: "normal"
          }
        },
        legend: {
          x: "center",
          y: "bottom",
          data: ["rose3", "rose5", "rose6", "rose7", "rose8"]
        },
        calculable: true,
        series: [
          {
            name: "面积模式",
            hoverAnimation:false,
            type: "pie",
            radius: [this.r1, this.r2],
            center: ["50%", "50%"],
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: data.crude, // 粗圈的值
                name: "_",
                itemStyle: {
                  color: this.labelColor
                }
               
              },
              {
                value: data.thin, // 细圈的值
                name: "rose2",
                itemStyle: {
                  color: "transparent"
                }
              }
            ]
          },
          {
            name: "面积模式",
            type: "pie",
            radius: [this.r3, this.r4],
            center: ["50%", "50%"],
             hoverAnimation:false,
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: data.crude, // 粗圈的值 和上面粗圈注释对应
                name: "_",
                itemStyle: {
                  color: "transparent"
                }
              },
              {
                value: data.thin, // 细圈的值 和上面细圈值注释对应
                name: "rose2",
                itemStyle: {
                  color: this.shadowColor
                }
              }
            ]
          }
        ]
      };
      this.chart.setOption(myOption);
    }
  }
};
</script>
