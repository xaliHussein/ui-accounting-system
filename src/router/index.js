import Vue from "vue";
import VueRouter from "vue-router";
import AppLogin from "../views/AppLogin.vue";
import Home from "../views/AppHome.vue";
import Buy from "../views/AppBuy.vue";

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
];
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
