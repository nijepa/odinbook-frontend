<template>
  <div class="likes">
    <img @click="sendLike(currentPost._id, postId)" 
          class="like__img" 
          :src="currentPost.likes.length ? 
                getImgUrl('liked') : 
                getImgUrl('like')" 
          alt="">
    <p class="likes__nr">
      {{ currentPost.likes.length }}
    </p>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Likes',

    props: {
      post: Object,
      userId: String,
      postId: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        currentPost: this.post,
        likeInput: {
          id: '',
          user: '',
          postId: ''
        },
      }
    },

    methods: {
      ...mapActions([ 'likeUpdate',
                      'likeCommentUpdate' ]),

      getImgUrl(pic) {
        return require('../assets/' + pic + '.png')
      },

      sendLike(id, postId) {
        this.likeInput.id = id;
        this.likeInput.user = this.userId;
        
        if (!this.postId) {
          this.likeUpdate(this.likeInput);
        } else {
          this.likeInput.postId = postId;
          this.likeCommentUpdate(this.likeInput);
        }
      },

    }
  }
</script>
