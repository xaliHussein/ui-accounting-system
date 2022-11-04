<template>
  <v-col>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      hide-default-footer
      loading-text="جاري التحميل يرجى الأنتظار">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            :value="search"
            @input="updateQuery"
            append-icon="mdi-magnify"
            clearable
            color="black"
            label="بحث"
            single-line
            hide-details
            class="mr-5 font-weight-black"></v-text-field>
        </v-toolbar>
      </template>
      <th v-for="header in headers" :key="header.text">
        <v-icon small>mdi-arrow_upward</v-icon>
        {{ header.text }}
      </th>

      <template v-slot:item="{ item }">
        <tr>
          <td class="text-center font-weight-black">{{ item.client_name }}</td>
          <td
            class="text-center font-weight-black"
            v-if="item.client_phone == null">
            <h5 style="color: red">لايوجد</h5>
          </td>
          <td class="text-center font-weight-black" v-else>
            {{ item.client_phone }}
          </td>
          <td class="text-center font-weight-black">
            {{ item.total_price | formatNumber }}
          </td>
          <td
            class="text-center font-weight-black"
            v-if="item.debt_record == 0">
            نقد
          </td>
          <td
            class="text-center font-weight-black"
            v-else-if="item.debt_record == 1">
            آجل
          </td>
          <td class="text-center font-weight-black" v-if="item.total_debt > 0">
            {{ item.total_debt | formatNumber }}
          </td>
          <td
            class="text-center font-weight-black"
            v-else-if="item.total_debt == 0">
            <h5 style="color: red">لايوجد</h5>
          </td>
          <td
            class="text-center font-weight-black"
            v-if="item.sales_recovery == 0">
            <h5 style="color: red">لا</h5>
          </td>
          <td
            class="text-center font-weight-black"
            v-else-if="item.sales_recovery == 1">
            <h5 style="color: green">نعم</h5>
          </td>

          <td class="text-center font-weight-black">
            {{ moment(item.created_at).format("YYYY-MM-DD") }}
          </td>

          <td class="text-center font-weight-black">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="button1"
                  fab
                  x-small
                  color="grey darken-3 "
                  v-bind="attrs"
                  v-on="on"
                  @click="popDisplay(item)">
                  <v-icon color="white">{{ button1 }}</v-icon>
                </v-btn>
              </template>
              <span>عرض مواد</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="button2"
                  fab
                  x-small
                  class="mr-1"
                  color="#E65100"
                  v-bind="attrs"
                  v-on="on"
                  @click="payDebts(item)">
                  <font-awesome
                    style="color: white"
                    :icon="['fas', button2]"
                    size="2x" />
                </v-btn>
              </template>
              <span>تسديد</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-center font-weight-black pt-2 mt-3">
      <v-row>
        <v-col align-self="center" cols="5" sm="5" md="2" lg="2" class="mr-4">
          <v-select
            :value="pagination.itemsPerPage"
            :items="item"
            @input="$emit('update-item', $event)"
            label="Items per page"></v-select>
        </v-col>
        <v-col align-self="center" cols="5" sm="5" md="3" lg="3">
          <v-pagination
            :value="pagination.page"
            :length="pageCount"
            @input="changePagination"
            circle
            color="indigo darken-4"></v-pagination>
        </v-col>
      </v-row>
    </div>
  </v-col>
</template>
<script>
  export default {
    props: {
      headers: {
        type: Array,
        required: true,
      },
      items: {
        type: Array,
        required: true,
      },
      item: {
        type: Array,
        required: true,
      },
      pagination: {
        type: Object,
        required: true,
      },
      button1: {
        type: String,
        required: false,
      },
      button2: {
        type: String,
        required: false,
      },
      loading: Boolean,
      title: String,
      pageCount: Number,
      search: String,
    },
    methods: {
      changePagination(event) {
        this.$emit("update-pag", event);
      },
      updateQuery(event) {
        this.$emit("update-query", event);
        this.$emit("query-change");
      },
      popDisplay(item) {
        this.$emit(this.button1, item);
      },
      payDebts(item) {
        this.$emit(this.button2, item);
      },
    },
  };
</script>
