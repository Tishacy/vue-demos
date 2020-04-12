<template>
    <div id="main">
        <div id="basemapGallery" 
            ref="basemapGallery"
            v-show="showBasemapGallery"></div>
        <div id="toggleBasemapGalleryButton"
            ref="toggleBasemapGalleryButton"
            class="esri-widget--button esri-widget esri-component"
            v-show="showBasemapGalleryButton"
            @click="toggleBasemapGallery"
        >G</div>
    </div>
</template>

<script>
import TMap from '../initMap'

export default {
    name: 'basemapGalleryWidget',
    data() {
        return {
            tmap: TMap.getInstance(),
            showBasemapGallery: false,
            showBasemapGalleryButton: false
        }
    },
    watch: {
        'tmap.ready': function() {
            const BasemapGallery = this.tmap.modules.BasemapGallery
            const basemapGalleryWidget = new BasemapGallery({
                container: 'basemapGallery',
                view: this.tmap.mapView,
                source: {
                    portal: {
                        url: "http://www.arcgis.com",
                        useVectorBasemaps: true
                    }
                },
                iconClass: 'icon'
            })
            this.$refs.basemapGallery.onclick = this.toggleBasemapGallery
            const toggleBasemapGalleryButton = this.$refs.toggleBasemapGalleryButton
            this.tmap.mapView.ui.add(basemapGalleryWidget, 'top-right')
            this.tmap.mapView.ui.add(toggleBasemapGalleryButton, 'top-left')
            this.showBasemapGalleryButton = true
        }
    },
    methods: {
        toggleBasemapGallery() {
            console.log("toggle")
            this.showBasemapGallery = !this.showBasemapGallery
        }
    }
}
</script>

<style scoped lang="stylus">
</style>