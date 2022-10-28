<template>
  <div id="login-wrapper">
    <div data-netlify-identity-menu></div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  mounted() {
    // eslint-disable-next-line no-undef
    netlifyIdentity.open()
  },
}
</script>

<style lang="scss" scoped>
#login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 70vh;
  overflow: hidden;
}
</style>
