<template>
  <v-dialog :value="value" persistent max-width="750px">
    <!-- from -->
    <v-card width="750px" class="mx-auto card">
      <v-toolbar class="d-flex justify-center" color="indigo darken-4">
        <h2 style="color: white">تفاصيل المنتج</h2>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6">
              <!-- <Input
                @update-value="client_name = $event"
                :value="client_name"
                type="string"
                icon="mdi-palette"
                label="لون"
              /> -->
              <div class="form__field">
                <div class="form__input">
                  <swatches
                    v-model="color"
                    :colors="colors"
                    row-length="6"
                    shapes="circles"
                    show-border
                    popover-to="left"
                  ></swatches>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <Input
                @update-value="client_phone = $event"
                :value="client_phone"
                type="number"
                icon="mdi-tshirt-crew"
                label="قياس"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <Input
                @update-value="client_phone = $event"
                :value="client_phone"
                type="number"
                icon="mdi-database-edit"
                label="كميه"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="goodsVariations"
                hide-default-footer
              >
                <th v-for="header in headers" :key="header.text">
                  {{ header.text }}
                </th>
                <template v-slot:item="{ item }">
                  <tr>
                    <td class="text-center font-weight-black">
                      {{ item.color }}
                    </td>
                    <td class="text-center font-weight-black">
                      {{ item.size }}
                    </td>

                    <td class="text-center font-weight-black">
                      {{ item.stock_quantity }}
                    </td>
                    <td class="text-center font-weight-black">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="delete_variations(item)"
                            fab
                            icon
                            x-small
                            v-bind="attrs"
                            v-on="on"
                          >
                            <Icon
                              icon="ic:round-delete-forever"
                              color="#C62828"
                              width="32"
                            />
                          </v-btn>
                        </template>
                        <span>حذف كورس</span>
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
          v-on:click="$emit('popGoodsVariations')"
        >
          <h4 style="color: white">اغلاق</h4>
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- end -->
  </v-dialog>
</template>
<script>
import Swatches from "vue-swatches";
import "vue-swatches/dist/vue-swatches.min.css"
import Input from "@/components/Inputs/AppInput.vue";
export default {
  components: { Input, Swatches },
  props: {
    value: Boolean,
  },
  data() {
    return {
      color: "#F64272",
      colors: ["#F64272", "#F6648B", "#F493A7", "#F891A6", "#FFCCD5", ""],
      goodsVariations: [],
      headers: [
        {
          text: "لون",
          align: "center",
          filterable: true,
          value: "name",
          class: "indigo darken-4 white--text title",
        },
        {
          text: "القياس",
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
          text: "اجرائات",
          value: "sale_price",
          align: "center",
          class: "indigo darken-4 white--text title",
        },
      ],
    };
  },
  computed: {
    // get_sales_id() {
    //   return this.$store.state.sale.get_sale_id;
    // },
    // original_sale_id() {
    //   return this.$store.state.sale.original_sale_id;
    // },
    // recovery_button() {
    //   return this.$store.state.sale.recovery_button;
    // },
  },
  methods: {
    // sales_recovery(item) {
    //   let data = {};
    //   data["sales_id"] = item.sales_id;
    //   data["goods_id"] = item.goods_id;
    //   data["good_quantity"] = item.quantity;
    //   this.$store.dispatch("sale/retrive_goods", data);
    // },
    // plus(item) {
    //   item.quantity += 1;
    // },
    // minus(item) {
    //   if (item.quantity != 1) {
    //     item.quantity -= 1;
    //   }
    // },
  },
};
</script>
