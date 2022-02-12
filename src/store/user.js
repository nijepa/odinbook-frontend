import axios from 'axios';
//const URL = process.env.VUE_APP_BACKEND_URL_LOCAL;
const URL = process.env.VUE_APP_BACKEND_URL;
import apiClient from './api_client';
import * as ls from './local_storage';
import router from '../router';


const  state = {
  authKey: '',
  user: {},
  users: [],
  selectedUser: {},
  logged: false,
  loading: true,
  inputType: '',
  errors: []
};

/* -------------------------------------- GETTERS -------------------------------------- */
const  getters = {
  getAuthKey: state => state.authKey,
  allUsers: state => state.users,
  loggedUser: state => state.user,
  loadingState: state => state.loading,
  isLogged: state => state.logged,
  getInputType: state => state.inputType,
  getErrors: state => state.errors,
  getSelectedUser: state => state.selectedUser
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const  mutations = {
  setToken: (state, authKey) => (state.authKey = authKey),

  setUsers: (state, users) => (state.users = users),

  setUser: (state, user) => (state.user = user),

  setSelectedUser: (state, selectedUser) => (state.selectedUser = selectedUser),

  clearSelectedUser: (state) => (state.selectedUser = {}),

  updateUser (state, user) {
    state.user = user
  },

  changeLoadingState(state, loading) {
    state.loading = loading;
  },

  setSignType(state, inputType) {
    state.inputType = inputType;
  },

  setLogged(state, logged) {
    state.logged = logged;
  },

  setErrors(state, errors) {
    state.errors = errors;
  },
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {
  initialState({commit}) {
    const localAuth = ls.getToken();
    if (localAuth) {
      commit('setToken', localAuth.token);
      commit('setUser', localAuth.user);
      commit('setLogged', true);
      commit('changeLoadingState', false);
    }
  },

  signType({commit}, typeData) {
    commit('setSignType', typeData);
  },

  async signup({commit}, signupData) {
    await axios.post(URL + 'users/signup', signupData)
      .then((response) => {
        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
        commit('setLogged', true);
        router.push("/")
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async login({commit}, loginData) {
    await axios.post(URL + 'users/login', loginData)
      .then((response) => {
        ls.saveToken(response.data);
        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
        commit('setLogged', true);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async logout({commit}, loginData) {
    await apiClient.post(URL + 'users/me/logout', loginData)
      .then((response) => {
        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
        commit('setLogged', false);
        ls.removeToken()
        router.push("/");
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async fetchUsers ({ commit }) {
    const response = await axios.get(URL + "users");
    commit('setUsers', response.data);
  },

  async fetchUser ({ commit }) {
    const response = await apiClient.get(URL + "users/me");
    commit('setUser', response.data);
    commit('setLogged', true);
    commit('changeLoadingState', false)
  },

  async fetchSelectedUser ({ commit }, selectedUser) {
    commit('setSelectedUser', selectedUser);
  },

  async userUpdate({commit}, userData) {
    await apiClient.put(URL + 'users/' + userData._id, userData)
      .then((response) => {
        commit('updateUser', response.data);
        ls.updateToken(userData)
        router.push("/");
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
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