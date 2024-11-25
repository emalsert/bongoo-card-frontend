<template>
  <q-layout>
    <q-page class="page-container">
      <HeroBanner />
      <div class="q-pl-lg q-pr-lg">
        <div v-if="offers.length > 0">
          <OfferCard v-for="offer in offers" :key="offer.id" :offer="offer" />
        </div>
        <div v-else-if="error">
          <q-card class="q-mt-md">
            <q-card-section>
              <p>{{ error }}</p>
            </q-card-section>
          </q-card>
        </div>
        <div v-else>
          <q-card class="q-mt-md">
            <q-card-section>
              <p>Loading offers...</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <AppFooter />
    </q-page>
  </q-layout>
</template>

<script>
import HeroBanner from "components/HeroBanner.vue"
import OfferCard from "components/OffersList.vue"
import { onMounted, ref } from "vue"
import { getOffers } from "src/services/offers"
import AppFooter from "components/FooterCompo.vue";

export default {
  name: 'HomeScreen',

  components: {
    AppFooter,
    OfferCard,
    HeroBanner
  },

  setup(){
    const offers = ref([])
    const error = ref(null)

    const fetchLimitedOffers = async () => {
      try {
        const nombre = 10
        const data = await getOffers(null,nombre) // Appel correct avec un objet
        offers.value = data.offers || [] // Affectation des données récupérées
        console.log(`First ${nombre} Offers:`, data)
      } catch (err) {
        console.error('Error fetching offers:', err)
        error.value = 'Failed to load offers.'
      }
    }

    onMounted(() => {
      console.log('Component mounted, fetching initial offers')
      fetchLimitedOffers()
    })

    return {
      offers,
      error
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

