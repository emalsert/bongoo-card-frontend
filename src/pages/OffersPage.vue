<template>
  <q-page class="q-pa-xl">
    <div class="category-nav">
      <CategorySelector @category-selected="handleCategoryChange" />
    </div>

    <div v-if="offers.length > 0">
      <OfferCard v-for="offer in offers" :key="offer.id" :offer="offer" />
    </div>
    <div v-else>
      <q-card class="q-mt-md">
        <q-card-section>
          <p>Loading offers for this category...</p>
        </q-card-section>
      </q-card>
    </div>

  </q-page>
  <AppFooter />
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { getOffers } from '../services/offers';
import CategorySelector from '../components/CategorySelector.vue';
import OfferCard from '../components/OffersList.vue';
import AppFooter from "components/FooterCompo.vue";

export default {
  name: 'OffersPage',
  components: {
    AppFooter,
    CategorySelector,
    OfferCard,
  },
  setup() {
    const offers = ref([]);
    const selectedCategory = ref('');

    const fetchOffers = async () => {
      console.log('Fetching all offers');
      try {
        const data = await getOffers();
        offers.value = data.offers || [];
        console.log('Fetched offers:', offers.value);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    const fetchOffersByCategory = async (category) => {
      console.log('Fetching offers for category:', category);
      try {
        const data = await getOffers({ category });
        offers.value = data.offers || [];
        console.log('Fetched offers by category:', offers.value);
      } catch (error) {
        console.error('Error fetching offers by category:', error);
      }
    };

    const handleCategoryChange = (category) => {
      console.log('Parent received category change:', category);
      selectedCategory.value = category;
    };

    watch(selectedCategory, (newCategory) => {
      console.log('Watch detected category change:', newCategory);
      if (newCategory) {
        fetchOffersByCategory(newCategory);
      } else {
        fetchOffers();
      }
    });

    onMounted(() => {
      console.log('Component mounted, fetching initial offers');
      fetchOffers();
    });

    return {
      offers,
      handleCategoryChange,
      selectedCategory,
    };
  },
};
</script>

<style scoped>
.category-nav{
  margin-left: auto;
  margin-right: auto;
}

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
