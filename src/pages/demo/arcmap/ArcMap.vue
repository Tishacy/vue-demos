<template>
    <div>
        <router-link to="/" tag="li">
            <div id="back-to-home-button" class="el-icon-s-home esri-widget--button esri-widget esri-component"></div>
        </router-link>
        <div id="mapContainer">
            <line-shape-layer></line-shape-layer>
            <basemap-toggle></basemap-toggle>
            <basemap-gallery></basemap-gallery>
            <!-- <prov-polygon-layer></prov-polygon-layer> -->
            <coords-widget></coords-widget>
            <locate-widget :center="[120.087, 30.302]" :zoom="15"></locate-widget>
        </div>
    </div>
</template>

<script>
import TMap from './initMap'
import LineShapeLayer from './components/lineShapeLayer'
import BasemapToggle from './components/basemapToggle'
import BasemapGallery from './components/basemapGallery'
import ProvPolygonLayer from './components/ProvPolygonLayer'
import CoordsWidget from './components/CoordsWidget'
import LocateWidget from './components/LocatWidget'

// 导出 ArcMap 组件
export default {
    name: 'ArcMap',
    data() {
        return {
            tmap: TMap.getInstance()
        }
    },
    components: {
        LineShapeLayer,
        BasemapToggle,
        BasemapGallery,
        ProvPolygonLayer,
        CoordsWidget,
        LocateWidget
    },
    mounted() {
        this.tmap.components = {...this.$children}
    },
    watch: {
        'tmap.ready': function() {
            const $attribution = document.getElementsByClassName('esri-attribution')[0]
            $attribution.innerHTML = "Powered by Tishacy"
            $attribution.style.display = "block"
            $attribution.style.textAlign = "right"
            $attribution.style.padding = "0 1rem"
        }
    },
    destroyed() {
        TMap.destroy()
    }
}
</script>

<style lang="stylus" scoped>
    @import "https://js.arcgis.com/4.14/esri/css/main.css"
    
    #mapContainer
    >>> *:focus
        outline none

    #mapContainer
        margin 4rem auto
        width 50%
        height 60rem
        // background-color #888
        // border 1px solid black
        box-shadow 0 .2rem 1.2rem 0 rgba(0, 0, 0, 0.1)
    
    #back-to-home-button
        position absolute
        left 3rem
        top 3rem
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        font-size 1.8rem

</style>