<template>
    <div class="demo-wrapper" :title="title">
        <h1 class="title">{{ title }}</h1>
        <slot name="demo-content"></slot>
    </div>
</template>

<script>
export default {
    name: 'DemoWrapper',
    props: {
        title: {
            type: String,
            default () {
                return 'Demo title'
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .demo-wrapper
        width 100%
        min-height 10rem
        margin 2rem auto
        padding 2rem
        background-color #fafafa
        border-radius .3rem
        border 1px solid #ebebeb
        &:hover
            box-shadow 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5)
            transition .2s
        .title
            margin-bottom 2rem
            font-size 1.4rem
            color #555
            font-weight 600
</style>