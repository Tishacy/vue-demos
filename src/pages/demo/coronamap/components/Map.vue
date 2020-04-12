<template>
    <div class="map">
        <div id="chart" style="height: 500px; width: 600px"></div>
    </div>    
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china'
import jsonp from 'jsonp'

const option = {
    backgroundColor: 'rgba(0,0,0,0.1)',
    title: {
        text: 'Covid-19 疫情地图',
        x: 'center',
        textStyle: {
            color: '#333'
        },
        subtext: '确诊人数'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{c}人',
    },
    visualMap: {
        type: 'piecewise',
        pieces: [
            {min: 10000},
            {min: 1000, max: 9999},
            {min: 100, max: 999},
            {min: 10, max: 99},
            {min: 1, max: 9},
            {value: 0}
        ],
        inRange: {
            color: ['#fff', '#ffaa85', '#660208']
        },
        itemWidth: 15
    },
    series: [
        {
            name: '香港18区人口密度',
            type: 'map',
            mapType: 'china', // 自定义扩展图表类型
            zoom: 1.2,
            label: {
                show: true
            },
            data: {},
            emphasis: {
                itemStyle: {
                    areaColor: '#ffff66'
                }
            }
        }
    ]
}

export default {
    name: "Map",
    data() {
        return {
            myChart: null,
        }
    },
    mounted() {
        this.getData()
        this.myChart = echarts.init(document.getElementById('chart'))
    },
    methods: {
        getData() {
            jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427', (err, data) => {
                const list = data.data.list.map((item) => {
                    return {
                        name: item.name,
                        value: parseInt(item.value)
                    }
                })
                console.log(list)
                option.series[0].data = list
                this.myChart.setOption(option)
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
</style>