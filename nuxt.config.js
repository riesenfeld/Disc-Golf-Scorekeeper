import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Disc Golf Scorekeeper',
    title: 'Disc Golf Scorekeeper',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'A scorekeeper for disc golf games',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Nuxt env Configuration: https://nuxtjs.org/docs/directory-structure/nuxt-config#env
  // env vars available by default on Netlify: https://docs.netlify.com/configure-builds/environment-variables/
  env: {
    baseURL: process.env.URL || 'http://localhost:8888',
  },

  // Axios Configuration: https://axios.nuxtjs.org/options/
  axios: {
    baseURL: process.env.URL || 'http://localhost:8888', // Used as fallback if no runtime config is provided
  },

  // Public (client-side) and Private (server-side) Runtime Configs
  // https://nuxtjs.org/docs/directory-structure/nuxt-config#runtimeConfig

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.URL || 'http://localhost:8888',
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.URL || 'http://localhost:8888',
    },
  },
}
