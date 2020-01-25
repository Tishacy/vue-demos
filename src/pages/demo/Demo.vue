<template>
    <el-container>
        <el-header>
            <home-header></home-header>
        </el-header>
        <el-container>
            <el-aside :width="asideWidth + 'px'">
                <side-nav></side-nav>
            </el-aside>
            <el-main>
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
            this.asideWidth = (this.asideWidth === 320)? 0 : 320
        }
    },
    components: {
        HomeHeader,
        SideNav
    }
}
</script>

<style lang="stylus" scoped>
    .el-header
        padding 0
    .el-main
        height 824px
        // min-width 800px
        // box-shadow 0 0 30px 10px #eee
        border 1px solid #eee
    .el-aside
        height 824px
        max-width 20%
        transition all .2s ease
    .contentsBtn
        position fixed
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