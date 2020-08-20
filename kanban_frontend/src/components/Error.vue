<template>
  <div></div>
</template>

<script>
export default {
  mounted () {
    const options = {
      type: 'error',
      action: {
        text: 'Cancel',
        onClick: (e, toastObject) => {
          toastObject.goAway(0)
          this.$store.commit('error/setError', '')
        }
      }
    }
    this.message = this.$toasted.show('Oops ...' + this.$store.state.error.error, options)
  },
  beforeDestroy () {
    this.message.goAway(0)
  },
  data () {
    return {
      message: ''
    }
  }
}

</script>

<style>

</style>
