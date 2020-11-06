<template>
  <div>
    <section id="journal">
      <div class="row">
        <div class="twelve columns align-center">
          <h1 class="parg-title">学习天地</h1>
        </div>
      </div>
      <div class="blog-entries">
        <!-- Entry -->
        <article class="row entry" v-for="item in learnList" :key="item.learnId">
          <div class="entry-header">
            <div class="permalink">
              <a><img style="width:100%;height:100%;" :src="item.avatar" alt="" /></a>
            </div>
            <div class="ten columns entry-title pull-right">
              <h3>
                <a
                  href="single.html"
                  tppabs="https://www.freemoban.com/preview/201611132213/single.html">
                  Proin gravida nibh vel velit auctor aliquet Aenean
                  sollicitudin auctor.
                </a>
              </h3>
            </div>
            <div class="two columns post-meta end">
              <p>
                <time datetime="2014-01-31" class="post-date" pubdate="">Jan 31, 2014</time>
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
