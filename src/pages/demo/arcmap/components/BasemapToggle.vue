<template>
    <div></div>
</template>

<script>
import TMap from '../initMap'

export default {
    name: 'basemapToggleWidget',
    data() {
        return {
            tmap: TMap.getInstance()
        }
    },
    watch: {
        'tmap.ready': function() {
            const BasemapToggle = this.tmap.modules.BasemapToggle
            const basemapToggleWidget = new BasemapToggle({
                view: this.tmap.mapView
            })
            this.tmap.mapView.ui.add(basemapToggleWidget, 'bottom-right')
        }
    }
    
}
</script>

<style scoped lang="stylus">
</style>