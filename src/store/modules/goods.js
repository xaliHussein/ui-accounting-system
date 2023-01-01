import axios from "axios";
const goods = {
  namespaced: true,
  state: {
    goods: [],
    edit_goods: {},
    delete_goods: '',
    goods_Query: "",
    pageCount: 1,
    params: {
      sortBy: [],
      sortDesc: [],
      page: 1,
      itemsPerPage: 10,
    },
    table_loading: false,
    loading_button: false,
    loading_button_edit: false,
  },
  mutations: {
    ADD_GOODS(state, goods) {
      state.goods.unshift(goods);
    },
    EDIT_GOODS(state, goods) {
      let index = state.goods.findIndex((element) => element.id === goods.id);
      console.log(index)
      state.goods.splice(index, 1);
      state.goods.unshift(goods);
    },
    DELETE_GOODS(state, data) {
      let index = state.goods.findIndex((element) => element.id === data.id);
      state.goods.splice(index, 1);
    },
    GET_GOODS(state, goods) {
      state.goods.splice(0, state.goods.length);
      goods.forEach((element) => {
        state.goods.push(element);
      });
    },
  },
  actions: {
    add_goods({ commit, state, rootState }, data) {
      state.table_loading = true;
      state.loading_button = true;
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}` + "/api/add_goods",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })
          .then((response) => {
            commit("ADD_GOODS", response.data.result[0]);
            let snack_message = {};
            snack_message["color"] = "green darken-1";
            snack_message["icon"] = "checkbox-marked-circle";
            snack_message["text"] = "تم اضافة المنتج بنجاح";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
            state.table_loading = false;
            state.loading_button = false;
            resolve(response);
          })

          .catch(() => {
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "خطأ في المدخلات";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
            state.table_loading = false;
            state.loading_button = false;
          });
      });
    },
    get_goods({ commit, state, rootState }) {
      let data = state.params;
      state.table_loading = true;
      return new Promise((resolve) => {
        let skip = (data.page - 1) * data.itemsPerPage;
        let limit = data.itemsPerPage;
        let query = "";
        if (
          state.goods_Query != undefined &&
          state.goods_Query != null &&
          state.goods_Query.length > 0
        )
          query = `&query=${state.goods_Query}`;
        axios({
          url:
            `${rootState.server}` +
            "/api/get_goods" +
            "?skip=" +
            skip +
            "&limit=" +
            limit +
            query,
          method: "get",
        })
          .then((response) => {
            state.pageCount = response.data.count;
            state.table_loading = false;
            commit("GET_GOODS", response.data.result);

            resolve(response);
          })
          .catch(() => {
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "فشلة العمليه";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
            state.table_loading = false;
          });
      });
    },
    edit_goods({ commit, state, rootState }, data) {
      state.table_loading = true;
      state.loading_button_edit = true;
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}` + "/api/edit_goods",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "put",
        })
          .then((response) => {
            commit("EDIT_GOODS", response.data.result[0]);
            let snack_message = {};
            snack_message["color"] = "green darken-1";
            snack_message["icon"] = "checkbox-marked-circle";
            snack_message["text"] = "تم تعديل المنتج بنجاح";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
            state.table_loading = false;
            state.loading_button_edit = false;
            resolve(response);
          })

          .catch(() => {
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "حدث مشكلة في الاتصال بالخادم";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
            state.table_loading = false;
            state.loading_button_edit = false;
          });
      });
    },
    delete_goods({ commit, state, rootState }, data) {
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}` + "/api/delete_goods",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "delete",
        })
          .then((response) => {
            commit("DELETE_GOODS", response.data.result[0]);
            let snack_message = {};
            snack_message["color"] = "green darken-1";
            snack_message["icon"] = "checkbox-marked-circle";
            snack_message["text"] = "تم حذف المنتج بنجاح";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
            resolve(response);
          })

          .catch(() => {
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "حدث مشكلة في الاتصال بالخادم";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
            state.table_loading = false;
            state.loading_button_edit = false;
          });
      });
    },
  },
};
export default goods;
