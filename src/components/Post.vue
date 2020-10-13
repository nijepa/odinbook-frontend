<template>
  <transition name="fall" >
    <div v-if="!enterPost" class="" v-on:load="onAppeared" v-show="appeared">
      <button type="submit" class="btn-sub post-new" @click="newPost()" value="" >{{ btnName }}</button>
    </div>

    <div v-else class="" >
      <form @submit.prevent="addPost()" method="post" class="log" >
        <input @focus="clearErrors" v-model="postInput.title" type="text" name="title"
                class="cool-link" placeholder="pls enter title" required>
        <editor @focus="clearErrors"  v-model="postInput.text" 
                name="text" placeholder="pls enter content"
                :api-key="tinymceKey"
                :init="{
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor link | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help | fontsizeselect '
                }"
        />
        <!-- <textarea @focus="clearErrors" v-model="postInput.text" name="text" class="cool-link" placeholder="pls enter content" required></textarea> -->
        <div class="post-footer">
          <button @click="newPost()" class="btn-sub btn-cancel" value="" >Cancel</button>
          <button type="submit" class="btn-sub btn-save" value="Log In" >Save</button>
        </div>
        <p class="err" v-if="getErrors.length !== 0">{{ getErrors }}</p>
      </form>
    </div>
  </transition>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Editor from '@tinymce/tinymce-vue'
  import router from '../router';

  export default {
    name: 'Post',

    components: {
        Editor
    },

    props: {
      btnName: {
        type: String
      },
      selectedPost: {
        type: Object
      }
    },

    data() {
      return {
        tinymceKey: process.env.VUE_APP_TINYMCE_API_KEY,
        enterPost: false,
        postInput: {
          _id: '',
          title: '',
          text: '',
          user: ''
        },
        appeared: false
      }
    },

    computed: {
      ...mapGetters(['loggedUser', 'getErrors', 'getSelectedPost']),
    },

    methods: {
      ...mapActions([ 'createPost', 'postUpdate', 'clearErrors' ]),
      addPost() {
        if (this.selectedPost) {
          this.postUpdate(this.postInput);
        } else {
          this.postInput.user = this.loggedUser._id;
          this.createPost(this.postInput);
        }
        this.newPost();
      },
      newPost() {
        this.enterPost = !this.enterPost
      },
      onAppeared() {
        this.appeared = true;
      }
    },

    created() {
      if (!this.loggedUser) {
        router.push('/login')
      }
      if (this.selectedPost) {
        this.postInput = {_id: this.selectedPost._id,
                          title: this.selectedPost.title,
                          text: this.selectedPost.text,
                          user: this.selectedPost.user}
        // todo
      }
    },

    mounted() {
      this.onAppeared();
    }
  }
</script>

<style>
  .post-footer {
    justify-self: right;
  }

  .post-new{
    margin-top: 5px;
  }

  .btn-save {
    background-color: var(--green-light);
  }
  
  .tox-tinymce {
    border-radius: 5px !important;
    visibility: inherit !important;
    background-color: var(--yellow) !important;
    border: 2px solid black !important;
    box-shadow: 0px 4px 2px -1px rgba(0,0,0,0.75) !important;
    transition: all .3s ease-in-out !important;
  }
</style>
