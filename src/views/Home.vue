<template>
  <div>
    <page-header></page-header>
    <div class="home">
      <section id="info">
        <div class="row">
          <div class="bgrid-quarters s-bgrid-halves">
            <div class="columns">
              <h2>Clean & Modern.</h2>
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              </p>
            </div>
            <div class="columns">
              <h2>Responsive.</h2>
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              </p>
            </div>
            <div class="columns s-first">
              <h2>HTML5 + CSS3.</h2>
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              </p>
            </div>
            <div class="columns">
              <h2>Free of Charge.</h2>
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              </p>
            </div>
            </div>
        </div>
      </section>
      <section id="works">
        <div class="row">
          <div class="twelve columns align-center">
              <h1>Some of our recent works.</h1>
          </div>
          <div id="portfolio-wrapper" class="bgrid-quarters s-bgrid-halves">
            <div class="columns portfolio-item">
                <div class="item-wrap">
                <a href="portfolio.html" tppabs="https://www.freemoban.com/preview/201611132213/portfolio.html">
                      <img alt="" src="../assets/images/portfolio/geometrics.jpg" tppabs="https://www.freemoban.com/preview/201611132213/images/portfolio/geometrics.jpg">
                      <div class="overlay"></div>
                      <div class="link-icon"><i class="fa fa-link"></i></div>
                    </a>
                <div class="portfolio-item-meta">
                  <h5><a href="portfolio.html" tppabs="https://www.freemoban.com/preview/201611132213/portfolio.html">Geometrics</a></h5>
                      <p>Illustration</p>
                </div>
                </div>
            </div>
              <div class="columns portfolio-item">
                <div class="item-wrap">
                <a href="portfolio.html" tppabs="https://www.freemoban.com/preview/201611132213/portfolio.html">
                      <img alt="" src="../assets/images/portfolio/console.jpg" tppabs="https://www.freemoban.com/preview/201611132213/images/portfolio/console.jpg">
                      <div class="overlay"></div>
                      <div class="link-icon"><i class="fa fa-link"></i></div>
                    </a>
                <div class="portfolio-item-meta">
                  <h5><a href="portfolio.html" tppabs="https://www.freemoban.com/preview/201611132213/portfolio.html">Console</a></h5>
                      <p>Web Development</p>
                </div>
                </div>
            </div>
              <div class="columns portfolio-item s-first">
                <div class="item-wrap">
                <a href="portfolio.html" tppabs="https://www.freemoban.com/preview/201611132213/portfolio.html">
                      <img alt="" src="../assets/images/portfolio/camera-man.jpg" tppabs="https://www.freemoban.com/preview/201611132213/images/portfolio/camera-man.jpg">
                      <div class="overlay"></div>
                      <div class="link-icon"><i class="fa fa-link"></i></div>
                    </a>
                <div class="portfolio-item-meta">
                  <h5><a href="portfolio.html" tppabs="https://www.freemoban.com/preview/201611132213/portfolio.html">Camera Man</a></h5>
                      <p>Photography</p>
                </div>
                </div>
            </div>
              <div class="columns portfolio-item">
                <div class="item-wrap">
                <a href="portfolio.html" tppabs="https://www.freemoban.com/preview/201611132213/portfolio.html">
                      <img alt="" src="../assets/images/portfolio/into-the-light.jpg" tppabs="https://www.freemoban.com/preview/201611132213/images/portfolio/into-the-light.jpg">
                      <div class="overlay"></div>
                      <div class="link-icon"><i class="fa fa-link"></i></div>
                    </a>
                <div class="portfolio-item-meta">
                  <h5><a href="portfolio.html" tppabs="https://www.freemoban.com/preview/201611132213/portfolio.html">Into The Light</a></h5>
                      <p>Branding</p>
                </div>
                </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 学习天地 -->
      <learn-part :learnList="learnList"></learn-part>
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
import { findLearn } from "@/api/learn"

import pageHeader from '../components/Header.vue'
import pageFooter from '../components/Footer.vue'
import LearnPart from './learn/Learn.vue'

export default {
  name: 'Home',
  data () {
    return {
      learnList: []
    }
  },
  components: {
    pageHeader,
    pageFooter,
    LearnPart
  },
  created () {
    this.getLearnList()
  },
  methods: {
    // 获取学习天地列表
    getLearnList () {
      findLearn().then(res => {
        if (res.code === 200) {
          this.learnList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/css/default.css';
  @import '../assets/css/layout.css';
</style>
