<template>
    <div class="home">
        <home-header :title="title"></home-header>
        <div class="content">
            <h1 class="title">{{ str }}{{ typeTag }}</h1>
            <ul class="repo-list">
                <router-link 
                    tag="li"
                    class="repo-item" 
                    v-for="(item, i) in repos"
                    :key="i"
                    :to="item.url">
                    {{ item.name }} : 
                    {{ item.desc }}
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
// when I don't wanna move you, just stop moving.
import HomeHeader from '@/global/Header'

export default {
    name: 'Home',
    data () {
        return {
            repos: [{
                'name': 'element-ui',
                'url': '/demo/element-ui',
                'desc': 'Element UI',
            },{
                'name': 'Manage',
                'url': '/manage',
                'desc': '数据管理系统'
            },{
                'name': 'Map',
                'url': '/map',
                'desc': '地图demos'
            },{
                'name': 'ArcMap',
                'url': '/arcmap',
                'desc': '地图demos - 单例模式'
            },{
                'name': 'NewMap',
                'url': '/newmap',
                'desc': '地图demos - 父传子'
            }],
            title: 'DAVC',
            str: 'Demos of Awesome Vue Components',
            typeTag: '_',
            timer: 0
        }
    },
    methods: {
        animateString (obj) {
            let { s, tagIntervel, textIntervel, waitTime, repeat } = obj,
                i = 0,
                len = s.length,
                waitTic = 0,
                backspace = false,
                wait = false,
                waitTics = Math.floor(waitTime / textIntervel);

            let tagTimer = setInterval(() => {
                this.typeTag = this.typeTag? '' : '_'
            }, tagIntervel)
            
            let textTimer = setInterval(() => {
                this.str = s.slice(0, i);
                if (!backspace && !wait) {
                    wait = (++i >= len);
                } else if (wait) {
                    if (!repeat) {
                        clearInterval(tagTimer);
                        clearInterval(textTimer);
                    }
                    if (waitTic++ > waitTics) {
                        wait = false
                        backspace = true
                        waitTic = 0
                    };
                } else {
                    backspace = !(--i <= 0);
                }
            }, textIntervel);
        }
    },
    components: {
        HomeHeader
    },
    mounted () {
        // this.animateString({
        //     s: this.str,
        //     tagIntervel: 300,
        //     textIntervel: 70,
        //     waitTime: 900,
        //     repeat: true
        // });
    }
}
</script>

<style lang="stylus" scoped>
    .content
        margin 8rem auto
        max-width 50rem
        min-width 40rem
        .title
            height 10rem
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