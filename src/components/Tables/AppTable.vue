<template>
  <v-col>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      hide-default-footer
      loading-text="جاري التحميل يرجى الأنتظار"
    >
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
            class="mr-5 font-weight-black"
          ></v-text-field>
        </v-toolbar>
      </template>
      <th v-for="header in headers" :key="header.text">
        <v-icon small>mdi-arrow_upward</v-icon>
        {{ header.text }}
      </th>

      <template v-slot:item="{ item }">
        <tr>
          <td class="text-center font-weight-black">{{ item.name }}</td>
          <td class="text-center font-weight-black" v-if="item.company == null">
            <h5 style="color: red">لايوجد</h5>
          </td>
          <td class="text-center font-weight-black" v-else>
            {{ item.company }}
          </td>
          <td class="text-center font-weight-black">{{ item.quantity }}</td>
          <td class="text-center font-weight-black">{{ item.sale_price }}</td>
          <td class="text-center font-weight-black">{{ item.buy_price }}</td>
          <td
            class="text-center font-weight-black"
            v-if="item.product_code == null"
          >
            <h5 style="color: red">لايوجد</h5>
          </td>
          <td class="text-center font-weight-black" v-else>
            {{ item.product_code }}
          </td>

          <td class="text-center font-weight-black">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  color="grey darken-3 "
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="white">mdi-power</v-icon>
                </v-btn>
              </template>
              <span>ايقاف</span>
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
            label="Items per page"
          ></v-select>
        </v-col>
        <v-col align-self="center" cols="5" sm="5" md="3" lg="3">
          <v-pagination
            :value="pagination.page"
            :length="pageCount"
            @input="changePagination"
            circle
            color="blue darken-4"
          ></v-pagination>
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
    },
  };
</script>
