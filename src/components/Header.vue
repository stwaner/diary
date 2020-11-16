<template>
  <header>
    <div class="row">
      <div class="twelve columns header-wrap">
        <div class="global-search">
          <el-input placeholder="全局搜索" />
        </div>
        <!-- <div class="logo">
          <router-link tag="a" :to="{path:'/home'}">
            <img alt="" src="../assets/images/logo.png">
          </router-link>
        </div> -->
        <nav id="nav-wrap">
          <ul id="nav" class="nav">
            <li
              :class="navIndex === index ? 'current' : ''"
              v-for="(item, index) in nav"
              :key="index"
              @click="routerLink(index, item.path)"
            >
              <!-- <span v-if="item.subNav"><router-link :to="item.path">{{ item.title }}</router-link></span> -->
              <router-link :to="item.path">{{ item.title }}</router-link>
              <ul class="sub-li" v-if="item.subNav">
                <li
                  v-for="(sub, i) in item.subNav"
                  :key="i"
                >
                  <router-link :to="sub.path">{{ sub.title }}</router-link>
                </li>
              </ul>
            </li>
            <div class="user">
              <li><img src="../assets/images/author-img.png" alt=""> <span>婉儿</span></li>
              <ul class="user-manage">
                <li><a href="">个人中心</a></li>
                <li @click="handleLogOut"><a href="javascript:;">退出登录</a></li>
              </ul>
            </div>
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
        { title: '日记', path: '/journal', subNav: [{ title: '新建日记', path: '/journal/update' }] },
        { title: '学习', path: '/learn', subNav: [{ title: '新建学习计划', path: '/learn/update' }] },
        { title: '游记', path: '/travels' },
        { title: '记事本', path: '/note' },
        { title: '生活费', path: '/fee' }
      ],
      navIndex: 0
    }
  },
  methods: {
    routerLink (index, path) {
      this.navIndex = index
      console.log(path)
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
    width: 25%;
    // margin-left: 150px;
  }
  .user{
    position: relative;
    display: inline-block;
    &:hover{
      .user-manage{
        display: block;
        height: auto;
        opacity: 1;
      }
    }
    img{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .user-manage{
      display: none;
      height: 0;
      position: absolute;
      top: 40px;
      left: 0;
      background: #1f2024;
      text-align: center;
      width: 120%;
      -webkit-transition: all .2s ease-in-out;
      -moz-transition: all .2s ease-in-out;
      -o-transition: all .2s ease-in-out;
      -ms-transition: all .2s ease-in-out;
      transition: all .2s ease-in-out;
      li{
        height: 36px!important;
        color: #fff;
        a{
          line-height: 22px!important;
          
        }
      }
    }
  }
}
</style>
