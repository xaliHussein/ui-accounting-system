<template>
  <v-container fluid>
    <v-row>
      <!-- Card goods -->
      <v-col cols="12" sm="12" md="12" lg="12" class="pb-8">
        <v-card class="mx-auto mt-3 card" width="95%">
          <v-form ref="form" v-model="valid">
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <Input
                    @update-value="nameProducer = $event"
                    :value="nameProducer"
                    icon="mdi-semantic-web"
                    type="text"
                    label="اسم المنتج"
                    :rules="nameProducerRules"
                  />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <Input
                    @update-value="quantity = $event"
                    :value="quantity"
                    icon="mdi-database-edit"
                    type="number"
                    label="كمية"
                    :rules="Rules"
                  />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <Input
                    @update-value="buying = $event"
                    :value="buying"
                    type="number"
                    icon="mdi-currency-usd"
                    label="سعر الشراء"
                    :rules="Rules"
                  />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <Input
                    @update-value="Sale = $event"
                    :value="Sale"
                    type="number"
                    label="سعر البيع"
                    icon="mdi-currency-usd"
                    :rules="Rules"
                  />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <Input
                    @update-value="nameCompany = $event"
                    :value="nameCompany"
                    icon="mdi-domain"
                    type="text"
                    label="اسم الشركه"
                    :rules="Rules"
                  />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <Input
                    @update-value="productCode = $event"
                    :value="productCode"
                    type="number"
                    label="رقم المنتج"
                    icon="mdi-barcode-scan"
                    :rules="Rules"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12" class="text-center">
                  <v-btn
                    :loading="loadingButton"
                    color="#16213E"
                    @click="create_goods"
                    class="px-10"
                  >
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
            <Tables
              :headers="headers"
              :loading="table_loading"
              :title="title"
              :items="goods"
              :item="item"
              :search="goods_Query"
              :pageCount="pageCount"
              :pagination="goods_params"
              @update-item="pagination.itemsPerPage = $event"
              @update-pag="pagination.page = $event"
              @update-query="update_goods_Query"
              @query-change="query_change"
            />
          </v-col>
        </v-card>
      </v-col>
      <!-- End table -->
    </v-row>
  </v-container>
</template>
<script>
  import Input from "../components/Inputs/AppInput.vue";
  import Tables from "../components/Tables/AppTable.vue";
  export default {
    components: { Input, Tables },
    name: "AppBuy",
    data() {
      return {
        valid: false,
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
        ],
        item: [1, 2, 5, 10, 25, 50, 100],
        pagination: { sortBy: [], sortDesc: [], page: 1, itemsPerPage: 10 },
      };
    },
    mounted() {
      this.$store.dispatch("goods/get_goods");
    },
    computed: {
      loadingButton() {
        return this.$store.state.goods.loadingButton;
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
          this.$store.state.goods.goodsQuery = val;
        },
        get() {
          return this.$store.state.goods.goodsQuery;
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
          this.$store.dispatch("goods/add_goods", data);
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
      update_goods_Query(event) {
        this.goods_Query = event;
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

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
