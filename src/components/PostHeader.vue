<template>
  <div class="post-header">
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
    <button v-if="userId === user._id" 
            @click="itemDelete(currentPost, postId)"
            type="submit" 
            class="btn-sub post-del" 
            title="Delete Post">
      <img :src="getImgUrl('pngegg')" 
            alt="delete" 
            class="btn__del">
    </button>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapActions } from 'vuex';

  export default {
    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(String(value)).format('LLLL')
        }
      }
    },

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
                      'fetchSelectedUser',
                      'postDelete',
                      'commentDelete' ]),

      getImgUrl(pic) {
        return require('../assets/' + pic + '.png')
      },

      itemDelete(comment, id) {
        if (!this.postId) {
          this.postDelete(comment);
        } else {
          const comData = [{comment}, {id}];
          console.log(comData)
          this.commentDelete(comData);
        }
      },

      selectUser(selectedUser) {
        this.fetchSelectedUser(selectedUser);
        this.loadUserPosts(selectedUser._id);
        this.$router.push({ name: 'Timeline' });
      }
    }
  }
</script>
