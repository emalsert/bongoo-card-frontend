```vue
<template>
  <q-card class="cardCompo">
    <div class="offer-image">
      <q-img :src="offer.image" alt="Image de l'offre" />
    </div>
    <div class="offer-details">
      <h2>{{ offer.title }}</h2>
      <h3>{{ offer.offer_details }}</h3>
      <p>{{ offer.description }}</p>
      <p><strong>Catégorie : </strong>{{ offer.category }}</p>
      <q-btn
        v-if="offer.google_maps"
        :href="offer.google_maps"
        target="_blank"
        rel="noopener noreferrer"
        :label="offer.button_text"
        class="map-button"
      />
      <q-btn
        v-else
        @click="noMapAvailable"
        label="Voir sur la carte"
        class="map-button"
      />
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'OfferList',
  props: {
    offer: {
      type: Object,
      required: true,
      default: () => ({
        image: '',
        title: '',
        description: '',
        button_text: "Découvrir l'offre",
        google_maps: '',
        category: '',
        offer_details: '',
      }),
    },
  },
  methods: {
    noMapAvailable() {
      this.$q.notify({
        color: 'negative',
        message: 'Aucun lien Google Maps disponible pour cette offre.',
      });
    },
  },
};
</script>

<style scoped>
.cardCompo {
  display: flex;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  height: 100%;
  margin: 20px 15%;
  padding: 0;
  border-radius: 15px;
  box-sizing: border-box;
}

.cardCompo:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.offer-image {
  flex-shrink: 0;
  width: 250px;
}

.offer-image .q-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 15px 0 0 15px;
}

.offer-details {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
}

.offer-details h2 {
  color: #512da8;
  font-size: 1.5rem;
  margin-bottom: 10px;
  word-wrap: break-word;
}

.offer-details h3 {
  color: #FCAD51;
  font-size: 1.5rem;
  word-wrap: break-word;
  margin-block-start: 0;
  margin-block-end: 0;
}

.offer-details p {
  color: #333;
  margin-bottom: 20px;
  word-wrap: break-word;
}

.map-button {
  display: inline-block;
  color: white;
  background-color: #fdae51;
  border: none;
  border-radius: 50px;
  padding: 8px 16px;
  font-size: 14px;
  font-family: 'Chau Philomene One', sans-serif;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
}

.map-button:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .cardCompo {
    flex-direction: column;
    margin: 20px 5%;
  }

  .offer-image {
    width: 100%;
  }

  .offer-image .q-img {
    border-radius: 15px 15px 0 0;
  }

  .offer-details {
    padding: 15px;
  }

  .offer-details h2 {
    font-size: 1.2rem;
  }

  .offer-details p {
    font-size: 1rem;
  }

  .map-button {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>
```
