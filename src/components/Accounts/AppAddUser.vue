<template>
  <v-dialog :value="value" persistent max-width="750px">
    <!-- from -->
    <v-form ref="form">
      <v-card width="750px" class="mx-auto card">
        <v-toolbar class="d-flex justify-center" color="indigo darken-4">
          <h2 style="color: white">انشاء مستخدمين</h2>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6">
                <Input
                  @update-value="name = $event"
                  :value="name"
                  icon="mdi-account"
                  type="text"
                  label="اسم العميل"
                  :rules="Rules" />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <Input
                  @update-value="userName = $event"
                  :value="userName"
                  icon="mdi-account-circle"
                  type="text"
                  label="اسم المستخدم"
                  :rules="userNameRules" />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <Input
                  @update-value="store = $event"
                  :value="store"
                  type="text"
                  icon="mdi-store"
                  label="اسم المتجر"
                  :rules="Rules" />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <Input
                  @update-value="phoneNumber = $event"
                  :value="phoneNumber"
                  type="number"
                  label="رقم الهاتف"
                  icon="mdi-phone-dial" />
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
              <v-col cols="12" sm="12" md="6" lg="6">
                <v-text-field
                  class="font-weight-black"
                  v-model="confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  label=" تاكيد كلمة المرور"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  prepend-icon="mdi-lock-check"
                  :rules="confirmPasswordRules" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="create_user"
            :loading="loading_button"
            color="indigo darken-4"
            elevation="4"
            class="px-10">
            <h4 style="color: white">انشاء</h4>
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
            v-on:click="$emit('popUser')">
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
        name: "",
        userName: "",
        store: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        userNameRules: [
          (value) => !!value || "هذا الحقل مطلوب",
          (value) => value.length >= 3 || "الحد الادنى لعدد الاحرف هوه 3",
        ],
        PasswordsRules: [
          (value) => !!value || "هذا الحقل مطلوب",
          (value) => value.length >= 6 || "الحد الادنى لعدد الاحرف هوه 6",
        ],
        confirmPasswordRules: [
          (value) => !!value || "هذا الحقل مطلوب",
          (value) => value.length >= 6 || "الحد الادنى لعدد الاحرف هوه 6",
          (value) => value == this.password || "كلمة المرور غير متطابقه",
        ],
        Rules: [(value) => !!value || "هذا الحقل مطلوب"],
      };
    },
    computed: {
      loading_button() {
        return this.$store.state.loading_button;
      },
    },
    methods: {
      create_user() {
        if (this.$refs.form.validate()) {
          let data = {};
          data["name"] = this.name;
          data["user_name"] = this.userName;
          data["name_store"] = this.store;
          data["phone_number"] = this.phoneNumber;
          data["password"] = this.password;
          this.$store.dispatch("add_users", data).then(() => {
            this.$emit("popUser");
          });
        }
      },
    },
  };
</script>
