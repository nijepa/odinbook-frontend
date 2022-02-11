<template>
  <button
    v-if="userId === user._id"
    @click="itemDelete(currentPost, postId)"
    type="submit"
    class="btn-sub post-del"
    title="Delete Post"
  >
    <img :src="getImgUrl('pngegg')" alt="delete" class="btn__del" />
  </button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    userId: String,
    post: Object,
    user: Object,
    postId: String,
  },

  data() {
    return {
      currentPost: this.post,
    };
  },

  methods: {
    ...mapActions(["postDelete", "commentDelete"]),

    getImgUrl(pic) {
      return require("../assets/" + pic + ".png");
    },

    itemDelete(comment, id) {
      if (!this.postId) {
        this.postDelete(comment);
      } else {
        const comData = [{ comment }, { id }];
        this.commentDelete(comData);
      }
    },
  },
};
</script>
