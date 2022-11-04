<template>
  <v-container fluid>
    <v-row>
      <!-- Card goods -->
      <!-- Table  -->
      <v-col cols="12">
        <v-card class="mx-auto card" width="95%">
          <v-col cols="12">
            <Tables
              :headers="headers"
              :loading="table_loading"
              :title="title"
              :items="users"
              :item="item"
              :search="users_Query"
              :pageCount="pageCount"
              :pagination="pagination"
              button2="fa-ban"
              @fa-ban="user_status_change"
              @add-user="popUser = !popUser"
              @update-item="pagination.itemsPerPage = $event"
              @update-pag="pagination.page = $event"
              @update-query="update_users_Query"
              @query-change="query_change" />
          </v-col>
        </v-card>
      </v-col>
      <!-- End table -->
      <AppAddUser :value="popUser" v-on:popUser="popUser = !popUser" />
    </v-row>
  </v-container>
</template>
<script>
  import Tables from "../components/Accounts/AppTable.vue";
  import AppAddUser from "../components/Accounts/AppAddUser.vue";
  export default {
    components: { Tables, AppAddUser },
    data() {
      return {
        popUser: false,
        title: "جدول ادارة الحسابات",
        headers: [
          {
            text: "اسم العميل",
            align: "center",
            filterable: true,
            value: "name",
            class: "indigo darken-4 white--text title ",
          },
          {
            text: "اسم المستخدم",
            value: "company",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "رقم الهاتف",
            value: "buy_price",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "اسم المتجر",
            value: "buy_price",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "تاريخ انشاء الحساب",
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
        item: [1, 2, 5, 10, 25, 50, 100],
        pagination: { sortBy: [], sortDesc: [], page: 1, itemsPerPage: 10 },
      };
    },
    mounted() {
      this.$store.dispatch("get_users");
    },
    computed: {
      table_loading() {
        return this.$store.state.table_loading;
      },
      users() {
        return this.$store.state.users;
      },
      pageCount() {
        return this.$store.state.pageCount;
      },
      users_params: {
        set(val) {
          this.$store.state.params = val;
        },
        get() {
          return this.$store.state.params;
        },
      },
      users_Query: {
        set(val) {
          this.$store.state.userQuery = val;
        },
        get() {
          return this.$store.state.userQuery;
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
      get_users() {
        let pagination = this.pagination;
        let par = {
          ...pagination,
        };
        this.users_params = par;
        this.$store.dispatch("get_users");
      },
      query_change() {
        clearTimeout(this._timerId);
        this._timerId = setTimeout(() => {
          this.pagination.page = 1;
          this.get_users();
        }, 500);
      },
      update_users_Query(event) {
        this.users_Query = event;
      },
      user_status_change(item) {
        let data = {};
        data["id"] = item.id;
        this.$store.dispatch("user_status_change", data);
      },
    },
    watch: {
      pagination: {
        handler() {
          this.get_users();
        },
        deep: true,
      },
    },
  };
</script>
