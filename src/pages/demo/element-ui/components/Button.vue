<template>
    <demo-wrapper :title="title">
        <demo-wrapper
            class="sub-demo-1"
            slot="demo-content"
            :title="'1. Transition demo'"
            :titleSize="'13px'">
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
        <demo-wrapper 
            class="sub-demo-2"
            slot="demo-content"
            :title="'2. Various buttons'"
            :titleSize="'13px'">
            <div slot="demo-content">
                <el-row>
                    <el-button class="btn">默认按钮</el-button>
                    <el-button type="primary" class="btn">主要按钮</el-button>
                    <el-button type="success" class="btn">成功按钮</el-button>
                    <el-button type="info" class="btn">信息按钮</el-button>
                    <el-button type="warning" class="btn">警告按钮</el-button>
                    <el-button type="danger" class="btn">危险按钮</el-button>
                </el-row>
                <el-row>
                    <el-button class="btn" plain>默认按钮</el-button>
                    <el-button type="primary" class="btn" plain>主要按钮</el-button>
                    <el-button type="success" class="btn" plain>成功按钮</el-button>
                    <el-button type="info" class="btn" plain>信息按钮</el-button>
                    <el-button type="warning" class="btn" plain>警告按钮</el-button>
                    <el-button type="danger" class="btn" plain>危险按钮</el-button>
                </el-row>
                <el-row>
                    <el-button class="btn" round>默认按钮</el-button>
                    <el-button type="primary" class="btn" round>主要按钮</el-button>
                    <el-button type="success" class="btn" round>成功按钮</el-button>
                    <el-button type="info" class="btn" round>信息按钮</el-button>
                    <el-button type="warning" class="btn" round>警告按钮</el-button>
                    <el-button type="danger" class="btn" round>危险按钮</el-button>
                </el-row>
                <el-row>
                    <el-button class="circle-btn" icon="el-icon-search" circle></el-button>
                    <el-button type="primary" class="circle-btn" icon="el-icon-edit" circle></el-button>
                    <el-button type="success" class="circle-btn" icon="el-icon-check" circle></el-button>
                    <el-button type="info" class="circle-btn" icon="el-icon-message" circle></el-button>
                    <el-button type="warning" class="circle-btn" icon="el-icon-star-off" circle></el-button>
                    <el-button type="danger" class="circle-btn" icon="el-icon-delete" circle></el-button>
                </el-row>
                <el-row>
                    <el-button type="primary" class="btn" :loading="true">加载中</el-button>
                    <el-button class="btn" disabled>disabled</el-button>
                </el-row>
                <el-row>
                    <el-button>default</el-button>
                    <el-button size="medium">medium</el-button>
                    <el-button size="small">small</el-button>
                    <el-button size="mini">mini</el-button>
                </el-row>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-arrow-left" class="last-page-btn">上一页</el-button>
                    <el-button type="primary" class="next-page-btn">下一页<i class="el-icon-arrow-right"></i></el-button>
                </el-button-group>
            </div>
        </demo-wrapper>
    </demo-wrapper>
</template>

<script>
import DemoWrapper from './DemoWrapper'

export default {
    name: 'ButtonDemo',
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
    .sub-demo-1
        background #fff !important
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
    .sub-demo-2
        background #fff !important
        .el-button
            margin 1rem
            >>> span,
            >>> i
                font-size 1.4rem
        .last-page-btn
            margin-right 0
        .next-page-btn
            margin-left 0
</style>