<template>
  <div class="registration">
    <h1>Registration</h1>
    <input class="registration__input" type="text" name="username" v-model="input.username" placeholder="Username" />
    <input class="registration__input" type="text" name="email" v-model="input.email" placeholder="Email" />
    <input class="registration__input" type="password" name="password1" v-model="input.password1" placeholder="Password" />
    <input class="registration__input" type="password" name="password2" v-model="input.password2" placeholder="Repeat password" />
    <button type="button" v-on:click="register()">Register</button>
  </div>
</template>

<script>
export default {
  name: 'Registration',
  data () {
    return {
      input: {
        username: '',
        password1: '',
        email: '',
        password2: ''
      }
    }
  },
  methods: {
    async register () {
      const data = {
        username: this.input.username,
        password1: this.input.password1,
        password2: this.input.password2,
        email: this.input.email
      }
      await this.$store.dispatch('auth/register', data)
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
.registration {
  width: 50%;
  border: 1px solid #CCCCCC;
  background-color: #FFFFFF;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
@media (max-width: 576px) {
  .registration{
    width: 100%;
  }
}
.registration__input{
  border: solid 1px rgba(128, 128, 128, 0.57);
}

</style>