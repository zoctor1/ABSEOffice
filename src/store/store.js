import Vue from 'vue'
import Vuex from 'vuex'
import name from './modules/name'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    name
  },
  strict: debug
})