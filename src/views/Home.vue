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
    <top-button />
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  import Sign from './Sign.vue'
  import Nav from '@/components/Nav.vue';
  import Footer from '@/components/Footer.vue';
  import Posts from '@/components/Posts.vue';
  import Post from '@/components/Post.vue';
  import TopButton from '@/components/TopButton.vue';
  
  export default {
    name: 'Home',

    components: {
      Sign, Nav, Footer, Posts, Post, TopButton
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

  .scrolimg{
    width: 50px;
    height: auto;
    cursor: pointer;
  }

  .scroll{
    width: 100px;
    height: 80px;
    transition: 0.2s;
    z-index: 99;
    position:fixed;
    bottom:0px;
    right:0px;
  }

  .scroll:hover{
    transform-origin: 50% 50%;
    transform: scale(1.2) rotate(180deg) translateY(1.5em);
  }
</style>
