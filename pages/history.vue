<template>
  <h1 v-if="!$store.getters.getLoggedInStatus">Redirecting...</h1>
  <div v-else>
    <h2>{{ fetchedHistory }}</h2>
    <div v-for="(game, index) in gameHistory" :key="index">{{ game }}</div>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  async asyncData({ $axios }) {
    const response = await $axios.$get(
      $axios.defaults.baseURL + '/.netlify/functions/fetch-game-history'
    )
    const fetchedHistory = response.msg
    console.log($axios.defaults.baseURL)
    return {
      fetchedHistory,
    }
  },
  head: {
    title: 'History',
  },
  computed: {
    gameHistory() {
      return this.$store.getters.getGameHistory
    },
  },
  // created() {
  // console.log(process.env)
  // },
}
</script>

<style lang="scss" scoped></style>
