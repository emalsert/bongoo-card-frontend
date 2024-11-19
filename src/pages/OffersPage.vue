<template>
  <q-page class="main">
    <div class="category-nav">
      <CategorySelector @category-selected="fetchOffersByCategory" />
    </div>

    <div v-if="offers.length > 0">
      <OfferCard v-for="offer in offers" :key="offer.id" :offer="offer" />
    </div>
    <div v-else>
      <q-card class="q-mt-md">
        <q-card-section>
          <p>Aucune offre trouvée pour cette catégorie.</p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getOffers } from '../services/offers';
import CategorySelector from '../components/CategorySelector.vue';
import OfferCard from '../components/OffersList.vue';

export default {
  name: 'OffersPage',
  components: {
    CategorySelector,
    OfferCard,
  },
  setup() {
    const offers = ref([]);

    const fetchOffers = async () => {
      try {
        const data = await getOffers();
        offers.value = data.offers || [];
      } catch (error) {
        console.error('Erreur lors de la récupération des offres:', error);
      }
    };

    const fetchOffersByCategory = async (category) => {
      try {
        const data = await getOffers({ category });
        offers.value = data.offers || [];
      } catch (error) {
        console.error('Erreur lors de la récupération des offres:', error);
      }
    };

    onMounted(() => {
      fetchOffers();
    });

    return {
      offers,
      fetchOffersByCategory,
    };
  },
};
</script>

<style scoped>
.main {
  margin-top: 7%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  .main {
    margin-top: 25%;
  }
}
</style>
