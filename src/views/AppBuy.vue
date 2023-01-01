<template>
  <v-container fluid>
    <v-row>
      <!-- Card goods -->
      <v-col cols="12" sm="12" md="12" lg="12" class="pb-8">
        <v-card class="mx-auto mt-3 card" width="95%">
          <v-form ref="form">
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <Input
                    @update-value="nameProducer = $event"
                    :value="nameProducer"
                    icon="mdi-semantic-web"
                    type="text"
                    label="اسم المنتج"
                    :rules="nameProducerRules" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <Input
                    @update-value="quantity = $event"
                    :value="quantity"
                    icon="mdi-database-edit"
                    type="number"
                    label="كمية"
                    :rules="Rules" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <Input
                    @update-value="buying = $event"
                    :value="buying"
                    type="number"
                    icon="mdi-currency-usd"
                    label="سعر الشراء"
                    hint="يرجى ادخال جميع الاسعار بالدينار العراقي"
                    :rules="Rules" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <Input
                    @update-value="Sale = $event"
                    :value="Sale"
                    type="number"
                    label="سعر البيع"
                    icon="mdi-currency-usd"
                    hint="يرجى ادخال جميع الاسعار بالدينار العراقي"
                    :rules="Rules" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <Input
                    @update-value="nameCompany = $event"
                    :value="nameCompany"
                    icon="mdi-domain"
                    type="text"
                    label="اسم الشركه" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <Input
                    @update-value="productCode = $event"
                    :value="productCode"
                    type="number"
                    label="رقم المنتج"
                    icon="mdi-barcode-scan"
                    :rules="Rules" />
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12" class="text-center">
                  <v-btn
                    :loading="loading_button"
                    color="#16213E"
                    @click="create_goods"
                    class="px-10">
                    <h3 style="color: white">انشاء منتج</h3>
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon color="white">mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
      <!-- end card -->

      <!-- Table  -->
      <v-col cols="12">
        <v-card class="mx-auto card" width="95%">
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="goods"
              :options.sync="pagination"
              :page.sync="pagination.page"
              :items-per-page="pagination.itemsPerPage"
              :loading="table_loading || false"
              hide-default-footer
              loading-text="جاري التحميل يرجى الأنتظار">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>{{ title }}</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="goods_Query"
                    @input="query_change"
                    append-icon="mdi-magnify"
                    clearable
                    color="black"
                    label="بحث"
                    single-line
                    hide-details
                    class="mr-5 font-weight-black"></v-text-field>
                </v-toolbar>
              </template>
              <th
                v-for="header in headers"
                :key="header.text"
                :class="[
                  'column sortable',
                  pagination.descending ? 'desc' : 'asc',
                  header.value === pagination.sortBy ? 'active' : '',
                ]"
                @click="changeSort(header.value)">
                <v-icon small>mdi-arrow_upward</v-icon>
                {{ header.text }}
              </th>

              <template v-slot:item="{ item }">
                <tr>
                  <td class="text-center font-weight-black">{{ item.name }}</td>
                  <td
                    class="text-center font-weight-black"
                    v-if="item.company == null">
                    <h5 style="color: red">لايوجد</h5>
                  </td>
                  <td class="text-center font-weight-black" v-else>
                    {{ item.company }}
                  </td>
                  <td class="text-center font-weight-black">
                    {{ item.quantity }}
                  </td>
                  <td class="text-center font-weight-black">
                    {{ item.buy_price | formatNumber }}
                  </td>
                  <td class="text-center font-weight-black">
                    {{ item.sale_price | formatNumber }}
                  </td>
                  <td
                    class="text-center font-weight-black"
                    v-if="item.product_code == null">
                    <h5 style="color: red">لايوجد</h5>
                  </td>
                  <td class="text-center font-weight-black" v-else>
                    {{ item.product_code }}
                  </td>
                  <td class="text-center font-weight-black">
                    {{ moment(item.created_at).format("YYYY-MM-DD") }}
                  </td>

                  <td class="text-center font-weight-black">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          fab
                          x-small
                          color="grey darken-3 "
                          v-bind="attrs"
                          v-on="on"
                          @click="edit_goods(item)">
                          <v-icon color="white">mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>تعديل</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          fab
                          class="mr-1"
                          x-small
                          style="background-color: #b71c1c"
                          v-bind="attrs"
                          v-on="on"
                          @click="delete_goods(item)">
                          <v-icon color="white">mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span>حذف</span>
                    </v-tooltip>
                  </td>
                </tr>
              </template>
            </v-data-table>
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
                    :items="itemss"
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
      <!-- End table -->
      <!-- pops -->
      <AppPopEdit :value="popEdit" v-on:popEdit="popEdit = !popEdit" />
      <AppPopDelete
        :value="popDelete"
        v-on:popDelete="popDelete = !popDelete" />
      <!-- end -->
    </v-row>
  </v-container>
