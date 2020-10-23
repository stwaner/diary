const routes = [
  {
    path: '/',
    redirect: '/user'
  }, {
    path: '/user',
    name: 'Main',
    component: resolve => require(['@/views/user/Main.vue'], resolve),
    redirect: '/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: resolve => require(['@/views/user/Login.vue'], resolve),
        meta: { title: '登录', keepAlive: true }
      }, {
        path: 'register',
        name: 'Register',
        component: resolve => require(['@/views/user/Register.vue'], resolve),
        meta: { title: '注册', keepAlive: true }
      }
    ]
  }, {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: 'user' */ '@/views/Home.vue'),
    meta: { title: '首页', keepAlive: true, requireAuth: true } // requireAuth: true
  }, {
    path: '/test',
    name: 'TipTap',
    component: () => import(/* webpackChunkName: 'user' */ '@/test/TipTap.vue'),
    meta: { title: '测试', keepAlive: true }
  },  {
    path: '/404',
    component: resolve => require(['@/views/exception/404.vue'], resolve),
    meta: { title: '404', keepAlive: true }
  }, {
    path: '*',
    component: resolve => require(['@/views/exception/404.vue'], resolve),
    meta: { title: '404', keepAlive: true }
  }
]

module.exports = routes
