import Vue from 'vue';
import Vuex from 'vuex';
import getters from "./getters";
import user from './modules/user';
import app from './modules/app';
import admin from './modules/admin';
import question from './modules/question';
import term from './modules/term';
import diagram from "./modules/diagram";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    app,
    admin,
    question,
    term,
    diagram,
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
