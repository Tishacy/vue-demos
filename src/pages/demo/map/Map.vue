<template>
    <div id="map-demo-main">
        <el-container>
            <el-header height="4rem">
                ArcGIS API for JavaScript Demo
            </el-header>
            <el-main>
                <div class="arcgis-api-for-js">
                    <div class="esri-ui">
                        <div id="toggle-basemap-gallery" 
                            class="esri-widget--button esri-widget esri-component" 
                            @click="toggleBasemapGallery"
                            title="Toggle basemap gallery"
                            v-show="showBasemapGalleryButton">BG</div>
                        <div id="toggle-sketch" 
                            class="esri-widget--button esri-widget esri-component"
                            @click="toggleSketchWidget"
                            title="Toggle sketch widget"
                            v-show="showSketchWidgetButton">SW</div>
                        <div id="toggle-filter"
                            class="esri-widget--button esri-widget esri-compoenent"
                            @click="toggleFilterWidget"
                            title="Toggle filter"
                            v-show="showFilterWidgetButton">F</div>

                        <div class="custom-attribution esri-attribution">{{ mapAttribution }}</div>
                        <div id="coordsWidget" class="esri-widget esri-component">{{ coordsInfo }}</div>
                        <select id="filterWidget" 
                            class="esri-widget esri-select" 
                            v-show="showFilterWidget"
                            ref="filterWidget">
                            <option v-for="(expression, index) in filterExpressions" 
                                :key="index" 
                                :value="expression">
                                {{expression}}
                            </option>
                        </select>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import esriLoader from 'esri-loader'

