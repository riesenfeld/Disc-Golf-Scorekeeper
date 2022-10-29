<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
      <div data-netlify-identity-button></div>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'History',
          to: '/history',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Disc Golf Scorekeeper',
    }
  },

  computed: {
    currentUser() {
      if (process.client) {
        // eslint-disable-next-line no-undef
        return netlifyIdentity.currentUser()
      } else return null
    },
  },
  watch: {
    /**
     * Route user to login page if they visit a different route while not logged in.
     * If the Vuex store loggedInStatus is incorrect (i.e. set to true), set it to false.
     */
    $route(currentRoute) {
      if (currentRoute.fullPath !== '/login' && !this.currentUser) {
        if (this.$store.getters.loggedInStatus) {
          this.$store.dispatch('setLoggedInStatus', false)
        }
        this.$router.push('/login')
      }
    },
  },
  created() {
    if (process.client) {
      // eslint-disable-next-line no-undef
      const ntlid = netlifyIdentity
      const user = ntlid.currentUser()

      ntlid.on('login', (user) => {
        this.$store.dispatch('setLoggedInStatus', true)
        this.$router.push('/')
      })
      ntlid.on('logout', (user) =>
        this.$store.dispatch('setLoggedInStatus', false)
      )

      if (!user) {
        this.$store.dispatch('setLoggedInStatus', false)
        this.$router.push('/login')
      } else {
        this.$store.dispatch('setLoggedInStatus', true)
      }
    }
  },
}
</script>
