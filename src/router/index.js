import Vue from "vue";
import VueRouter from "vue-router";
import AppLogin from "../views/AppLogin.vue";
import Home from "../views/AppHome.vue";
import Buy from "../views/AppBuy.vue";
import Sale from "../views/AppSale.vue";
import SalesRecord from "../views/AppSalesRecord.vue";
import DebtRecord from "../views/AppDebtRecord.vue";
import Settings from "../views/AppSettings.vue";
import Accounts from "../views/AppAccounts.vue";
import Statistics from "../views/AppStatistics.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: AppLogin,
    beforeEnter: redirect,
  },
  {
    path: "/",
    name: "name",
    component: Home,
    beforeEnter: loggedIn,
  },
  {
    path: "/buy",
    name: "buy",
    component: Buy,
    beforeEnter: loggedIn,
  },
  {
    path: "/sale",
    name: "sale",
    component: Sale,
    beforeEnter: loggedIn,
  },
  {
    path: "/sales_record",
    name: "sales_record",
    component: SalesRecord,
    beforeEnter: loggedIn,
  },
  {
    path: "/debt_record",
    name: "debt_record",
    component: DebtRecord,
    beforeEnter: loggedIn,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    beforeEnter: loggedIn,
  },
  {
    path: "/statistics",
    name: "statistics",
    component: Statistics,
    beforeEnter: loggedIn,
  },
  {
    path: "/accounts",
    name: "accounts",
    component: Accounts,
    beforeEnter: (loggedIn,admin),
  },
];
function admin(to, from, next) {
  const user_name = localStorage.getItem("user_name");
  if (user_name !== 'admin') {
    next("/");
  } else {
    next();
  }
}
function loggedIn(to, from, next) {
  const token = localStorage.getItem("token");
  if (!token) {
    next("/login");
  } else {
    next();
  }
}
function redirect(to, from, next) {
  const token = localStorage.getItem("token");
  if (token) {
    next("/");
  } else {
    next();
  }
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
