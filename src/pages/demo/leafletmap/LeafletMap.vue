<template>
    <div id="main">
        <div id="map-container">Leaflet Map</div>
    </div>
</template>

<script>
import L from 'leaflet'
import * as esri from 'esri-leaflet'

L.esri = esri

export default {
    data() {
        return {

        }
    },
    components: {
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            let map = L.map("map-container", {center: [29.65, 121.43000014], zoom: 9});
            L.tileLayer(
                "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", 
                {attribution: "&copy; OpenStreetMap"}
            ).addTo(map);

            L.esri.featureLayer({
                url: "http://10.189.52.124:6080/arcgis/rest/services/playground/NingboCounty/MapServer/0",
                style: function(feature) {
                    if (feature.properties['行政编'] == '330281') {
                        return { color: "#7b4ecb", weight: 0.5 }
                    }
                    return { color: "#7bcb4e", weight: 0.5 }                
                },
            }).addTo(map);

            // L.esri.featureLayer({
            //     // url: "http://10.75.69.201:6080/arcgis/rest/services/soilbigdata/china_pro/MapServer/0",
            //     url: "https://services1.arcgis.com/nc9kTdKLRHo08Sxa/arcgis/rest/services/%E5%85%AC%E4%BA%A4%E7%BA%BF%E8%B7%AF/FeatureServer/0",
            //     style: function (feature) {
            //         // console.log(feature);
            //         return { color: "#7b4ecb", weight: 0.5 }
            //         // if (feature.properties['省'] == '浙江省') {
            //         //     return { color: "#7bcb4e", weight: 0.5 }
            //         // } else {
            //         //     return { color: '#3a3a3a', weight: 0.5 }
            //         // }
            //     },
            // }).addTo(map);

            // L.esri.featureLayer({
            //     url: "https://services9.arcgis.com/wAq8rwkd3uYetVHo/arcgis/rest/services/%E6%AD%A6%E6%B1%89%E5%B0%8F%E5%8C%BA%E6%95%B0%E6%8D%AE/FeatureServer/0",
            //     pointToLayer: function (geojson, latlng) {
            //         let config = {
            //             // pane: 'blockpoints',
            //             radius: 0.1,
            //             opacity: 0,
            //             fillOpacity: 0.5,
            //         }
            //         if (geojson.properties['均价'] > 10000) {
            //             config['color'] = '#7bcb4e'
            //         } else {
            //             config['color'] = '#cb4e4e'
            //         }
            //         return L.circleMarker(latlng, config)
            //     }
            // }).addTo(map);
        }
    }
}
</script>

<style scoped lang="stylus">
    @import "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"

    #main
        background-color #0a0a0a
        width 100%
        height 100%
        overflow hidden
    #map-container
        width 80%
        height 80%
        margin 50px auto
        background-color #fff
        
</style>