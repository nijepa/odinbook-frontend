<template>
  <div>
    <transition name="slide-fade" v-if="!allPosts">
      <div class="" v-on:load="onAppeared" v-show="appeared">
        <p>no posts</p>
      </div>
    </transition>

    <div name="fade" v-else class="posts">
      <!-- <Post /> -->
      <transition name="fall" v-if="!getUserPosts.length && getSelectedUser._id" mode="out-in">
        <div class="post" v-on:load="onAppeared" v-show="appeared">
          <p class="no__posts">no posts for</p>
          <p class="no__posts">{{ getSelectedUser.first_name }}, {{ getSelectedUser.last_name }}</p>
        </div>
      </transition>

      <transition-group v-else name="fall">
        <div v-on:load="onAppeared" v-show="appeared" v-for="post in !getSelectedUser._id ? allPosts : getUserPosts" :key="post._id" class="post">
          <div class="post-header">
            <div class="">
              <img :src="post.user.picture || require('../assets/nopic' + Math.floor(Math.random() * 5) + '.png')" class="user__img">
              &copy;
              <a @click="selectUser(post.user)" class="post__heading author"> {{ post.user.name }} </a>
              &#64;
              <p class="post__heading">&copy; {{ post.createdAt | formatDate }} </p>
            </div>
            <button v-if="loggedUser._id === post.user._id" @click="postDelete(post)"
                    type="submit" class="btn-sub post-del" title="Delete Post">
              <img :src="getImgUrl('pngegg')" alt="delete" class="btn__del">
            </button>
          </div>

          <div class="likes">
            <img @click="sendLike(post._id)" class="like__img" :src="post.likes.length ? getImgUrl('liked') : getImgUrl('like')" alt="">
            <p class="likes__nr">{{ post.likes.length }}</p>
          </div>

          <div class="">
            <h1>{{ post.title }}</h1>
          </div>
          <p v-html="post.text"></p>
          <div v-if="isLogged" class="">
            <!-- <button v-if="loggedUser._id === post.user._id" @click="editPost(post)" type="submit" class="btn-sub">Edit Post</button> -->
            <Post v-if="loggedUser._id === post.user._id" :selected-post='post' btn-name='Edit Post' />
          </div>
          <hr>

          <div class="comments">
            <h2>Comments</h2>
            <div class="">
              <transition-group name="slide-fade">
                <div v-for="comment in post.comments" :key="comment._id" class="">
                  <p v-html="comment.text"></p>
                  <div class="likes">
                    <img @click="sendCommentLike(comment._id, post._id)" class="like__img"
                          :src="comment.likes.length ? getImgUrl('liked') : getImgUrl('like')" alt="">
                    <p class="likes__nr">{{ comment.likes.length }}</p>
                  </div>

                  <div class="post-header">
                    <div class="">
                      <img :src="comment.author.picture || require('../assets/nopic' + Math.floor(Math.random() * 5) + '.png')" class="user__img">
                      &copy;
                      <a @click="selectUser(comment.author)" class="post__heading author"> {{ comment.author.name }} </a>
                      &#64;
                      <p class="post__heading">&copy; {{ comment.createdAt | formatDate }} </p>
                    </div>
                    <button v-if="loggedUser._id === comment.author._id" @click="deleteComment(comment, post._id)"
                            type="submit" class="btn-sub post-del" title="Delete Comment">
                      <img :src="getImgUrl('pngegg')" alt="delete" class="btn__del">
                    </button>
                  </div>

                <!--   &copy;
                  <p class="post__heading author">{{ comment.author.name }} </p>
                  &#64;
                  <p class="post__heading">{{ comment.createdAt | formatDate }}</p> -->
                </div>
              </transition-group>
            </div>
          </div>

          <!-- <Comments /> -->
          <div v-if="isLogged" class="add__comment">
            <button @click="newComment(commentInput, post._id)" type="submit" class="btn-sub">Add Comment</button>
            <textarea v-model="commentInput.text" name="comment" class="cool-link" placeholder="enter comment" rows="3" cols="3" required></textarea>
          </div>
          <div v-else class="add__comment">
            <p>Please <router-link class="fromLeft" to="/login">Log In</router-link> to add comments.</p>
          </div>
        </div>
      </transition-group>
    </div>
  </div>

