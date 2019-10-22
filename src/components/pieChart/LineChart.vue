<template>
  <div
    :class="className"
    :style="{height:height,width:width}"
  />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '443px'
    },
    height: {
      type: String,
      default: '331px'
    },
     chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.initChart(val)
      }
    }
  },
  mounted() {
    this.initChart(this.chartData)
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(data) {
      this.chart = echarts.init(this.$el, 'macarons')
      let myOption = {
        color: ['#3398DB'],
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     // 坐标轴指示器，坐标轴触发有效
        //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        //   }
        // },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartData.map(v =>  v.name),
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLabel: {
              textStyle: {
                color: '#666'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#E4E9F2'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#FF8726'
                }
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius:[4, 4, 0, 0],
                color: new echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: '#FF8726' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#FFC426' // 100% 处的颜色
                    }
                  ],
                  false
                )
              },
            },
            
            barWidth: 26,
            data: this.chartData
          }
        ]
      }

      this.chart.setOption(myOption)
    }
  }
}
</script>
