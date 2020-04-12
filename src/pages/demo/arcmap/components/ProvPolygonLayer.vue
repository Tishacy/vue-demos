<template>
    <div id="prov-polygon-layer"></div>
</template>

<script>
import esriLoader from 'esri-loader'
import TMap from '../initMap'

export default {
    data() {
        return {
            tmap: TMap.getInstance(),
            m: {},
            layers: {}
        }
    },
    watch: {
        'tmap.ready': function() {
            this.m = {...this.tmap.modules}
            console.log("prov tmap ready -> this.m: ", this.m)
            this.init()
        }
    },
    methods: {
        init() {
            const _this = this

            // FeatureLayer
            _this.layers.provPolygonLayer = new _this.m.FeatureLayer({
                url: "http://10.75.68.251:6080/arcgis/rest/services/csj/yrd_xzqh1/MapServer/0",
                outFields: ["*"],
                opacity: 0.7,
                renderer: {
                    type: 'unique-value',
                    field: "province",
                    uniqueValueInfos: [
                        this.createFillSymbol("江苏省", "#394879"),
                        this.createFillSymbol("上海市", "#695c79"),
                        this.createFillSymbol("安徽省", "#b57184"),
                        this.createFillSymbol("浙江省", "#e67a83")
                    ]
                },
                labelingInfo: [{
                        symbol: {
                            type: "text",
                            color: "#fff",
                            haloColor: "#695c79",
                            haloSize: '2px',
                        },
                        labelPlacement: "above-center",
                        labelExpressionInfo: {
                            expression: "$feature.province"
                        }
                    }]
            })
            _this.registerClickPolygon()
            _this.tmap.map.add(_this.layers.provPolygonLayer)

            // GraphicLayer
            _this.layers.graphicsLayer = new _this.m.GraphicsLayer()
            _this.tmap.map.add(_this.layers.graphicsLayer)
        },
        createFillSymbol(value, color) {
            return {
                value,
                symbol: {
                    color,
                    type: "simple-fill",
                    style: "solid",
                    outline: {
                        style: "none"
                    }
                },
                lable: value
            }
        },
        registerClickPolygon() {
            const _this = this
            _this.tmap.mapView.on('pointer-move', (event) => {
                _this.tmap.mapView.hitTest(event)
                .then(resp => {
                    if (resp.results.length) {
                        _this.layers.graphicsLayer.removeAll()
                        const graphic = resp.results[0].graphic
                        graphic.symbol = {
                            color: 'rgba(255,0,0,0.5)',
                            type: 'simple-fill',
                            style: 'solid',
                            outline: {
                                style: "solid"
                            },
                            label: graphic.attributes.province
                        }
                        _this.layers.graphicsLayer.add(graphic)
                    }
                })
                .catch(err => console.log(err))
            })
        }
    }   
}
</script>

<style scoped lang="stylus">

</style>