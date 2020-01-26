<template>
    <div class="main">
        <el-container>
            <el-aside width="20%" style="min-width: 140px; height: 100%">
                <el-menu
                    default-active="1"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item 
                        v-for="item in menuItems"
                        :key="item.index"
                        :index="item.index">
                        <router-link 
                            :to="item.router" 
                            tag="div"
                            class="link">
                            <i :class="item.icon"></i>
                            {{ item.name }}
                        </router-link>
                    </el-menu-item>
                </el-menu>                
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "Manage",
    data () {
        return {
            menuItems: [{
                index: "1",
                name: "图表展示",
                router: "/manage/chart",
                icon: "el-icon-pie-chart"
            },{
                index: "2",
                name: "表格",
                router: "/manage/table",
                icon: "el-icon-menu"
            },{
                index: "3",
                name: "图片列表",
                router: "/manage/imageList",
                icon: "el-icon-picture"
            }]
        }
    }
}
</script>

<style lang="stylus" scoped>
    *
        font-size 1.6rem
    .main
    .el-container
        height 100%
    .el-aside
        background-color #eee
        height 100%
        .el-menu-item
            padding 0 !important
            .link
                padding 0 2rem

        
</style>