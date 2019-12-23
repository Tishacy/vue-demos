<template>
    <demo-wrapper :title="title">
        <div slot="demo-content">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">basic layout</div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="18">
                    <div class="grid-content bg-purple">gutter</div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">gutter</div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content bg-purple">gutter</div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">gutter</div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">gutter</div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-light">gutter</div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" :offset="4">
                    <div class="grid-content bg-purple-light">offset</div>
                </el-col>
                <el-col :span="12" :offset="4">
                    <div class="grid-content bg-purple-light">offset</div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">flex</div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">flex: center</div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="end">
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">flex: end</div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">flex: space-between</div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">flex: space-around</div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
            </el-row>
        </div>
    </demo-wrapper>
</template>

<script>
import DemoWrapper from './DemoWrapper';

export default {
    name: 'LayoutDemo',
    data () {
        return {
            title: 'Layout demo'
        }
    },
    components: {
        DemoWrapper
    }    
}
</script>

<style lang="stylus" scoped>
    .el-row
        margin-bottom 2rem
    .grid-content
        min-height 3.6rem
        font-size 1.3rem
        color #444
        line-height 3.6rem
        text-align center
    .bg-purple-dark
        background #99a9bf
    .bg-purple
        background #d3dce6
    .bg-purple-light
        background #e5e9f2
    .row-bg
        background #eee
</style>