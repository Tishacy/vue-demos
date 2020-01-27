<template>
    <div class="main">
        <h1>Chart-1</h1>
        <div id="chart1" class="chart"></div>
        <h1>Chart-2</h1>
        <div id="chart2" class="chart"></div>

    </div>
</template>

<script>
export default {
    data () {
        return {
            colors: ['#5793f3', '#d14a61', '#675bba']
        }
    },
    methods: {
        init() {
            const chartEl1 = document.getElementById('chart1');
            this.chart1 = this.$echarts.init(chartEl1);
            this.chart1.setOption({
                color: this.colors,
                tooltip: {
                    trigger: 'none',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data:['2015 降水量', '2016 降水量']
                },
                grid: {
                    top: 70,
                    bottom: 50
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: this.colors[1]
                            }
                        },
                        axisPointer: {
                            label: {
                                formatter: function (params) {
                                    return '降水量  ' + params.value
                                        + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                }
                            }
                        },
                        data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
                    },
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: this.colors[0]
                            }
                        },
                        axisPointer: {
                            label: {
                                formatter: function (params) {
                                    return '降水量  ' + params.value
                                        + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                }
                            }
                        },
                        data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '2015 降水量',
                        type: 'line',
                        xAxisIndex: 1,
                        smooth: true,
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    },
                    {
                        name: '2016 降水量',
                        type: 'line',
                        smooth: true,
                        data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
                    }
                ]
            })
            const chartEl2 = document.getElementById('chart2');
            this.chart2 = this.$echarts.init(chartEl2);
            this.chart2.setOption({
                title: {
                    text: '浏览器占比变化',
                    subtext: '纯属虚构',
                    top: 10,
                    left: 10
                },
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(0,0,250,0.2)'
                },
                legend: {
                    type: 'scroll',
                    bottom: 10,
                    data: (function (){
                        var list = [];
                        for (var i = 1; i <=28; i++) {
                            list.push(i + 2000 + '');
                        }
                        return list;
                    })()
                },
                visualMap: {
                    top: 'middle',
                    right: 10,
                    color: ['red', 'yellow'],
                    calculable: true
                },
                radar: {
                    indicator: [
                        { text: 'IE8-', max: 400},
                        { text: 'IE9+', max: 400},
                        { text: 'Safari', max: 400},
                        { text: 'Firefox', max: 400},
                        { text: 'Chrome', max: 400}
                    ]
                },
                series: (function (){
                    var series = [];
                    for (var i = 1; i <= 28; i++) {
                        series.push({
                            name: '浏览器（数据纯属虚构）',
                            type: 'radar',
                            symbol: 'none',
                            lineStyle: {
                                width: 1
                            },
                            emphasis: {
                                areaStyle: {
                                    color: 'rgba(0,250,0,0.3)'
                                }
                            },
                            data: [{
                                value: [
                                    (40 - i) * 10,
                                    (38 - i) * 4 + 60,
                                    i * 5 + 10,
                                    i * 9,
                                    i * i /2
                                ],
                                name: i + 2000 + ''
                            }]
                        });
                    }
                    return series;
                })()
            })
        }
    },
    mounted () {
        this.init()
        window.onresize = ()=>{
            this.chart1.resize();
            this.chart2.resize();
        }
    }
    
}
</script>

<style lang="stylus" scoped>
    h1
        font-size 2rem
    .chart
        margin 0 auto
        width 80%
        height 30rem
        
</style>