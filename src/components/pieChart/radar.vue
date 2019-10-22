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
      default: '367px'
    },
    chartData: {
      type: Array,
      default: [
        {text: ''},
        {text: ''},
        {text: ''},
        {text: ''},
        {text: ''},
        {text: ''},
      ]
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
        // title: {
        //   text: '多雷达图'
        // },
        // tooltip: {
        //   trigger: 'axis'
        // },
        legend: {
          // x: 'center',
          // data: ['班级突出优势分布']
        },
        radar: [
          {
            indicator: this.chartData,
            name: {

        /*      textStyle: { color: '#666' }
            },
            center: ['50%', '45%'],
            radius: 80*/

              textStyle: { color: '#666' },
              formatter: (text) => {
                text = text.replace(/\S{7}/g, function(match) {
                    console.log(match)
                    return match + '\n'
                })
                return text
            },
            
            },
            center: ['50%', '45%'],
            radius: this.radius
          }
        ],
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            symbol: 'none',
            lineStyle: {
              color: '#FF8726'
            },
            areaStyle: {
              normal: {
                color: '#FCC091'
              }
            },
            data: [
              {
                // value: [60, 73, 85, 80, 70, 60]
                value: this.chartData.map(v => v.value)
                // name: '班级突出优势分布'
              }
            ]
          }
        ]
      }

      this.chart.setOption(myOption)
    }
  }
}
</script>
