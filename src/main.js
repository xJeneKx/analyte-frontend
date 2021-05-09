import { createApp } from "vue";
import Antd from "ant-design-vue";
import VueApexCharts from "vue3-apexcharts";
import App from "./App.vue";
import router from "./router";
import "ant-design-vue/dist/antd.css";
import VueGtag from "vue-gtag-next";

const app = createApp(App);
app.use(VueGtag, {
  property: {
    id: "G-49FKGR44CY",
  },
});
app.use(router);
app.use(Antd);
app.use(VueApexCharts);
app.mount("#app");