</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex';
  import Post from '@/components/Post.vue';
  // import Editor from '@tinymce/tinymce-vue';

  export default {
    name: 'Posts',
    components: {
      Post
    },
    data() {
      return {
        enterComment: false,
        commentInput: {
          id: '',
          text: '',
          user: ''
        },
        likeInput: {
          id: '',
          user: '',
          postId: ''
        },
        liked: false,
        appeared: false
      }
    },
    computed: {
      ...mapGetters([ 'allPosts',
                      'getIsTimeline',
                      'getUserPosts',
                      'isLogged',
                      'loggedUser',
                      'getSelectedUser']),
    },
    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(String(value)).format('LLLL')
        }
      }
    },
    methods: {
      ...mapActions([ 'loadPosts',
                      'choseTimeline',
                      'loadUserPosts',
                      'postDelete',
                      'commentDelete',
                      'fetchSelectedUser',
                      'createComment',
                      'postType',
                      'likeUpdate',
                      'likeCommentUpdate' ]),
      selectUser(selectedUser) {
        this.fetchSelectedUser(selectedUser);
        this.loadUserPosts(selectedUser._id);
        this.$router.push({ name: 'Timeline' });
      },
      addComment() {
        this.enterComment = true;
      },
      newComment(data, id) {
        this.commentInput.id = id;
        this.commentInput.user = this.loggedUser._id;
        this.createComment(this.commentInput);
        this.commentInput = {
          id: '',
          text: '',
          user: ''
        }
      },
      editPost(post) {
        this.postType(post);
      },
      deleteComment(comment, postId) {
        const comData = [{comment}, {postId}];
        this.commentDelete(comData);
      },
      sendLike(id) {
        this.likeInput.id = id;
        this.likeInput.user = this.loggedUser._id;
        this.likeUpdate(this.likeInput);
      },
      sendCommentLike(id, postId) {
        this.likeInput.id = id;
        this.likeInput.user = this.loggedUser._id;
        this.likeInput.postId = postId;
        this.likeCommentUpdate(this.likeInput);
      },
      getImgUrl(pic) {
        return require('../assets/' + pic + '.png')
      },
      onAppeared() {
        this.appeared = true;
      }
    },
    created() {
      if (!this.getSelectedUser) {
        this.loadUserPosts();
      } else {
        this.loadPosts();
      }
    },
    mounted() {
      this.onAppeared();
    }
  }
</script>

<style>
  .timeline {
    /* height: 100vh; */
    background-color: var(--blue);
    padding: 2em;
  }
  .btn-sub {
    font-size: 16px;
    padding: 5px;
    justify-self: end;
    margin-right: 5px;
  }
  .posts {
    display: grid;
    /* grid-template-columns: 1fr 1fr 1fr; */
    min-width: 373px;
    background-color: var(--blue);
  }
  .post-header {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
  }
  .post-del {
    /* background-color: var(--red-light); */
    /* font-size: .7em; */
  }
  .btn__del {
    width: 10px;
  }
  .user__img {
    border-radius: 10px;
    width: 40px;
    height: 40px;
    vertical-align: middle;
  }
/*   @media (max-width: 1440px) {
    .posts {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 810px) {
    .posts {
      grid-template-columns: 1fr;
    }
  } */
  .post {
    background-color: var(--yellow);
    text-align: left;
    box-shadow: 0px 5px 4px 0px rgba(0,0,0,0.75);
    margin: 5px ;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid grey;
  }
  .post__heading {
    color: whitesmoke;
    /* border-bottom: 1px solid black; */
    background: var(--blue);
    padding: 2px 5px;
    display: inline-grid;
    border-radius: 5px;
    font-size: 12px;
  }
/*   .btn__comment {
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 5px;
    background: transparent;
    margin: 5px;
    padding: 10px;
    font-family: 'Chewy', cursive;
  }
  .btn__comment:hover {
    background-color: indigo;
    border: 2px solid black;
    color: white;
  } */
  .add__comment {
    display: grid;
    grid-template-columns: 1fr 4fr;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    padding: 10px;
  }
  .comments {
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: 1fr 4fr;
    align-items: baseline;
    grid-column-gap: .5rem;
  }
  textarea {
    font-family: 'Londrina Solid', cursive;
    background-color: var(--yellow);
    border: 2px solid black;
    border-radius: 5px;
    box-shadow: 0px 4px 2px -1px rgba(0,0,0,0.75);
    transition: all .3s ease-in-out;
  }
  textarea:hover {
    background-color: whitesmoke;
  }
  textarea:focus {
    background-color: whitesmoke;
    border: 2px solid #13608d;
  }
  .author {
    cursor: pointer;
    background-color: var(--blue-dark);
  }
  .author:hover {
    background-color: var(--blue-darkest);
  }
  .likes {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: left;
    align-items: center;
  }
  .like__img {
    width: 30px;
    height: auto;
    cursor: pointer;
  }
  .like__img:hover {
    transform: scale(1.1);
  }
  .likes__nr {
    font-size: 1em;
  }

/*   .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 1s ease-out;
  } */

  .fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
  .no__posts {
    text-align: center;
  }
</style>
