<template>
  <q-layout view="hHh lpR fFf">
    <NavbarCompo />

    <q-page-container>
      <router-view />
    </q-page-container>


  </q-layout>
</template>

<script>
import NavbarCompo from 'components/Navbar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    NavbarCompo
  }
}


</script>

<style lang="scss">
.q-page-container {
  padding-top: 64px; // Height of navbar
  background-color: #FFF8EF; // Light background color
}

// Global styles
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
</style>
