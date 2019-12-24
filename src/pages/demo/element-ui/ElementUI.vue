<template>
    <div>
        <home-header :title="title"></home-header>
        <div class="main">
            <button-demo></button-demo>
            <layout-demo></layout-demo>
            <container-demo></container-demo>
        </div>
    </div>
</template>

<script>
import HomeHeader from '../../home/components/Header'
import ButtonDemo from './components/Button'
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
        ButtonDemo,
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