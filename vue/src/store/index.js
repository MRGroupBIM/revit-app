import Vue from "vue";
import Vuex from "vuex";
import works from "../store/modules/works";
import dialog from "../store/modules/dialog";
import mapping from "../store/modules/mapping";
import "@babel/polyfill";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    works,dialog,mapping
  }
});
