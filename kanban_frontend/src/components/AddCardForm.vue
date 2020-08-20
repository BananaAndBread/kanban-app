<template>
  <div>
    <div @click="openForm" v-if="!open" class="add-card-form add-card-form_closed">
      <PlusIcon viewBox="0 0 24 24" class="add-card-form__icon-plus"/>
      <div> Добавить карточку</div>
    </div>
    <div v-if="open" class="add-card-form add-card-form_opened">
            <textarea @change="saveState" v-model="text" placeholder="Ввести заголовок для этой карточки"
                      class="add-card-form__textarea">
            </textarea>
      <button @click="addCard" class="add-card-form__button">
        Добавить карточку
      </button>
      <PlusIcon @click="closeForm" class="add-card-form__icon-cross"></PlusIcon>
    </div>
  </div>
</template>

<script>
import PlusIcon from '@/assets/icons/icons8-plus.svg'

export default {
  components: {
    PlusIcon
  },
  props: {
    value: {
      type: String
    },
    isOpen: {
      type: Boolean
    }
  },
  data () {
    return {
      open: false,
      text: ''
    }
  },
  methods: {
    openForm () {
      this.open = true
      this.$emit('saveState', { text: '', isOpen: this.open })
    },
    closeForm () {
      this.open = false
      this.$emit('saveState', { text: '', isOpen: this.open })
      this.reset()
    },
    addCard () {
      this.$emit('addCard', this.text)
      this.$emit('saveState', { text: '', isOpen: this.open })
      this.reset()
    },
    reset () {
      this.text = ''
    },
    saveState () {
      this.$emit('saveState', { text: this.text, isOpen: this.open })
    }
  },
  mounted () {
    this.text = this.value
    this.open = this.isOpen
  }
}

</script>

<style scoped>
  .add-card-form {
  }

  .add-card-form__icon-plus {
    fill: #d3d3d3;
    background-size: 1em auto;
    width: 1.5em;
    height: 1.5em;
    margin-right: 1em;
  }

  .add-card-form__icon-cross {
    fill: #d3d3d3;
    background-size: 1em auto;
    width: 1.5em;
    height: 1.5em;
    margin-right: 1em;
    transform: rotate(45deg);
    margin-left: 0.5em;
  }

  .add-card-form_opened {
  }

  .add-card-form_closed {
    display: flex;
    color: #d3d3d3;
    align-items: center;
    padding: 0.5em;
  }

  .add-card-form__textarea {
    background: #666;
    display: block;
    color: #d3d3d3;;
    border: none;
    height: 10em;
    width: 100%;
  }

  .add-card-form__button {
    margin-top: 0.5em;
    background: gray;
    color: #d3d3d3;
    display: inline-block;
    border: none;
    padding: 0.3em 1em;

  }

  textarea::-webkit-input-placeholder {
    color: #a6a6a6;
  }

  textarea:-moz-placeholder { /* Firefox 18- */
    color: #a6a6a6;
  }

  textarea::-moz-placeholder { /* Firefox 19+ */
    color: #a6a6a6;
  }

  textarea:-ms-input-placeholder {
    color: #a6a6a6;
  }

  textarea::placeholder {
    color: #a6a6a6;
  }

</style>
