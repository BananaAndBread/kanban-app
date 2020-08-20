const state = {
  newCardsText: Array(4).fill({ isOpen: false, text: '' }),
  moveCardFormState: {
    prevColumnIndex: '',
    prevCardIndex: '',
    selectedColumnName: '',
    selectedPlace: '1'
  },
  modalState: {
    isOpen: false
  }
}
const mutations = {
  setNewCardText (state, { index, text, isOpen }) {
    state.newCardsText[index].text = text
    state.newCardsText[index].isOpen = isOpen
  },
  setMoveCardFormState (state, payload) {
    state.moveCardFormState = payload
  },
  setModalState (state, isOpen) {
    console.log(isOpen)
    state.modalState.isOpen = isOpen
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
