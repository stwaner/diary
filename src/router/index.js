import Vue from 'vue'
import Router from 'vue-router'
import routes from '../router/router'
import store from '../store/index'
Vue.use(Router)

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   console.log(location, '------------location')
//   return originalPush.call(this, location).catch(err => console.log(err))
// }

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
  if (token === 'undefined' || token === 'null' || token == null) {
    if (to.path === loginPath || to.path === '/user/register') {
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
    }
  } else {
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
      store.dispatch('login/GetInfo').then(user => {
        if (to.path === loginPath) { // 判断缓存里面是否有 userName  //在登录的时候设置它的值
          next({ path: '/home' })
        } else {
          next()
        }
      }).catch(() => {
        next({ name: 'Login' })
      })
    } else {
      next()
    }
  }
  next()
})

router.afterEach(route => {
  window.scrollTo(0, 0)
})

export default router
