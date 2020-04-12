<template>
    <div id="prov-polygon-layer"></div>
</template>

<script>
import esriLoader from 'esri-loader'

export default {
    props: {
        tmap: {
            type: Object,
            required: true
        }
    },
    watch: {
        'tmap.ready': function() {
            this.init()
        }
    },
    methods: {
        init() {
            const _this = this
            esriLoader.loadModules(['esri/layers/FeatureLayer'])
            .then(([FeatureLayer]) => {
                const provPolygonLayer = new FeatureLayer({
                    url: "http://10.75.68.251:6080/arcgis/rest/services/csj/yrd_xzqh1/MapServer/0",
                    mode: FeatureLayer.MODE_SNAPSHOT,
                    id:"5.0",
                    outFields: ["*"],
                    opacity: 0.4
                })
                _this.tmap.map.add(provPolygonLayer)
            })
        }
    }   
}
</script>

<style scoped lang="stylus">

</style>