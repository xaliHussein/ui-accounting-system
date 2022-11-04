<template>
  <v-container fluid>
    <v-card class="mx-auto mt-5" width="95%">
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="12" md="3" lg="3">
          <v-card :width="width" :height="height" class="mx-auto card">
            <v-list dense>
              <v-list-item-group v-model="selectedcard" color="#16213e">
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  class="py-3"
                  @click="selectedcard = i">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      <h3>{{ item.text }}</h3></v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="8">
          <v-card class="card" height="100%" v-if="selectedcard == 0"
            ><AppNameStore />
          </v-card>
          <v-card class="card" height="100%" v-else-if="selectedcard == 1"
            ><AppUserName
          /></v-card>
          <v-card class="card" height="100%" v-else-if="selectedcard == 2"
            ><AppPassword
          /></v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
  import AppNameStore from "../components/Settings/AppNameStore.vue";
  import AppUserName from "../components/Settings/AppUserName.vue";
  import AppPassword from "../components/Settings/AppPassword.vue";
  export default {
    components: { AppNameStore, AppUserName, AppPassword },
    data() {
      return {
        selectedcard: 0,
        items: [
          { text: "اسم المتجر", icon: "mdi-store" },
          { text: "اسم المستخدم", icon: "mdi-account" },
          { text: "كلمة المرور", icon: "mdi-clock" },
        ],
      };
    },
    computed: {
      // eslint-disable-next-line vue/return-in-computed-property
      height() {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return "100%";
          case "sm":
            return "100%";
          case "md":
            return 480;
          case "lg":
            return 480;
          case "xl":
            return 480;
        }
      },
      // eslint-disable-next-line vue/return-in-computed-property
      width() {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return 900;
          case "sm":
            return 900;
          case "md":
            return 600;
          case "lg":
            return 600;
          case "xl":
            return 600;
        }
      },
    },
  };
</script>
<style scoped>
  .mx-auto {
    box-shadow: 0px 0px 0px 0px !important;
    border-radius: 25px;
  }
  .card {
    box-shadow: 0px 0px 0px 0px !important;
    border: 2px solid #16213e;
    border-radius: 25px;
  }
</style>
