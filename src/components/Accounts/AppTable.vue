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
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                fab
                small
                v-on="on"
                icon
                color="blue darken-4"
                v-on:click="$emit('add-user')">
                <font-awesome :icon="['fas', 'fa-plus']" size="2x" />
              </v-btn>
            </template>
            <span>اضافة مستخدمين</span>
          </v-tooltip>
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
          <td class="text-center font-weight-black">{{ item.name }}</td>
          <td class="text-center font-weight-black">{{ item.user_name }}</td>
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
                  @click="popBan(item)">
                  <font-awesome
                    style="color: white"
                    :icon="['fas', button2]"
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
                  @click="popBan(item)">
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
      popBan(item) {
        this.$emit(this.button2, item);
      },
    },
  };
</script>
