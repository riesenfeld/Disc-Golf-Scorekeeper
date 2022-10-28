<template>
  <h1 v-if="!$store.getters.getLoggedInStatus">Redirecting...</h1>
  <div v-else>
    <div v-for="(game, index) in gameHistory" :key="index">{{ game }}</div>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  head: {
    title: 'History',
  },
  computed: {
    gameHistory() {
      return this.$store.getters.getGameHistory
    },
  },
}
</script>

<style lang="scss" scoped></style>
