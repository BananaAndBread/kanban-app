<template>
    <div class="move-card-form">
        <h4>MOVE TO:</h4>
        <p class="move-card-form__label"> Board:</p>
        <select @change='saveState' v-model="selectedColumnName" class="move-card-form__select">
            <option :key="column.name" v-for="column in columns"> {{column.name}}</option>
        </select>
        <div v-if='selectedColumnName'>
            <p class="move-card-form__label"> Position:</p>
            <select @change='saveState' v-model="selectedPlace" class="move-card-form__select">
                <option :key="placeNumber" v-for="placeNumber in findNumberOfCardsIn(selectedColumnName)">
                    {{placeNumber}}
                </option>
            </select>
        </div>
        <button class="move-card-form__button" @click="moveCard"> Move</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      prevColumnIndex: '',
      prevCardIndex: '',
      selectedColumnName: '',
      selectedPlace: '1'
    }
  },
  props: {
    cardId: Number
  },
  computed: mapState({ columns: state => state.cards.columns }),
  mounted () {
    if (!this.cardId) {
      this.prevColumnIndex = this.$store.state.persistent.moveCardFormState.prevColumnIndex
      this.prevCardIndex = this.$store.state.persistent.moveCardFormState.prevCardIndex
      this.selectedColumnName = this.$store.state.persistent.moveCardFormState.selectedColumnName
      this.selectedPlace = this.$store.state.persistent.moveCardFormState.selectedPlace
    } else {
      const indices = this.findCurrentColumnAndSeqNum()
      this.prevColumnIndex = indices.columnIndex
      this.prevCardIndex = indices.cardIndex
      this.selectedColumnName = this.columns[indices.columnIndex].name
      this.selectedPlace = indices.cardIndex + 1
    }
  },
  methods: {
    findColumnIndexByColumnName (columnName) {
      for (const [index, column] of this.columns.entries()) {
        if (column.name === columnName) {
          return index
        }
      }
    },
    findNumberOfCardsIn (columnName) {
      const index = this.findColumnIndexByColumnName(columnName)
      return this.columns[index].cards.length + 1
    },
    findCurrentColumnAndSeqNum () {
      for (const [columnIndex, column] of this.columns.entries()) {
        for (const [cardIndex, card] of column.cards.entries()) {
          if (card.id === this.cardId) {
            return { columnIndex, cardIndex }
          }
        }
      }
    },
    async moveCard () {
      const newColumnIndex = this.findColumnIndexByColumnName(
        this.selectedColumnName)
      const newCardIndex = this.selectedPlace - 1
      const payload = {
        previous: {
          cardIndex: this.prevCardIndex,
          columnIndex: this.prevColumnIndex
        },
        current: {
          cardIndex: newCardIndex,
          columnIndex: newColumnIndex
        }
      }
      this.$store.commit('cards/moveCard', payload)
      const promises = []
      promises.push(
        this.$store.dispatch(
          'cards/updateColumn', { columnId: this.prevColumnIndex }))
      promises.push(
        this.$store.dispatch(
          'cards/updateColumn', { columnId: newColumnIndex }))
      await Promise.all(promises)
      this.$emit('close')
    },
    saveState () {
      const payload = {
        prevColumnIndex: this.prevColumnIndex,
        prevCardIndex: this.prevCardIndex,
        selectedColumnName: this.selectedColumnName,
        selectedPlace: this.selectedPlace
      }
      this.$store.commit('persistent/setMoveCardFormState', payload)
    }
  }
}
</script>

<style scoped>
    .move-card-form {
        margin-left: 3em;
        margin-right: 3em;
        margin-top: 2em;
    }

    .move-card-form__select {
        display: block;
        font-size: 16px;
        font-family: sans-serif;
        font-weight: 700;
        color: #444;
        line-height: 1.3;
        padding: .6em 1.4em .5em .8em;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        margin: 0;
        border: 1px solid #aaa;
        box-shadow: 0 1px 0 1px rgba(0, 0, 0, .04);
        border-radius: .5em;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-color: #ffffff;
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'), linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
        background-repeat: no-repeat, repeat;
        background-position: right .7em top 50%, 0 0;
        background-size: .65em auto, 100%;
    }

    .move-card-form__select::-ms-expand {
        display: none;
    }

    .move-card-form__select:hover {
        border-color: #888;
    }

    .move-card-form__select:focus {
        border-color: #aaa;
        box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
        box-shadow: 0 0 0 3px -moz-mac-focusring;
        color: #222;
        outline: none;
    }

    .move-card-form__select option {
        font-weight: normal;
    }

    *[dir="rtl"] .move-card-form__select, :root:lang(ar) .move-card-form__select, :root:lang(iw) .move-card-form__select {
        background-position: left .7em top 50%, 0 0;
        padding: .6em .8em .5em 1.4em;
    }

    .move-card-form__label {
        margin-top: 0.5em;
    }

    .move-card-form__button {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 0.5em 1em;
        text-align: center;
        margin-top: 0.5em;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
</style>
