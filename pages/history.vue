<template>
  <h1 v-if="!$store.getters.getLoggedInStatus">Redirecting...</h1>
  <div v-else>
    <h2>{{ fetchedHistory }}</h2>
    <h2>{{ baseURL }}</h2>
    <div v-for="(game, index) in gameHistory" :key="index">{{ game }}</div>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  async asyncData({ $axios }) {
    // const endpoint =
    //   $axios.defaults.baseURL + '/.netlify/functions/fetch-game-history'
    // const response = await $axios.$get(endpoint)
    const response = await $axios.$get(
      'https://starlit-horse-62457d.netlify.app/.netlify/functions/fetch-game-history'
    )
    const fetchedHistory = response.msg
    console.log($axios.defaults.baseURL)
    // console.log(endpoint)
    return {
      fetchedHistory,
      baseURL: $axios.defaults.baseURL,
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
