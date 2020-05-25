import Vue from 'vue'
import Vuex from 'vuex'
import File from './modules/File'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    File
  }
})


