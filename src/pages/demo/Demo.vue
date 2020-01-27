<template>
    <el-container class="main">
        <el-header>
            <home-header class="home-header"></home-header>
        </el-header>
        <el-container>
            <el-aside :width="asideWidth + 'px'">
                <!-- <side-nav class="side-nav"></side-nav> -->
                <router-view></router-view>
            </el-aside>
            <el-main ref="demoMain">
                <button @click="toggleAside" class="contentsBtn iconfont">
                    &#xe62d;
                </button>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import HomeHeader from '@/global/Header'
import SideNav from '@/global/SideNav'

export default {
    data () {
        return {
            asideWidth: 0,
        }
    },
    methods: {
        toggleAside () {
            if (this.asideWidth === 320) {
                this.asideWidth = 0;
                this.$refs.demoMain.$el.style.paddingLeft = '0px'
            } else {
                this.asideWidth = 320;
                this.$refs.demoMain.$el.style.paddingLeft = '320px'
            }
        }
    },
    components: {
        HomeHeader,
        SideNav
    }
}
</script>

<style lang="stylus" scoped>
    .main
        background-color #eee
        .el-header
            padding 0
            height 100%
            .home-header
                position fixed
        .el-aside
            background-color #fff
            position fixed
            top 6rem
            bottom 0
            transition all .2s ease
        .el-main
            transition all .2s ease
            .contentsBtn
                position fixed
                margin-left 1rem
                width 4rem
                height 4rem
                padding 1rem
                border 1px solid #DCDFE6
                border-radius .4rem
                color #606266
                outline none 
                cursor pointer
                transition .1s
            .contentsBtn:hover
                    color: #409EFF;
                    border-color: #c6e2ff;
                    background-color: #ecf5ff;



</style>