<template>
  <div>
    <vue-horizontal-list :items="columns" class="kanban">
      <template v-slot:default="{item}">
        <Column :headColor="item.color">
          <template v-slot:head>
            {{item.name}} ({{item.cards.length}})
          </template>
          <template v-slot:tasks>
            <div class="kanban__tasks kanban__tasks--big">
              <draggable :list="item.cards" group="tasks" @move='check(item)'
                         @change="updateColumn($event, item)">
                <Task @click.native="showModal(card.id)" @removeCard='removeCard(item.id, card.id)'
                      :id="card.id" :key="card.id" :text="card.text" v-for="card in item.cards"
                      class="kanban__task"></Task>
              </draggable>
            </div>
            <div class="kanban__tasks kanban__tasks--small">
              <Task @click.native="showModal(card.id)" @removeCard='removeCard(item.id, card.id)'
                    :id="card.id" :key="card.id" :text="card.text" v-for="card in item.cards"
                    class="kanban__task"></Task>
            </div>
            <AddCardForm class="kanban__add-card-form" :value='newCardsText[item.id].text' :is-open="newCardsText[item.id].isOpen"
                         @saveState='saveInputs($event, item.id)' @addCard='addCard($event, item.id)'></AddCardForm>
          </template>

        </Column>
      </template>
    </vue-horizontal-list>
    <modal @before-close='saveModalState(false)' class="kanban__modal" :name="'modal'" :adaptive='true'>
      <MoveCardForm @close='closeModal' :card-id="cardToMoveId"></MoveCardForm>
    </modal>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Column from './Column'
import Task from './Task'
import AddCardForm from './AddCardForm'
import { mapState } from 'vuex'
import store from '../store'
import MoveCardForm from './MoveCardForm'
import VueHorizontalList from 'vue-horizontal-list'

export default {
  components: {
    AddCardForm,
    Task,
    draggable,
    Column,
    VueHorizontalList,
    MoveCardForm
  },
  data () {
    return {
      options: {
        responsive: [
          { end: 576, size: 1 },
          { start: 576, end: 768, size: 2 },
          { start: 768, end: 992, size: 3 },
          { size: 4 }
        ],
        list: {
          windowed: 1200,
          padding: 24
        }
      },
      cardToMoveId: ''
    }
  },
  async mounted () {
    if (this.$store.state.persistent.modalState.isOpen) {
      this.showModal()
    }
    await store.dispatch('cards/getCards')
  },
  methods: {
    addCard () {
      const text = arguments[0]
      const columnIndex = arguments[1]
      this.$store.dispatch('cards/addCard', { text, columnIndex })
    },
    removeCard (index, cardId) {
      const payload = { columnIndex: index, cardId }
      this.$store.dispatch('cards/removeCard', payload)
    },
    updateColumn: function () {
      const columnId = arguments[1].id
      this.$store.dispatch('cards/updateColumn', { columnId })
    },
    showModal (cardId) {
      this.cardToMoveId = cardId
      this.$modal.show('modal')
      this.saveModalState(true)
    },
    closeModal () {
      this.$modal.hide('modal')
      this.saveModalState(false)
    },
    saveModalState (isOpen) {
      this.$store.commit('persistent/setModalState', isOpen)
    },
    saveInputs () {
      const text = arguments[0].text
      const isOpen = arguments[0].isOpen
      const columnIndex = arguments[1]
      this.$store.commit('persistent/setNewCardText', { index: columnIndex, text, isOpen })
    }

  },
  computed: mapState({
    columns: state => state.cards.columns,
    newCardsText: state => state.persistent.newCardsText
  })
}
</script>

<style scoped>
  .kanban {

    overflow: hidden;
  }

  .kanban__task {
    width: 95%;
    margin: 1em auto;
  }
  .kanban__add-card-form{
    width: 95%;
    margin: 1em auto;
  }

  .kanban__modal {
    z-index: 2;
  }

  @media (max-width: 576px) {
    .kanban__tasks--big {
      display: none;
    }
  }

  @media (min-width: 576px) {
    .kanban__tasks--small {
      display: none;
    }
  }

</style>
