<template>
  <v-dialog v-model="dialog">
    <template #activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> Finish Game </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">Finish this game?</v-card-title>
      <v-btn color="green darken-1" text @click="dialog = false">
        No, continue playing
      </v-btn>
      <v-btn color="green darken-1" text @click="confirmFinishGame">
        Yes, this game is done
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'FinishGameDialog',
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    confirmFinishGame() {
      this.$emit('finish-game')
      this.dialog = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
