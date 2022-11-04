<template>
  <v-app id="app">
    <v-main class="font">
      <AppHeader v-if="loggedIn" />
      <AppSnackBar v-if="snackBar" :snack_message="snack_message" />
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
  import AppHeader from "./components/AppHeader.vue";
  import AppSnackBar from "./components/AppSnackBar.vue";
  import AppFooter from "./components/AppFooter.vue";
  export default {
    components: { AppHeader, AppSnackBar, AppFooter },
    name: "App",

    data: () => ({
      //
    }),
    computed: {
      loggedIn() {
        return this.$store.state.user_name;
      },
      snackBar() {
        return this.$store.getters.snack_bar;
      },
      snack_message() {
        return this.$store.state.snack_message;
      },
    },
  };
</script>
<style>
  .font {
    background-color: #0f3460;
  }
  #app {
    font-family: "Cairo", sans-serif;
  }
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
