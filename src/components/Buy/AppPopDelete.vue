<template>
  <v-dialog :value="value" persistent max-width="750px">
    <!-- from -->
    <v-form ref="form">
      <v-card width="750px" class="mx-auto card">
        <v-toolbar class="d-flex justify-center" color="indigo darken-4">
          <h2 style="color: white">حذف البضائع</h2>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <h3>ادخل اسم المستخدم و كلمة المرور لحذف المنتج</h3></v-col
              >
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
        <v-card-actions>
          <v-btn
            @click="send_password"
            color="indigo darken-4"
            class="px-10"
            :loading="loading_button_password">
            <h4 style="color: white">تاكيد</h4>
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
            v-on:click="$emit('popDelete')">
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
      };
    },
    computed: {
      loading_button_password() {
        return this.$store.state.loading_button_login;
      },
    },
    methods: {
      send_password() {
        if (this.$refs.form.validate()) {
          let data = {};
          data["user_name"] = this.userName;
          data["password"] = this.password;
          this.$store.dispatch("chack_password", data).then(() => {
            let data = {};
            data["id"] = this.$store.state.goods.delete_goods;
            this.$store.dispatch("goods/delete_goods", data).then(() => {
              this.$store.dispatch("goods/get_goods");
            });
            this.$emit("popDelete");
          });
        }
      },
    },
  };
</script>
