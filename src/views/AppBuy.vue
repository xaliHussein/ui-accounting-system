<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12" class="pb-8">
        <v-card class="mx-auto mt-3 card" width="95%">
          <v-from ref="EmailMessage" v-model="valid">
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <v-text-field
                    v-model="nameProducer"
                    type="text"
                    label="اسم المنتج"
                    prepend-icon="mdi-semantic-web"
                    :rules="nameProducerRules"
                  />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <v-text-field
                    v-model="nameCompany"
                    type="text"
                    label="اسم الشركه"
                    prepend-icon="mdi-domain"
                    :rules="nameProducerRules"
                  />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <v-text-field
                    v-model="quantity"
                    type="number"
                    label="كمية"
                    prepend-icon="mdi-database-edit"
                    :rules="quantityRules"
                  />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <v-text-field
                    v-model="buying"
                    type="number"
                    label="سعر الشراء"
                    prepend-icon="mdi-currency-usd"
                    :rules="quantityRules"
                  />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <v-text-field
                    v-model="Sale"
                    type="number"
                    label="سعر البيع"
                    prepend-icon="mdi-currency-usd"
                    :rules="quantityRules"
                  />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <v-text-field
                    v-model="goodNumber"
                    type="number"
                    label="رقم البضاعه"
                    prepend-icon="mdi-currency-usd"
                    :rules="quantityRules"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12" class="text-center">
                  <v-btn
                    :loading="loadingButton"
                    color="blue darken-4"
                    @click="goods()"
                    class="px-10"
                  >
                    <h3 style="color: white">انشاء منتج</h3>
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon color="white">mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-from>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
  .card {
    border-radius: 25px;
  }
</style>
