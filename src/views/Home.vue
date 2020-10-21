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
    </div>
  </div>
</template>

<script>
import pageHeader from '../components/Header.vue'

export default {
  name: 'Home',
  components: {
    pageHeader
  }
}
</script>

<style lang="scss">
  @import '../assets/css/default.css';
  @import '../assets/css/layout.css';
</style>
