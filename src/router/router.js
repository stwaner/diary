const routes = [
  {
    path: '/',
    name: 'Index',
    component: resolve => require(['@/views/Index.vue'], resolve),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: resolve => require(['@/views/Home.vue'], resolve),
        meta: { title: '首页', keepAlive: true, requireAuth: true }
      }, {
        path: 'learn',
        name: 'Learn',
        component: resolve => require(['@/views/learn/Index.vue'], resolve),
        meta: { title: '学习天地', keepAlive: true, requireAuth: true }
      }
    ]
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
    path: '/test',
    name: 'Editor',
    component: () => import(/* webpackChunkName: 'user' */ '@/test/Editor.vue'),
    meta: { title: '测试', keepAlive: true }
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
