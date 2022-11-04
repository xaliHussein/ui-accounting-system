<template>
  <v-container fluid>
    <v-row>
      <!-- Table  -->
      <v-col cols="12">
        <v-card class="mx-auto card" width="95%">
          <v-col cols="12">
            <Tables
              :headers="headers"
              :loading="table_loading"
              :title="title"
              :items="sales"
              :item="item"
              :search="sales_Query"
              :pageCount="pageCount"
              :pagination="pagination"
              button1="mdi-cast-variant"
              @mdi-cast-variant="display_product"
              @update-item="pagination.itemsPerPage = $event"
              @update-pag="pagination.page = $event"
              @update-query="update_sales_Query"
              @query-change="query_change" />
          </v-col>
        </v-card>
      </v-col>
      <!-- End table -->
      <!-- pops -->
      <AppPopDisplay
        :value="PopDisplay"
        v-on:popDisplay="PopDisplay = !PopDisplay" />
      <!-- end -->
    </v-row>
  </v-container>
</template>
<script>
  import Tables from "../components/Sale/AppTable.vue";
  import AppPopDisplay from "../components/Sale/AppPopDisplay.vue";
  export default {
    components: { Tables, AppPopDisplay },
    data() {
      return {
        PopDisplay: false,
        item: [1, 2, 5, 10, 25, 50, 100],
        pagination: { sortBy: [], sortDesc: [], page: 1, itemsPerPage: 10 },
        title: "جدول مبيعات",
        headers: [
          {
            text: "اسم الزبون",
            align: "center",
            filterable: true,
            value: "client_name",
            class: "indigo darken-4 white--text title ",
          },
          {
            text: "رقم الهاتف",
            value: "client_phone",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "سعر الكلي",
            value: "total_price",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "نوع البيع",
            value: "debt_record",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "الديون",
            value: "total_debt",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "راجع بيع",
            value: "total_debt",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "تاريخ شراء",
            value: "created_at",
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
      };
    },
    mounted() {
      this.$store.dispatch("sale/get_sales");
    },
    computed: {
      table_loading() {
        return this.$store.state.sale.table_loading;
      },
      pop_loading() {
        return this.$store.state.sale.pop_loading;
      },
      sales() {
        return this.$store.state.sale.sales;
      },
      pageCount() {
        return this.$store.state.sale.salePageCount;
      },
      sale_params: {
        set(val) {
          this.$store.state.sale.sale_param = val;
        },
        get() {
          return this.$store.state.sale.sale_param;
        },
      },
      sales_Query: {
        set(val) {
          this.$store.state.sale.saleQuery = val;
        },
        get() {
          return this.$store.state.sale.saleQuery;
        },
      },
    },
    methods: {
      get_sales() {
        let pagination = this.pagination;
        let par = {
          ...pagination,
        };
        this.sale_params = par;
        this.$store.dispatch("sale/get_sales");
      },
      query_change() {
        clearTimeout(this._timerId);
        this._timerId = setTimeout(() => {
          this.pagination.page = 1;
          this.get_sales();
        }, 500);
      },
      update_sales_Query(event) {
        this.sales_Query = event;
      },
      display_product(item) {
        this.$store.state.sale.get_sale_id = item.good_sales;
        this.PopDisplay = !this.PopDisplay;
      },
    },
    watch: {
      pagination: {
        handler() {
          this.get_sales();
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
