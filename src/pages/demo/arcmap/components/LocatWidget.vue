<template>
    <div id="locate-widget" 
        ref="locateWidget"
        v-show="showLocateWidget"
        class="esri-widget--button esri-widget esri-component el-icon-map-location"
        @click="handleClick">
    </div>
</template>

<script>
import TMap from '../initMap'

export default {
    props: {
        center: {
            type: Array,
            default() {
                return [119.572, 31.244]
            }
        },
        zoom: {
            type: Number,
            default: 6
        }
    },
    data() {
        return {
            tmap: TMap.getInstance(),
            showLocateWidget: false
        }
    },
    watch: {
        'tmap.ready': function() {
            this.initWidget()
        }
    },
    methods: {
        initWidget() {
            const _this = this
            const locateWidget = _this.$refs.locateWidget
            _this.tmap.mapView.ui.add(locateWidget, 'top-left')
            _this.showLocateWidget = true
        },
        handleClick() {
            const _this = this
            _this.tmap.mapView.goTo({
                center: this.center,
                zoom: this.zoom
            })
            console.log(_this.tmap.components)
        }
    }
    
}
</script>

<style scoped lang="stylus">

</style>