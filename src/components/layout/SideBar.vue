<template>
  <div>
    <!-- <v-app-bar color="white" app clipped-right clipped-left elevation="4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>MEDO STORE</v-toolbar-title>
      </v-app-bar> -->
    <v-navigation-drawer
      dir="ltr"
      :clipped="clipped"
      v-model="drawer"
      nable-resize-watcher
      app
      right
      class="navigation-drawer"
    >
      <v-list-item>
        <v-list-item-avatar>
          <Icon icon="guidance:medical-laboratory" color="white" width="50" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            ><h2 class="text-center mt-4 mb-4" style="color: white">
              العيادات الطبيه
            </h2></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item-group mandatory v-model="model" color="#A6E5D5">
          <v-list-item
            v-for="(opation, index) in filteredItems"
            :key="index"
            :to="opation.link"
            @click="model = index"
            :class="model == index ? 'list-item' : ''"
            class="list-itemAll"
          >
         
            <v-list-item-content>
              <v-list-item-title class="d-flex justify-end mr-2 ">
                <h3
                class="py-3"
                  :class="
                    model == index ? 'color-icon-title-D' : 'color-icon-title-A'
                  "
                >
                  {{ opation.title }}
                </h3>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon class="icons">
              <Icon
                :icon="opation.icon"
                :class="
                  model == index ? 'color-icon-title-D' : 'color-icon-title-A'
                "
                width="30"
              />
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="d-flex justify-center">
          <v-btn
            class="btn-logout"
            x-large
            @click="logout"
            color="white"
            outlined
          >
            <h4>تسجيل خروج</h4>
            <Icon icon="majesticons:logout-line" color="white" width="32" />
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data: () => ({
    drawer: true,
    model: 0,
    group: null,
    clipped: false,
    opations: [
      {
        title: "احصائيات",
        icon: "wpf:statistics",
        link: "/",
        type: 0,
        type2: 1,
      },
      {
        title: "شراء",
        icon: "mdi:shopping",
        link: "/buy",
        type: 0,
        type2: 1,
      },
      {
        title: "بيع",
        icon: "fluent:receipt-money-16-filled",
        link: "/sale",
        type: 0,
        type2: 1,
      },

      {
        title: "سجلات البيع",
        icon: "solar:wallet-money-bold",
        link: "/sales_record",
        type: 0,
        type2: 1,
      },
      {
        title: "سجل الديون",
        icon: "fa6-solid:circle-dollar-to-slot",
        link: "/debt_record",
        type: 0,
        type2: 1,
      },
      {
        title: "اعدادات الحساب",
        icon: "ant-design:setting-filled",
        link: "/settings",
        type: 0,
        type2: 1,
      },
      {
        title: "الحسابات",
        icon: "mdi:users-group",
        link: "/accounts",
        type: 0,
      },
    ],
  }),

  computed: {
   
 
    user_type() {
      return this.$store.state.user_type;
    },
    filteredItems() {
      return this.opations.filter(
        (opation) =>
          opation.type == this.user_type ||
          opation.type2 == this.user_type 
      );
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
.btn-logout {
  margin-bottom: 30px;
  border-radius: 15px !important;
}
.navigation-drawer {
  background: linear-gradient(180deg, #624fc6 0%, #ad519c 99%);
}
.v-list-item:before {
  border-radius: 15px !important;
  background: rgb(185, 237, 221) !important;
  opacity: 0;
}

.list-item {
  border-radius: 15px !important;
  background: #1f2544 !important;
}
.list-itemAll:hover {
  border-radius: 15px !important;
  background: #1f2544 !important;
}
.color-icon-title-A {
  color: rgb(255, 255, 255, 0.8);
}
.color-icon-title-D {
  color: rgb(255, 255, 255);
}
.type_zero {
  margin-top: 450px;
}
.type_one {
  margin-top: 29px;
}
.type_two {
  margin-top: 239px;
}
.type_three_four {
  margin-top: 99px;
}
</style>
