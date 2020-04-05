import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/produce",
    name: "Produce",
    component: () =>
      import("../views/Produce.vue")
  },
  {
    path: "/events",
    name: "Events",
    component: () =>
      import("../views/Events.vue")
  },
  {
    path: "/kidzone",
    name: "Kidzone",
    component: () =>
      import("../views/Kidzone.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
