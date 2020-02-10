<template>
    <div id="map-demo-main">
        <el-container>
            <el-header height="4rem">
                ArcGIS API for JavaScript Demo
            </el-header>
            <el-main>
                <div class="arcgis-api-for-js">
                    <div class="esri-ui">
                        <div class="toggle-basemap-gallery esri-widget--button esri-widget esri-component" 
                            @click="toggleBasemapGallery"
                            title="Toggle basemap gallery">BG</div>
                        <div class="toggle-sketch esri-widget--button esri-widget esri-component"
                            @click="toggleSketchWidget"
                            title="Toggle sketch widget">SW</div>
                        <div class="custom-attribution esri-attribution">{{ mapAttribution }}</div>
                        <div id="coordsWidget" class="esri-widget esri-component">{{ coordsInfo }}</div>
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
            showSketchWidget: false,
            coordsInfo: "asdf",
            view: null,
            map: null,
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
                "esri/widgets/Editor",
                "esri/layers/FeatureLayer",
                "esri/layers/GraphicsLayer"
            ], options)
            .then(([
                Map, MapView, 
                BasemapToggle, BasemapGallery, Sketch, Editor,
                FeatureLayer, GraphicsLayer
            ]) => {
                const map = Map({
                    basemap: 'topo-vector',
                })
                this.map = map
                const mapView = MapView({
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

                // control the display of BasemapGallery widget
                const toggleBasemapGalleryButton = document.getElementsByClassName('toggle-basemap-gallery')[0]
                const toggleSketchWidgetButton = document.getElementsByClassName('toggle-sketch')[0]
                const coordsWidget = document.getElementById("coordsWidget")

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

                // Polylines shape layer
                const lineShapeLayer = new FeatureLayer({
                    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
                    // query features with sql 
                    definitionExpression: "USE_BIKE = 'YES'",
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

                // Graphics layer
                const graphicsLayer = new GraphicsLayer()
                map.add(graphicsLayer)
                
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

                // Editor widget
                const editorWidget = new Editor({
                    view: mapView
                })

                mapView.ui.add(basemapToggle, 'bottom-right')
                mapView.ui.add(toggleBasemapGalleryButton, 'top-left')
                mapView.ui.add(coordsWidget, 'bottom-right')
                mapView.ui.add(sketchWidget, 'top-right')
                mapView.ui.add(toggleSketchWidgetButton, 'top-left')
                mapView.ui.add(editorWidget, 'top-right')
                mapView.ui.add(basemapGallery, 'top-right')
                this.updateCoordsInfo(this.view.center)

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
</style>