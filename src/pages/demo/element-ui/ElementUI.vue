<template>
    <div>
        <home-header :title="title"></home-header>
        <div class="main">
            <el-button-demo></el-button-demo>
            <layout-demo></layout-demo>
            <container-demo></container-demo>
        </div>
    </div>
</template>

<script>
import HomeHeader from '../../home/components/Header'
import ElButtonDemo from './components/ElButton'
import LayoutDemo from './components/Layout'
import ContainerDemo from './components/Container'

export default {
    name: 'ElementUI',
    data () {
        return {
            title: 'Element UI Demo'
        }
    },
    components: {
        HomeHeader,
        ElButtonDemo,
        LayoutDemo,
        ContainerDemo
    }
}
</script>

<style lang="stylus" scoped>
    .main
        width 60%
        margin 8rem auto
</style>