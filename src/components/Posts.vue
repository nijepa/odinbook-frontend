<template>
  <div>
    <div v-if="loading" class="" :key="1">
        <img class="loading__img" src="../assets/loading.gif" alt="">
    </div>
  <div v-else :key="2">
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
        <div v-on:load="onAppeared" v-show="appeared" 
              v-for="post in !getSelectedUser._id ? posts : getUserPosts" :key="post._id" class="post">
          <div class="post-header">
            <div class="">
              <a @click="selectUser(post.user)">
                <img :src="post.user.picture || require('../assets/nopic' + Math.floor(Math.random() * 5) + '.png')" 
                      class="user__img">
              </a>
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
            <img @click="sendLike(post._id)" 
                  class="like__img" :src="post.likes.length ? getImgUrl('liked') : getImgUrl('like')" alt="">
            <p class="likes__nr">{{ post.likes.length }}</p>
          </div>

          <div class="">
            <h1>{{ post.title }}</h1>
          </div>

          <div class="post__content">
            <div class="">
              <img :src="post.img_url ? post.img_url : 'https://images.pexels.com/photos/3028961/pexels-photo-3028961.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'"
                  alt=""
                  class="post__img">
            </div>
            <p v-html="post.text"></p>
          </div>
          
          <div v-if="isLogged" class="">
            <Post v-if="loggedUser._id === post.user._id" :selected-post="post" btn-name='Edit Post' />
          </div>
          <hr>

          <div class="comments">
            <h2>Comments</h2>
            <div class="">
              <transition-group name="slide-fade" >
                <div v-for="comment in post.comments" :key="comment._id" class="">
                  <p v-html="comment.text"></p>
                  <div class="likes">
                    <img @click="sendCommentLike(comment._id, post._id)" class="like__img"
                          :src="comment.likes.length ? getImgUrl('liked') : getImgUrl('like')" alt="">
                    <p class="likes__nr">{{ comment.likes.length }}</p>
                  </div>

                  <div class="post-header">
                    <div class="" >
                      <a @click="selectUser(comment.author)">
                        <img :src="comment.author.picture || require('../assets/nopic' + Math.floor(Math.random() * 5) + '.png')" 
                            class="user__img">
                      </a>
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
                </div>
              </transition-group>
            </div>
          </div>

          <!-- <Comments /> -->
          <div v-if="isLogged" class="add__comment">
            <button @click="newComment(commentInput, post._id)" type="submit" class="btn-sub">Add Comment</button>
            <textarea v-model="commentInput.text" name="comment" class="cool-link" 
                      placeholder="enter comment" rows="3" cols="3" required></textarea>
          </div>
          <div v-else class="add__comment">
            <p>Please <router-link class="fromLeft" to="/login">Log In</router-link> to add comments.</p>
          </div>
        </div>
      </transition-group>

      <div v-show="!getSelectedUser._id && allPosts.total > posts.length" class="more" @click="loadMore()">
        <h3>Load More...</h3>
        <svg x="0px" y="0px"
          width="38px" height="38px" viewBox="0 0 381.745 381.745" style="enable-background:new 0 0 381.745 381.745;"
          xml:space="preserve">
          <path fill="var(--orange)" d="M205.068,2.244C91.236-9.384,9.84,81.192,0.66,188.292C-3.624,239.7,12.9,289.884,51.456,324.156
            c20.808,18.36,50.184,36.108,80.784,43.452c97.309,43.452,216.036-28.764,242.964-128.521
            C407.028,124.645,318.288,13.872,205.068,2.244z M265.656,79.968c0.612,1.836,1.225,3.672,2.448,5.508
            c-2.448-2.447-4.284-4.283-6.731-6.731C263.209,78.744,264.433,79.356,265.656,79.968z M186.096,312.528
            C147.54,272.137,120,220.116,75.936,185.232c-1.224-3.061-2.448-6.732-3.06-10.404c23.256-3.061,47.124-6.12,70.38-2.448
            c3.06,0.612,5.508-0.612,7.344-2.448c1.836-0.611,3.672-2.447,3.672-4.896c-0.612-22.645-2.448-44.676-4.284-67.32
            c26.316-1.836,53.857-8.567,80.172-3.672c15.301,3.061-3.672,51.408-1.224,66.096c-1.224,3.061,0,7.956,4.284,9.181
            c11.016,3.06,23.256,1.224,34.884,0.611c4.896,0,10.404,0,15.3-0.611C255.864,220.116,232.608,277.645,186.096,312.528z"/>
        </svg>
      </div>
      
    </div>
  </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex';
  import Post from '@/components/Post.vue';

  export default {
    name: 'Posts',

    components: {
      Post
    },

    data() {
      return {
        posts: [],
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
        currentPage: 0,
        appeared: false,
        loading: true
      }
    },

    computed: {
      ...mapGetters([ 'allPosts',
                      'getIsTimeline',
                      'getUserPosts',
                      'isLogged',
                      'loggedUser',
                      'getSelectedUser' ]),
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

      async loadMore() {
        this.currentPage = this.currentPage + 1;
        await this.loadPosts(this.currentPage);
        this.posts = [...this.posts, ...this.allPosts.posts];
      },
      
      onAppeared() {
        this.appeared = true;
      }
    },

    async created() {
      if (!this.getSelectedUser) {
        await this.loadUserPosts();
      } else {
        await this.loadPosts(0);
        this.posts = this.allPosts.posts;
      }
      this.loading = false;
    },

    mounted() {
      this.onAppeared();
      document.addEventListener('scroll',()=>{
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          //alert("you're at the bottom of the page");
        }
      })
    }
  }
</script>

<style>
  .loading__img {
    width: 100px;
    height: auto;
  }

  .more {
    text-transform: uppercase;
    font-size: 2em;
    color: var(--orange);
    cursor: pointer;
    justify-self: center;
    letter-spacing: .2em;
    margin-top: .5em;
    transition: ease-in-out .4s all;
  }

  .more > svg > path {
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
    transition: ease-in-out .8s all;
  }

  .more > h3 {
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
  }

  .more:active,
  .more:hover {
    color: var(--blue-darkest);
  }

  .more:focus > svg > path,
  .more:hover > svg > path {
    fill: var(--blue-darkest);
  }

  .post__content {
    display: inline-block;
  }

  .post__img {
    width: 250px;
    border-radius: .5em;
    float: left;
    margin: .5em 1.5em 1em .5em;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(3,30,71,1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(3,30,71,1);
    box-shadow: 0px 0px 5px 0px rgba(3,30,71,1);
    transition: ease-in-out .4s all;
  }

  .post__img:hover, .post__img:active {
    transform: scale(1.1);
    box-shadow: none;
  }

  .timeline {
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
    min-width: 373px;
    background-color: var(--blue);
  }

  .posts:nth-child(even) { 
    background-color: #ffc64b;
  }

  .post-header {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
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

  .user__img:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  .post {
    background-color: var(--yellow);
    text-align: left;
    box-shadow: 0px 5px 4px 0px rgba(0,0,0,0.75);
    margin: 5px ;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid grey;
    background-image: linear-gradient(to top,var(--orange) 5%, white);
  }

  .post__heading {
    color: whitesmoke;
    background: var(--blue);
    padding: 2px 5px;
    display: inline-grid;
    border-radius: 5px;
    font-size: 12px;
  }

  hr {
    border: 0;
    height: 1px;
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
  }

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

  .no__posts {
    text-align: center;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
