<template>
  <v-app-bar color="#16213E" dark class="header">
    <v-toolbar-title>اكسيوس</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click="logout" v-bind="attrs" v-on="on">
          <font-awesome :icon="['fas', 'fa-right-from-bracket']" size="xl" />
        </v-btn>
      </template>
      <span>خروج</span>
    </v-tooltip>
  </v-app-bar>
</template>
<script>
  export default {
    data() {
      return {};
    },
    methods: {
      logout() {
        this.$store.dispatch("logout");
      },
    },
  };
</script>
<style scoped>
  .header {
    direction: ltr;
  }
</style>
