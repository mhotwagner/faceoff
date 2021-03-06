import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const BASE_URL = 'http://localhost:3000/';

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    account: {},
  },
  actions: {
    GET_ACCOUNT({commit}) {
      axios
        .get(BASE_URL + 'account/')
        .then((response) => {
          commit('SET_ACCOUNT', response.data);
        });
    },
    UPDATE_ACCOUNT: ({ commit }, account) => {
      axios.patch(BASE_URL + 'account/', account).then((response) => {
        commit('SET_ACCOUNT', response.data);
      }, (err) => {
        throw err;
      });
    },
    CREATE_EVENT: ({ commit }, event, callback) => {
      axios.post(BASE_URL + 'events/', event).then((response) => {
        if (callback) callback(response.data);
      }, (err) => {
        throw err;
      });
    },
    CREATE_POST: ({ commit }, post, callback) => {
      axios.post(BASE_URL + 'posts/', post).then((response) => {
        if (callback) callback(response.data);
      }, (err) => {
        throw err;
      });
    },
    CREATE_PROJECT: ({ commit }, project, callback) => {
      axios.post(BASE_URL + 'projects/', project).then((response) => {
        if (callback) callback(response.data);
      }, (err) => {
        throw err;
      });
    },
  },
  mutations: {
    SET_ACCOUNT(state, account) {
      state.account = account;
    },
  },
  getters: {
    account: state => () => {
      return state.account;
    },
  },
  modules: {},
});
