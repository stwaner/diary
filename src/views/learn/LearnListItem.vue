<template>
  <div>
    <section id="journal" class="journal">
      <div class="blog-entries">
        <template v-if="learnList.length!==0">
          <article class="row entry" v-for="item in learnList" :key="item.learnId">
            <div class="entry-header">
              <div class="permalink">
                <a><img style="width:100%;height:100%;" :src="item.avatar" alt="" /></a>
              </div>
              <div class="nine columns entry-title pull-right">
                <h3> {{ item.learnTitle }} </h3>
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
              <div class="op-tap">
                <a class="alter-link update-op" @click="handleEditLearn(item.learnId)"> 编辑<i class="fa fa-arrow-circle-o-right"></i> </a>
                <a class="alter-link del-op" @click="handleDelete(item.learnId)"> 删除<i class="fa fa-arrow-circle-o-right"></i> </a>
              </div>
            </div>
            <div class="nine columns offset-3 post-content">
              <pre v-html="item.learnHtml"></pre>
            </div>
          </article>
        </template>
        <div class="no-data" v-else>
          <img src="@/assets/images/empty.gif" alt="暂无数据">
        </div>
      </div>
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
      default: () => []
    }
  },
  mounted () {
  },
  methods: {
    handleEditLearn (learnId) {
      this.$router.push({ name: 'LearnUpdate', query: { learnId: learnId } })
    },
    handleDelete (learnId) {
      this.$confirm('确定要删除该记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'error',
          message: '该功能未开发'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.journal {
  position: relative;
  background: #fff url("../../assets/images/content-bg.jpg");
  padding-top: 60px;
  padding-bottom: 48px;
  a{
    color: #11ABB0;
    // &:visited {
    //   color: #11ABB0;
    // }
    // &:focus, &:hover {
    //   color: #313131;
    // }
  }
  h1 {
    font: 20px/36px raleway-bold, sans-serif;
    margin-bottom: 0;
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
        top: 0;
        left: 0;
        z-index: 1;
        a {
          color: #fff;
          display: block;
          text-align: center;
          background-color: #9199A1;
          width: 78px;
          height: 78px;
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
    padding: 35px 15px 12px;
    transition: all .2s ease-in;
    &:hover{
      transition: all .2s ease-in;
      .alter-link{
        color: #fff;
        width: 80px;
        opacity: 1;
      }
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
      max-height: 350px;
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar{
        width: 4px;
        height: 4px;
      }
      &::-webkit-scrollbar-thumb{
        width: 6px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ccc;
      }
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: #f5f5f5;
      }
      img{
        max-width: 350px;
      }
    }
    .op-tap{
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      display: flex;
      transition: all .2s ease-in;
      cursor: pointer;
    }
    .alter-link{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0;
      opacity: 0;
      transition: all .2s ease-in;
      &.update-op{
        right: 90px;
        background: rgba(0,0,0,.4);
      }
      &.del-op{
        right: 10px;
        background: rgba(232, 9, 9, .6);
      }
    }
  }
  .more{
    width: 100%;
    text-align: right;
    margin-bottom: 25px;
    a{
      padding: 5px 15px 6px 20px;
      font-size: 14px;
      border-radius: 17px;
      border: 1px solid #E3E3E3;
      transition: all .2s ease-in;
      &::after {
        content: '';
        width: 0;
        height: 0;
        display: inline-block;
        border-width: 6px;
        border-style: solid;
        border-color: transparent transparent transparent #11ABB0;
        margin-left: 5px;
        transition: all .2s ease-in;
      }
      &:hover{
        background: #f5f5f5;
        &::after{
          border-color: transparent transparent transparent #666;
        }
      }
    }
  }
}
.el-pagination{
  text-align: center;
}
.no-data{
  text-align: center;
  img{
    width: 420px;
  }
}

</style>
