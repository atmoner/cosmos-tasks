import axios from 'axios'
import jwt from 'jsonwebtoken'
import authConfig from '~/auth.config.js'
// import cosmosConfig from '~/cosmos.config'

export const state = () => ({
  block: undefined,
  chainId: 0,
  allProcess: [],
  allProcessLoaded: false,
  allWallets: [],
  logged: false,
  userToken: '',
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
  async checkToken({ commit, state }) {
    try {
      const decoded = jwt.verify(state.userToken, authConfig[0].jwtKey);
      return true
    } catch (err) {
      return false
    }
  },
  async login({ commit, state }, data) {
      await this.$axios.post('/api/auth/login', {
        name: data.name,
        password: data.password
      }).then(function (response) {
        if (response.data !== "false") {
          commit('setLogged', true)
          commit('setUserToken', response.data)
        } else
          commit('setLogged', false)
      }, function (err) {
        commit('setLogged', false)
      })
  },
  async logout({ commit, state }) {
    commit('setLogged', false)
    commit('setUserToken', '')
  },
  async getAllProcess({ commit, state }) {
    try {
      const response = await this.$axios.post('/api/process', {
        token: state.userToken
      })
      commit('setAllProcess', response.data)
    } catch (err) {
      commit('setAllProcess', [])
      console.log(err)
    }
    return
  },

  async getAllWallets({ commit, state }) {
    try {
      const response = await this.$axios.post('/api/wallets/list', {
        token: state.userToken
      })
      commit('setAllWallets', response.data)
    } catch (err) {
      commit('setAllWallets', [])
      console.log(err)
    }
    return
  },

  resetSessionData({ commit }) {
    commit('resetSessionData')
  },
}
