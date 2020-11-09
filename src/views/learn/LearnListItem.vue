<template>
  <div>
    <section id="journal">
      <!-- <div class="row">
        <div class="twelve columns align-center">
          <h1 class="parg-title">学习天地</h1>
        </div>
      </div> -->
      <div class="blog-entries">
        <!-- Entry -->
        <article class="row entry" v-for="item in learnList" :key="item.learnId">
          <div class="entry-header">
            <div class="permalink">
              <a><img style="width:100%;height:100%;" :src="item.avatar" alt="" /></a>
            </div>
            <div class="ten columns entry-title pull-right">
              <h3>
                <router-link tag="a" :to="{path:'/learn'}">
                  {{ item.learnTitle }}
                </router-link>
              </h3>
            </div>
            <div class="two columns post-meta end">
              <p>
                <time datetime="2014-01-31" class="post-date">{{ item.created }}</time>
                <span class="dauthor">By {{ item.nickName }}</span>
              </p>
            </div>
          </div>
          <div class="ten columns offset-2 post-content">
            <p>
              {{ item.learnContext }}
              <!-- <a class="more-link" href="single.html" tppabs="https://www.freemoban.com/preview/201611132213/single.html" >
                查看更多<i class="fa fa-arrow-circle-o-right"></i>
              </a> -->
            </p>
          </div>
        </article>
        <!-- Entry End -->
      </div>
      <!-- Entries End -->
    </section>
  </div>
</template>

<script>
export default {
  name: "Learn",
  data () {
    return {
    }
  },
  props: {
    learnList: {
      type: Array,
      default: []
    }
  },
  mounted () {
    console.log(this.learnList)
  },
  methods: {
  }
};
</script>

<style lang="scss">
</style>
