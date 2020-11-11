<template>
  <div>
    <section id="journal" class="journal">
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
                <router-link tag="a" :to="{path:'/learn/update'}"> {{ item.learnTitle }} </router-link>
              </h3>
              <p>
                <el-tag class="tags" v-for="(label, index) in item.label" :key="index">{{ label.labelContext }}</el-tag>
              </p>
            </div>
            <div class="two columns post-meta end">
              <p>
                <time datetime="2014-01-31" class="post-date">{{ item.created }}</time>
                <span class="dauthor">By {{ item.nickName }}</span>
              </p>
            </div>
          </div>
          <div class="ten columns offset-2 post-content">
            <pre v-html="item.learnHtml"></pre>
          </div>
          <a class="alter-link" @click="handleEditLearn(item.learnId)"> 编辑<i class="fa fa-arrow-circle-o-right"></i> </a>
        </article>
        <!-- Entry End -->
      </div>
      <!-- Entries End -->
    </section>
  </div>
</template>

<script>
export default {
  name: 'Learn',
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
    handleEditLearn (learnId) {
      this.$router.push({ name: 'LearnUpdate', query: { learnId: learnId } })
    }
  }
}
</script>

<style lang="scss">
.journal {
   background: #fff url("../../assets/images/content-bg.jpg")/*tpa=https://www.freemoban.com/preview/201611132213/images/content-bg.jpg*/;
   padding-top: 60px;
   padding-bottom: 48px;
   a{
     color: #11ABB0;
     &:visited {
       color: #11ABB0;
     }
     &:focus, &:hover {
       color: #313131;
     }
   }
   h1 {
    font: 20px/36px raleway-bold, sans-serif;
    margin-bottom: 36px;
    color: #A1A8AF;
  }
  .blog-entries { 
    margin-top: 0;
    article.entry{
      &:first-child{
        border-top: none;
        padding-top: 18px;
      }
    }
    .entry-header {
      position: relative;
      margin-bottom: 6px;
      overflow: hidden;
      .entry-title { 
        padding-right: 16.66667%;
        h3 { 
          font: 24px raleway-bold, sans-serif; 
        }
        .tags{margin-right: 12px;}
      }
      .permalink {
        position: absolute;
        top: 10px;
        right: 60px;
        z-index: 1;
        a {
          color: #fff;
          display: block;
          text-align: center;
          background-color: #9199A1;
          width: 58px;
          height: 58px;
          margin: 0;
          padding: 0;
          border-radius: 100%;
          -webkit-transition:all .3s ease-in-out;
          -moz-transition:all .3s ease-in-out;
          -o-transition:all .3s ease-in-out;
          transition:all .3s ease-in-out;
          &:hover {
            background-color: #11ABB0;
          }
          i {
            font-size: 24px;
            line-height: 48px;
          }
        }
      }
    }
  }
  .entry {
    position: relative;
    border-top: 1px dotted #d8d8d8;
    cursor: pointer;
    padding: 35px 15px 12px;
    transition: all .2s ease-in;
    &:hover{
      background: #f5f5f5;
    }
    .post-meta   {
      font: 15px/21px notosans-regular, sans-serif;
      margin-bottom: 0;
      text-align: right;
      time {
        display: block;
        font-family: notosans-bold, sans-serif;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #878282;
        margin-bottom: 6px;
      }
      .dauthor {
        display: block;
      }
    }
    .post-content {  
      padding-right: 16.66667%;
      p {
        font: 16px/30px notosans-regular, sans-serif;
      }
      a.more-link {
        font: 16px/30px notosans-bold, sans-serif;
        margin-left: 3px;
        i {
          margin-left: 10px;
          font-size: 14px;
        }
      }
    }
    .alter-link{
      position: absolute;
      right: 10px;
      top: 55px;
    }
  }
}

</style>
