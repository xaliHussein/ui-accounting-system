<template>
  <div>
    <v-snackbar v-model="snack" :color="snack_message.color" timeout="4000">
      <h4>{{ snack_message.text }}</h4>
      <template v-slot:action="{ attrs }">
        <v-btn color="grey darken-4" text v-bind="attrs">
          <v-icon color="white">mdi-{{ snack_message.icon }}</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
  export default {
    props: {
      snack_message: {
        type: Object,
        required: false,
      },
    },
    data() {
      return {
        snack: true,
      };
    },
  };
</script>
