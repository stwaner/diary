const routes = [
  {
    path: '/',
    redirect: '/user'
  }, {
    path: '/user',
    name: 'Main',
    component: resolve => require(['@/views/user/Main.vue'], resolve),
    redirect: '/user/login',
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
    name: 'Editor',
    component: () => import(/* webpackChunkName: 'user' */ '@/test/Editor.vue'),
    meta: { title: '测试', keepAlive: true }
  }, {
    path: '/learn',
    name: 'Learn',
    component: () => import(/* webpackChunkName: 'user' */ '@/views/learn/Index.vue'),
    meta: { title: '学习天地', keepAlive: true }
  }, {
    path: '/learn/update',
    name: 'LearnUpdate',
    component: () => import(/* webpackChunkName: 'user' */ '@/views/learn/LearnUpdate.vue'),
    meta: { title: '学习天地', keepAlive: true }
  }, {
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
