<template>
  <v-card color="#0f3460" class="footer">
    <v-footer dark padless>
      <v-card
        flat
        tile
        width="100%"
        color="#16213E"
        class="white--text text-center">
        <v-card-text>
          <v-btn
            v-for="(i, index) in accounts"
            :key="index"
            class="mx-1 white--text"
            icon
            :href="i.link">
            <v-icon size="24px">
              {{ i.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          <h3>
            جميع الحقوق محفوظة 2022 -
            <strong>اكسيوس</strong>
          </h3>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
</template>
<script>
  export default {
    data() {
      return {
        accounts: [
          { icon: "mdi-facebook", link: "https://www.facebook.com/xali63348" },
          { icon: "mdi-instagram", link: "https://www.instagram.com/700yz/" },
        ],
      };
    },
  };
</script>
<style scoped>
  .footer {
    padding-top: 100px;
  }
  .v-sheet.v-card {
    border-radius: 0px;
  }
</style>
