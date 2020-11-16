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
      }, {
        path: 'learn/update',
        name: 'LearnUpdate',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/learn/LearnUpdate.vue'),
        meta: { title: '新建学习计划', keepAlive: true, requireAuth: true }
      }, {
        path: 'journal',
        name: 'Journal',
        component: resolve => require(['@/views/journal/Index.vue'], resolve),
        meta: { title: '我的日记', keepAlive: true, requireAuth: true }
      }, {
        path: 'journal/update',
        name: 'JournalUpdate',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/journal/LearnUpdate.vue'),
        meta: { title: '新建日记', keepAlive: true, requireAuth: true }
      }, {
        path: 'travels',
        name: 'Travels',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/travels/Index.vue'),
        meta: { title: '游记', keepAlive: true, requireAuth: true }
      }, {
        path: 'note',
        name: 'Note',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/note/Index.vue'),
        meta: { title: '记事本', keepAlive: true, requireAuth: true }
      }, {
        path: 'fee',
        name: 'Fee',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/fee/Index.vue'),
        meta: { title: '生活费', keepAlive: true, requireAuth: true }
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
