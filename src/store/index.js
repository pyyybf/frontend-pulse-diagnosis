import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters"
import user from './modules/user'
import app from './modules/app'
import admin from './modules/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    app,
    admin,
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
