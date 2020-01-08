<template>
    <div>
        <home-header :title="title"></home-header>
        <div class="main">
            <button-demo></button-demo>
            <layout-demo></layout-demo>
            <container-demo></container-demo>
            <form-demo></form-demo>
        </div>
    </div>
</template>

<script>
import HomeHeader from '../../home/components/Header'
import ButtonDemo from './components/Button'
import LayoutDemo from './components/Layout'
import ContainerDemo from './components/Container'
import FormDemo from './components/Form'

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
        ContainerDemo,
        FormDemo
    }
}
</script>

<style lang="stylus" scoped>
    .main
        min-width 500px
        width 50%
        margin 8rem auto
</style>