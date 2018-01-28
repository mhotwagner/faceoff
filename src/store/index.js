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
  mutations: {
    SET_ACCOUNT(state, account) {
      state.account = account;
    },
  },
  actions: {
    GET_ACCOUNT({ commit }) {
      console.log('are we doing this?');
      axios
        .get(BASE_URL + 'account/')
        .then((response) => {
          commit('SET_ACCOUNT', response.data);
        });
    },
  },
  getters: {
    account: (state) => state.account,
  },
  modules: {},
});
