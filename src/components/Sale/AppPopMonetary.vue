<template>
  <v-dialog :value="value" persistent max-width="650px">
    <!-- from -->
    <v-card width="650px" class="mx-auto card">
      <v-toolbar class="d-flex justify-center" color="indigo darken-4">
        <h2 style="color: white">معلومات الزبون</h2>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <Input
                @update-value="client_name = $event"
                :value="client_name"
                type="string"
                icon="mdi-account-box"
                label="اسم الزبون"
              />
            </v-col>
            <v-col cols="6">
              <Input
                @update-value="client_phone = $event"
                :value="client_phone"
                type="number"
                icon="mdi-cellphone"
                label="رقم هاتف الزبون"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="indigo darken-4" @click="sale_goods">
          <h4 style="color: white">شراء</h4>
        </v-btn>
        <v-btn
          outlined
          color="indigo darken-4"
          v-on:click="$emit('popMonetary')"
        >
          <h4>الغاء</h4>
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- end -->
  </v-dialog>
</template>
<script>
  import Input from "@/components/Inputs/AppInput.vue";
  export default {
    components: { Input },
    props: {
      value: Boolean,
    },
    data() {
      return {
        client_name: "",
        client_phone: "",
      };
    },
    methods: {
      sale_goods() {
        let data = {};
        data["client_name"] = this.client_name;
        data["client_phone"] = this.client_phone;
        data["goods_id"] = this.$store.state.sale.cart_goods;
        this.$store.dispatch("sale/add_sale", data);
      },
    },
  };
</script>
