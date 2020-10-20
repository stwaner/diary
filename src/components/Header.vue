<template>
  <header>
    <div class="row">
      <div class="twelve columns">
        <div class="logo">
          <a href="index.html">
            <img alt="" src="../assets/images/logo.png">
          </a>
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
          </ul> <!-- end #nav -->
        </nav> <!-- end #nav-wrap -->
      </div>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  header {
    height: 96px;
    width: 100%;
    background: #383232 url("../assets/images/header-bg.jpg")/*tpa=https://www.freemoban.com/preview/201611132213/images/header-bg.jpg*/;
    .logo {
      position: absolute;
      left: 20px;
      top: 48px;
      a {
        display: block;
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        width: 113px;
        height: 24px;
      }
    }
  }
  #nav-wrap ul, #nav-wrap li, #nav-wrap a {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
  }

  /* nav-wrap */
  #nav-wrap {
    position: relative;
    font: 14px raleway-bold, sans-serif;
    float: right;
    margin-top: 36px;
    margin-right: 20px;
    z-index: 99999;
  }

  /* hide toggle button */
  #nav-wrap > a.mobile-btn {
    display: none;
    border-radius: 3px;
  }

  ul#nav {
    min-height: 48px;
    width: auto;

    /* left align the menu */
    text-align: left;
  }
  ul#nav li {
    position: relative;
    list-style: none;
    height: 48px;
    display: inline-block;
  }

  /* Links */
  ul#nav li a {

  /* 8px padding top + 8px padding bottom + 32px line-height = 48px */

    display: inline-block;
    padding: 8px 11px;
    line-height: 32px;
    text-decoration: none;
    text-align: left;
    color: #8a8383;

    -webkit-transition: color .2s ease-in-out;
    -moz-transition: color .2s ease-in-out;
    -o-transition: color .2s ease-in-out;
    -ms-transition: color .2s ease-in-out;
    transition: color .2s ease-in-out;
  }

  ul#nav li a:active { background-color: transparent !important; }
  ul#nav li:hover > a,
  ul#nav li.current a { color: #fff; }

  /* adds down arrow */
  ul#nav span:after {
    width: 0;
    height: 0px;
    border: 4px solid transparent;
    border-bottom: none;
    border-top-color: #8a8383;
    content: '';
    vertical-align: middle;
    display: inline-block;
    position: relative;
    right: 5px;
  }

  /* Sub Menu
  ----------------------------------------------------- */
  ul#nav ul {
    position: absolute;
    top: 100%;
    left: 0;
    background: #1f2024;
    min-width: 100%;

    border-radius: 0 0 3px 3px;

    /* for transition effects */
    opacity: 0;
    filter: alpha(opacity=0);

    -webkit-transition: opacity .25s ease .1s;
    -moz-transition: opacity .25s ease .1s;
    -o-transition: opacity .25s ease .1s;
    -ms-transition: opacity .25s ease .1s;
    transition: opacity .25s ease .1s;
  }

  /* Third level sub menu
  ul#nav ul ul {
    position: absolute;
    top: 0;
    left: 100%;

    border-radius: 0 3px 3px 3px;
  }
  */

  ul#nav ul li {
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
  }

  /*On Hover */
  ul#nav li:hover > ul { opacity: 1; filter: alpha(opacity=100); }
  ul#nav li:hover > ul li {
    height: 42px;
    overflow: visible;
    border-bottom: 1px solid #26272C;
  }
  ul#nav li:hover > ul li:last-child  { border: none; }

  /* Sub Menu Anchor links */
  ul#nav ul li a {
    padding: 6px 15px;
    margin: 0;
    white-space: nowrap;
    font-size: 13px;
  }
</style>