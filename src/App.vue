<template>
  <v-app id="app">
    <v-main class="font">
      <AppHeader v-if="loggedIn" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import AppHeader from "./components/AppHeader.vue";
  export default {
    components: { AppHeader },
    name: "App",

    data: () => ({
      //
    }),
    computed: {
      loggedIn() {
        return this.$store.state.user_name;
      },
    },
  };
</script>
<style scoped>
  .font {
    background-color: #0f3460;
  }
  #app {
    font-family: "Cairo", sans-serif;
  }
</style>
