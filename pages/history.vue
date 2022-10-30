<template>
  <h1 v-if="!$store.getters.getLoggedInStatus">Redirecting...</h1>
  <div v-else>
    <h2>fetchedHistory: {{ fetchedHistory }}</h2>
    <hr />
    <h2>process.env.baseURL: {{ processEnvBaseUrl }}</h2>
    <div v-for="(game, index) in gameHistory" :key="index">{{ game }}</div>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  async asyncData({ $axios }) {
    const endpoint =
      process.env.baseURL + '/.netlify/functions/fetch-game-history'
    const response = await $axios.$get(endpoint)
    const fetchedHistory = response.msg
    return {
      fetchedHistory,
      processEnvBaseUrl: process.env.baseURL,
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
