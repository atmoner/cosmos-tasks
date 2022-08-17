import axios from 'axios'
// import cosmosConfig from '~/cosmos.config'

export const state = () => ({
  block: undefined,
  chainId: 0,
  allProcess: [],
  allProcessLoaded: false,
  allWallets: [],
})

export const mutations = {
  // create set methods from data points
  ...Object.fromEntries(
    Object.keys(state()).map((entity) => {
      return [
        `set${entity.charAt(0).toUpperCase()}${entity.substr(1)}`,
        (state, value) => {
          state[entity] = value
        },
      ]
    })
  ),
  resetSessionData(state) {
    // state.balances = []
  },
}

export const actions = {
  init({ commit }) {
    commit('setApi', new DataSource(this.$axios, network))
  },
  // this is never awaited in the code
  async refresh({ dispatch, state }, address) {
    const calls = [
      dispatch('getWalletInfo', address),
      dispatch('getDelegations', address),
    ]
    await Promise.all(calls)
  },

  async getAllProcess({ commit, state }, data) {
    const response = await this.$axios.get('/api/process')
    //console.log(response.data)
    commit('setAllProcess', response.data)
    return
  },

  async getAllWallets({ commit, state }, data) {
    const response = await this.$axios.get('/api/wallets/list')
    //console.log(response.data)
    commit('setAllWallets', response.data)
    return
  },

  resetSessionData({ commit }) {
    commit('resetSessionData')
  },
}
