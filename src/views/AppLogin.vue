<template>
  <v-container class="login" fluid>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="6" class="mx-auto">
        <v-form ref="form">
          <v-card width="500" class="mx-auto pb-3 card margin">
            <v-card-title class="justify-center">
              <h2>تسجيل الدخول</h2>
            </v-card-title>
            <v-card-text>
              <Input
                @update-value="userName = $event"
                :value="userName"
                :rules="userNameRules"
                label="اسم المستخدم"
                icon="mdi-account-circle"
              />

              <v-text-field
                v-model="password"
                class="font-weight-black"
                :type="showPassword ? 'text' : 'password'"
                label="كلمة المرور"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :rules="PasswordsRules"
              />
              <h4 :to="{ name: 'register' }" class="link-h4">
                هل نسيت كلمة مرور ؟
              </h4>
            </v-card-text>
            <v-card-actions>
              <v-btn
                @click="login"
                :loading="loadingButton"
                color="#16213E"
                block
                elevation="4"
              >
                <h4 style="color: white; font-size: 17px">تسجيل</h4>
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon color="white">mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-card-actions>
            <!-- <v-card-actions>
              <h4 class="link-h4" @click="redirect">ليس لديه حساب</h4>
            </v-card-actions> -->
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Input from "../components/Inputs/AppInput.vue";
  export default {
    components: { Input },
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
      loadingButton() {
        return this.$store.state.loading_button_login;
      },
    },
    methods: {
      login() {
        if (this.$refs.form.validate()) {
          let data = {};
          (data["user_name"] = this.userName),
            (data["password"] = this.password),
            this.$store.dispatch("login", data).then(() => {
              this.$router.push({ name: "home" });
              location.reload();
            });
        }
      },
      redirect() {
        this.$router.push({ name: "register" });
      },
    },
  };
</script>
<style scoped>
  .margin {
    margin-top: 130px;
  }
  .card {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px !important;
  }
  .link-h4 {
    cursor: pointer;
  }
  .link-h4:hover {
    text-decoration: underline;
    color: darkblue;
  }
</style>
