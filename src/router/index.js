import { createRouter, createWebHistory } from "vue-router";
import { trackRouter } from "vue-gtag-next";
import Home from "@/views/Home";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard/:address",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

trackRouter(router, {
  useScreenview: true,
});

export default router;
