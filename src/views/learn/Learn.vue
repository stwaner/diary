<template>
  <div>
    <page-header></page-header>
    <div class="home">
      <section id="info">
        <div class="row">
          <div class="bgrid-quarters s-bgrid-halves">
            <div class="columns">
              <h2 @click="getLearnList()">Clean & Modern.</h2>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit. Cum sociis natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus.
              </p>
            </div>
            <div class="columns">
              <h2>Responsive.</h2>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit. Cum sociis natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus.
              </p>
            </div>
            <div class="columns s-first">
              <h2>HTML5 + CSS3.</h2>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit. Cum sociis natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus.
              </p>
            </div>
            <div class="columns">
              <h2>Free of Charge.</h2>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit. Cum sociis natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="journal">
        <div class="row">
          <div class="twelve columns align-center">
            <h1>Our latest posts and rants.</h1>
          </div>
        </div>

        <div class="blog-entries">
          <!-- Entry -->
          <article class="row entry" v-for="item in list" :key="item.learnId">
            <div class="entry-header">
              <div class="permalink">
                <a><i class="fa fa-link"> <img v-bind:src="item.avatar"/></i
                ></a>
              </div>

              <div class="ten columns entry-title pull-right">
                <h3>
                  <a
                    href="single.html"
                    tppabs="https://www.freemoban.com/preview/201611132213/single.html"
                    >Proin gravida nibh vel velit auctor aliquet Aenean
                    sollicitudin auctor.</a
                  >
                </h3>
              </div>

              <div class="two columns post-meta end">
                <p>
                  <time datetime="2014-01-31" class="post-date" pubdate=""
                    >Jan 31, 2014</time
                  >
                  <span class="dauthor">By Sakura Haruno</span>
                </p>
              </div>
            </div>

            <div class="ten columns offset-2 post-content">
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate.
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium.
                <a
                  class="more-link"
                  href="single.html"
                  tppabs="https://www.freemoban.com/preview/201611132213/single.html"
                  >Read More<i class="fa fa-arrow-circle-o-right"></i
                ></a>
              </p>
            </div>
          </article>
          <!-- Entry End -->
        </div>
        <!-- Entries End -->
      </section>
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
import pageHeader from "../../components/Header.vue";
import pageFooter from "../../components/Footer.vue";
import { findLearn } from "@/api/learn";
export default {
  name: "Learn",
  components: {
    pageHeader,
    pageFooter,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    getLearnList() {
      findLearn().then((res) => {
        if (res.code == 200) {
          this.list = res.data;
          console.table(this.list)
        } else {
          alert(22);
        }
      });

    },
  },
};
</script>

<style lang="scss">
@import "../../assets/css/default.css";
@import "../../assets/css/layout.css";
</style>
