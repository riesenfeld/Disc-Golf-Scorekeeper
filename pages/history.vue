<template>
  <h1 v-if="!$store.getters.getLoggedInStatus">Redirecting...</h1>
  <div v-else>
    <v-expansion-panels>
      <v-expansion-panel v-for="(game, i) in gameHistory" :key="i">
        <v-expansion-panel-header
          >{{ game.course }} | {{ game.date }}</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">Basket</th>
                  <th
                    v-for="(player, j) in game.players"
                    :key="j"
                    class="text-left"
                  >
                    {{ player }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(basket, j) in game.baskets" :key="j">
                  <td>{{ basket.basketName }}</td>
                  <td v-for="(player, k) in game.players" :key="k">
                    {{ basket.scores[player] }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  head: {
    title: 'History',
  },
  computed: {
    gameHistory() {
      return this.$store.getters.getGameHistory
    },
    error() {
      return this.$store.getters.getError
    },
  },
}
</script>

<style lang="scss" scoped></style>
