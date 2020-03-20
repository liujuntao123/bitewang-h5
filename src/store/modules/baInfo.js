const state = {
  baItem: null,
  postInfo: null
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
  }
}

const actions = {
  setbaItem(context, data) {
    context.commit('setbaItem', data)
  }
}

const mutations = {
  setbaItem(state, data) {
    state.baItem = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}