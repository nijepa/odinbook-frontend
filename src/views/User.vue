<template>
  <div class="user">
    <Nav />
    <Profile />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import Profile from '@/components/Profile.vue';

export default {
  name: 'Home',
  components: {
    Nav, Profile, Footer
  },
  data() {
    return {
      //loggedIn: false
    }
  }
}
</script>

<style >

</style>