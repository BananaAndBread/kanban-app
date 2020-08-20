<template>
    <div class="task">
        <PlusIcon class="task__icon-cross" @click.stop="removeCard"></PlusIcon>
        <div class="task__id">
            <p>id:</p>
            <p class="task__id__value"> {{id}}</p>
        </div>
        <p class="task__text">{{text}}</p>
    </div>
</template>

<script>
import PlusIcon from '@/assets/icons/icons8-plus.svg'

export default {
  components: {
    PlusIcon
  },
  props: {
    id: {
      type: Number
    },
    text: String
  },
  methods: {
    removeCard () {
      this.$emit('removeCard')
    }
  }
}
</script>

<style scoped>
    .task {
        background: #1f1f23;
        color: #c6c6c6;
        padding: 1em;
    }

    .task__id {
        font-weight: bold;
        display: flex;
        color: white;
    }

    .task__text {
        /*overflow: scroll;*/
    }

    .task__id__value {
        font-weight: normal;
    }

    .task__icon-cross {
        fill: #d3d3d3;
        background-size: 1em auto;
        width: 1.5em;
        height: 1.5em;
        margin-right: 1em;
        transform: rotate(45deg);
        margin-left: 0.5em;
        float: right;
    }
</style>
