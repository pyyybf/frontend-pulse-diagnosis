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
          path: 'ancientTextManage',
          component: () => import('@/views/admin/ancientTextManage/index'),
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
      redirect: '/user/home',
      children: [
        {
          path: 'home',
          component: () => import('@/views/user/index'),
          name: '用户主页',
          meta: {title: '用户主页', noCache: true},
        },
        {
          path: 'ancientText',
          component: () => import('@/views/user/ancientText/index'),
          name: '古籍阅读',
          meta: {title: '古籍阅读', noCache: true},
        },
        {
          path: 'modernText',
          component: () => import('@/views/user/modernText/index'),
          name: '现代文献阅读',
          meta: {title: '现代文献阅读', noCache: true},
        },
        {
          path: 'structuredText',
          component: () => import('@/views/user/structuredText/index'),
          name: '结构化文本阅读',
          meta: {title: '结构化文本阅读', noCache: true},
        },
        {
          path: 'term',
          component: () => import('@/views/user/term/index'),
          name: '段落分析',
          meta: {title: '段落分析', noCache: true},
        },
        {
          path: 'diagram',
          component: () => import('@/views/user/diagram/index'),
          name: '脉图分类',
          meta: {title: '脉图分类', noCache: true},
        },
        {
          path: 'question',
          component: () => import('@/views/user/question/index'),
          name: '在线练习',
          meta: {title: '在线练习', noCache: true},
          redirect:'/user/question/practiceList',
          children: [
            {
              path: 'practiceList',
              component: () => import('@/views/user/question/practiceList'),
              name: '练习记录',
              meta: {title: '练习记录', noCache: true},
            },
            {
              path: 'practiceDetail',
              component: () => import('@/views/user/question/practiceDetail'),
              name: '练习详情',
              meta: {title: '练习详情', noCache: true},
            },
            {
              path: 'newPractice',
              component: () => import('@/views/user/question/newPractice'),
              name: '新练习',
              meta: {title: '新练习', noCache: true},
            },
          ]
        },
      ]
    },
  ]
})
