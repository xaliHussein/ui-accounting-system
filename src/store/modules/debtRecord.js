import axios from "axios";

const debtRecord = {
  namespaced: true,
  state: {
    debt_record: [],
    debt_record_id: {},
    change_total_debt: 0,
    debtRecordQuery: "",
    pageCount: 1,
    param: {
      sortBy: [],
      sortDesc: [],
      page: 1,
      itemsPerPage: 10,
    },
    table_loading: false,
  },
  mutations: {
    GET_DEBT_RECODES(state, debt_record) {
      state.debt_record.splice(0, state.debt_record.length);
      debt_record.forEach((element) => {
        state.debt_record.push(element);
      });
    },
    PAY_DEBT_RECODES(state, debt_record) {
      let index = state.debt_record.findIndex(
        (element) => element.id === debt_record.id
      );
      state.debt_record.splice(index, 1);
      state.debt_record.unshift(debt_record);
    },
  },
  actions: {
    get_debt_records({ commit, state, rootState }) {
      let data = state.param;
      state.table_loading = true;
      return new Promise((resolve) => {
        let skip = (data.page - 1) * data.itemsPerPage;
        let limit = data.itemsPerPage;
        let query = "";
        if (
          state.debtRecordQuery != undefined &&
          state.debtRecordQuery != null &&
          state.debtRecordQuery.length > 0
        )
          query = `&query=${state.debtRecordQuery}`;
        axios({
          url:
            `${rootState.server}` +
            "/api/get_debt_records" +
            "?skip=" +
            skip +
            "&limit=" +
            limit +
            query,
          method: "get",
        })
          .then((response) => {
            state.pageCount = response.data.count;
            commit("GET_DEBT_RECODES", response.data.result);
            state.table_loading = false;
            resolve(response);
          })
          .catch(() => {
            state.table_loading = false;
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
    pay_debt_records({ commit, state, rootState }, data) {
      state.table_loading = true;
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}` + "/api/pay_debt_records",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "put",
        })
          .then((response) => {
            commit("PAY_DEBT_RECODES", response.data.result[0]);
            state.table_loading = false;
            resolve(response);
          })
          .catch(() => {
            state.table_loading = false;
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
  },
};
export default debtRecord;
