import 'echarts';
export default {
  components: {},
  data: function () {
    return {
      chart1Options: {

        color: ['#87cefa'],
        grid: {
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a}<br/>{b}<br/>{c}%"
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['厦门第一医院', '厦门中山医院', '厦门中医院', '厦门第五医院',],
            axisLine: {
              lineStyle: {
                color: '#87cefa'
              },
            },
            axisLabel: {
              interval: 0,
              rotate: 40,

              textStyle: {
                color: '#fff',
                fontSize: 13
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#87cefa'
              },
            },
            splitLine: {
              "show": false
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              },
              formatter: function (value) {
                return value + "%"
              },
            },
          }
        ],
        series: [
          {
            name: '药占比',
            type: 'bar',
            barWidth: 30,
            data: [60, 80, 70, 50],
          },
        ]
      },
      chart2Options: {
        color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6",],
        tooltip: {
          trigger: 'item',
          formatter: "{a}<br/>{b}<br/>{c}台"
        },
        calculable: true,
        series: [
          {
            name: '手术工作量',
            type: 'pie',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'area',
            max: 40,
            sort: 'ascending',
            data: [
              { value: 10, name: '厦门第一医院' },
              { value: 5, name: '厦门中山医院' },
              { value: 15, name: '厦门中医院' },
              { value: 25, name: '厦门第五医院' },
            ]
          }
        ]
      }
    }
  },
  created() {
    this.$$onResize(this.onResize);
  },
  mounted() {
    let $ = this.$_jQuery
    var html = $(".wrap ul").html()
    $(".wrap ul").append(html).append(html).append(html)
    var ls = $(".wrap li").length / 2 + 1
    let i = 0
    setInterval(function () {
      i++
      if (i == ls) {
        i = 1
        $(".wrap ul").css({ marginTop: 0 })
        $(".wrap ul").animate({ marginTop: -'30' * i + 'px' }, 1000)
      }
      $(".wrap ul").animate({ marginTop: -'30' * i + 'px' }, 1000)
    }, 2400);
  },
  watch: {
  },
  methods: {
    onResize() {

      if (this.$refs && this.$refs.chart1) {
        this.$refs.chart1.resize();
      }
      if (this.$refs && this.$refs.chart2) {
        this.$refs.chart2.resize();
      }
    },
  },
  activated: function () {
    this.onResize();
  },

  deactivated: function () {

  },
};