</template>
<script>
  import Input from "../components/Inputs/AppInput.vue";
  import AppPopEdit from "../components/Buy/AppPopEdit.vue";
  import AppPopDelete from "../components/Buy/AppPopDelete.vue";
  export default {
    components: { Input, AppPopEdit, AppPopDelete },
    name: "AppBuy",
    data() {
      return {
        valid: false,
        popEdit: false,
        popDelete: false,
        nameProducer: "",
        nameCompany: "",
        quantity: "",
        Sale: "",
        buying: "",
        productCode: "",
        nameProducerRules: [
          (value) => !!value || "هذا الحقل مطلوب",
          (value) =>
            value.length <= 255 || "الحد الاعلى لاحرف المسموحه هوه 255 حرف",
        ],
        Rules: [(value) => !!value || "هذا الحقل مطلوب"],

        title: "جدول ادارة البضائع",
        headers: [
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
            text: "الكميه",
            value: "buy_price",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "سعر الشراء",
            value: "sale_price",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "سعر البيع",
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
          {
            text: "اجرائات",
            value: "procedures",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
        ],
        itemss: [1, 2, 5, 10, 25, 50, 100],
        pagination: {},
      };
    },

    computed: {
      loading_button() {
        return this.$store.state.goods.loading_button;
      },
      table_loading() {
        return this.$store.state.goods.table_loading;
      },
      goods() {
        return this.$store.state.goods.goods;
      },
      pageCount() {
        return this.$store.state.goods.pageCount;
      },
      goods_params: {
        set(val) {
          this.$store.state.goods.params = val;
        },
        get() {
          return this.$store.state.goods.params;
        },
      },
      goods_Query: {
        set(val) {
          this.$store.state.goods.goods_Query = val;
        },
        get() {
          return this.$store.state.goods.goods_Query;
        },
      },
    },
    methods: {
      create_goods() {
        if (this.$refs.form.validate()) {
          let data = {};
          data["name"] = this.nameProducer;
          data["quantity"] = this.quantity;
          data["buy_price"] = this.buying;
          data["sale_price"] = this.Sale;
          data["company"] = this.nameCompany;
          data["product_code"] = this.productCode;
          this.$store.dispatch("goods/add_goods", data).then(() => {
            this.$store.dispatch("goods/get_goods");
          });
          this.$refs.form.reset();
        }
      },
      get_goods() {
        let pagination = this.pagination;
        let par = {
          ...pagination,
        };
        this.goods_params = par;
        this.$store.dispatch("goods/get_goods");
      },
      query_change() {
        clearTimeout(this._timerId);
        this._timerId = setTimeout(() => {
          this.pagination.page = 1;
          this.get_goods();
        }, 500);
      },
      changeSort(column) {
        let pagination = this.goods_params;
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
        this.$store.dispatch("goods/get_goods");
        this.goods_params.page = 1;
        this.goods_params.sortBy = pagination.sortBy;
        this.goods_params.sortDesc = pagination.sortDesc;
      },

      edit_goods(item) {
        Object.assign(this.$store.state.goods.edit_goods, item);
        this.popEdit = !this.popEdit;
      },
      delete_goods(item) {
        this.$store.state.goods.delete_goods = item.id;
        this.popDelete = !this.popDelete;
      },
    },
    watch: {
      pagination: {
        handler() {
          this.get_goods();
        },
        deep: true,
      },
    },
  };
</script>
<style scoped>
  .card {
    border-radius: 25px;
  }
</style>
