<template>
  <v-container fluid>
    <v-row>
      <!-- Card goods -->
      <!-- Table  -->
      <v-col cols="12">
        <v-card class="mx-auto card" width="95%">
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="users"
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
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        fab
                        small
                        v-on="on"
                        icon
                        color="blue darken-4"
                        @click="popUser = !popUser">
                        <font-awesome :icon="['fas', 'fa-plus']" size="2x" />
                      </v-btn>
                    </template>
                    <span>اضافة مستخدمين</span>
                  </v-tooltip>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="users_Query"
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
                  <td class="text-center font-weight-black">
                    {{ item.user_name }}
                  </td>
                  <td
                    class="text-center font-weight-black"
                    v-if="item.phone_number == null">
                    <h5 style="color: red">لايوجد</h5>
                  </td>
                  <td class="text-center font-weight-black" v-else>
                    {{ item.phone_number }}
                  </td>
                  <td class="text-center font-weight-black">
                    {{ item.store[0].name }}
                  </td>
                  <td class="text-center font-weight-black">
                    {{ moment(item.created_at).format("YYYY-MM-DD") }}
                  </td>

                  <td class="text-center font-weight-black">
                    <v-tooltip bottom v-if="item.activation == 0">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          fab
                          x-small
                          style="background-color: #b71c1c"
                          v-bind="attrs"
                          v-on="on"
                          @click="user_status_change(item)">
                          <font-awesome
                            style="color: white"
                            :icon="['fas', 'fa-ban']"
                            size="2x" />
                        </v-btn>
                      </template>
                      <span>حظر</span>
                    </v-tooltip>
                    <v-tooltip bottom v-else>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          fab
                          x-small
                          style="background-color: #43a047"
                          v-bind="attrs"
                          v-on="on"
                          @click="user_status_change(item)">
                          <font-awesome
                            style="color: white"
                            :icon="['fas', 'fa-circle-check']"
                            size="2x" />
                        </v-btn>
                      </template>
                      <span>فتح الحظر</span>
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
                    :items="item"
                    label="Items per page"></v-select>
                </v-col>
                <v-col align-self="center" cols="5" sm="5" md="3" lg="3">
                  <v-pagination
                    v-model="pagination.page"
                    :length="pageCount"
                    circle
                    color="indigo darken-4"></v-pagination>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-card>
      </v-col>
      <!-- End table -->
      <AppAddUser :value="popUser" v-on:popUser="popUser = !popUser" />
    </v-row>
  </v-container>
</template>
<script>
  import AppAddUser from "../components/Accounts/AppAddUser.vue";
  export default {
    components: { AppAddUser },
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
        pagination: {},
      };
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
          this.$store.state.param = val;
        },
        get() {
          return this.$store.state.param;
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
      user_status_change(item) {
        let data = {};
        data["id"] = item.id;
        this.$store.dispatch("user_status_change", data);
      },
      changeSort(column) {
        let pagination = this.users_params;
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
        this.$store.dispatch("get_users");
        this.goods_params.page = 1;
        this.goods_params.sortBy = pagination.sortBy;
        this.goods_params.sortDesc = pagination.sortDesc;
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
<style scoped>
  .card {
    border-radius: 25px;
  }
</style>
