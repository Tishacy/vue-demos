<template>
    <demo-wrapper :title="title">
        <div slot="demo-content">
            <el-button 
                @click="show = !show"
                class="button"
                >Click Me
            </el-button>
            <span class="data">
                show: {{show}}
            </span>

            <div class="box-wrapper">
                <transition name="el-fade-in-linear">
                    <div v-show="show" class="transition-box">.el-fade-in-linear</div>
                </transition>
                <transition name="el-fade-in">
                    <div v-show="show" class="transition-box">.el-fade-in</div>
                </transition>
                <transition name="el-zoom-in-center">
                    <div v-show="show" class="transition-box">.el-zoom-in-center</div>
                </transition>
                <transition name="el-zoom-in-top">
                    <div v-show="show" class="transition-box">.el-zoom-in-top</div>
                </transition>
                <transition name="el-zoom-in-bottom">
                    <div v-show="show" class="transition-box">.el-zoom-in-bottom</div>
                </transition>
            </div>
        </div>
    </demo-wrapper>
</template>

<script>
import DemoWrapper from './DemoWrapper'

export default {
    name: 'ElButtonDemo',
    data () {
        return {
            title: 'Button and transition demo',
            show: true
        }
    },
    components: {
        DemoWrapper
    }
}
</script>

<style lang="stylus" scoped>
    .data
        display inline-block
        padding-left 2rem
    .box-wrapper
        width 100%
        display flex
        flex-wrap wrap
        justify-content center
        margin-top 2rem
        .transition-box
            width 14.5rem
            margin 0 2rem 1rem 0
            padding 4rem 2rem
            background-color #409eff
            color #ffffff
            font-size 1.6rem
            text-align center
            border-radius .4rem
</style>