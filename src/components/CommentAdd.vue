<template>
  <div class="">

    <div v-if="isLogged" 
          class="add__comment">
      <button @click="commentCreated(commentText, postId)" 
              type="submit" 
              class="btn-sub">
              Add Comment
      </button>
      <textarea v-model="commentText" 
                name="comment" 
                class="cool-link" 
                placeholder="enter comment" 
                rows="3" 
                cols="3" 
                required>
      </textarea>
    </div>

    <div v-else 
          class="add__comment">
      <p>Please 
        <router-link class="fromLeft" 
                      to="/login">
                      Log In
        </router-link> 
        to add comments.
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isLogged: Boolean,
      postId: String
    },

    data() {
      return {
        commentText: ''
      }
    },

    methods: {
      commentCreated(text, id) {
        this.$emit('comment-added',text, id);
        this.commentText = '';
      }
    }

  }
</script>
