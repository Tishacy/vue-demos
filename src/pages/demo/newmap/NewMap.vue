<template>
    <div id="mapContainer">
        <line-shape-layer :tmap="tmap"></line-shape-layer>
        <prov-polygon-layer :tmap="tmap"></prov-polygon-layer>
    </div>
</template>

<script>
import esriLoader from 'esri-loader'
import LineShapeLayer from './components/LineShapeLayer'
import ProvPolygonLayer from './components/ProvPolygonLayer'

export default {
    data() {
        return {
            options: {
                url: "https://js.arcgis.com/4.14/"
            },
            tmap: {
                map: null,
                mapView: null,
                ready: false
            },
        }
    },
    mounted() {
        const _this = this

        // 4.x
        esriLoader.loadModules(['esri/Map', 'esri/views/MapView'])
        .then(([Map, MapView]) => {
            _this.tmap.map = new Map({
                basemap: 'satellite'
            })
            _this.tmap.mapView = new MapView({
                container: 'mapContainer',
                map: this.tmap.map,
                // center: [-118.80500, 34.02700],
                // zoom: 13,
                zoom : 6,
                center: [119.572, 31.244],
                logo: false, 
                slider:false,
                // showLabels : true
            })
            _this.tmap.ready = true
        })
    },
    components: {
        LineShapeLayer,
        ProvPolygonLayer
    }
}
</script>

<style scoped lang="stylus">
    @import "https://js.arcgis.com/4.14/esri/css/main.css"

    #mapContainer
    >>> *:focus
        outline none

    #mapContainer
        width 100%
        height 100%
        // margin 4rem auto
        // width 50rem
        // height 50rem
        // background-color #888
        border 1px solid black

</style>