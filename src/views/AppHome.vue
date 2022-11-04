<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        v-for="(opation, index) in opations"
        :key="index"
        class="d-flex justify-center mt-3">
        <v-card width="360" class="card" :to="{ name: opation.link }">
          <v-card-title :style="opation.color" class="d-flex justify-center"
            ><font-awesome :icon="['fas', opation.icon]" size="4x"
          /></v-card-title>
          <v-card-title class="d-flex justify-center">
            <h2 class="grey--text">{{ opation.title }}</h2>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        class="d-flex justify-center mt-3"
        v-if="admin == 'admin'">
        <v-card width="360" class="card" to="/accounts">
          <v-card-title style="color: #c51162" class="d-flex justify-center"
            ><font-awesome :icon="['fas', 'fa-users']" size="4x"
          /></v-card-title>
          <v-card-title class="d-flex justify-center">
            <h2 class="grey--text">الحسابات</h2>
          </v-card-title>
        </v-card>
      </v-col>
      <AppDisableAccount v-if="activation == 1" />
    </v-row>
  </v-container>
</template>
<script>
  import AppDisableAccount from "../components/AppDisableAccount.vue";
  export default {
    components: {
      AppDisableAccount,
    },
    data() {
      return {
        data: {
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          series: [
            [5, 2, 4, 2, 9],
            [2, 9, 1, 3, 5],
          ],
        },
        options: {
          fullWidth: true,
          width: 600,
          height: 300,
          lineSmooth: false,
          chartPadding: {
            right: 40,
          },
        },
        filter: "",
        opations: [
          {
            title: "سجل الديون",
            icon: "fa-circle-dollar-to-slot",
            color: "color: #E65100",
            link: "debt_record",
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
            title: "اعدادات الحساب",
            icon: "fa-gear",
            color: "color: #3E2723",
            link: "settings",
          },
          {
            title: "سجلات بيع",
            icon: "fa-filter-circle-dollar",
            color: "color: #B71C1C",
            link: "sales_record",
          },
          {
            title: "احصائيات",
            icon: "fa-chart-pie",
            color: "color: #FFD600",
            link: "statistics",
          },
        ],
      };
    },
    mounted() {
      this.$store.dispatch("chack_user");
    },
    computed: {
      admin() {
        return this.$store.state.user_name;
      },
      activation() {
        return this.$store.state.activation;
      },
    },
  };
</script>
<style scoped>
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
  .cards {
    border-radius: 25px;
  }
</style>
