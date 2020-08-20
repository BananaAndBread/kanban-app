<template>
  <div class="login">
    <h1>Login</h1>
    <input class="login__input" type="text" name="username" v-model="input.username" placeholder="Username" />
    <input class="login__input" type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      input: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      const data = {
        username: this.input.username,
        password: this.input.password
      }
      await this.$store.dispatch('auth/login', data)
      if (localStorage.token) {
        this.$router.replace({ name: 'kanban' })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.token) {
      next({ name: 'kanban' })
    } else {
      next()
    }
  }
}
</script>

<style scoped>
  .login {
    width: 50%;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
  }
  @media (max-width: 576px) {
    .login{
      width: 100%;
    }
  }
  .login__input{
    border: solid 1px rgba(128, 128, 128, 0.57);
  }

</style>
