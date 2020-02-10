import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/manage',
      name: 'manage',
      component: () => import('@/pages/demo/manage/Manage'),
      redirect: '/manage/chart',
      children: [
        {
          path: 'chart',
          name: 'chart',
          component: () => import('@/pages/demo/manage/components/Chart')
        },
        {
          path: 'table',
          name: 'table',
          component: () => import('@/pages/demo/manage/components/Table')
        },
        {
          path: 'imageList',
          name: 'imageList',
          component: () => import('@/pages/demo/manage/components/ImageList')
        }
      ]
    },{
      path: '/map',
      name: 'map',
      component: () => import('@/pages/demo/map/Map')
    },{
      path: '/demo',
      name: 'demo',
      component: () => import('@/pages/demo/Demo'),
      children: [
        {
          path: 'element-ui',
          name: 'element-ui',
          component: () => import('@/pages/demo/element-ui/ElementUI')
        },
      ]
    },
    // {
    //   path: '/demo/element-ui',
    //   name: 'element-ui',
    //   component: () => import('@/pages/demo/element-ui/ElementUI')
    // }
  ]
})
