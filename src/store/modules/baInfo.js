const state = {
  baItem: null,
  postInfo: null,
  postItem: {}
}

const getters = {
  getBaName(state) {
    if (state.baItem.name) {
      return state.baItem.name
    }
  },
  getBaId(state) {
    if (state.baItem.id) {
      return state.baItem.id
    }
  },
  getPostItem(state) {
    if (Object.keys(state.postItem).length > 0) {
      return state.postItem
    }
  }
}

const actions = {
  setbaItem(context, data) {
    context.commit('setbaItem', data)
  },
  setPostItem(context, data) {
    context.commit('setPostItem', data)
  }
}

const mutations = {
  setbaItem(state, data) {
    state.baItem = data
  },
  setPostItem(state, data) {
    state.postItem = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}