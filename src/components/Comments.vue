<template>
  <div class="">
    <div class="comments">
      <h2>Comments</h2>
      <div class="">
        <transition-group name="slide-fade" >
          <div v-for="comment in comments" 
                :key="comment._id">
            <p v-html="comment.text"></p>
            <div class="likes">
              <img @click="commentLike(comment._id, postId)" 
                    class="like__img"
                    :src="comment.likes.length ? getImgUrl('liked') : getImgUrl('like')" alt="">
              <p class="likes__nr">
                {{ comment.likes.length }}
              </p>
            </div>

            <div class="post-header">
              <div class="" >
                <a @click="userSelect(comment.author)">
                  <img :src="comment.author.picture || require('../assets/nopic' + Math.floor(Math.random() * 5) + '.png')" 
                        class="user__img">
                </a>
                &copy;
                <a @click="userSelect(comment.author)" 
                    class="post__heading author"> 
                    {{ comment.author.name }} 
                </a>
                &#64;
                <p class="post__heading">
                  &copy; {{ comment.createdAt | formatDate }} 
                </p>
              </div>
              <button v-if="userId === comment.author._id" 
                      @click="commentDelete(comment, postId)"
                      type="submit" 
                      class="btn-sub post-del" 
                      title="Delete Comment">
                <img :src="getImgUrl('pngegg')" 
                      alt="delete" 
                      class="btn__del">
              </button>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(String(value)).format('LLLL')
        }
      }
    },

    props: {
      comments: Array,
      userId: String,
      postId: String
    },

    methods: {
      getImgUrl(pic) {
        return require('../assets/' + pic + '.png')
      },

      commentDelete(com, id) {
        this.$emit('comment-deleted', com, id);
      },

      commentLike(comId, postId) {
        this.$emit('comment-liked', comId, postId);
      },

      userSelect(auth) {
        this.$emit('user-selected', auth);
      }
    }
  }
</script>

<style>

</style>