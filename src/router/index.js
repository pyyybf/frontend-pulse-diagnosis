import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/layout/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/login'),
      meta: {title: '古代脉诊知识资源数据库登录', noCache: true},
      hidden: true
    },
    {
      path: '/register',
      component: () => import('@/views/register'),
      meta: {title: '古代脉诊知识资源数据库注册', noCache: true},
      hidden: true
    },
    {
      path: '/admin',
      component: Layout,
      redirect: '/admin/home',
      children: [
        {
          path: 'home',
          component: () => import('@/views/admin/index'),
          name: '管理员主页',
          meta: {title: '管理员主页', noCache: true},
        },
        {
          path: 'userManage',
          component: () => import('@/views/admin/userManage/index'),
          name: '用户管理',
          meta: {title: '用户管理', noCache: true},
        },
        {
          path: 'permissionManage',
          component: () => import('@/views/admin/permissionManage/index'),
          name: '角色权限管理',
          meta: {title: '角色权限管理', noCache: true},
        },
        {
          path: 'termManage',
          component: () => import('@/views/admin/termManage/index'),
          name: '术语管理',
          meta: {title: '术语管理', noCache: true},
        },
        {
          path: 'diagramManage',
          component: () => import('@/views/admin/diagramManage/index'),
          name: '脉图管理',
          meta: {title: '脉图管理', noCache: true},
        },
        {
          path: 'questionManage',
          component: () => import('@/views/admin/questionManage/index'),
          name: '题库管理',
          meta: {title: '题库管理', noCache: true},
        },
        {
          path: 'ancientBookManage',
          component: () => import('@/views/admin/ancientBookManage/index'),
          name: '古籍管理',
          meta: {title: '古籍管理', noCache: true},
        },
        {
          path: 'modernTextManage',
          component: () => import('@/views/admin/modernTextManage/index'),
          name: '现代文献管理',
          meta: {title: '现代文献管理', noCache: true},
        },
        {
          path: 'structuredTextManage',
          component: () => import('@/views/admin/structuredTextManage/index'),
          name: '结构化文本管理',
          meta: {title: '结构化文本管理', noCache: true},
        },
      ]
    },
    {
      path: '/user',
      component: Layout,
    },
  ]
})
