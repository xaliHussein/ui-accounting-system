<template>
  <v-container fluid class="mt-3">
    <v-row>
      <v-col cols="12" class="pb-8">
        <v-card class="mx-auto mt-3 card" width="100%">
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="6">
              <v-card :width="width" class="mt-4 mx-auto direction card2">
                <v-card-title class="d-flex justify-center">
                  <v-sheet
                    color="pink"
                    elevation="6"
                    max-width="100%"
                    class="v-sheet-card d-flex justify-center">
                    <LineChartGenerator
                      :chart-options="chartOptions"
                      :chart-data="get_sales_stats"
                      chart-id="line-chart"
                      :width="widthChart"
                      :height="200" />
                  </v-sheet>
                </v-card-title>
                <v-card-text class="pb-1">
                  <h2 class="py-3">المبيعات الاسبوعيه</h2>
                  <v-divider class="my-1"></v-divider>
                  <v-icon size="20">mdi-clock-outline</v-icon>
                  <span class="body-1 font-weight-black"> اخر 7 ايام </span>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="6">
              <v-card :width="width" class="mt-4 mx-auto direction card2">
                <v-card-title class="d-flex justify-center">
                  <v-sheet
                    color="purple"
                    elevation="6"
                    max-width="100%"
                    class="v-sheet-card d-flex justify-center">
                    <Bar
                      :chart-options="chartOptions"
                      :chart-data="get_debt_stats"
                      chart-id="bar-chart"
                      dataset-id-key="label"
                      :width="widthChart"
                      :height="200" />
                  </v-sheet>
                </v-card-title>
                <v-card-text class="pb-1">
                  <h2 class="py-3">الديون الاسبوعيه</h2>
                  <v-divider class="my-1"></v-divider>
                  <v-icon size="20">mdi-clock-outline</v-icon>
                  <span class="body-1 font-weight-black"> اخر 7 ايام </span>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col
              cols="11"
              sm="11"
              md="3"
              lg="3"
              class="mx-auto mb-8"
              v-for="(st, index) in statistics"
              :key="index">
              <v-card max-width="100%" class="mt-4 mx-auto direction card2">
                <v-card-title class="d-flex justify-space-between align-start">
                  <v-sheet
                    :color="st.color"
                    elevation="6"
                    max-width="90px"
                    class="v-sheet-card d-flex justify-center">
                    <font-awesome
                      style="color: white"
                      :icon="['fas', st.icon]"
                      size="xl" />
                  </v-sheet>
                  <div>
                    <p class="h6 font-weight-black">
                      {{ st.title }}
                    </p>
                    <h3 class="font-weight-light mt-n3 text-center">
                      {{ get_store_stats[index].total | formatNumber }}
                    </h3>
                  </div>
                </v-card-title>
                <v-card-text class="pb-1">
                  <v-divider class="my-1"></v-divider>

                  <v-icon size="20">mdi-clock-outline</v-icon>
                  <span class="body-1 font-weight-black"> اخر 7 ايام </span>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { Line as LineChartGenerator, Bar } from "vue-chartjs/legacy";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    BarElement,
    CategoryScale,
    PointElement,
  } from "chart.js";
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    BarElement,
    CategoryScale,
    PointElement
  );
  export default {
    components: { LineChartGenerator, Bar },
    data() {
      return {
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                color: "white",
              },
              grid: {
                drawBorder: false,
                color: "#BDBDBD",
              },
            },
            y: {
              ticks: {
                color: "white",
              },
              beginAtZero: true,
              grid: {
                drawBorder: false,
                color: "#BDBDBD",
              },
            },
          },
        },
        statistics: [
          {
            title: "المبيعات",
            icon: "fa-comments-dollar",
            color: "pink",
          },
          {
            title: "الديون",
            icon: "fa-circle-dollar-to-slot",
            color: "purple",
          },
          {
            title: "راس المال",
            icon: "fa-bag-shopping",
            color: "purple darken-4",
          },
        ],
      };
    },
    mounted() {
      this.$store.dispatch("statisticsrs/get_sales_stats");
      this.$store.dispatch("statisticsrs/get_debt_stats");
      this.$store.dispatch("statisticsrs/get_store_stats");
    },
    computed: {
      get_sales_stats() {
        return this.$store.state.statisticsrs.sales_stats;
      },
      get_debt_stats() {
        return this.$store.state.statisticsrs.debt_stats;
      },
      get_store_stats() {
        return this.$store.state.statisticsrs.store_stats;
      },
      // eslint-disable-next-line vue/return-in-computed-property
      width() {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return 700;
          case "sm":
            return 700;
          case "md":
            return 700;
          case "lg":
            return 600;
          case "xl":
            return 400;
        }
      },
      // eslint-disable-next-line vue/return-in-computed-property
      widthChart() {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return 289;
          case "sm":
            return 400;
          case "md":
            return 400;
          case "lg":
            return 400;
          case "xl":
            return 400;
        }
      },
      // eslint-disable-next-line vue/return-in-computed-property
      widthCard() {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return 900;
          case "sm":
            return 400;
          case "md":
            return 400;
          case "lg":
            return 400;
          case "xl":
            return 400;
        }
      },
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
    border-radius: 25px !important;
  }
  .card2 {
    box-shadow: 0px 0px 0px 0px !important;
    border: 2px solid #0f3460;
    border-radius: 25px;
  }
</style>
