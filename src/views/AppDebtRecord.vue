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
              :items="debt_records"
              :item="item"
              :search="debt_record_query"
              :pageCount="pageCount"
              :pagination="pagination"
              button1="mdi-cast-variant"
              button2="fa-circle-dollar-to-slot"
              @mdi-cast-variant="display_product"
              @fa-circle-dollar-to-slot="pay_debts"
              @update-item="pagination.itemsPerPage = $event"
              @update-pag="pagination.page = $event"
              @update-query="update_debt_record_Query"
              @query-change="query_change" />
          </v-col>
        </v-card>
      </v-col>
      <!-- End table -->
      <!-- pops -->
      <AppPopDisplay
        :value="PopDisplay"
        v-on:popDisplay="PopDisplay = !PopDisplay" />
      <AppPayDebts :value="PayDebts" v-on:PayDebts="PayDebts = !PayDebts" />
      <!-- end -->
    </v-row>
  </v-container>
</template>
<script>
  import Tables from "../components/Sale/AppTable.vue";
  import AppPopDisplay from "../components/Sale/AppPopDisplay.vue";
  import AppPayDebts from "../components/Dept Recoed/AppPayDebts.vue";
  export default {
    components: { Tables, AppPopDisplay, AppPayDebts },
    data() {
      return {
        PopDisplay: false,
        PayDebts: false,
        item: [1, 5, 10, 25, 50, 100],
        pagination: { sortBy: [], sortDesc: [], page: 1, itemsPerPage: 10 },
        title: "جدول الديون",
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
      this.$store.dispatch("debtRecord/get_debt_records");
    },
    computed: {
      table_loading() {
        return this.$store.state.debtRecord.table_loading;
      },
      debt_records() {
        return this.$store.state.debtRecord.debt_record;
      },
      pageCount() {
        return this.$store.state.debtRecord.pageCount;
      },
      params: {
        set(val) {
          this.$store.state.debtRecord.param = val;
        },
        get() {
          return this.$store.state.debtRecord.param;
        },
      },
      debt_record_query: {
        set(val) {
          this.$store.state.debtRecord.debtRecordQuery = val;
        },
        get() {
          return this.$store.state.debtRecord.debtRecordQuery;
        },
      },
    },
    methods: {
      get_debt_records() {
        let pagination = this.pagination;
        let par = {
          ...pagination,
        };
        this.params = par;
        this.$store.dispatch("debtRecord/get_debt_records");
      },
      query_change() {
        clearTimeout(this._timerId);
        this._timerId = setTimeout(() => {
          this.pagination.page = 1;
          this.get_debt_records();
        }, 500);
      },
      update_debt_record_Query(event) {
        this.debt_record_query = event;
      },
      display_product(item) {
        this.$store.state.sale.get_sale_id = item.good_sales;
        if (item.good_sales.length > 0) {
          this.PopDisplay = !this.PopDisplay;
        } else {
          let snack_message = {};
          snack_message["color"] = "orange darken-1";
          snack_message["icon"] = "alert";
          snack_message["text"] = "تم ارجاع بضائع هذه فاتوره";
          this.$store.commit("SNACK_MESSAGE", snack_message);
          setTimeout(() => {
            this.$store.commit("TIME_OUT", snack_message);
          }, 4000);
        }
      },
      pay_debts(item) {
        if (item.total_debt != 0) {
          this.$store.state.debtRecord.change_total_debt = item.total_debt;
          this.$store.state.debtRecord.debt_record_id = item;
          this.PayDebts = !this.PayDebts;
        } else {
          let snack_message = {};
          snack_message["color"] = "orange darken-1";
          snack_message["icon"] = "alert";
          snack_message["text"] = "لايوجد ديون على هذه فاتوره";
          this.$store.commit("SNACK_MESSAGE", snack_message);
          setTimeout(() => {
            this.$store.commit("TIME_OUT", snack_message);
          }, 4000);
        }
      },
    },
    watch: {
      pagination: {
        handler() {
          this.get_debt_records();
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
