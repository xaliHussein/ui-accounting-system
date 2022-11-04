<template>
  <v-dialog :value="value" persistent max-width="750px">
    <!-- from -->
    <v-card width="750px" class="mx-auto card">
      <v-toolbar class="d-flex justify-center" color="indigo darken-4">
        <h2 style="color: white">الفاتوره</h2>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="get_sales_id"
                hide-default-footer>
                <th v-for="header in headers" :key="header.text">
                  {{ header.text }}
                </th>
                <template v-slot:item="{ item }">
                  <tr>
                    <td class="text-center font-weight-black">
                      {{ item.goods.name }}
                    </td>
                    <td class="text-center font-weight-black">
                      {{ item.goods.company }}
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
                        <span class="px-3 black--text">{{
                          item.quantity
                        }}</span>
                        <v-btn
                          icon
                          small
                          @click="minus(item)"
                          style="background-color: #1a237e"
                          ><v-icon color="white">mdi-minus</v-icon></v-btn
                        >
                      </span>
                    </td>
                    <td class="text-center font-weight-black">
                      {{ item.quantity * item.goods.sale_price }}
                    </td>
                    <td class="text-center font-weight-black">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="sales_recovery(item)"
                            :loading="recovery_button"
                            fab
                            x-small
                            color="grey darken-3"
                            v-bind="attrs"
                            v-on="on">
                            <v-icon color="white">mdi-cached</v-icon>
                            <template v-slot:loader>
                              <span class="custom-loader">
                                <v-icon color="white">mdi-cached</v-icon>
                              </span>
                            </template>
                          </v-btn>
                        </template>
                        <span>ارجاع</span>
                      </v-tooltip>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="indigo darken-4"
          class="px-10"
          v-on:click="$emit('popDisplay')">
          <h4 style="color: white">اغلاق</h4>
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- end -->
  </v-dialog>
</template>
<script>
  export default {
    props: {
      value: Boolean,
    },
    data() {
      return {
        pagination: {},
        original_quantity: 0,
        item: [5, 10, 25, 50, 100],
        headers: [
          {
            text: "اسم المنتج",
            align: "center",
            filterable: true,
            value: "name",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "اسم الشركه",
            value: "company",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "الكميه",
            value: "quantity",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "مجموع",
            value: "sale_price",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
          {
            text: "اجرائات",
            value: "sale_price",
            align: "center",
            class: "indigo darken-4 white--text title",
          },
        ],
      };
    },
    computed: {
      get_sales_id() {
        return this.$store.state.sale.get_sale_id;
      },
      original_sale_id() {
        return this.$store.state.sale.original_sale_id;
      },
      recovery_button() {
        return this.$store.state.sale.recovery_button;
      },
    },
    methods: {
      sales_recovery(item) {
        let data = {};
        data["sales_id"] = item.sales_id;
        data["goods_id"] = item.goods_id;
        data["good_quantity"] = item.quantity;
        this.$store.dispatch("sale/retrive_goods", data);
      },
      plus(item) {
        item.quantity += 1;
      },
      minus(item) {
        if (item.quantity != 1) {
          item.quantity -= 1;
        }
      },
    },
  };
</script>
