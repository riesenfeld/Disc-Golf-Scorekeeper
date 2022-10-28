<template>
  <h1 v-if="!$store.getters.getLoggedInStatus">Redirecting...</h1>
  <div v-else>
    <h1>game status: {{ currentGameStatus }}</h1>
    <setup-form></setup-form>
  </div>
</template>

<script>
export default {
  name: 'SetupPage',
  data() {
    return {}
  },
  head: {
    title: 'Setup',
  },
  computed: {
    currentGameStatus() {
      return this.$store.getters.getCurrentGameStatus
    },
  },
}
</script>

<style lang="scss" scoped></style>
