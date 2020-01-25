import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home/Home'
import HelloWorld from '@/pages/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/hello-world',
      name: 'hello-world',
      component: HelloWorld
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/pages/demo/Demo'),
      children: [
        {
          path: 'element-ui',
          name: 'element-ui',
          component: () => import('@/pages/demo/element-ui/ElementUI')
        },
        {
          path: 'manage',
          name: 'manage',
          component: () => import('@/pages/demo/manage/Manage')
        }
      ]
    },
    // {
    //   path: '/demo/element-ui',
    //   name: 'element-ui',
    //   component: () => import('@/pages/demo/element-ui/ElementUI')
    // }
  ]
})
