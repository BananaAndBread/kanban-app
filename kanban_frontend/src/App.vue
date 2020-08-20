<template>
  <div id="app">
    <NavBar/>
    <Error v-if="$store.state.error.error"/>
    <router-view />
  </div>
</template>

<script>
import Error from './components/Error'
import NavBar from './components/NavBar'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  async mounted () {
    if (this.$store.getters['auth/authenticated']) {
      this.$store.dispatch('auth/refreshToken')
    } else {
      this.$router.replace({ name: 'login' })
    }
  },
  methods: {
  },
  components: {
    Error,
    NavBar
  }
}
</script>

<style>
  body {
    background-color: rgb(56,58,66) !important;
    min-height: 100vh;
  }
  #app {
    margin: auto;
  }
</style>
