<template>
    <div class="main">
        <el-button-demo></el-button-demo>
        <layout-demo></layout-demo>
    </div>
</template>

<script>
import ElButtonDemo from './components/ElButton'
import LayoutDemo from './components/Layout'

export default {
    name: 'ElementUI',
    components: {
        ElButtonDemo,
        LayoutDemo
    }
}
</script>

<style lang="stylus" scoped>
    .main
        width 60%
        margin 0 auto
</style>