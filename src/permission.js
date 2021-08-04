import router from './router'
import store from './store'
import {Message} from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth' // get token from cookie

// NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login', '/register'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // console.log({
  //   to: to.path,
  //   from: from.path
  // })
  // start progress bar
  // NProgress.start()
  var toPath = to.path;

  if (from.path === '/' && (to.path.startsWith('/user/') || to.path.startsWith('/admin/'))) {
    toPath = `/${store.getters.roleScene.toLowerCase()}/home`;
  }

  // determine whether the user has logged in
  const hasToken = getToken()

  /**
   *  hasToken（即已登录）
   *     去login页面
   *         不需要新身份（即to.query.needNewRole=不存在）
   *             根据当前role重定向到首页
   *         需要新身份（即to.query.needNewRole=yes）
   *             next()
   *     去其它页面
   *         有权限
   *             next()
   *         无权限（to.path.startsWith('/admin')&&store.getters.role=USER）
   *             重定向到login页面（当前页面设为redirect，to.query.needNewRole设为yes）
   *  无hasToken（即未登录）
   *     不用登录的页面
   *         next()
   *     需要登录的页面
   *         重定向到login页面（当前页面设为redirect，to.query.needNewRole设为yes）
   */

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      if (to.query.needNewRole === 'yes') {
        next()
        // NProgress.done()
      } else {
        next({path: `/${store.getters.roleScene.toLowerCase()}`})
        // NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
      }
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roleScene && store.getters.roleScene.length > 0
      if (hasRoles && (!to.path.startsWith('/admin') || store.getters.roleScene === 'ADMIN')) {
        console.log('hasRoles: ' + store.getters.roleScene)
        if (toPath === to.path) {
          next()
        } else {
          next(toPath)
        }
      } else {
        Message.error("无权限访问，请重新登录")
        next({path: `/login?redirect=${to.path}`, query: {needNewRole: 'yes'}})
      }
    }
  } else {
    /* 注释登录权限if else has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      Message.error("未登录")
      next({path: `/login?redirect=${to.path}`, query: {needNewRole: 'yes'}})
      // NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
  // TODO: 更新store当前每个tag位置？
})
