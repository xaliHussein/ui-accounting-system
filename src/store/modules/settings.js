import axios from "axios";

const settings = {
  namespaced: true,
  state: {
    lodding_button: false,
  },
  mutations: {
    EDIT_STORE(state,store) {
      localStorage.removeItem("store");
      localStorage.setItem("store", store.name);
    },
    EDIT_USERNAME(state,user_name) {
      localStorage.removeItem("user_name");
      localStorage.setItem("user_name", user_name.user_name);
    }
  },
  actions: {
    storeNameChange({ commit, state, rootState }, data) {
      state.lodding_button = true;
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}` + "/api/store_name_change",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "put",
        })
          .then((response) => {
            commit("EDIT_STORE", response.data.result[0]);

            let snack_message = {};
            snack_message["color"] = "green darken-1";
            snack_message["icon"] = "checkbox-marked-circle";
            snack_message["text"] = "تم تغيير اسم المتجر بنجاح";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);

            state.lodding_button = false;
            resolve(response);
          })
          .catch(() => {
            state.lodding_button = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "حدث مشكلة في الاتصال بالخادم";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
          });
      });
    },
      usernameChange({ commit, state, rootState }, data) { 
         state.lodding_button = true
          return new Promise((resolve) => {
            axios({
               url:
                  `${rootState.server}` +
                  '/api/user_name_change',
               data: data,
               headers: {
                  'Content-Type': 'application/json',
               },
               method: 'put',
            })
               .then((response) => {
                  commit('EDIT_USERNAME', response.data.result[0])
                  let snack_message = {}
                  snack_message['color'] = 'green darken-1'
                  snack_message['icon'] = 'checkbox-marked-circle'
                  snack_message['text'] = 'تم تغيير اسم المستخدم بنجاح'
                  commit('SNACK_MESSAGE', snack_message, { root: true })
                  setTimeout(() => {
                     commit('TIME_OUT', snack_message, { root: true })
                  }, 4000)

                  state.lodding_button = false
                  resolve(response)
               })
               .catch(() => {
                  state.lodding_button = false
                  let snack_message = {}
                  snack_message['color'] = 'red darken-1'
                  snack_message['icon'] = 'alert'
                  snack_message['text'] = 'فشلة العملية'
                  commit('SNACK_MESSAGE', snack_message, { root: true })
                  setTimeout(() => {
                     commit('TIME_OUT', snack_message, { root: true })
                  }, 4000)
               })
         })
    },
        passwordChange({ commit, state, rootState }, data) { 
         state.lodding_button = true
          return new Promise((resolve) => {
            axios({
               url:
                  `${rootState.server}` +
                  '/api/password_change',
               data: data,
               headers: {
                  'Content-Type': 'application/json',
               },
               method: 'put',
            })
               .then((response) => {
                  let snack_message = {}
                  snack_message['color'] = 'green darken-1'
                  snack_message['icon'] = 'checkbox-marked-circle'
                  snack_message['text'] = 'تم تغيير كلمة المرور بنجاح' 
                  commit('SNACK_MESSAGE', snack_message, { root: true })
                  setTimeout(() => {
                     commit('TIME_OUT', snack_message, { root: true })
                  }, 4000)

                  state.lodding_button = false
                  resolve(response)
               })
               .catch(() => {
                  state.lodding_button = false
                  let snack_message = {}
                  snack_message['color'] = 'red darken-1'
                  snack_message['icon'] = 'alert'
                  snack_message['text'] = 'فشلة العملية'
                  commit('SNACK_MESSAGE', snack_message, {
                     root: true,
                  })
                  setTimeout(() => {
                     commit('TIME_OUT', snack_message, {
                        root: true,
                     })
                  }, 4000)
               })
         })
      },
  },
};
export default settings;
