<template>
  <h1 v-if="!$store.getters.getLoggedInStatus">Redirecting...</h1>
  <div v-else>
    <h2>fetchedHistory: {{ fetchedHistory }}</h2>
    <hr />
    <h2>$axios.defaults.baseURL: {{ axiosDefaultsBaseURL }}</h2>
    <h2>$axios.baseURL: {{ axiosBaseURL }}</h2>
    <h2>process.env.baseURL: {{ processEnvBaseUrl }}</h2>
    <h2>process.env.URL: {{ netlifyURL }}</h2>
    <h2>config.axios.baseURL: {{ configPrivateAxiosBaseUrl }}</h2>
    <h2>$config.axios.browserBaseURL: {{ configPublicAxiosBaseUrl }}</h2>
    <div v-for="(game, index) in gameHistory" :key="index">{{ game }}</div>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  async asyncData({ $axios, $config }) {
    // const endpoint =
    //   $axios.defaults.baseURL + '/.netlify/functions/fetch-game-history'
    // const response = await $axios.$get(endpoint)
    const response = await $axios.$get(
      'https://starlit-horse-62457d.netlify.app/.netlify/functions/fetch-game-history'
    )
    const fetchedHistory = response.msg
    console.log($axios.defaults.baseURL)
    console.log('config: ')
    console.log($config)
    return {
      fetchedHistory,
      axiosDefaultsBaseURL: $axios.defaults.baseURL,
      axiosBaseURL: $axios.baseURL,
      processEnvBaseUrl: process.env.baseURL,
      netlifyURL: process.env.URL,
      configPrivateAxiosBaseUrl: $config.axios.baseURL,
      configPublicAxiosBaseUrl: $config.axios.browserBaseURL,
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
