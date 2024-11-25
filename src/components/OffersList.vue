<template>
  <q-card class="card-container">
    <div class="row no-wrap">
      <div class="image-container">
        <q-img
          :src="offer.image"
          :ratio="1"
          class="offer-image"
          fit="cover"
        />
      </div>

      <q-card-section class="content-section">
        <div class="text-h5 purple-text">{{ offer.title }}</div>
        <div class="text-h6 orange-text">{{ offer.offer_details }}</div>

        <div class="description">{{ offer.description }}</div>

        <div class="category">
          <span class="text-weight-bold">Category: </span>
          {{ offer.category }}
        </div>
        <div class="button-wrapper">
          <q-btn
            v-if="offer.google_maps"
            :href="offer.google_maps"
            target="_blank"
            rel="noopener noreferrer"
            :label="offer.button_text || 'View Offer'"
            class="map-button"
            unelevated
          />
          <q-btn
            v-else
            @click="noMapAvailable"
            label="View on map"
            class="map-button"
            unelevated
          />
        </div>

      </q-card-section>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'OfferCard',
  props: {
    offer: {
      type: Object,
      required: true,
      default: () => ({
        image: '',
        title: '',
        description: '',
        button_text: 'View Offer',
        google_maps: '',
        category: '',
        offer_details: '',
      }),
    },
  },
  methods: {
    noMapAvailable() {
      this.$q.notify({
        message: 'No Google Maps link available for this offer',
        color: 'negative',
        position: 'top',
      })
    },
  },
}
</script>

<style scoped>
.card-container {
  max-width: 1200px;
  margin: 20px auto;
  transition: box-shadow 0.3s ease;
  border-radius: 15px;
  overflow: hidden;
}

.card-container:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.image-container {
  width: 300px;
  flex-shrink: 0;
}

.offer-image {
  height: 300px;
  border-radius: 15px 0 0 15px;
}

.content-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.purple-text {
  color: #512da8;
  font-size: 1.5rem;
  font-family: "Chau Philomene One", sans-serif;
  margin-bottom: 10px;
  word-wrap: break-word;
}

.orange-text {
  font-size: 1.5rem;
  color: #FCAD51;
  font-family: "Chau Philomene One", sans-serif;
  margin-bottom: 15px;
  word-wrap: break-word;
}

.description {
  color: #333;
  margin-bottom: 20px;
  word-wrap: break-word;
}

.category {
  margin-bottom: 20px;
}

.map-button {
  max-width: 50%;
  color: white;
  background-color: #fdae51;
  border-radius: 50px;
  padding: 8px 16px;
  font-size: 14px;
  font-family: 'Chau Philomene One', sans-serif;
  text-transform: uppercase;
  transition: transform 0.3s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.map-button:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .card-container {
    width: 100%;
  }

  .row {
    flex-direction: column;
  }

  .image-container {
    width: 100%;
  }

  .offer-image {
    border-radius: 15px 15px 0 0;
  }

  .content-section {
    padding: 15px;
  }

  .purple-text {
    font-size: 1.2rem;
    margin-bottom: 1px;
  }
  .orange-text{
    margin-bottom: 7px;
    line-height: 1;
  }
  .description {
    font-size: 1rem;
    margin-bottom: 1px;
  }

  .map-button {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>

