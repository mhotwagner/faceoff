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
      console.log('are we doing this?');
      axios
        .get(BASE_URL + 'account/')
        .then((response) => {
          commit('SET_ACCOUNT', response.data);
        });
    },
    UPDATE_ACCOUNT: ({ commit }, account) => {
      console.log('account', account);
      axios.post(BASE_URL + 'account/', account).then((response) => {
        console.log(response.data);
        commit('SET_ACCOUNT', response.data);
      }, (err) => {
        console.log(err);
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
