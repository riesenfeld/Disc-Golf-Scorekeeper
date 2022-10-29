<template>
  <v-form v-model="formValidity">
    <section v-if="formState === 0">
      <v-text-field
        v-model="courseName"
        label="Course Name"
        type="text"
        required
        :rules="[(value) => !!value || 'Cannot be empty']"
      ></v-text-field>
      <v-text-field
        v-model="numberOfPlayers"
        label="Number of Players"
        type="number"
        required
        :rules="[(value) => (!!value && value > 0) || 'Invalid input']"
      ></v-text-field>
    </section>
    <section v-if="formState === 1">
      <h2>Course: {{ courseName }}</h2>
      <h3>Players:</h3>
      <v-text-field
        v-for="(name, index) in playerNames"
        :key="index"
        v-model="playerNames[index]"
        :label="'Player ' + (index + 1) + ' Name'"
        required
        :rules="[(value) => !!value || 'Cannot be empty']"
      ></v-text-field>
    </section>
    <v-btn v-if="formState > 0" @click="reverseFormState">Back</v-btn>
    <v-btn :disabled="!formValidity" @click.prevent="validateAndAdvance">{{
      formState < 1 ? 'Next' : 'Begin Game'
    }}</v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'SetupForm',
  data() {
    return {
      formState: 0,
      formValidity: false,
      courseName: '',
      numberOfPlayers: 2,
      playerNames: ['', ''],
    }
  },
  methods: {
    validateAndAdvance() {
      if (this.formState === 0) {
        this.playerNames = new Array(parseInt(this.numberOfPlayers))
        this.formState = 1
      } else if (this.formState === 1) {
        this.$store.dispatch('startNewGame', {
          course: this.courseName,
          players: this.playerNames,
        })
        this.formState = 2
        this.$router.push('game')
      }
    },
    reverseFormState() {
      if (this.formState > 0) {
        this.formState--
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
