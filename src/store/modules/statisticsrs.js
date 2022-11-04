import axios from "axios";

const statisticsrs = {
  namespaced: true,
  state: {
   sales_stats: [],
   debt_stats: [],
   store_stats: [],
  },
  mutations: {
    GET_SALES_STATS(state, statisticsrs) {
      let object = {}
      let datasets= []
      let chartData = {}
      object['label'] = '',
      object['backgroundColor']="#EBD4EF",
      object['borderColor']="white",
      object['borderWidth']=3,
      object['data'] = statisticsrs[0],
      datasets.push(object)
      chartData['labels']=statisticsrs[1]
      chartData['datasets'] = datasets
      state.sales_stats = chartData;
    },
    GET_DEBT_STATS(state, statisticsrs) {
      let object = {}
      let datasets= []
      let chartData = {}
      object['label']= '',
      object['backgroundColor']="#EBD4EF",
      object['borderWidth']=3,
      object['data'] = statisticsrs[0],
      datasets.push(object)
      chartData['labels']=statisticsrs[1]
      chartData['datasets'] = datasets
      state.debt_stats = chartData;
    },
    GET_STORE_STATS(state, store_stats) {
      state.store_stats.splice(0, state.store_stats.length);
      store_stats.forEach((element) => {
        state.store_stats.push(element);
      });
    }
  },
  actions: {
   get_sales_stats({ commit, state ,rootState}) {
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}`  + "/api/get_sales_stats",
          method: "get",
        })
          .then((response) => {
            commit("GET_SALES_STATS", response.data.result);
            resolve(response);
          })
          .catch(() => {
            state.table_loading = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
           snack_message["text"] = "حدث مشكلة في الاتصال بالخادم";
            commit("SNACK_MESSAGE", snack_message);
            setTimeout(() => {
              commit("TIME_OUT", snack_message);
            }, 4000);
          });
      });
    },
   get_debt_stats({ commit, state ,rootState}) {
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}`  + "/api/get_debt_stats",
          method: "get",
        })
          .then((response) => {
            commit("GET_DEBT_STATS", response.data.result);
            resolve(response);
          })
          .catch(() => {
            state.table_loading = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
           snack_message["text"] = "حدث مشكلة في الاتصال بالخادم";
            commit("SNACK_MESSAGE", snack_message);
            setTimeout(() => {
              commit("TIME_OUT", snack_message);
            }, 4000);
          });
      });
    },
   get_store_stats({ commit, state ,rootState}) {
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}`  + "/api/get_store_stats",
          method: "get",
        })
          .then((response) => {
            commit("GET_STORE_STATS", response.data.result);
            resolve(response);
          })
          .catch(() => {
            state.table_loading = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
           snack_message["text"] = "حدث مشكلة في الاتصال بالخادم";
            commit("SNACK_MESSAGE", snack_message);
            setTimeout(() => {
              commit("TIME_OUT", snack_message);
            }, 4000);
          });
      });
    },
       
  },
};
export default statisticsrs;
