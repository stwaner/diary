import Vue from 'vue'
import Router from 'vue-router'
import routes from '../router/router'
import store from '../store/index'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  console.log(location, '------------location')
  return originalPush.call(this, location).catch(err => console.log(err))
}

const router = new Router({
  // mode: 'history',
  mode: 'hash',
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

const loginPath = '/user/login'

// 全局路由守卫
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
    document.title = to.meta.title
  }
  const token = store.state.token ? store.state.token : localStorage.getItem('token')
  console.log(token)
  if (token) {
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
      if (to.path === loginPath) { // 判断缓存里面是否有 userName  //在登录的时候设置它的值
        next({ path: '/home' })
      } else {
        next()
      }
    } else {
      next({ path: '/home' })
    }
  } else {
    if (to.path == loginPath) {
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
    }
  }
  // if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
  //   console.log(token)
  //   if (token) { // 判断缓存里面是否有 userName  //在登录的时候设置它的值
  //     console.log('1111')
  //     next()
  //   } else {
  //     console.log('2222')
  //     // 将跳转的路由path作为参数，登录成功后跳转到该路由
  //     next({ path: '/user/login', query: { redirect: to.fullPath } })
  //   }
  // } else {
  //   next()
  // }
  // const nextRoute = [ 'home' ];
  // let isLogin = global.isLogin;  // 是否登录
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  // if (nextRoute.indexOf(to.name) >= 0) {  
  //  if (!isLogin) {
  //    console.log('what fuck');
  //    router.push({ name: 'login' })
  //  }
  // }
    // 已登录状态；当路由到login时，跳转至home 
  // if (to.name === 'login') {
  //  if (isLogin) {
  //    router.push({ name: 'home' });
  //  }
  // }
  next()
})

router.afterEach(route => {
  // document.title = route.meta.title;
  window.scrollTo(0, 0)
})

export default router
