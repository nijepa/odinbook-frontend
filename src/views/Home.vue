<template>
  <div class="home">
    <div v-if="isLogged" class="">
      <Nav />
      <Post btn-name='New Post' />
      <Posts />
    </div>
    <div v-else class="">
      <Sign msg="Log In with"/>
    </div>
    <Footer />
  </div>
</template>

<script>
  import Sign from './Sign.vue'
  import Nav from '@/components/Nav.vue';
  import Footer from '@/components/Footer.vue';
  import Posts from '@/components/Posts.vue';
  import Post from '@/components/Post.vue';
  import { mapGetters, mapActions, mapMutations } from 'vuex';

  export default {
    name: 'Home',

    components: {
      Sign, Nav, Footer, Posts, Post
    },

    data() {
      return {
        loggedIn: false
      }
    },

    computed: {
      ...mapGetters([ 'loggedUser',
                      'isLogged',
                      'getErrors' ]),
    },

    methods: {
      ...mapActions([ 'initialState',
                      'login',
                      'signup',
                      'clearErrors' ]),
      ...mapMutations([ 'clearUserPosts',
                        'clearSelectedUser']),
    },
    
    created() {
      this.clearUserPosts();
      this.clearSelectedUser();
      this.initialState();
    }
  }
</script>

<style >
  .home {
    background-color: #259de2;
    /* height: 100vh; */
  }
</style>
