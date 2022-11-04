<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" lg="12">
      <v-card width="750px" class="mx-auto card">
        <v-card-title class="d-flex justify-center"
          >تغير اسم المتجر</v-card-title
        >
        <v-divider style="background-color: #16213e"></v-divider>
        <v-form ref="form">
          <v-card-text class="mt-15">
            <v-row class="pa-0 ma-0">
              <v-col cols="12" class="pt-0">
                <Input
                  @update-value="store = $event"
                  :value="store"
                  type="text"
                  label="اسم المتجر"
                  icon="mdi-store"
                  :rules="storeNameRules" />
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  class="font-weight-black"
                  v-model="Password"
                  :type="showPassword ? 'text' : 'password'"
                  label="كلمة المرور الجديده"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :rules="Rules" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              elevation="2"
              color="#16213E"
              :loading="loading"
              @click="name_store">
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
        Password: "",
        showPassword: false,
        Rules: [(value) => !!value || "هذا الحقل مطلوب"],
        storeNameRules: [
          (v) => !!v || "اسم المطعم مطلوب",
          (v) =>
            (v && v.length <= 16) || "اسم المطعم يجب12 ان يكون اقل من 16 حرف",
          (v) => (v && v.length >= 3) || "اسم المطعم يجب ان يكون اكثر من 2 حرف",
        ],
      };
    },
    computed: {
      loading() {
        return this.$store.state.settings.lodding_button;
      },
      store: {
        set(val) {
          this.$store.state.store = val;
        },
        get() {
          return this.$store.state.store;
        },
      },
    },
    methods: {
      name_store() {
        if (this.$refs.form.validate()) {
          let data = {};
          data["password"] = this.Password;
          data["store"] = this.store;
          this.$store.dispatch("settings/storeNameChange", data);
          this.$refs.form.reset();
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
