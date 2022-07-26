import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import "./css/bootstrap-grid.min.css";
import "./css/bootstrap.min.css";

new Vue({
    store: store,
    render: h => h(App)
}).$mount("#app");
