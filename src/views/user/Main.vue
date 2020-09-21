<template>
  <div class="main-warp">
    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style lang="scss">
.main-warp {
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  overflow: auto;
  background: #fff url(../../assets/img/loginback.png) no-repeat;
  background-size: cover;
  .main-content {
    margin-left: auto;
    margin-right: auto;
    background: #fff;
    margin-bottom: 50px;
    .formDiv{
      h2 {
        padding: 10px 0 20px;
        font-size: 20px;
        color: #545454;
        text-align: center;
        font-weight: 500;
      }
      .gap {
        margin: 20px 0 40px;
        .split-space {
          color: #649efd;
          margin: 0 10px;
        }
      }
      .el-divider .el-divider__text{
        color:#757474;
      }
      .btn-block {
        display: block;
        width: 100%;
      }
      .pull-right {
        float: right;
      }
      a.link {
        color: #649efd;
      }
      a:focus, a:visited {
        text-decoration: none;
      }
      .third-auth{
        text-align: center;
        a {
          color: #666;
          margin: 15px 20px 0 30px;
          width: 40px;
          height: 40px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          display: inline-block;
          border-radius: 4px;
          zoom: 1;
          background: #fff url(../../assets/img/authn.png) no-repeat center center;
          &.dt{
            background-position: right;
          }
          &.wx{
            background-position: center;
          }
          &.qq {
            background-position: 0 0;
          }
        }
      }
    } 
  }
}
@media (max-width: 768px){
  .main-warp{
    background-image: none;
    .main-content{
      padding: 50px 20px;
    }
  }
}
@media (max-width: 1024px) and (min-width: 769px){
  .main-content {
    width: 500px;
    margin-top: 100px;
    padding: 20px 50px;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0,0,0,.2);
  }
}
@media (min-width: 1025px){
  .main-content {
    width: 500px;
    margin-top: 100px;
    padding: 20px 50px;
    border-radius: 4px;
  }
}
</style>