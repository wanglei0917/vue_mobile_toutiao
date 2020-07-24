import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER_TOKEN'
export default new Vuex.Store({
  state: {
    // user: JSON.parse(localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY),
    isPostShow: false,
    isReplyShow: false,
    comment: {}
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    },
    setPostShow (state, data) {
      state.isPostShow = data
    },
    setReplyShow (state, data) {
      state.isReplyShow = data.flag
      if (data.comment) {
        state.comment = data.comment
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
