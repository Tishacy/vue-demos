<template>
    <div class="home">
        <map-component class="echarts-map"></map-component>
    </div>
</template>

<script>
import MapComponent from './components/Map'

export default {
    name: "coronamap",
    components: {
        MapComponent
    }
}
</script>

<style lang="stylus" scoped>
    .echarts-map
        margin 20px auto
        width 600px
</style>