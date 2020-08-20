<template>
  <div class="kanban-page">
    <Kanban class="kanban"></Kanban>
  </div>
</template>

<script>
import Kanban from '../components/Kanban'

export default {
  name: 'KanbanPage',
  components: {
    Kanban
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.token) {
      next({ name: 'login' })
    } else {
      next()
    }
  }
}
</script>

<style scoped>
  .kanban-page {
    background: rgb(56,58,66) !important;
  }
  .kanban {
    background: rgb(56,58,66);
  }
</style>
