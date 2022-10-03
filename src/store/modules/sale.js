import axios from "axios";
const sale = {
  namespaced: true,
  state: {
    sales: [],
    goods: [],
    cart_goods: [],
    total_price: 0,
    goods_state: "done",
    goodQuery: "",
    barcodeQuery: "",
    pageCount: 1,
    param: {
      dropdown: true,
      sortBy: [],
      sortDesc: [],
      page: 1,
      itemsPerPage: 10,
    },
  },
  mutations: {
    GET_GOODS(state, goods) {
      state.goods.splice(0, state.goods.length);
      goods.forEach((element) => {
        state.goods.push(element);
      });
      state.goods_state = "done";
    },
    GOODS_DREPDWON_SUCCESS(state, goods) {
      if (goods.length == 0) {
        state.goods_state = "finished";
        if (state.param.page > 1) state.param.page = state.param.page - 1;
        return;
      }
      state.param.page = state.param.page + 1;
      goods.forEach((element) => {
        state.goods.push(element);
      });
      state.goods_state = "done";
    },
    // اضافة منتجات الى سلة تسوق باستخدام باركود
    GET_GOODS_BARCODE(state, goods) {
      let chack_goods = false
      state.cart_goods.forEach((e) => {
        if (e.id == goods[0].id) {
          chack_goods = true;
        }
      });
      if (chack_goods == false) {
        let ProductData = {};
        goods.forEach((element) => {
          if (element.quantity != 0) {
            ProductData["id"] = element.id;
            ProductData["quantity"] = 1;
            ProductData["name"] = element.name;
            ProductData["company"] = element.company;
            ProductData["sale_price"] = element.sale_price;
            ProductData["availableQuantity"] = element.quantity - 1;
            state.total_price += element.sale_price;
            state.cart_goods.push(ProductData);
          } else {
            let snack_message = {};
            snack_message["color"] = "orange darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "نفذت الكميه";
            this.commit("SNACK_MESSAGE", snack_message);
            setTimeout(() => {
              this.commit("TIME_OUT", snack_message);
            }, 4000);
          }
        });
      }
    },
    ADD_SALES(state, sales) {
      state.sales.push(sales);
    },
  },
  actions: {
    // احضار البضائع وعرضها في scroll
    get_goods({ commit, state, rootState }) {
      let data = state.param;
      return new Promise((resolve) => {
        let skip = (data.page - 1) * data.itemsPerPage;
        let limit = data.itemsPerPage;
        let query = "";
        if (
          state.goodQuery != undefined &&
          state.goodQuery != null &&
          state.goodQuery.length > 0
        )
          query = `&query=${state.goodQuery}`;
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
            if (data.dropdown == false) {
              commit("GET_GOODS", response.data.result);
            } else {
              commit("GOODS_DREPDWON_SUCCESS", response.data.result);
            }

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
          });
      });
    },
    // احضار البضائع عن طريق باركود
    get_goods_barcode({ commit, state, rootState }) {
      // state.table_loading = true;
      return new Promise((resolve) => {
        let query = "";
        if (
          state.barcodeQuery != undefined &&
          state.barcodeQuery != null &&
          state.barcodeQuery.length > 0
        )
          query = `?query=${state.barcodeQuery}`;
        axios({
          url: `${rootState.server}` + "/api/get_goods_barcode" + query,
          method: "get",
        }).then((response) => {
          if (response.data.result) {
           commit("GET_GOODS_BARCODE", response.data.result);
          } 

          resolve(response);
        });
      });
    },
    // انشاء عمليه شراء
    // eslint-disable-next-line no-unused-vars
    add_sale({ commit, state, rootState }, data) {
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}` + "/api/add_sales",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
        })
          .then((response) => {
            commit("ADD_SALES", response.data.result);
            let snack_message = {};
            snack_message["color"] = "green darken-1";
            snack_message["icon"] = "checkbox-marked-circle";
            snack_message["text"] = "تمت عمليه شراء بنجاح";
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
            snack_message["text"] = "فشلة العمليه";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
          });
      });
    },
  },
};
export default sale;
