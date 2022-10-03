import axios from "axios";
const goods = {
  namespaced: true,
  state: {
    goods: [],
    slected_Object: {},
    goodsQuery: "",
    pageCount: 1,
    params: {
      sortBy: [],
      sortDesc: [],
      page: 1,
      itemsPerPage: 10,
    },
    table_loading: false,
    loadingButton: false,
  },
  mutations: {
    ADD_GOODS(state, goods) {
      state.goods.push(goods);
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
      state.loadingButton = true;
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
            state.loadingButton = false;
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
            state.loadingButton = false;
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
          state.goodsQuery != undefined &&
          state.goodsQuery != null &&
          state.goodsQuery.length > 0
        )
          query = `&query=${state.goodsQuery}`;
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
  },
};
export default goods;
