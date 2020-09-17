const routes = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'Login',
    // component: resolve => require(['@/views/user/Login.vue'], resolve),
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login.vue'),
    meta: {title: "登录", keepAlive: true},
  },{
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register.vue'),
    meta: {title: "注册", keepAlive: true},
  },{
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "user" */ '@/views/Home.vue'),
    meta: {title: "首页", keepAlive: true},
  },  {
    path: '/404',
    meta: {title: "404", keepAlive: true},
    component: resolve => require(['@/views/exception/404.vue'], resolve),
  }, {
    path: '*',
    meta: {title: "404", keepAlive: true},
    component: resolve => require(['@/views/exception/404.vue'], resolve),
  }
]

module.exports = routes;
