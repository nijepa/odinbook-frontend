import axios from 'axios';
const URL = 'http://localhost:3000/';
//const URL = 'https://cryptic-caverns-97446.herokuapp.com/';

const  state = {
  friends: [],
  notFriends: [],
  requestFriend: [],
  friendInvitation: [],
  errors: []
};

/* ------------------------------- GETTERS ------------------------------ */
  const  getters = {
    getFriends: state => state.friends,
    getNotFriends: state => state.notFriends,
    getRequestFriend: state => state.requestFriend,
    getFriendInvitation: state => state.friendInvitation,
  };

  /* ----------------------------- MUTATIONS ----------------------------- */
  const  mutations = {

    setFriends: (state, friends) => (state.friends = friends),

    setNotFriends: (state, notFriends) => (state.notFriends = notFriends),

    setRequestedFriends: (state, requestFriend) => (state.requestFriend = requestFriend),

    setRequestFriend({ requestFriend }, newFriend) {
			requestFriend.user[0].friends.push(
				newFriend
			)
    },

    removeFromNotFriends({ notFriends }, newFriend) {
      notFriends.users.splice(
        notFriends.users.findIndex(
          v => v._id === newFriend._id), 1);
    },

    setAcceptFriend({ friends }, newFriend) {
      friends.user[0].friends.push(
				newFriend
			)
    },

    removeFriendsInvitations({ friendInvitation }, newFriend) {
      friendInvitation.user[0].friends.splice(
        friendInvitation.user[0].friends.findIndex(
          v => v._id === newFriend._id), 1);
    },

    setUnFriend({ friends }, newFriend) {
      friends.user[0].friends.splice(
        friends.user[0].friends.findIndex(
          v => v._id === newFriend._id), 1);
    },

    setNotFriend({ notFriends }, newFriend) {
      notFriends.users.push(
				newFriend
			)
    },

    setAbortFriend({ requestFriend }, newFriend) {
      requestFriend.user[0].friends.splice(
        requestFriend.user[0].friends.findIndex(
          v => v._id === newFriend._id), 1);
    },

    setFriendsInvitations: (state, friendInvitation) => (state.friendInvitation = friendInvitation),

    setErrors(state, errors) {
      state.errors = errors;
    },
  };

  /* --------------------------- ACTIONS ------------------------------- */
  const actions = {
  
    async fetchFriends ({ commit }, userId) {
      const response = await axios.get(URL + "users/friends/" + userId);
      commit('setFriends', response.data);
    },

    async fetchNotFriends ({ commit }, userId) {
      const response = await axios.get(URL + "users/notfriends/" + userId);
      commit('setNotFriends', response.data);
    },

    async fetchRequestedFriends ({ commit }, userId) {
      const response = await axios.get(URL + "users/getrequestfriend/" + userId);
      commit('setRequestedFriends', response.data);
    },

    async fetchFriendsInvitations ({ commit }, userId) {
      const response = await axios.get(URL + "users/getfriendinvitation/" + userId);
      commit('setFriendsInvitations', response.data);
    },

    async requestFriend ({ commit }, userData) {
      const response = await axios.post(URL + "users/requestfriend/" + userData._id, userData);
      commit('setRequestFriend', response.data);
      commit('removeFromNotFriends', response.data);
    },

    async acceptFriend ({ commit }, userData) {
      const response = await axios.post(URL + "users/acceptfriend/" + userData._id, userData);
      commit('setAcceptFriend', response.data);
      commit('removeFriendsInvitations', response.data);
    },

    async unFriend ({ commit }, userData) {
      const response = await axios.post(URL + "users/unfriend/" + userData._id, userData);
      commit('setUnFriend', response.data);
      commit('setNotFriend', response.data);
    },

    async abortFriend ({ commit }, userData) {
      const response = await axios.post(URL + "users/abortfriend/" + userData._id, userData);
      commit('setAbortFriend', response.data);
      commit('setNotFriend', response.data);
    },

    clearErrors({ commit }) {
      commit('setErrors', [])
    }
  };

export default {
  state,
  getters,
  actions,
  mutations
};