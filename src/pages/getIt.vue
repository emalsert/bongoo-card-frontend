<template>
  <q-page class="get-card-page">
    <div class="content-wrapper">
      <div class="card-container">
        <div class="card-image">
          <q-img
            src="https://res.cloudinary.com/doyo6tvky/image/upload/v1732511380/q3zhvd54fktxeypv1ool.png"
            alt="Bongoo Card"
            class="bongoo-card"
            fit="contain"
            spinner-color="primary"
            spinner-size="82px"
          />
        </div>

        <div class="card-details">
          <q-card class="details-card">
            <q-card-section>
              <h1 class="text-primary text-h4 q-mb-sm">BONGO CARD 2024</h1>
              <div class="text-negative text-bold q-mb-md text-h6">
                Stock: 159/350
              </div>

              <div class="offers-section">
                <h2 class="text-accent text-h5 q-mb-sm">70€ OF FREE GIFTS</h2>
                <p class="q-mb-lg">
                  Get <span class="text-weight-bold">10 free gifts with no purchase required</span>
                  on your first visit to our partners.
                  Your card is <span class="text-weight-bold">instantly profitable!</span>
                </p>

                <h2 class="text-accent text-h5 q-mb-sm">THE BEST BRANDS</h2>
                <p class="q-mb-lg">
                  McDonald's, Pokawa, Burger de Papa, Pizza Hut... Offers negotiated for you in the
                  <span class="text-weight-bold">50 best brands</span> in Montpellier.
                </p>

                <h2 class="text-accent text-h5 q-mb-sm">IN ALL CITIES</h2>
                <p class="q-mb-none">
                  Enjoy <span class="text-weight-bold">permanent offers</span> from Lyon, Grenoble,
                  and Toulouse with your Mojjo Montpellier card!
                </p>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <ScrollingBanner />
    <AppFooter />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import ScrollingBanner from 'components/ScrollingBanner.vue'
import AppFooter from 'components/FooterCompo.vue'

export default defineComponent({
  name: 'GetCardPage',
  components: {
    ScrollingBanner,
    AppFooter
  }
})
</script>

<style scoped>
.get-card-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
  flex: 1;
}

.card-container {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.card-image, .card-details {
  flex: 1;
}

.card-image {
  width: 100%;
  max-width: 600px;
}

.bongoo-card {
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 100%;
  height: auto;
}

.bongoo-card:hover {
  transform: scale(1.02);
}

.details-card {
  border-radius: 15px;
  transition: box-shadow 0.3s ease;
  border: 2px solid #000;
  box-shadow: 5px 5px 0px #bd5a0d;
}

.details-card:hover {
  box-shadow: 8px 8px 0px #bd5a0d;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }

  .card-container {
    flex-direction: column;
    gap: 1rem;
  }

  .card-image {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  :deep(.text-h4) {
    font-size: 1.8rem;
  }

  :deep(.text-h5) {
    font-size: 1.4rem;
  }
}

/* Animation pour les cartes */
.details-card {
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
