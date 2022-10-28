<template>
  <div>
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
      <v-form>
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
        <v-btn @click="advanceToNextBasket">Next Basket</v-btn>
        <!-- <v-btn @click="finishGame">Finish Game</v-btn> -->
        <finish-game-dialog @finish-game="finishGame"></finish-game-dialog>
      </v-form>
    </section>
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
    }
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
    setScore() {
      this.$store.dispatch('addBasket', this.currentBasket)
    },
    advanceToNextBasket() {
      this.setScore()
      this.makeNewBasket()
    },
    finishGame() {
      this.setScore()
      this.$store.dispatch('finishCurrentGame')
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped></style>
