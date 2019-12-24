<template>
    <demo-wrapper :title="title">
        <demo-wrapper 
            class="sub-demo-1"
            slot="demo-content"
            :title="subTitles[0]" 
            :titleSize="subTitleSize">
            <div slot="demo-content">
                <el-container class="outer-container">
                    <el-header>Header</el-header>
                    <el-main>Main</el-main>
                    <el-footer>Footer</el-footer>
                </el-container>

                <el-container class="outer-container">
                    <el-header>Header</el-header>
                    <el-aside width="200px">Aside</el-aside>
                    <el-main>Main</el-main>
                </el-container>
                
                <el-container class="outer-container">
                    <el-header>Header</el-header>
                    <el-container>
                        <el-aside width="200px">Aside</el-aside>
                        <el-main>Main</el-main>
                    </el-container>
                    <el-footer>Footer</el-footer>
                </el-container>

                <el-container class="outer-container">
                    <el-header>Header</el-header>
                    <el-container>
                        <el-aside width="200px">Aside</el-aside>
                        <el-container>
                            <el-main>Main</el-main>
                            <el-footer>Footer</el-footer>
                        </el-container>
                    </el-container>
                </el-container>

                <el-container class="outer-container">
                    <el-aside width="200px">Aside</el-aside>
                    <el-container>
                        <el-header>Header</el-header>
                        <el-main>Main</el-main>
                        <el-footer>Footer</el-footer>
                    </el-container>
                </el-container>
            </div>
        </demo-wrapper>
        
        <demo-wrapper
            class="sub-demo-2"
            slot="demo-content"
            :title="subTitles[1]"
            :titleSize="subTitleSize">
            <div
                class="demo-info" 
                slot="demo-info">
                <h3>Extra points</h3>
                <ul>
                    <li>el-menu > el-submenu > el-menu-item-group > el-menu-item</li>
                    <li>el-dropdown > el-dropdown-menu > el-dropdown-item</li>
                    <li>el-table > el-table-column</li>
                </ul>
            </div>
            <div slot="demo-content">
                <el-container style="height: 50rem; background-color: rgb(238, 241, 246); border: 1px solid #eee">
                    <el-aside width="20%" style="min-width: 140px">
                        <el-menu :default-openeds="[]">
                            <el-submenu index="1">
                                <template slot="title"><i class="el-icon-message"></i>导航一</template>
                                <el-menu-item-group title="分组一">
                                    <el-menu-item index="1-1">选项1</el-menu-item>
                                    <el-menu-item index="1-2">选项2</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group title="分组二">
                                    <el-menu-item index="1-3">选项3</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="2">
                                <template slot="title"><i class="el-icon-menu"></i>导航二</template>
                                <el-menu-item
                                    v-for="(item, i) in subMenu"
                                    :key="i"
                                    :index="item.index">
                                    {{ item.content }}
                                </el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-aside>
                    <el-container style="background-color: #fff">
                        <el-header style="text-align: right">
                            <el-dropdown>
                                <i class="el-icon-setting" style="margin-right: .5rem"></i>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>查看</el-dropdown-item>
                                        <el-dropdown-item>新增</el-dropdown-item>
                                        <el-dropdown-item>删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                <span>王小虎</span>
                            </el-dropdown>
                        </el-header>
                        <el-main>
                            <el-table :data="tableData">
                                <el-table-column prop="date" label="日期" width="148"></el-table-column>
                                <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                                <el-table-column prop="address" label="地址"></el-table-column>
                            </el-table>
                        </el-main>
                    </el-container>
                </el-container>
            </div>
        </demo-wrapper>
    </demo-wrapper>
</template>

<script>
import DemoWrapper from './DemoWrapper'

export default {
    name: 'ContainerDemo',
    data () {
        const item = {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }
        return {
            title: 'Container demo',
            subTitles: ['1. Basic demo',
                        '2. Example demo'],
            subTitleSize: '13px',
            subMenu: [{
                'index': '2-1',
                'content': '选项1'
            }, {
                'index': '2-2',
                'content': '选项2'
            }],
            tableData: Array(20).fill(item)
        }
    },
    components: {
        DemoWrapper
    }
}
</script>

<style lang="stylus" scoped>
    *
        font-size 1.3rem
        color #333
    .sub-demo-1
        background-color #fff
        .el-header,
        .el-footer
            background-color #b3c0d1
            text-align center
            line-height 6rem
        .el-aside
            background-color #d3dce6
            text-align center
            line-height 20rem
        .el-main
            background-color #e9eef3
            text-align center
            line-height 16rem
        .outer-container
            margin-bottom 1rem
    
    .sub-demo-2
        background-color #fff
        .demo-info
            h3
                margin-bottom .5rem
            li
                &:before
                    content: ""
                    display inline-block
                    width .3rem
                    height .3rem
                    background-color #000
                    margin 0 1rem
                    vertical-align middle
                &:last-child
                    margin-bottom 2rem
                line-height 2.4rem

        .el-header
            background-color #b3c0d1
            line-height 6rem
</style>