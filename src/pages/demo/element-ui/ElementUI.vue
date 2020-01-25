<template>
    <div class="main">
        页面重复展示次数：{{ count }} <br>
        api返回结果：{{ apiContent }}
        <button-demo></button-demo>
        <layout-demo></layout-demo>
        <container-demo></container-demo>
        <form-demo></form-demo>
    </div>
</template>

<script>
import ButtonDemo from './components/Button'
import LayoutDemo from './components/Layout'
import ContainerDemo from './components/Container'
import FormDemo from './components/Form'

export default {
    name: 'ElementUI',
    data () {
        return {
            title: 'Element UI Demo',
        }
    },
    computed: {
        count () {
            return this.$store.state.count
        },
        apiContent () {
            return this.$store.state.apiContent
        }
    },
    mounted () {
        this.$store.commit('increment');
        this.$store.dispatch('request')
        console.log(this.$store.state.count);
        console.log(this.$route.params)
    },
    components: {
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
        width 70%
        margin 0 auto
</style>