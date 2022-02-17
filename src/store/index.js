import Vue from "vue";
import Vuex from "vuex";
import userModule from "./user";
import friendModule from "./friend";
import postModule from "./post";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userModule,
    friendModule,
    postModule,
  },
});
