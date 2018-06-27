<template>
  <div>
    <div>
        <el-date-picker
        style="margin-bottom: 20px"
        v-model="dateValue"
        type="daterange"
        range-separator=" - "
        start-placeholder="开始日期"
        end-placeholder="结束日期">
        </el-date-picker>
    </div>
    <div class="chart" :id="id" :style="{height:height,width:width}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      dateValue: ['2018-01-01','2018-01-05'],
      id: 'chart',
      chart: null,
      width: '100%',
      height: '500px'
    }
  },
  watch: {
      dateValue: {
        handler (val) {
            let aa  = this.getTimescales(val, 'season')
            //根据控件所选时间范围，算出时间范围内每一个时间刻度
            console.log(6666666666, aa)
        },
        immediate: true
      }
  },
  mounted() {
    const apiData = this.getDatafromApi()
    let chartData = this.getChartData(apiData)
    chartData = [
        ['count', '2018-01-01', '2018-01-02','2018-01-03','2018-01-04','2018-01-05'], 
        ['baidu', 34, 45, 23, 56, 44], 
        ['google', 21, 33, 64, 29, 78], 
        ['tencent', 67, 45, 66, 54, 66], 
        ['alibaba', 34, 56, 71, 45, 77]
    ]
    this.initChart(chartData)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getTimescales (rangeArr, dim) {
        let arr = []
        const dayMilliSeconds  = 1000*60*60*24

        let d1Ms = new Date(rangeArr[0]).getTime()
        let d2Ms = new Date(rangeArr[1]).getTime()
        
        for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
            let day = new Date(d1Ms)
            if(dim === 'day') {
                arr.push(this.getYMD(day))
            } else if (dim === 'month') {
                if(!arr.includes(this.getYM(day))) {
                    arr.push(this.getYM(day))
                }
            } else if (dim === 'season') {
                if(!arr.includes(this.getYQ(day))) {
                    arr.push(this.getYQ(day))
                }
            }
        }

        return arr
    },
    getYMD (date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    getYM (date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1)
    },
    getYQ (date) {
        let currMonth = date.getMonth() + 1
        let quarter = Math.floor( ( currMonth % 3 == 0 ? ( currMonth / 3 ) : ( currMonth / 3 + 1 ) ) )
        return date.getFullYear() + '-' + 'Q' + quarter
    },
    getDatafromApi () {
        return [
            {time: '2018-01-01', type: 1, number: 23},
            {time: '2018-01-01', type: 2, number: 33},
            {time: '2018-01-01', type: 3, number: 66},
            {time: '2018-01-01', type: 4, number: 29},
            {time: '2018-01-01', type: 5, number: 25},
            {time: '2018-01-02', type: 1, number: 23},
            {time: '2018-01-02', type: 2, number: 33},
            {time: '2018-01-02', type: 3, number: 66},
            {time: '2018-01-02', type: 4, number: 29},
            {time: '2018-01-02', type: 5, number: 25},
            {time: '2018-01-03', type: 1, number: 25},
            {time: '2018-01-03', type: 2, number: 22},
            {time: '2018-01-03', type: 3, number: 87},
            {time: '2018-01-03', type: 4, number: 2},
            {time: '2018-01-03', type: 5, number: 99},
            {time: '2018-01-04', type: 1, number: 25},
            {time: '2018-01-04', type: 2, number: 22},
            {time: '2018-01-04', type: 3, number: 87},
            {time: '2018-01-04', type: 4, number: 2},
            {time: '2018-01-04', type: 5, number: 99},
            {time: '2018-01-05', type: 1, number: 54},
            {time: '2018-01-05', type: 2, number: 20},
            {time: '2018-01-05', type: 3, number: 8},
            {time: '2018-01-05', type: 4, number: 29},
            {time: '2018-01-05', type: 5, number: 77}
        ]
    },
    getChartData (data) {
        const dim = ['', 'baidu', 'google', 'tencent', 'alibaba']
        let dataset = [['number'], ['baidu'], ['google'], ['tencent'], ['alibaba']]
        data.forEach(item => {
            if(!dataset[0].includes(item.time)) {
                // dataset[0].push(item.time)
            }
            // dataset[item.type].push(item.number)
        });
        return dataset
    },
    initChart(sourcedata) {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            x: 'left'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        barWidth: 36,
        dataset: sourcedata ? {source: sourcedata} : null,
        // dataset: {
        //     source:[
        //         ['count', '2018-01-01', '2018-01-02','2018-01-03','2018-01-04','2018-01-05'], 
        //         ['baidu', 34, 45, 23, 56, 44], 
        //         ['google', 21, 33, 64, 29, 78], 
        //         ['tencent', 67, 45, 66, 54, 66], 
        //         ['alibaba', 34, 56, 71, 45, 77]
        //     ]
        // },
        xAxis : [
            {
                type : 'category',
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                type:'bar',
                stack: 'bar',
                seriesLayoutBy: 'row'
            },
            {
                type:'bar',
                stack: 'bar',
                seriesLayoutBy: 'row'
            },
            {
                type:'bar',
                stack: 'bar',
                seriesLayoutBy: 'row'
            },
            {
                type:'bar',
                stack: 'bar',
                seriesLayoutBy: 'row'
            },
            {
                type:'bar',
                stack: 'bar',
                seriesLayoutBy: 'row'
            }
        ]
      })
    }
  }
}
</script>
