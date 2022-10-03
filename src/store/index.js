import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import goods from "./modules/goods";
import sale from "./modules/sale";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    server: "http://127.0.0.1:8000",
    user_name: localStorage.getItem("user_name"),
    snack_message: {},
    snack_bar: false,
    loading_button_login:false
  },

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
    SNACK_MESSAGE(state, snack_message) {
      state.snack_message = snack_message;
      state.snack_bar = true;
    },
    TIME_OUT(state) {
      state.snack_bar = false;
      state.snack_message = null;
    },
  },
  actions: {
    login({ commit, state }, data) {
      return new Promise((resolve) => {
        state.loading_button_login = true;
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
          .catch(() => {
            state.loading_button_login = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "ادخلت اسم مستخدم او كلمة مرور غير صحيحه";
            commit("SNACK_MESSAGE", snack_message);
            setTimeout(() => {
              commit("TIME_OUT", snack_message);
            }, 4000);
          });
      });
    },
    logout({ commit }) {
      commit("CLEAR_USER");
    },
  },
  getters: {
    snack_bar(state) {
      return !!state.snack_bar;
    },
  },
  modules: {
    goods,
    sale
  },
});
