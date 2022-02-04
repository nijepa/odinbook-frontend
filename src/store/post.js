import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL_LOCAL;
import apiClient from './api_client';
import router from '../router';

Vue.use(Vuex)

const state = {
  allPosts: [],
  posts: [],
  post: {},
  isTimeline: false,
  userPosts: [],
  comments: [],
  selectedPost: {},
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  allPosts: state => state.posts,
  getIsTimeline: state => state.isTimeline,
  getUserPosts: state => state.userPosts,
  getPost: state => state.post,
  allComments: state => state.comments,
  getSelectedPost: state => state.selectedPost,
  getFavPosts: state => state.allPosts
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const mutations = {

  setAllPosts(state, posts) {
    state.allPosts = posts;
  },

  updatePosts(state, posts) {
    state.posts = posts;
  },

  reupdatePosts(state, posts) {
    state.posts.posts = posts;
  },

  setPost(state, post) {
    state.post = post;
  },

  setisTimeline(state, isTimeline) {
    state.isTimeline = isTimeline
  },

  updateUserPosts(state, userPosts) {
    state.userPosts = userPosts;
  },

  updateUserLikes(state, userPosts) {
    state.userPosts = userPosts;
  },

  clearUserPosts(state) {
    state.userPosts = [];
  },

  updateComments(state, comments) {
    state.comments = comments;
  },

  addPost(state, text) {
    state.posts.posts = [text, ...state.posts.posts]
  },
  
  updatePost(state, post) {
    state.posts.posts = [
      ...state.posts.posts.map(item => 
          item._id !== post._id ? item : {...item, ...post}
      )
    ] 
/*     state.posts = state.posts.map(post => {
      if (post.id === post.id) {
        return Object.assign({}, post, data)
      }
      return post
    }) */
  },

  deletePost (state, id) {
    state.posts.posts = [
      ...state.posts.posts.filter((item) => item._id !== id)
    ];
  },

  addComment (state, comment) {
    const objIndex = state.posts.posts.map(function(x) {return x._id; }).indexOf(comment._id);
    Object.assign(state.posts.posts[objIndex], { comments: comment.comments });
  },

  deleteComment (state, id) {
    const objIndex = state.posts.posts.map(function(x) {return x._id; }).indexOf(id.postId);
    state.posts.posts[objIndex].comments = [
      ...state.posts.posts[objIndex].comments.filter((item) => item._id !== id.commentId)
    ];
  },

  updateLike (state, like) {
    const objIndex = state.posts.posts.map(function(x) {return x._id; }).indexOf(like._id);
    Object.assign(state.posts.posts[objIndex], { likes: like.likes });
  },

  updateCommentLike (state, like) {
    const objIndex = state.posts.posts.map(function(x) {return x._id; }).indexOf(like.postId);
    const comIndex = state.posts.posts[objIndex].comments.map(function(x) {return x._id; }).indexOf(like._id);
    Object.assign(state.posts.posts[objIndex].comments[comIndex], { likes: like.likes });
  },
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {

  async loadAllPosts({ commit }) {
    await axios.get(URL + 'posts').then((response) => {
      commit('setAllPosts', response.data);
      commit('changeLoadingState', false);
    })
  },
  
  async loadPosts({ commit }, page) {
    await axios.get(URL + 'posts/' + page).then((response) => {
      commit('updatePosts', response.data);
      commit('changeLoadingState', false);
    })
  },

  async loadPost({ commit }, id) {
    await axios.get(URL + 'posts/post/' + id).then((response) => {
      commit('setPost', response.data);
      const arr = {posts: []}
      arr.posts.push(response.data)
      commit('updatePosts', arr);
      commit('changeLoadingState', false);
    })
  },

  async syncPosts({ commit }, posts) {
    commit('reupdatePosts', posts);
      //commit('changeLoadingState', false);
  },

  async choseTimeline( { commit }, chose) {
    commit('setIsTimeline', chose);
  },

  async loadUserPosts({ commit }, id) {
    await axios.get(URL + 'posts/user/' + id).then((response) => {
      commit('updateUserPosts', response.data);
    })
  },

  async loadUserLikes({ commit }, id) {
    await axios.get(URL + 'posts/posts/' + id).then((response) => {
      commit('updateUserLikes', response.data);
    })
  },

  async loadComments({ commit }) {
    await axios.get(URL + 'comments').then((response) => {
      commit('updateComments', response.data)
      commit('changeLoadingState', false)
    })
  },

  async createPost({ commit }, postData) {
    await apiClient.post(URL + 'posts', postData)
      .then((response) => {
        commit('addPost', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async createComment({ commit }, commentData) {
    await apiClient.post(URL + 'posts/comment', commentData)
      .then((response) => {
        commit('addComment', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async commentDelete({ commit }, postData) {
    await apiClient.put(URL + 'posts/comment/' + postData[0].comment._id, postData)
      .then((response) => {
        commit('deleteComment', response.data, postData)
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  postType({ commit }, post) {
    commit('setSelectedPost', post);
    router.push("/post-add");
  },

  async postUpdate({ commit }, postData) {
    await apiClient.put(URL + 'posts/' + postData._id, postData)
      .then((response) => {
        commit('updatePost', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async postDelete({ commit }, postData) {
    await apiClient.delete(URL + 'posts/' + postData._id, postData)
      .then((response) => {
        commit('deletePost', response.data._id)
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async likeUpdate({ commit }, likeData) {
    await apiClient.post(URL + 'posts/like/' + likeData.id, likeData)
      .then((response) => {
        commit('updateLike', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async likeCommentUpdate({ commit }, likeData) {
    await apiClient.post(URL + 'posts/comment/like/' + likeData.id, likeData)
      .then((response) => {
        response.data["postId"] = likeData.postId;
        commit('updateCommentLike', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};