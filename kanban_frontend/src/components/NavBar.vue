<template>
  <div>
    <nav>
      <div>
        <b-navbar type="dark" variant="dark">
          <b-navbar-nav>
            <b-navbar-brand>Kanban</b-navbar-brand>
            <b-nav-item v-if="showLogout" to="/login" v-on:click="logout()" replace>Logout</b-nav-item>
            <b-nav-item v-if="showRegistration" to="/registration" replace>Registration</b-nav-item>
            <b-nav-item v-if="showRegistration" to="/login" replace>Login</b-nav-item>
          </b-navbar-nav>
        </b-navbar>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods:
    {
      logout () {
        this.$store.dispatch('auth/logout')
        this.$router.replace({ name: 'login' })
      }
    },
  data () {
    return {
      showLogout: Boolean(localStorage.token),
      showRegistration: !localStorage.token
    }
  },
  watch: {
    $route () {
      this.showLogout = Boolean(localStorage.token)
      this.showRegistration = !localStorage.token
    }
  }
}
</script>

<style>
</style>
