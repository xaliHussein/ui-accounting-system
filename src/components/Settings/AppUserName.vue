<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" lg="12">
      <v-card width="750px" class="mx-auto card">
        <v-card-title class="d-flex justify-center"
          >تغير اسم المستخدم</v-card-title
        >
        <v-divider style="background-color: #16213e"></v-divider>
        <v-form ref="user">
          <v-card-text class="mt-15">
            <v-row class="pa-0 ma-0">
              <v-col cols="12" class="pt-0">
                <Input
                  @update-value="user_name = $event"
                  :value="user_name"
                  type="text"
                  label="اسم المستخدم"
                  icon="mdi-account-circle"
                  :rules="userNameRules" />
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  class="font-weight-black"
                  v-model="password"
                  color="black"
                  :type="showPassword ? 'text' : 'password'"
                  label="كلمة المرور"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :rules="PasswordsRules" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              elevation="2"
              color="#16213e"
              :loading="loading"
              @click="usernameChange">
              <h4 style="color: white; font-size: 17px">حفظ</h4>
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon color="white">mdi-cached</v-icon>
                </span>
              </template>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  import Input from "@/components/Inputs/AppInput.vue";
  export default {
    components: { Input },
    data() {
      return {
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
      loading() {
        return this.$store.state.settings.lodding_button;
      },
      user_name: {
        set(val) {
          this.$store.state.user_name = val;
        },
        get() {
          return this.$store.state.user_name;
        },
      },
    },
    methods: {
      usernameChange() {
        if (this.$refs.user.validate()) {
          let data = {};
          data["user_name"] = this.user_name;
          data["password"] = this.password;
          this.$store.dispatch("settings/usernameChange", data);
          this.$refs.user.reset();
        }
      },
    },
  };
</script>
<style scoped>
  .card {
    box-shadow: 0px 0px 0px 0px !important;
  }
</style>
