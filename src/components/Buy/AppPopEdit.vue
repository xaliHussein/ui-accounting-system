<template>
  <v-dialog :value="value" persistent max-width="750px">
    <!-- from -->
    <v-form ref="form">
      <v-card width="750px" class="mx-auto card">
        <v-toolbar class="d-flex justify-center" color="indigo darken-4">
          <h2 style="color: white">تعديل البضائع</h2>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row v-if="chack_password">
              <v-col cols="12" sm="6" md="4" lg="4">
                <Input
                  @update-value="goods.name = $event"
                  :value="goods.name"
                  icon="mdi-semantic-web"
                  type="text"
                  label="اسم المنتج"
                  :rules="nameProducerRules" />
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="4">
                <Input
                  @update-value="goods.quantity = $event"
                  :value="goods.quantity"
                  icon="mdi-database-edit"
                  type="number"
                  label="كمية"
                  :rules="Rules" />
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="4">
                <Input
                  @update-value="goods.buy_price = $event"
                  :value="goods.buy_price"
                  type="text"
                  icon="mdi-currency-usd"
                  label="سعر الشراء"
                  :rules="Rules" />
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="4">
                <Input
                  @update-value="goods.sale_price = $event"
                  :value="goods.sale_price"
                  type="text"
                  label="سعر البيع"
                  icon="mdi-currency-usd"
                  :rules="Rules" />
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="4">
                <Input
                  @update-value="goods.company = $event"
                  :value="goods.company"
                  icon="mdi-domain"
                  type="text"
                  label="اسم الشركه" />
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="4">
                <Input
                  @update-value="goods.product_code = $event"
                  :value="goods.product_code"
                  type="number"
                  label="رقم المنتج"
                  icon="mdi-barcode-scan"
                  :rules="Rules" />
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12" sm="6" md="6" lg="6">
                <Input
                  @update-value="userName = $event"
                  :value="userName"
                  :rules="userNameRules"
                  label="اسم المستخدم"
                  icon="mdi-account-circle" />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-text-field
                  v-model="password"
                  class="font-weight-black"
                  :type="showPassword ? 'text' : 'password'"
                  label="كلمة المرور"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :rules="PasswordsRules" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions v-if="chack_password">
          <v-btn
            @click="edit_goods"
            color="indigo darken-4"
            class="px-10"
            :loading="loading_button_edit">
            <h4 style="color: white">تعديل</h4>
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon color="white">mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-btn
            outlined
            class="px-10"
            color="indigo darken-4"
            v-on:click="$emit('popEdit')">
            <h4>الغاء</h4>
          </v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-btn
            @click="send_password"
            :loading="loading_button_password"
            color="indigo darken-4"
            elevation="4"
            class="px-10">
            <h4 style="color: white">تاكيد</h4>
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon color="white">mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-btn
            outlined
            color="indigo darken-4"
            class="px-10"
            v-on:click="$emit('popEdit')">
            <h4>الغاء</h4>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
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
        nameProducer: "",
        nameCompany: "",
        quantity: "",
        Sale: "",
        buying: "",
        userName: "",
        password: "",
        showPassword: false,
        userNameRules: [
          (value) => !!value || "هذا الحقل مطلوب",
          (value) => value.length >= 3 || "الحد الادنى لعدد الاحرف هوه 3",
        ],
        PasswordsRules: [
          (value) => !!value || "هذا الحقل مطلوب",
          (value) => value.length >= 6 || "الحد الادنى لعدد الاحرف هوه 6",
        ],
        nameProducerRules: [
          (value) => !!value || "هذا الحقل مطلوب",
          (value) =>
            value.length <= 255 || "الحد الاعلى لاحرف المسموحه هوه 255 حرف",
        ],
        Rules: [(value) => !!value || "هذا الحقل مطلوب"],
      };
    },
    computed: {
      goods() {
        return this.$store.state.goods.edit_goods;
      },
      loading_button_edit() {
        return this.$store.state.goods.loading_button_edit;
      },
      chack_password() {
        return this.$store.state.chack_password;
      },
      loading_button_password() {
        return this.$store.state.loading_button_login;
      },
    },
    methods: {
      edit_goods() {
        if (this.$refs.form.validate()) {
          let data = {};
          data["id"] = this.goods.id;
          data["name"] = this.goods.name;
          data["quantity"] = this.goods.quantity;
          data["buy_price"] = this.goods.buy_price;
          data["sale_price"] = this.goods.sale_price;
          data["company"] = this.goods.company;
          data["product_code"] = this.goods.product_code;
          this.$store.dispatch("goods/edit_goods", data).then(() => {
            this.$emit("popEdit");
          });
        }
      },
      send_password() {
        if (this.$refs.form.validate()) {
          let data = {};
          data["user_name"] = this.userName;
          data["password"] = this.password;
          this.$store.dispatch("chack_password", data);
        }
      },
    },
  };
</script>
