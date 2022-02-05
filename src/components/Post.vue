<template>
  <div class="">
    <transition name="slide-fade" 
                v-if="!enterPost" 
                mode="out-in">
      <div class="" >
        <button type="submit" 
                class="btn-sub post-new" 
                @click="newPost()" 
                value="" >
                {{ btnName }}
        </button>
      </div>
    </transition>
    <transition name="slide-fade" 
                v-else mode="out-in">
      <form @submit.prevent="addPost()" 
            method="post" 
            class="log" >
        <label class="post__label" for="title" :style="{'visibility': showLabel}">Title</label>
        <input @focus="clearErrors" 
                v-model="postInput.title" 
                type="text" 
                name="title"
                id="title"
                class="cool-link" 
                placeholder="pls enter title" 
                required>
        <label class="post__label" for="image" :style="{'visibility': showLabelImage}">Image</label>
        <input @focus="clearErrors" 
                v-model="postInput.img_url" 
                type="text" 
                name="image"
                id="image"
                class="cool-link" 
                placeholder="pls enter image url">
        <label class="post__label" for="desc" :style="{'visibility': showLabelDesc}">Content</label>
        <ckeditor :editor="editor" 
                  v-model="postInput.text" 
                  :config="{ placeholder:'pls enter content'}"
                  id="desc">
        </ckeditor>
        <div class="post-footer">
          <button @click.prevent="newPost()" 
                  class="btn-sub btn-cancel" 
                  value="" >
                  Cancel
          </button>
          <button type="submit" 
                  class="btn-sub btn-save" 
                  value="Log In" >
                  Save
          </button>
        </div>
        <p class="err" 
            v-if="getErrors.length !== 0">
            {{ getErrors }}
        </p>
      </form>
    </transition>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import router from '../router';
  import CKEditor from '@ckeditor/ckeditor5-vue';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

  export default {
    name: 'Post',

    components: {
        ckeditor:CKEditor.component
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
        editor: ClassicEditor,
        enterPost: false,
        postInput: {
          _id: '',
          title: '',
          img_url: '',
          text: '',
          user: ''
        },
        appeared: false
      }
    },

    computed: {
      ...mapGetters([ 'loggedUser', 
                      'getErrors', 
                      'getSelectedPost',
                      'allPosts' ]),
      showLabel() {
        return this.postInput.title.length ?  'visible' : 'hidden'
      },
      showLabelImage() {
        return this.postInput.img_url.length ?  'visible' : 'hidden'
      },
      showLabelDesc() {
        return this.postInput.text.length ?  'visible' : 'hidden'
      }
    },

    methods: {
      ...mapActions([ 'createPost', 
                      'postUpdate', 
                      'clearErrors' ]),
      
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
                          img_url: this.selectedPost.img_url,
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
  .post__label {
    transition: all 1s ease;
    margin-bottom: -10px;
    font-size: 1.2em;
  }
  
  .post-footer {
    justify-self: right;
  }

  .post-new{
    margin-top: 1em;
    padding: 1em !important;
    font-size: 1.2em !important;
  }

  .btn-save {
    background-color: var(--green-light);
  }

  .ck.ck-editor {
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    background: var(--yellow);
  }

  .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
    background: var(--yellow);
  }

  .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused):hover {
    background: white;
  }

  .ck.ck-toolbar {
    background: var(--yellow);
  }

  @media (max-width: 760px) {
    .ck.ck-editor {
      max-width: 300px;
    }
    .post__content {
      display: grid !important;
    }
  }
</style>
