import Vue from 'vue'
import Router from 'vue-router'
import routes from '../router/router'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: routes,
  scrollBehavior (to, from, savedPosition){
    if (savedPosition) {
      return savedPosition
    }   else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
    document.title = to.meta.title
  }
//   const nextRoute = ['home'];
  // let isLogin = global.isLogin;  // 是否登录
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
//if (nextRoute.indexOf(to.name) >= 0) {  
//  if (!isLogin) {
//    console.log('what fuck');
//    router.push({ name: 'login' })
//  }
//}
  // 已登录状态；当路由到login时，跳转至home 
//if (to.name === 'login') {
//  if (isLogin) {
//    router.push({ name: 'home' });
//  }
//}
  next();
});

router.afterEach(route => {
  // document.title = route.meta.title;
  window.scrollTo(0, 0);
});

export default router
