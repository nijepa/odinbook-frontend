<template>
  <div class="">
    <a @click="selectUser(user)">
      <img :src="user.picture || 
                require('../assets/nopic' + 
                Math.floor(Math.random() * 5) + 
                '.png')" 
            class="user__img">
    </a>
    &copy;
    <a @click="selectUser(user)" 
        class="post__heading author">
        {{ user.name }} 
    </a>
    &#64;
    <p class="post__heading">
      &copy; {{ currentPost.createdAt | formatDate }} 
    </p>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapActions } from 'vuex';
  import loadImage from '../mixins/loadImage';

  export default {
    name: 'PostHeader',

    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(String(value)).format('LLLL')
        }
      }
    },

    mixins: [
      loadImage
    ],

    props: {
      userId: String,
      post: Object,
      user: Object,
      postId: String
    },

    data() {
      return {
        currentPost: this.post
      }
    },

    methods: {
      ...mapActions([ 'loadUserPosts',
                      'fetchSelectedUser']),

      selectUser(selectedUser) {
        this.fetchSelectedUser(selectedUser);
        this.loadUserPosts(selectedUser._id);
        this.$router.push({ name: 'Timeline' });
      }
    }
  }
</script>
