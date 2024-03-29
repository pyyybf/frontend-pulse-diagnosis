import Vue from 'vue';
import Vuex from 'vuex';
import getters from "./getters";
import user from './modules/user';
import app from './modules/app';
import admin from './modules/admin';
import question from './modules/question';
import term from './modules/term';
import diagram from "./modules/diagram";
import modern from "./modules/modern";
import ancient from "./modules/ancient";
import struct from "./modules/struct";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    app,
    admin,
    question,
    term,
    diagram,
    modern,
    ancient,
    struct,
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
