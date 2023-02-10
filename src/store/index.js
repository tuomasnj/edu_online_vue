import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

/*
  该文件用于导出store中存储的不同属性值，包括app、settings、user和getters
 */
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
