<template>
  <header>
    <div class="row">
      <div class="twelve columns header-wrap">
        <div class="global-search">
          <el-input placeholder="全局搜索" />
        </div>
        <div class="logo">
          <router-link tag="a" :to="{path:'/home'}">
            <img alt="" src="../assets/images/logo.png">
          </router-link>
        </div>
        <nav id="nav-wrap">
          <!-- <a class="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
          <a class="mobile-btn" href="#" title="Hide navigation">Hide navigation</a> -->
          <ul id="nav" class="nav">
            <li
              :class="navIndex === index ? 'current' : ''"
              v-for="(item, index) in nav"
              :key="index"
              @click="routerLink(index, item.path)"
            >
              <span v-if="item.subNav"><router-link :to="{path: '/learn'}">{{ item.title }}</router-link></span>
              <router-link v-else :to="{path: '/learn'}">{{ item.title }}</router-link>
              <ul v-if="item.subNav">
                <li
                  v-for="(sub, i) in item.subNav"
                  :key="i"
                >
                  <router-link :to="{path: `${sub.path}`}">{{ sub.title }}</router-link>
                </li>
              </ul>
            </li>
            <li @click="handleLogOut"><a href="javascript:;">退出登录</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { logout } from '@/api/login'
export default {
  data () {
    return {
      nav: [
        { title: '首页', path: '/home' },
        { title: '日记', path: '/learn', subNav: [{ title: '日记列表', path: '/learn' }, { title: '新建日记', path: '/learn/update' }] },
        { title: '学习', path: '/learn', subNav: [{ title: '学习列表', path: '/learn' }, { title: '新建学习计划', path: '/learn/update' }] },
        { title: '游记', path: '/learn' },
        { title: '记事本', path: '/learn' },
        { title: '生活费', path: '/learn' }
      ],
      navIndex: 0
    }
  },
  methods: {
    routerLink (index, path) {
      this.navIndex = index
      this.$router.push(path)
    },
    handleLogOut () {
      this.$confirm('确认要退出吗？').then(_ => {
        logout().then(res => {
          if (res.code === 200) {
            this.$store.dispatch('setUserStatus', null)
            this.$router.push({ path: '/login' })
          }
        })
        done()
      }).catch(_ => {})
    }
  }
}
</script>

<style lang="scss">
.row,.twelve{
  height: 100%;
}
.header-wrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .global-search{
    width: 350px;
    margin-left: 150px;
  }
}
</style>
