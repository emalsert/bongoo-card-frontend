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

        <div class="description-container">
          <div class="description" :class="{ 'truncated': !showFullDescription }">
            {{ offer.description }}
          </div>
          <q-btn
            v-if="isLongDescription"
            flat
            dense
            :label="showFullDescription ? 'Show less' : 'Show more'"
            class="show-more-btn"
            color="primary"
            @click="showFullDescription = !showFullDescription"
          />
        </div>

        <div class="category">
          <span class="text-weight-bold">Category: </span>
          {{ offer.category }}
        </div>

        <div class="buttons-wrapper">
          <div class="social-buttons">
            <q-btn
              v-if="offer.facebook"
              :href="offer.facebook"
              target="_blank"
              rel="noopener noreferrer"
              round
              flat
              color="primary"
              icon="mdi-facebook"
              class="social-btn"
            />
            <q-btn
              v-if="offer.instagram"
              :href="offer.instagram"
              target="_blank"
              rel="noopener noreferrer"
              round
              flat
              color="primary"
              icon="mdi-instagram"
              class="social-btn"
            />
          </div>
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
        facebook: '',
        instagram: '',
      }),
    },
  },
  data() {
    return {
      showFullDescription: false,
    }
  },
  computed: {
    isLongDescription() {
      return this.offer.description && this.offer.description.length > 200;
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

.description-container {
  margin-bottom: 20px;
}

.description {
  color: #333;
  word-wrap: break-word;
  line-height: 1.4;
}

.description.truncated {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.show-more-btn {
  margin-top: 8px;
  font-family: "Chau Philomene One", sans-serif;
  padding: 0;
  min-height: 24px;
  font-size: 0.9em;
}

.category {
  margin-bottom: 20px;
}

.buttons-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}

.social-buttons {
  display: flex;
  gap: 8px;
  margin-right: auto;  /* Push the map button to the right */
}

.social-btn {
  font-size: 1.2em;
}

.map-button {
  color: white;
  background-color: #fdae51;
  border-radius: 50px;
  padding: 8px 16px;
  font-size: 14px;
  font-family: 'Chau Philomene One', sans-serif;
  text-transform: uppercase;
  transition: transform 0.3s ease;
  max-width: 200px;  /* Limit max width */
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

  .orange-text {
    margin-bottom: 7px;
    line-height: 1;
    font-size: 1.2rem;
  }

  .description {
    font-size: 1rem;
    margin-bottom: 1px;
  }
  .description.truncated {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .buttons-wrapper {
    flex-direction: column-reverse;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
  }

  .map-button {
    width: 100%;
    max-width: none;
    font-size: 12px;
    padding: 6px 12px;
  }

  .social-buttons {
    justify-content: center;
    width: 100%;
    margin-right: 0;
  }

  .social-btn {
    font-size: 1.1em;
  }

  .description-container {
    margin-bottom: 16px;
  }

  .category {
    margin-bottom: 12px;
  }
}
</style>
