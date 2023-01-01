<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12" class="pb-8">
        <v-card class="mx-auto mt-3 card" width="95%">
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="cart_goods"
              hide-default-footer
              loading-text="جاري التحميل يرجى الأنتظار">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>جدول بيع بضائع</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-text-field
                    ref="barcode"
                    v-model="search_barcode"
                    @input="barcode"
                    append-icon="mdi-barcode-scan"
                    color="black"
                    label="باركود"
                    single-line
                    hide-details
                    clearable
                    class="mr-5 font-weight-black"></v-text-field>

                  <v-autocomplete
                    ref="goodDropdown"
                    :items="goods"
                    v-model="id"
                    color="black"
                    hide-details
                    item-text="name"
                    item-value="id"
                    label="المواد"
                    :menu-props="menu_props"
                    class="mr-5 font-weight-black"
                    clearable
                    :search-input.sync="goodQuery"
                    :value="goodQuery"
                    @input="add_goods">
                    <template v-slot:append-item>
                      <div
                        v-intersect="userInteract"
                        v-if="!($store.state.sale.goods_state == 'finished')"
                        class="text-lg-center"></div>
                    </template>
                  </v-autocomplete>
                </v-toolbar>
              </template>
              <th v-for="header in headers" :key="header.text">
                <v-icon small>mdi-arrow_upward</v-icon>
                {{ header.text }}
              </th>

              <template v-slot:item="{ item }">
                <tr>
                  <td class="text-center font-weight-bold">{{ item.name }}</td>
                  <td
                    class="text-center font-weight-bold"
                    v-if="item.company == null">
                    <h5 style="color: red">لايوجد</h5>
                  </td>
                  <td class="text-center font-weight-bold" v-else>
                    {{ item.company }}
                  </td>
                  <td class="text-center font-weight-bold">
                    {{ item.sale_price | formatNumber }}
                  </td>

                  <td class="text-center font-weight-bold">
                    <span>
                      <v-btn
                        icon
                        small
                        @click="plus(item)"
                        style="background-color: #1a237e"
                        ><v-icon color="white">mdi-plus</v-icon></v-btn
                      >
                      <span class="px-3 black--text">{{ item.quantity }}</span>
                      <v-btn
                        icon
                        small
                        @click="minus(item)"
                        style="background-color: #1a237e"
                        ><v-icon color="white">mdi-minus</v-icon></v-btn
                      >
                    </span>
                  </td>
                  <td class="text-center font-weight-bold">
                    {{ item.availableQuantity }}
                  </td>
                  <td class="text-center font-weight-bold">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          icon
                          @click="delete_item(item)"
                          style="background-color: #b71c1c"
                          ><v-icon color="white">mdi-delete</v-icon></v-btn
                        >
                      </template>
                      <span>حذف</span>
                    </v-tooltip>
                  </td>
                </tr>
              </template>
            </v-data-table>
            <v-card-text>
              <h3>مجموع : {{ total_price | formatNumber }}</h3>
            </v-card-text>
            <v-card-actions>
              <v-btn color="indigo darken-4 px-10" @click="pop">
                <h4 style="color: white">تاكيد</h4>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-card>
        <!-- pops -->
        <AppPopMonetary :value="dialog" v-on:popMonetary="dialog = !dialog" />
        <!-- end -->
      </v-col>
      <!-- table  -->
      <v-col cols="12" sm="12" md="12" lg="12" class="pb-8">
        <v-card class="mx-auto mt-3 card" width="95%">
          <v-col cols="12">
            <v-data-table
              :headers="headers2"
              :items="goods2"
              :options.sync="pagination"
              :page.sync="pagination.page"
              :items-per-page="pagination.itemsPerPage"
              :loading="sale_good_loading || false"
              hide-default-footer
              loading-text="جاري التحميل يرجى الأنتظار">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>جدول بضائع</v-toolbar-title>

                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="sale_good_query"
                    @input="queryChange"
                    append-icon="mdi-magnify"
                    label="بحث"
                    single-line
                    color="black"
                    clearable
                    hide-details
                    class="mr-5 font-weight-black"></v-text-field>
                </v-toolbar>
              </template>
              <th v-for="header in headers" :key="header.text">
                <v-icon small>mdi-arrow_upward</v-icon>
                {{ header.text }}
              </th>

              <template v-slot:item="{ item }">
                <tr class="click" @click="add_goods(item.id)">
                  <td class="text-center font-weight-black">{{ item.name }}</td>
                  <td class="text-center font-weight-black">
                    {{ item.company }}
                  </td>
                  <td class="text-center font-weight-black">
                    {{ item.sale_price | formatNumber }}
                  </td>
                  <td class="text-center font-weight-black">
                    {{ item.quantity }}
                  </td>

                  <td class="text-center font-weight-black">
                    {{ item.product_code }}
                  </td>
                  <td class="text-center font-weight-black">
                    {{ moment(item.created_at).format("YYYY-MM-DD") }}
                  </td>
                </tr>
              </template>
            </v-data-table>
            <!-- end Table -->
            <div class="text-center font-weight-black pt-2 mt-3">
              <v-row>
                <v-col
                  align-self="center"
                  cols="5"
                  sm="5"
                  md="2"
                  lg="2"
                  class="mr-4">
                  <v-select
                    v-model="pagination.itemsPerPage"
                    :items="items"
                    label="Items per page"></v-select>
                </v-col>
                <v-col align-self="center" cols="5" sm="5" md="3" lg="3">
                  <v-pagination
                    v-model="pagination.page"
                    :length="pageCount"
                    circle
                    color="indigo darken-4">
                  </v-pagination>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import AppPopMonetary from "../components/Sale/AppPopMonetary.vue";
  export default {
    components: { AppPopMonetary },
    data() {
      return {
        id: "",
        items: [5, 10, 25, 50, 100],
        pagination: {},
        dialog: false,
        menu_props: {
          closeOnClick: false,
          closeOnContentClick: false,
          disableKeys: true,
          openOnClick: false,
          maxHeight: 300,
          offsetY: true,
          offsetOverflow: true,
          transition: false,
        },
        headers: [
          {
            text: "اسم المنتج",
            align: "center",
            filterable: true,
            class: "indigo darken-4 white--text title ",
          },
          {
            text: "اسم الشركة",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "سعر",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "الكميه",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "الكميه المتاحه",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "اجرائات",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
        ],
        headers2: [
          {
            text: "اسم المنتج",
            align: "center",
            filterable: true,
            value: "name",
            class: "indigo darken-4 white--text title ",
          },
          {
            text: "اسم الشركة",
            value: "company",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "سعر",
            value: "buy_price",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "الكميه",
            value: "buy_price",
            align: "center",
            class: "indigo darken-4 white--text title",
          },

          {
            text: "رقم المنتج",
            value: "product_code",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "تاريخ شراء",
            value: "data",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
        ],
      };
    },
    mounted() {
      this.$store.dispatch("sale/get_goods");
    },
    computed: {
      goods() {
        return this.$store.state.sale.goods;
      },
      cart_goods() {
        return this.$store.state.sale.cart_goods;
      },
      goodQuery: {
        set(val) {
          this.$store.state.sale.goodQuery = val;
        },
        get() {
          return this.$store.state.sale.goodQuery;
        },
      },
      search_barcode: {
        set(val) {
          this.$store.state.sale.barcodeQuery = val;
        },
        get() {
          return this.$store.state.sale.barcodeQuery;
        },
      },
      total_price() {
        return this.$store.state.sale.total_price;
      },
      // computed الخاص ب جدول البضائع لاختيار منها لبيع
      sale_good_query: {
        set(val) {
          this.$store.state.sale.sale_good_query = val;
        },
        get() {
          return this.$store.state.sale.sale_good_query;
        },
      },
      goods2() {
        return this.$store.state.sale.sale_goods;
      },
      pageCount() {
        return this.$store.state.sale.saleGoodsPageCount;
      },
      goods_param: {
        set(val) {
          this.$store.state.sale.goods_param = val;
        },
        get() {
          return this.$store.state.sale.goods_param;
        },
      },
      sale_good_loading() {
        return this.$store.state.sale.sale_good_loading;
      },
      // end
    },
    methods: {
      pop() {
        if (this.$store.state.sale.cart_goods.length > 0) {
          this.dialog = !this.dialog;
        } else {
          let snack_message = {};
          snack_message["color"] = "orange darken-1";
          snack_message["icon"] = "alert";
          snack_message["text"] = "لم تقم باضافة مواد";
          this.$store.commit("SNACK_MESSAGE", snack_message);
          setTimeout(() => {
            this.$store.commit("TIME_OUT", snack_message);
          }, 4000);
        }
      },
      get_goods() {
        if (this.$store.state.sale.goods_state == "finished") return;
        this.$store.dispatch("sale/get_goods");
      },
      userInteract(entries, observer, isIntersecting) {
        if (isIntersecting) {
          setTimeout(() => {
            this.get_goods(); // onscroll
            this.$refs.goodDropdown.onScroll();
          }, 500);
        }
      },
      // احضار البضائع من خلال الباركود
      barcode() {
        clearTimeout(this._timerId);
        this._timerId = setTimeout(() => {
          this.$store.dispatch("sale/get_goods_barcode").then(() => {
            this.$refs.barcode.reset();
          });
        }, 500);
      },
      // حذف عنصر من جدول
      delete_item(item) {
        let index = this.$store.state.sale.cart_goods.findIndex((element) => {
          // يبحث عن المنتج المراد حذفه من الجدول يطابق ال id و الكميه
          if (element.id == item.id && element.quantity == item.quantity) {
            return element.id == item.id;
          }
        });
        this.$store.state.sale.total_price -= item.sale_price * item.quantity;
        this.$store.state.sale.cart_goods.splice(index, 1);
      },
      // اضفة في عدد كميه منتج
      plus(item) {
        if (item.availableQuantity != 0) {
          let index = this.$store.state.sale.cart_goods.findIndex((element) => {
            if (element.id == item.id && element.quantity == item.quantity) {
              return element.id == item.id;
            }
          });
          item.quantity += 1;
          item.availableQuantity -= 1;
          this.$store.state.sale.total_price += item.sale_price;
          this.$store.state.sale.cart_goods.splice(index, 1, item);
        } else {
          let snack_message = {};
          snack_message["color"] = "orange darken-1";
          snack_message["icon"] = "alert";
          snack_message["text"] = "نفذت الكميه";
          this.$store.commit("SNACK_MESSAGE", snack_message);
          setTimeout(() => {
            this.$store.commit("TIME_OUT", snack_message);
          }, 4000);
        }
      },
      // نقصان في عدد كميه منتج
      minus(item) {
        if (item.quantity > 1) {
          let index = this.$store.state.sale.cart_goods.findIndex((element) => {
            if (element.id == item.id && element.quantity == item.quantity) {
              return element.id == item.id;
            }
          });
          item.quantity -= 1;
          item.availableQuantity += 1;
          this.$store.state.sale.total_price -= item.sale_price;
          this.$store.state.sale.cart_goods.splice(index, 1, item);
        }
      },
      // احضار البضائع من خلال الاسم
      add_goods(id) {
        let chack_goods = false;
        // هذا الشرط لتاكد من ادخال بضاعه في بوكس البحث
        if (id != null) {
          let product = this.$store.state.sale.goods.find((element) => {
            return element.id == id;
          });
          this.$store.state.sale.cart_goods.forEach((e) => {
            if (e.id == product.id) {
              chack_goods = true;
            }
          });
          // هذا الشرط يعمل على ان لا يتم اضافة نفس المنتج مرتين
          if (chack_goods == false) {
            // هذا الشرط يمنع اضافة بضاعه انتهت كميتها
            if (product.quantity != 0) {
              let ProductData = {};
              ProductData["id"] = product.id;
              ProductData["quantity"] = 1;
              ProductData["name"] = product.name;
              ProductData["company"] = product.company;
              ProductData["sale_price"] = product.sale_price;
              ProductData["availableQuantity"] = product.quantity - 1;

              this.$store.state.sale.total_price += product.sale_price;
              this.$store.state.sale.cart_goods.push(ProductData);
              setTimeout(() => {
                this.$refs.goodDropdown.reset();
              }, 500);
            } else {
              // عرض اشعار بان البضاعه انتهت كمياتها
              let snack_message = {};
              snack_message["color"] = "orange darken-1";
              snack_message["icon"] = "alert";
              snack_message["text"] = "نفذت الكميه";
              this.$store.commit("SNACK_MESSAGE", snack_message);
              setTimeout(() => {
                this.$store.commit("TIME_OUT", snack_message);
              }, 4000);
            }
          } else {
            this.$refs.goodDropdown.reset();
          }
        }
      },
      // methode الخاص ب جدول بضائع لاختيار منها لبيع
      get_sale_goods() {
        let pagination = this.pagination;
        let par = {
          ...pagination,
        };
        this.goods_param = par;
        this.$store.dispatch("sale/get_sale_goods");
      },
      queryChange() {
        clearTimeout(this._timerId);
        this._timerId = setTimeout(() => {
          this.pagination.page = 1;
          this.get_sale_goods();
        }, 500);
      },
      changeSort(column) {
        let pagination = this.goods_param;
        if (pagination.sortBy[0] === column) {
          if (pagination.sortDesc[0] === true) {
            pagination.sortBy = [];
            pagination.sortDesc = [];
          } else {
            pagination.sortDesc = [true];
          }
        } else {
          pagination.sortBy = [column];
          pagination.sortDesc = [false];
        }
        this.$store.dispatch("sale/get_sale_goods");
        this.goods_param.page = 1;
        this.goods_param.sortBy = pagination.sortBy;
        this.goods_param.sortDesc = pagination.sortDesc;
      },
    },
    watch: {
      pagination: {
        handler() {
          this.get_sale_goods();
        },
        deep: true,
      },
    },
  };
</script>
<style scoped>
  .card {
    border-radius: 25px !important;
  }
  .click {
    cursor: pointer;
  }
</style>
