import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Toast from "vue-toastification";

// css files
import "vue-toastification/dist/index.css";
import "./assets/css/main.css";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
Vue.config.productionTip = false;

const options = {
  // You can set your default toast options here
  position: "top-center",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

Vue.use(Toast, options);

new Vue({
  router,
  store,
  axios,
  render: (h) => h(App),
}).$mount("#app");
