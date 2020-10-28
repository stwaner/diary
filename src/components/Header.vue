<template>
  <header>
    <div class="row">
      <div class="twelve columns">
        <div class="logo">
          <router-link tag="a" :to="{path:'/home'}">
            <img alt="" src="../assets/images/logo.png">
          </router-link>
        </div>
        <nav id="nav-wrap">
          <a class="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
          <a class="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>
          <ul id="nav" class="nav">
            <li class="current"><a href="#">Home</a></li>
            <li><span><a href="blog.html">Blog</a></span>
              <ul>
                <li><a href="blog.html">Blog Index</a></li>
                <li><a href="single.html">Post</a></li>
              </ul>
            </li>
            <li><span><a href="portfolio-index.html">Portfolio</a></span>
              <ul>
                <li><a href="portfolio-index.html">Portfolio Index</a></li>
                <li><a href="portfolio.html">Portfolio Entry</a></li>
              </ul>
            </li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="styles.html">Features</a></li>
            <li @click="handleLogOut"><a href="javascript:;">退出登录</a></li>
          </ul> <!-- end #nav -->
        </nav> <!-- end #nav-wrap -->
      </div>
    </div>
  </header>
</template>

<script>
import { logout } from '@/api/login'
export default {
  data () {
    return {

    }
  },
  methods: {
    handleLogOut () {
      this.$confirm('确认要退出吗？').then(_ => {
        logout().then(res => {
          if (res.code === 200) {
            this.$store.dispatch('setUserStatus', null)
            this.$router.push({ path:'/login' })
          }
        })
        done();
      }).catch(_ => {})
    }
  }
}
</script>

<style lang="scss">

</style>
