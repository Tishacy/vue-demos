<template>
    <div></div>
</template>

<script>
import TMap from '../initMap'

export default {
    data() {
        return {
            tmap: TMap.getInstance(),
        }
    },
    watch: {
        'tmap.ready': function() {
            this.init()
        }
    },
    methods: {
        init() {
            const FeatureLayer = this.tmap.modules.FeatureLayer
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
            this.tmap.map.add(lineShapeLayer, 10);
        }
    }
}
</script>

<style lang="stylus" scoped>

    button 
        position absolute
        top 10rem
        left 10rem
</style>