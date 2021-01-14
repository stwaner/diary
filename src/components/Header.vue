<template>
  <header>
    <div class="row">
      <div class="twelve columns header-wrap">
        <div class="global-search">
          <!-- <el-input @click="globalSerarch" placeholder="全局搜索" /> -->
          <el-autocomplete
            v-model="keywords"
            :fetch-suggestions="querySearchAsync"
            placeholder="全局搜索"
            @select="handleSelect"
            @input="loadAll"
          ></el-autocomplete>
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
              <router-link :to="{ path: item.path }">{{ item.title }}</router-link>
              <ul class="sub-li" v-if="item.subNav">
                <li
                  v-for="(sub, i) in item.subNav"
                  :key="i"
                >
                  <a href="javascript:;" @click.stop="toPath(sub.path)">{{ sub.title }}</a>
                </li>
              </ul>
            </li>
            <div class="user">
              <li><img src="../assets/images/author-img.png" alt=""> <span>{{ userName }}</span></li>
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
import { searchWebsite } from '@/api/public'
export default {
  data () {
    return {
      nav: [
        { title: '首页', path: '/home' },
        { title: '日记', path: '/journal', subNav: [{ title: '新建日记', path: '/journal/update' }] },
        { title: '学习', path: '/learn', subNav: [{ title: '新建学习计划', path: '/learn/update' }] },
        { title: '游记', path: '/travels' },
        { title: '消费', path: '/fee', subNav: [{ title: '消费统计', path: '/fee/static' }] }
      ],
      navIndex: 0,
      keywords: '',
      restaurants: [],
      state: '',
      timeout:  null
    }
  },
  computed: {
    userName () {
      return (JSON.parse(window.localStorage.getItem('userInfo'))).nickName || this.$store.state.login.userInfo.userName
    }
  },
  mounted() {
    // this.loadAll()
  },
  methods: {
    routerLink (index, path) {
      this.navIndex = index
      this.$router.push(path)
    },
    toPath (path) {
      this.$router.push(path)
    },
    handleLogOut () {
      this.$confirm('确认要退出吗？').then(_ => {
        logout().then(res => {
          if (res.code === 200) {
            this.$store.dispatch('login/setUserStatus', null)
            this.$router.push({ path: '/login' })
          }
        })
        done()
      }).catch(_ => {})
    },
    loadAll() {
      searchWebsite({ keywords: this.keywords }).then(res => {
        this.restaurants = res.data
      })
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      // var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
      var results = queryString ? this.formatterData(restaurants) : []

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    formatterData (data) {
      return data.map(item => {
        if (item.keywords) {
          return {
            'value' : item.keywords,
            'id': item.relationId,
            'tableId': item.relationTable
          }
        }
      })
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.keywords.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      }
    },
    handleSelect(item) {
      /**
       * 1：日记
       * 2：消费
       * 3：学习
       * 4：游记
       */
      console.log(item)
      let routerLink = ''
      switch (item.tableId) {
        case 1:
          routerLink = '/journal/update';
          this.$router.push({ path: routerLink, query: { diaryId : item.id } });
          break;
        case 2:
          routerLink = '/fee';
          this.$router.push({ path: routerLink, query: { cid : item.id } });
          break;
        case 3:
          routerLink = '/learn/update';
          this.$router.push({ path: routerLink, query: { learnId : item.id } })
          break;
        case 4:
          routerLink = '/travels/detail';
          this.$router.push({ path: routerLink, query: { travelId : item.id } })
          break;
      }
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
    height: 33px;
    padding: 0 10px;
    &:hover{
      .user-manage{
        // opacity: 1;
        // filter: alpha(opacity=100);
        display: block;
        li{
          height: 42px;
          overflow: visible;
          border-bottom: 1px solid #26272C;
          &:last-child{
            border: none;
          }
        }
      }
    }
    img{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .user-manage{
      position: absolute;
      top: 40px;
      left: 0;
      background: #1f2024;
      text-align: center;
      min-width: 110%;
      border-radius: 0 0 3px 3px;
      display: none;
      // opacity: 0;
      // filter: alpha(opacity=0);
      -webkit-transition: opacity .25s ease .1s;
      -moz-transition: opacity .25s ease .1s;
      -o-transition: opacity .25s ease .1s;
      -ms-transition: opacity .25s ease .1s;
      transition: opacity .25s ease .1s;
       li {
        padding: 0;
        display: block;
        text-align: left;
        /* for transition effects */
        height: 0;
        overflow: hidden;
        -webkit-transition: height .25s ease .1s;
        -moz-transition: height .25s ease .1s;
        -o-transition: height .25s ease .1s;
        -ms-transition: height .25s ease .1s;
        transition: height .25s ease .1s;
        a {
          padding: 6px 15px;
          margin: 0;
          white-space: nowrap;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
