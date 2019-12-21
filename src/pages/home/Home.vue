<template>
    <div class="home">
        <home-header :title="title"></home-header>
        <div class="content">
            <h1 class="title">Demos of Awesome Vue Components</h1>
            <p>一个瀑布流组件</p>
            <p>一个子内容组件</p>
            <ul class="repo-list">
                <li class="repo-item" v-for="(item, i) in repos"
                    :key="i">
                    {{ item.name }} : 
                    {{ item.desc }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import HomeHeader from './components/Header'

export default {
    name: 'Home',
    data () {
        return {
            repos: [{
                'name': 'vue-avatar',
                'url': 'https://eliep.github.io/vue-avatar/',
                'desc': 'An avatar component for vue.js',
            },{
                'name': 'vue-avatar',
                'url': 'https://eliep.github.io/vue-avatar/',
                'desc': 'An avatar component for vue.js',
            },{
                'name': 'vue-avatar',
                'url': 'https://eliep.github.io/vue-avatar/',
                'desc': 'An avatar component for vue.js',
            },{
                'name': 'vue-avatar',
                'url': 'https://eliep.github.io/vue-avatar/',
                'desc': 'An avatar component for vue.js',
            },{
                'name': 'vue-avatar',
                'url': 'https://eliep.github.io/vue-avatar/',
                'desc': 'An avatar component for vue.js',
            }],
            title: 'DAVC'
        }
    },
    components: {
        HomeHeader
    }
}
</script>

<style lang="stylus" scoped>
    .content
        margin 3rem auto
        max-width 50rem
        min-width 40rem
        .title
            font-size 4rem
            font-weight 400
        .repo-list
            width 100%
            margin 3rem 0
            height 100rem
            .repo-item
                width 100%
                padding 1rem 2rem
                margin 1rem 0
                font-size 1.6rem
                border 1px solid #eee
                border-radius .6rem
</style>