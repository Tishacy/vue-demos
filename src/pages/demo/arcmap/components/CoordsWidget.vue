<template>
    <div id="coords-widget" class="esri-widget esri-component" ref="coordsWidget">{{ coordsInfo }}</div>    
</template>

<script>
import TMap from '../initMap'

export default {
    data() {
        return {
            tmap: TMap.getInstance(),
            m: {},
            coordsInfo: ""
        }
    },
    watch: {
        'tmap.ready': function() {
            this.m = {...this.tmap.modules}
            this.init()
        }
    },
    methods: {
        init() {
            const _this = this
            const coordsWidget = _this.$refs.coordsWidget
            _this.tmap.mapView.ui.add(coordsWidget, 'bottom-right')
            _this.tmap.mapView.on('stationary', () => {
                _this.updateCoords(_this.tmap.mapView.center)
            })
            _this.tmap.mapView.on('pointer-move', (event) => {
                _this.updateCoords(_this.tmap.mapView.toMap({x: event.x, y: event.y}))
            })
            _this.updateCoords(_this.tmap.mapView.center)
        },
        updateCoords(pt) {
            const _this = this
            const lat = pt.latitude.toFixed(3),
                  lon = pt.longitude.toFixed(3),
                  zoom = _this.tmap.mapView.zoom,
                  scale = Math.round(_this.tmap.mapView.scale)
            this.coordsInfo = `Lat/Lon ${lat} ${lon} | Scale 1:${scale} | Zoom: ${zoom}`
        }
    }
}
</script>

<style scoped lang="stylus">
    #coords-widget
        padding .7rem 1.5rem .5rem
</style>