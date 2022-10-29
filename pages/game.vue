<template>
  <h1 v-if="!$store.getters.getLoggedInStatus">Redirecting...</h1>
  <div v-else>
    <section>
      <h1>{{ currentGame.course }} | {{ toDateString(currentGame.date) }}</h1>
      <div v-for="(basket, i) in currentGame.baskets" :key="i">
        <h2>Basket {{ basket.basketName }}</h2>
        <v-btn>Edit</v-btn>
        <div v-for="(player, j) in currentGame.players" :key="j">
          <span>{{ player }}: {{ basket.scores[player] }}</span>
          <v-btn>Edit</v-btn>
        </div>
      </div>
    </section>
    <hr />
    <section>
      <v-form ref="form" v-model="formIsValid">
        <v-text-field
          v-model="currentBasket.basketName"
          label="Basket Name"
          type="text"
          required
          :rules="[(value) => !!value || 'Cannot be empty']"
        ></v-text-field>
        <div v-for="(player, index) in currentGame.players" :key="index">
          <v-text-field
            v-model="currentBasket.scores[player]"
            :label="player"
            type="number"
            required
            :rules="[(value) => (!!value && value > 0) || 'Invalid input']"
          ></v-text-field>
        </div>
        <v-text-field
          v-model="currentBasket.par"
          label="Par"
          type="number"
          required
          :rules="[(value) => (!!value && value > 0) || 'Invalid input']"
        ></v-text-field>
        <v-text-field
          v-model="currentBasket.notes"
          label="Notes"
          type="text"
        ></v-text-field>
        <v-btn :disabled="!formIsValid" @click="advanceToNextBasket"
          >Next Basket</v-btn
        >
        <finish-game-dialog
          :form-is-valid="formIsValid"
          @finish-game="finishGame"
        ></finish-game-dialog>
      </v-form>
    </section>
    <v-snackbar v-model="errorSnackbar">
      {{ validationErrorMessage }}
      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="errorSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'GamePage',
  data() {
    return {
      currentBasket: {
        basketName: '1',
        scores: {},
        par: 3,
        notes: '',
      },
      errorSnackbar: false,
      validationErrorMessage: '',
      formIsValid: false,
    }
  },
  head: {
    title: 'Game',
  },
  computed: {
    currentGame() {
      return this.$store.getters.getCurrentGame
      // return {
      //   id: 1,
      //   course: 'Elysian Park',
      //   date: 'Thu October 27 2022',
      //   players: ['Alice', 'Bob'],
      //   baskets: [
      //     {
      //       basketName: '1',
      //       scores: { Alice: 3, Bob: 4 },
      //       par: 3,
      //       notes: 'Notes go here',
      //     },
      //     {
      //       basketName: '2',
      //       scores: { Alice: 4, Bob: 5 },
      //       par: 4,
      //       notes: 'Notes go here',
      //     },
      //     {
      //       basketName: '2a',
      //       scores: { Alice: 3, Bob: 3 },
      //       par: 3,
      //       notes: 'Notes go here',
      //     },
      //   ],
      // }
    },
  },
  methods: {
    toDateString(unixMillis) {
      return new Date().toDateString(unixMillis)
    },
    makeNewBasket() {
      const scores = {}
      this.currentGame.players.forEach((player) => {
        scores[player] = null
      })
      // Attempt to predict the next basket name
      const parsedBasketName = parseInt(this.currentBasket.basketName)
      // For some reason, Number.isNaN() is 'not a function' and isNaN() by itself is undefined. This should be fine instead.
      const basketName = Number.isInteger(parsedBasketName)
        ? (parsedBasketName + 1).toString()
        : ''
      // Set default values on the new basket
      this.currentBasket = {
        basketName,
        scores,
        par: 3,
        notes: '',
      }
    },
    validateInput() {
      const previousBaskets = this.currentGame.baskets
      const players = this.currentGame.players

      // let errorMessage = ''
      const validationResult = {
        valid: false,
        error: null,
      }

      // Basket name cannot be empty
      if (this.currentBasket.basketName.trim().length < 1) {
        validationResult.error = 'Basket name cannot be empty'
        return validationResult
      }
      // Basket name cannot have been previously used in this game
      for (let i = 0; i < previousBaskets.length; i++) {
        if (previousBaskets[i].basketName === this.currentBasket.basketName) {
          validationResult.error =
            'Basket ' +
            this.currentBasket.basketName +
            ' has already been played.'
          return validationResult
        }
      }
      // No player may have a missing score or score < 1
      for (let i = 0; i < players.length; i++) {
        const playerScore = this.currentBasket.scores[players[i]]
        if (!playerScore || playerScore < 1) {
          validationResult.error =
            'Invalid player score for player: ' + players[i]
          return validationResult
        }
      }
      // A basket must have a par value and it must be greater than 0
      if (!this.currentBasket.par || this.currentBasket.par < 1) {
        validationResult.error = 'Every basket must have a par of at least 1'
        return validationResult
      }
      // If all checks pass
      validationResult.valid = true
      return validationResult
    },
    setScore() {
      this.$store.dispatch('addBasket', this.currentBasket)
    },
    advanceToNextBasket() {
      const validationResult = this.validateInput()
      if (validationResult.valid) {
        this.setScore()
        this.$refs.form.resetValidation()
        this.makeNewBasket()
      } else {
        this.validationErrorMessage = validationResult.error
        this.errorSnackbar = true
      }
    },
    finishGame() {
      const validationResult = this.validateInput()
      if (validationResult.valid) {
        this.setScore()
        this.$store.dispatch('finishCurrentGame')
        this.$router.push('/')
      } else {
        this.validationErrorMessage = validationResult.error
        this.errorSnackbar = true
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
