<template>
    <div class="header">
        <router-link
            tag="div"
            to="/"
            class="header-left">
            <div class="header-icon-wrapper">
                <img :src="iconSrc" alt="" class="header-icon">
            </div>
            <div class="header-title">{{ title }}</div>
        </router-link>
    </div>
</template>

<script>
import iconSrc from '@/assets/logo.svg'

export default {
    name: 'HomeHeader',
    props: {
        title: {
            type: String,
            default () {
                return 'DAVC'
            }
        }
    },
    data () {
        return {
            iconSrc,
        }
    }
}
</script>

<style lang="stylus" scoped>
    .header
        z-index 1
        width 100%
        height 6rem
        background-color #223
        line-height 6rem
        position absolute
        top 0
        color #fff
        .header-left
            position absolute
            left 0
            top 0
            margin 0 2rem
            height 100%
            display flex
            align-items center
            cursor pointer
            .header-icon-wrapper
                width 6rem
                height 100%
                display flex
                align-items center
                .header-icon
                    width 100%
            .header-title
                font-size 1.4rem
                font-family Arial, Helvetica, sans-serif
                letter-spacing 0.2rem
</style>