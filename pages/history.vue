<template>
  <div>
    <div v-for="(game, index) in gameHistory" :key="index">{{ game }}</div>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  computed: {
    gameHistory() {
      return this.$store.getters.getGameHistory
    },
  },
}
</script>

<style lang="scss" scoped></style>
