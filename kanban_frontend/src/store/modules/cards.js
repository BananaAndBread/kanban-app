import Vue from 'vue'
function makeColumns () {
  return [
    {
      id: '0',
      name: 'on hold',
      cards: [],
      color: '#f68a49'
    },
    {
      id: '1',
      name: 'in progress',
      cards: [],
      color: '#3c8abd'
    },
    {
      id: '2',
      name: 'needs review',
      cards: [],
      color: 'pink'
    },
    {
      id: '3',
      name: 'approved',
      cards: [],
      color: '#49a066'
    }
  ]
}
export default {
  namespaced: true,
  state: {
    columns: makeColumns()
  },
  mutations: {
    setCards (state, cards) {
      state.columns = makeColumns()
      for (const card of cards) {
        const indexCol = card.row
        const column = state.columns[indexCol]
        column.cards.push(card)
      }
      for (const column of state.columns) {
        column.cards.sort((a, b) => a.seq_num - b.seq_num)
      }
    },
    addCard (state, card) {
      state.columns[card.row].cards.push(card)
    },
    removeCard (state, payload) {
      const columnIndex = payload.columnIndex
      const cardId = payload.cardId
      state.columns[columnIndex].cards = state.columns[columnIndex].cards.filter(value => value.id !== cardId)
    },
    moveCard (state, payload) {
      const previous = payload.previous
      const current = payload.current
      const card = state.columns[previous.columnIndex].cards[previous.cardIndex]
      state.columns[previous.columnIndex].cards.splice(previous.cardIndex, 1)
      state.columns[current.columnIndex].cards.splice(current.cardIndex, 0, card)
    }
  },
  actions: {
    async getCards ({ commit }) {
      try {
        Vue.axios.defaults.headers.common.Authorization = 'JWT ' + localStorage.token
        const cards = (await Vue.axios.get('cards/')).data
        commit('setCards', cards)
      } catch (e) {
        commit('error/setError', JSON.stringify(e.response.data), { root: true })
      }
    },
    async addCard ({ commit }, payload) {
      try {
        Vue.axios.defaults.headers.common.Authorization = 'JWT ' + localStorage.token
        const data = {
          row: payload.columnIndex,
          text: payload.text
        }
        const card = (await Vue.axios.post('cards/', data)).data
        commit('addCard', card)
      } catch (e) {
        commit('error/setError', JSON.stringify(e.response.data), { root: true })
      }
    },
    async removeCard ({ commit }, payload) {
      try {
        Vue.axios.defaults.headers.common.Authorization = 'JWT ' + localStorage.token
        await Vue.axios.delete(`cards/${payload.cardId}/`)
        commit('removeCard', payload)
      } catch (e) {
        commit('error/setError', JSON.stringify(e.response.data), { root: true })
      }
    },
    async updateCard ({ commit }, { cardId, column, seqNum }) {
      try {
        Vue.axios.defaults.headers.common.Authorization = 'JWT ' + localStorage.token
        const data = {
          row: column,
          seq_num: seqNum
        }
        await Vue.axios.patch(`cards/${cardId}/`, data)
      } catch (e) {
        commit('error/setError', JSON.stringify(e.response.data), { root: true })
      }
    },
    updateColumn ({ dispatch, state }, { columnId }) {
      for (const [index, card] of state.columns[columnId].cards.entries()) {
        dispatch('updateCard', { seqNum: index, cardId: card.id, column: columnId })
      }
    }
  }
}
