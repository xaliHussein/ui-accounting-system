<template>
  <v-dialog v-model="dialog" persistent width="500">
    <v-card>
      <v-toolbar class="d-flex justify-center" color="indigo darken-4">
        <h2 style="color: white">تم ايقاف حسابك</h2>
      </v-toolbar>

      <v-card-text class="mt-4 mb-3">
        <h3>تم ايقاف حسابك يرجى مراسلة مالك المنصه</h3>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="#16213E" @click="logout" class="px-10">
          <h3 style="color: white">تسجيل خروج</h3>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    props: {
      activation: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        dialog: true,
      };
    },
    methods: {
      logout() {
        this.$store.dispatch("logout");
      },
    },
  };
</script>
