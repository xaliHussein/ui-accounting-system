<template>
  <v-container fluid>
    <!-- <v-row class="mt-1">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(st, index) in statistics"
        :key="index"
      >
        <v-card max-width="100%" class="mt-4 mx-auto direction">
          <v-card-title class="d-flex justify-space-between align-start">
            <v-sheet
              :color="st.color"
              elevation="6"
              max-width="90px"
              class="v-sheet-card d-flex justify-center"
            >
              <font-awesome
                style="color: white"
                :icon="['fas', st.icon]"
                size="xl"
              />
            </v-sheet>
            <div>
              <p class="body-1 grey--text font-weight-black">{{ st.title }}</p>
              <h3 class="font-weight-light mt-n3 text-right">55</h3>
            </div>
          </v-card-title>
          <v-card-text class="pb-1">
            <v-divider class="my-1"></v-divider>
            <span class="caption grey--text font-weight-light"> text </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->

    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        v-for="(opation, index) in opations"
        :key="index"
        class="d-flex justify-center mt-3"
      >
        <v-card width="360" class="card" :to="{ name: opation.link }">
          <v-card-title :style="opation.color" class="d-flex justify-center"
            ><font-awesome :icon="['fas', opation.icon]" size="4x"
          /></v-card-title>
          <v-card-title class="d-flex justify-center">
            <h2 class="grey--text">{{ opation.title }}</h2>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        statistics: [
          {
            title: "المبيعات",
            icon: "fa-comments-dollar",
            color: "green darken-4",
          },
          {
            title: "الديون",
            icon: "fa-circle-dollar-to-slot",
            color: "orange darken-4",
          },
          {
            title: "المبيعات",
            icon: "fa-comments-dollar",
            color: "green darken-4",
          },
          {
            title: "المبيعات",
            icon: "fa-comments-dollar",
            color: "green darken-4",
          },
        ],
        opations: [
          {
            title: "سجل الديون",
            icon: "fa-circle-dollar-to-slot",
            color: "color: #E65100",
            link: "buy",
          },
          {
            title: "بيع",
            icon: "fa-comments-dollar",
            color: "color: #1B5E20",
            link: "sale",
          },

          {
            title: "شراء",
            icon: "fa-bag-shopping",
            color: "color: #4a148c",
            link: "buy",
          },
          {
            title: "الحسابات",
            icon: "fa-users",
            color: "color: #C51162",
            link: "buy",
          },

          {
            title: "اعدادات الحساب",
            icon: "fa-gear",
            color: "color: #3E2723",
            link: "buy",
          },
          {
            title: "راجع بيع",
            icon: "fa-filter-circle-dollar",
            color: "color: #B71C1C",
            link: "buy",
          },
        ],
      };
    },
  };
</script>
<style scoped>
  .v-sheet-card {
    margin-top: -35px;
    border-radius: 3px;
    position: relative;
    padding: 30px;
  }
  .card {
    cursor: pointer;
    box-shadow: 0 5px 15px rgb(0 0 0 / 7%) !important;
    border-radius: 20px;
    transition: all ease 0.2s;
  }
  .card:hover {
    transition: all ease 0.2s;
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgb(0 0 0 / 20%) !important;
  }
</style>
