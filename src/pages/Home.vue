<template>
  <q-layout>
    <q-page-container>
      <q-page class="page-container">
        <HeroBanner />

        <q-card flat bordered class="home-card q-mx-auto q-mt-md">
          <q-card-section>
            <div class="text-h5 q-mb-md">
              Welcome, {{ user.name }}!
            </div>


          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import api from '../api'
import HeroBanner from "components/HeroBanner.vue"

export default {
  name: 'HomeScreen',

  components: {
    HeroBanner
  },

  data() {
    return {
      user: {},
      loading: false
    }
  },




}
</script>

<style lang="scss">


.page-container {
  min-height: 100vh;
  background-color: #FFF8EF;
  display: flex;
  flex-direction: column;
}

.home-card {
  max-width: 800px;
  background-color: white;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

// Force le HeroBanner à prendre toute la largeur
:deep(.hero-banner) {
  width: 100%;
}
</style>
