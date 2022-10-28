<template>
  <div>
    <h1>game status: {{ currentGameStatus }}</h1>
    <!-- <v-btn @click="startNewGame">Start New Game</v-btn>
    <v-btn @click="finishCurrentGame">Finish Game</v-btn> -->
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
  methods: {
    startNewGame() {
      this.$store.dispatch('startNewGame')
    },
    finishCurrentGame() {
      this.$store.dispatch('finishCurrentGame')
    },
  },
}
</script>

<style lang="scss" scoped></style>
