<template>
  <div class="column">
    <div class="column__head" :style="{'background-color': headColor }">
      <slot name="head"/>
    </div>
    <div class="column__body">
      <slot name="tasks"/>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headColor: {
      default: 'orange',
      type: String
    }
  },
  data () {
    return {
      name: 'on-hold'
    }
  }
}
</script>

<style scoped>
  .column {
    display: flex;
    flex-direction: column;
  }

  .column__head {
    color: white;
    text-transform: uppercase;
    padding: 0.5em;
  }

  .column__body {
    background: #303038;
    padding: 0.3em;
  }

</style>
