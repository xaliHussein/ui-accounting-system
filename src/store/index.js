import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    server: "http://127.0.0.1:8000",
    user_name: localStorage.getItem("user_name"),
  },
  getters: {},
  mutations: {
    LOGIN_USER(state, data) {
      state.user_name = data.result[0].user_name;
      state.name = data.result[0].name;
    },
    CLEAR_USER() {
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
      localStorage.removeItem("name");
      location.reload();
    },
  },
  actions: {
    login({ commit, state }, data) {
      return new Promise((resolve) => {
        axios({
          url: `${state.server}` + "/api/login",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
        })
          .then((response) => {
            const token = response.data.token;
            const data = response.data;
            commit("LOGIN_USER", data);
            state.loading_button_login = false;
            Vue.prototype.$http.defaults.headers.common["Authorization"] =
              "Bearer " + token;
            localStorage.setItem("token", token);
            localStorage.setItem("user_name", data.result[0].user_name);
            localStorage.setItem("name", data.result[0].name);
            resolve(response);
          })
          .catch((err) => {
            console.log(err.response);
          });
      });
    },
    logout({ commit }) {
      commit('CLEAR_USER')
    }
  },
  modules: {},
});