export default {
    data () {
        return {
            mapAttribution: 'Made by Tishacy',
            showBasemapGallery: false,
            showBasemapGalleryButton: false,
            showSketchWidget: false,
            showSketchWidgetButton: false,
            coordsInfo: "",
            filterExpressions: ["TRL_ID > 0", "TRL_ID = 0", "USE_BIKE = 'Yes'", "USE_BIKE = 'No'", "ELEV_GAIN < 1000", "ELEV_GAIN > 1000", "TRL_NAME = 'California Coastal Trail'"],
            showFilterWidget: false,
            showFilterWidgetButton: false,
            view: null,
            map: null,
            layers: {
                polygonShapeLayer: null,
                lineShapeLayer: null,
                pointShapeLayer: null,
                graphicsLayer: null
            },
            graphicClass: null,
            geometryEngine: null,
        }
    },
    methods: {
        createArcgisMapDemo() {
            // 设置arcgis api for js
            const options = {
                url: "https://js.arcgis.com/4.14/dojo/dojo.js"
            }

            esriLoader.loadModules([
                'esri/Map', 
                'esri/views/MapView',
                "esri/widgets/BasemapToggle",
                "esri/widgets/BasemapGallery",
                "esri/widgets/Sketch",
                "esri/layers/FeatureLayer",
                "esri/layers/GraphicsLayer",
                "esri/Graphic",
                "esri/geometry/geometryEngine"
            ], options)
            .then(([
                Map, MapView, 
                BasemapToggle, BasemapGallery, Sketch,
                FeatureLayer, GraphicsLayer, Graphic,
                geometryEngine
            ]) => {
                const map = new Map({
                    basemap: 'topo-vector',
                })
                this.map = map
                const mapView = new MapView({
                    container: document.getElementsByClassName('arcgis-api-for-js')[0],
                    map: map,
                    center: [-118.80500, 34.02700],
                    zoom: 13
                })
                this.view = mapView
                this.view.watch('stationary', () => {
                    this.updateCoordsInfo(this.view.center)
                })
                this.view.on('pointer-move', (event) => {
                    this.updateCoordsInfo(this.view.toMap({x: event.x, y: event.y}))
                })

                // BasemapToggle widget
                const basemapToggle = new BasemapToggle({
                    view: mapView,
                    nextBasemap: 'hybrid'
                })

                // Custom widgets
                const toggleBasemapGalleryButton = document.getElementById('toggle-basemap-gallery')
                const toggleSketchWidgetButton = document.getElementById('toggle-sketch')
                const coordsWidget = document.getElementById("coordsWidget")
                const filterWidget = document.getElementById("filterWidget")
                const toggleFilterWidgetButton = document.getElementById('toggle-filter')

                // BasemapGallery widget
                const basemapGallery = new BasemapGallery({
                    view: mapView,
                    source: {
                        portal: {
                            url: "http://www.arcgis.com",
                            useVectorBasemaps: true
                        }
                    },
                    iconClass: 'icon'
                })

                // Polygon shape layer
                const polygonShapeLayer = new FeatureLayer({
                    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
                    renderer: {
                        type: "unique-value",
                        field: "TYPE",
                        uniqueValueInfos: [
                            this.createFillSymbol("Natural Areas", "#9e559c"),
                            this.createFillSymbol("Regional Open Space", "#149ece"),
                            this.createFillSymbol("Local Park", "#149ece"),
                            this.createFillSymbol("Regional Recreation Park", "#ed5151")
                        ]
                    },
                    opacity: .4
                })
                map.add(polygonShapeLayer)
                this.layers['polygonShapeLayer'] = polygonShapeLayer

                // Polylines shape layer
                const lineShapeLayer = new FeatureLayer({
                    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
                    // query features with sql 
                    // definitionExpression: "USE_BIKE = 'YES'",
                    // render the feature itself
                    renderer: {
                        type: "simple",
                        symbol: {
                            type: "simple-line",
                            color: "#ba55d3",
                            width: "2px",
                            style: "solid"
                        },
                        visualVariables: [{
                            type: "size",
                            field: "ELEV_GAIN",
                            minDataValue: 0,
                            maxDataValue: 2300,
                            minSize: "1px",
                            maxSize: "7px"
                        }]
                    },
                    opacity: .75,
                    // popup configs
                    outFields: ['*'],
                    // popupTemplate: {
                    //     title: '{TRL_NAME}',
                    //     content: "The trail elevation gain is {ELEV_GAIN} ft."
                    // }
                    popupTemplate: {
                        title: "Trail Information",
                        content: [{
                            type: "media",
                            mediaInfos: [{
                                type: "column-chart",
                                caption: "",
                                value: {
                                    fields: [ "ELEV_MIN","ELEV_MAX" ],
                                    normalizeField: null,
                                    tooltipField: "Min and max elevation values"
                                }
                            }]
                        }]
                    }
                })
                map.add(lineShapeLayer)
                this.layers['lineShapeLayer'] = lineShapeLayer

                // Points shape layer
                const pointShapeLayer = new FeatureLayer({
                    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
                    renderer: {
                        type: "simple",
                        symbol: {
                            type: 'picture-marker',
                            url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
                            width: "18px",
                            height: "18px"
                        }
                    },
                    labelingInfo: [{
                        symbol: {
                            type: "text",
                            color: "#fff",
                            haloColor: "#5e8d74",
                            haloSize: '2px',
                            font: {
                                size: "12px",
                                family: "Noto Sans",
                                style: "italic",
                                weight: "normal"
                            }
                        },
                        labelPlacement: "above-center",
                        labelExpressionInfo: {
                            expression: "$feature.TRL_NAME"
                        }
                    }]
                })
                map.add(pointShapeLayer)
                this.layers['pointShapeLayer'] = pointShapeLayer

                // Graphics layer
                const graphicsLayer = new GraphicsLayer()
                map.add(graphicsLayer)
                this.layers['graphicsLayer'] = graphicsLayer
                
                // Sketch widget
                const sketchWidget = new Sketch({
                    view: mapView,
                    layer: graphicsLayer
                })
                sketchWidget.on('create', (event) => {
                    if (event.state === "complete") {
                        if (event.graphic.geometry.type === "point") {
                            console.log("you created a point")
                            event.graphic.attribute = {
                                lat: event.graphic.geometry.latitude,
                                lon: event.graphic.geometry.longitude
                            }
                            event.graphic.popupTemplate = {
                                content: "Lat/Lon {lat}/{lon}"
                            }
                        }
                        console.log(event.graphic)
                    }
                })

                mapView.ui.add(basemapToggle, 'bottom-right')
                mapView.ui.add(toggleBasemapGalleryButton, 'top-left')
                mapView.ui.add(coordsWidget, 'bottom-right')
                mapView.ui.add(sketchWidget, 'top-right')
                mapView.ui.add(toggleSketchWidgetButton, 'top-left')
                mapView.ui.add(filterWidget, 'top-right')
                mapView.ui.add(toggleFilterWidgetButton, 'top-left')
                mapView.ui.add(basemapGallery, 'top-right')
                this.updateCoordsInfo(this.view.center)
                this.showBasemapGalleryButton = true
                this.showSketchWidgetButton = true
                this.showFilterWidgetButton = true

                // 遍历 lines (featureLayer) 中的 feature
                // 使用 geometryEngine 画 buffer
                // lineShapeLayer.queryFeatures()
                // .then(res => res.features)
                // .then(features => {
                //     console.log(features)
                //     features.forEach((elem) => {
                //         const geom = elem.geometry
                //         const buffer = geometryEngine.buffer(geom, .25, 'miles') // 欧式（平面）缓冲区
                //         const geodesicBuffer = geometryEngine.geodesicBuffer(geom, .25, 'miles')  // 测地线（椭球）缓冲区
                //         this.drawGraphic(buffer)
                //         this.drawGraphic(geodesicBuffer)
                //     })
                // })

                // 根据鼠标移动来显示缓冲区
                this.graphicClass = Graphic
                this.geometryEngine = geometryEngine
                this.showBuffer(.5)
            })
        },
        toggleBasemapGallery() {
            const basemapGalleryWidget = document.getElementsByClassName('esri-basemap-gallery')[0]
            basemapGalleryWidget.addEventListener('click', () => {this.toggleBasemapGallery()})
            basemapGalleryWidget.style.display = this.showBasemapGallery? "none" : "block"
            this.showBasemapGallery = !this.showBasemapGallery
        },
        toggleSketchWidget() {
            const sketchWidget = document.getElementsByClassName('esri-sketch')[0]
            sketchWidget.style.display = this.showSketchWidget? "none" : "block"
            this.showSketchWidget = !this.showSketchWidget
        },
        toggleFilterWidget() {
            const filterWidget = this.$refs['filterWidget']
            filterWidget.addEventListener('change', (e) => this.setFeatureLayerViewFilter(e.target.value))
            filterWidget.style.display = this.showFilterWidget? "none" : "block"
            this.showFilterWidget = !this.showFilterWidget
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
        updateCoordsInfo(pt) {
            this.coordsInfo = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
            " | Scale 1:" + Math.round(this.view.scale) +
            " | Zoom " + this.view.zoom;
        },
        setFeatureLayerViewFilter(expression) {
            const featureLayer = this.layers['lineShapeLayer']
            this.view.whenLayerView(featureLayer)
            .then((featureLayer) => {
                featureLayer.effect = {
                    filter: {
                        where: expression
                    },
                    excludedEffect: "opacity(50%)"
                }
            })
        },
        findNearestGraphic(event, layerName) {
            const _this = this
            return _this.view.hitTest(event).then(resp => {
                let activeGraphic;
                if (resp.results.length) {
                    const resOnLayer = resp.results.filter(function (result) {
                        return (result.graphic.layer === _this.layers[layerName])
                    })
                    if (resOnLayer.length) {
                        activeGraphic = resOnLayer[0].graphic
                    } else {
                        activeGraphic = null
                    }
                } else {
                    activeGraphic = null
                }
                return activeGraphic
            })
            // .catch(err => console.log(err)) 
        },
        drawGraphic(geometry) {
            const newGraphic = new this.graphicClass({
                geometry,
                symbol: {
                    type: "simple-fill",
                    color: "rgba(0,0,0,0.15)",
                    outline: {
                        color: "rgba(0,0,0,.5)",
                        width: 1
                    }
                }
            })
            this.layers['graphicsLayer'].add(newGraphic)
        },
        showBuffer(dist) {
            this.view.on("pointer-move", (event) => {
                this.findNearestGraphic(event, 'lineShapeLayer')
                .then((graphic) => {
                    this.layers['graphicsLayer'].removeAll();
                    if (graphic) {
                        const buffer = this.geometryEngine.buffer(graphic.geometry, dist, 'kilometers')
                        this.drawGraphic(buffer)
                    }
                })
                .catch(err => console.log(err))
            })
        }
    },
    mounted() {
        this.createArcgisMapDemo()
    }
}
</script>

<style scoped lang="stylus">
    @import "https://js.arcgis.com/4.14/esri/css/main.css"

    #map-demo-main 
    >>> .esri-view .esri-view-surface--inset-outline:focus::after
        outline none
    >>> .esri-attribution
    >>> .esri-basemap-gallery
    >>> .esri-sketch
        display none

    #map-demo-main
        font-size 1.6rem
        height 100%
        // background-color #fbf2f0
        .el-container
            width 50%
            margin 0 auto
            padding 0
            .el-header
                margin 3rem 0 1rem
                width 100%
                font-size 2.4rem
                color #333
                font-family 'Lucida Sans', Geneva, Verdana, sans-serif
                text-align center
                line-height 3.6rem
            .el-main
                padding 0
                box-shadow 0 .2rem 1.2rem 0 rgba(0, 0, 0, 0.1)
                border-radius .5rem
                .arcgis-api-for-js
                    width 100%
                    height 600px
                    position relative
                    .custom-attribution
                        display block
                        text-align right
                        color #777
                    #coordsWidget
                        padding .7rem 1.5rem .5rem
                    #filterWidget
                        width 275px
                        font-family Avenir Next W00
                        font-size 1.4rem
                        color #323232
</style>