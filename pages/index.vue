<template>
  <!-- <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation </a
            >.
          </p>
          <p>
            If you have questions, please join the official
            <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row> -->
  <h1 v-if="!$store.getters.getLoggedInStatus">Redirecting...</h1>
  <v-container v-else>
    <v-row>
      <h1 v-if="currentGameStatus">A game is currently in progress.</h1>
      <v-btn v-if="!currentGameStatus" @click="startNewGame"
        >Start New Game</v-btn
      >
      <v-btn v-if="currentGameStatus" @click="returnToCurrentGame"
        >Return to Game</v-btn
      >
      <v-btn @click="viewGameHistory">View Game History</v-btn>
      <v-btn @click="testPost">Test Post</v-btn>
      <v-btn @click="testHistory">Test History</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  head: {
    title: 'Home',
  },
  computed: {
    currentGameStatus() {
      return this.$store.getters.getCurrentGameStatus
    },
  },
  methods: {
    startNewGame() {
      if (!this.currentGameStatus) {
        this.$router.push('/setup')
      }
    },
    returnToCurrentGame() {
      this.$router.push('/game')
    },
    viewGameHistory() {
      this.$router.push('/history')
    },
    async testPost() {
      let endpoint

      if (process.env.NODE_ENV === 'development') {
        endpoint = '/api/post-test'
      } else endpoint = process.env.baseURL + '/.netlify/functions/post-test'
      const response = await this.$axios.$post(endpoint, {
        a: 'This is a post request',
      })
      console.log(response)
    },
    async testHistory() {
      let endpoint

      if (process.env.NODE_ENV === 'development') {
        endpoint = '/api/fetch-game-history'
      } else
        endpoint =
          process.env.baseURL + '/.netlify/functions/fetch-game-history'
      const response = await this.$axios.$get(endpoint)
      console.log(response)
    },
  },
}
</script>
