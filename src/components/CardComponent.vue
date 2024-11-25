<template>
  <q-card class="cardCompo">
    <q-img
      :src="offer.image || 'public/images/offrebar.jpg'"
      alt="Offer Image"
      class="offer-image"
      contain
    />
    <q-card-section class="offer-details">
      <h2>{{ offer.title }}</h2>
      <h3>{{ offer.offre_details }}</h3>
      <p>{{ offer.description }}</p>
      <p><strong>Category: </strong>{{ offer.categorie }}</p>
      <q-btn
        v-if="offer.googleMaps"
        :href="offer.googleMaps"
        label="View on Map"
        target="_blank"
        rel="noopener noreferrer"
        class="map-button"
      />
      <q-btn v-else @click="noMapAvailable" label="View on Map" class="map-button" />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    offer: {
      type: Object,
      required: true,
      default: () => ({
        image: "",
        title: "",
        description: "",
        buttonText: "View Offer",
        googleMaps: "",
        categorie: "",
        offre_details: "",
      }),
    },
  },
  methods: {
    noMapAvailable() {
      this.$q.notify({
        color: "negative",
        position: "top",
        message: "No Google Maps link available for this offer",
      });
    },
  },
};
</script>

<style scoped>

.cardCompo {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  margin: 20px;
  padding: 0;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.offer-image {
  width: 100%;
  border-radius: 15px 15px 0 0;
}

.offer-details {
  padding: 20px;
}

h2 {
  color: #512da8;
  font-family: "Chau Philomene One", sans-serif;
  font-size: 1.5rem;
}

h3 {
  color: #FCAD51;
  font-size: 1.2rem;
  margin: 0;
}

p {
  color: #333;
  margin: 5px 0;
}

.map-button {
  background-color: #fdae51;
  color: white;
  width: 100%;
}
</style>





