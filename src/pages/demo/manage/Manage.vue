<template>
    <div class="main">
        <el-container>
            <el-aside width="20%" style="min-width: 140px; height: 100%">
                <el-menu
                    :default-active="$route.path"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item 
                        v-for="item in menuItems"
                        :key="item.router"
                        :index="item.router">
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
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
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
                name: "图表展示",
                router: "/manage/chart",
                icon: "el-icon-pie-chart"
            },{
                name: "表格",
                router: "/manage/table",
                icon: "el-icon-menu"
            },{
                name: "图片列表",
                router: "/manage/imageList",
                icon: "el-icon-picture"
            }]
        }
    },
    mounted () {
        console.log(this.$route);
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