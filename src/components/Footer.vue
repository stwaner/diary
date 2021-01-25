<template>
  <footer>
      <div class="row">
         <div class="twelve columns">
            <ul class="footer-nav">
               <li><a href="#">Home.</a></li>
               <li><a href="#">Blog.</a></li>
               <li><a href="#">Portfolio.</a></li>
               <li><a href="#">About.</a></li>
               <li><a href="#">Contact.</a></li>
               <li><a href="#">Features.</a></li>
            </ul>
            <ul class="copyright">
               <li>Design by <a href="#">zhuyelong</a></li>
            </ul>
         </div>
         <div id="go-top" style="display: block;"><a title="Back to Top" href="#">Go To Top</a></div>
      </div>
   </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss">
footer{
   margin: 50px !important;
   font-size: 14px !important;
   a{
      color: #6A747C;
      &:visited{
         color: #6A747C;
      }
      &:hover{
         color: #11ABB0;
      }
   }
   .footer-nav {
      font: 18px/36px raleway-bold, sans-serif;
      margin: 0;
      padding: 0 0 24px 0;
      text-align: center;
      border-bottom: 1px solid #c4caca;
      li{
         display: inline;
         margin-right: 20px;
         margin-left: 20px;
      }
      a{
         color: #7B858E;
         &:hover{
            color: #313131;
         }
      }
   }
   .footer-social {
      margin: 36px 0 24px 0;
      padding: 0;
      font-size: 30px;
      text-align: center;
      li{
         display: inline-block;
         margin: 0;
         padding: 0;
         margin-left: 24px;
         margin-right: 24px;
         a{
            color: #7B858E;
            &:hover { color: #313131; }
         }
      }
   }
   .copyright {
      margin: 0;
      padding: 12px 0 0 0;
      text-align: center;
      font-size: 15px;
      font: 14px/30px notosans-regular, sans-serif;
      li {
         display: inline-block;
         margin: 0;
         padding: 0;
         line-height: 24px;
         &:before {
            content: "|";
            padding-left: 10px;
            padding-right: 12px;
            color: #B4BBBB;
         }
         &:first-child:before {
            display: none;
         }
      }
   }
}

.ie footer .copyright li {
   display: inline;
}

#go-top {
   position: fixed;
   bottom: 0px;
   right: 25px;
   display: none;
   a {
      text-decoration: none;
      border: 0 none;
      display: block;
      width: 60px;
      height: 40px;
      background: url("../assets/images/go-to-top.png")/*tpa=https://www.freemoban.com/preview/201611132213/images/go-to-top.png*/ no-repeat 50% 50%;
      background-color: #1f2024;

      -webkit-transition: all 0.2s ease-in-out;
      -moz-transition: all 0.2s ease-in-out;
      -o-transition: all 0.2s ease-in-out;
      -ms-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;

      border-radius: 3px 3px 0 0;

      font: 0/0 a;
      text-shadow: none;
      color: transparent;
      &:hover { background-color: #0F9095; }
   }
}
</style>
