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
          <BuyCard/>
        </div>



        <div class="card-details">
          <q-card class="details-card">
            <q-card-section>
              <h1 class="text-primary text-h4 q-mb-sm">Bongoo Cambodia – 2024 Edition</h1>
              <div class="text-negative text-bold q-mb-md text-h6">
                Available Now - Stock: 159/350
              </div>

              <div class="offers-section">

                <h2 class="text-accent text-h5 q-mb-sm">30+ EXCLUSIVE DEALS</h2>
                <p class="q-mb-lg">
                  Enjoy discounts and perks at the best venues in Cambodia. Your
                  <span class="text-weight-bold">Bongoo card pays for itself instantly</span> with just a few visits!
                </p>

                <h2 class="text-accent text-h5 q-mb-sm">AMAZING PARTNERS</h2>
                <p class="q-mb-lg">
                  Backstreet Bar, La Plantation, Anantara, Seekers Spirits, and more. From
                  <span class="text-weight-bold">cozy local gems to premium spots</span>, there's something for everyone.
                </p>

                <h2 class="text-accent text-h5 q-mb-sm">ANYWHERE IN CAMBODIA</h2>
                <p class="q-mb-lg">
                  Whether you're in <span class="text-weight-bold">Phnom Penh, Siem Reap, or Kampot</span>,
                  Bongoo connects you to the best deals all over the country. New partners added regularly!
                </p>

                <h2 class="text-accent text-h5 q-mb-sm">GET YOUR BONGOO CARD NOW</h2>
                <p class="q-mb-none">
                  <span class="text-weight-bold">Experience smarter outings while saving</span>.
                  Don't miss out – join the Bongoo community today!
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
import BuyCard from "components/BuyCard.vue";

export default defineComponent({
  name: 'GetCardPage',
  components: {
    BuyCard,
    ScrollingBanner,
    AppFooter
  }
})
</script>

<style scoped>
.get-card-page {
  background-color: #f8f8f8;
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

:deep(.text-h4) {
  font-family: 'Chau Philomene One', sans-serif;
  color: #6573d6;
}

:deep(.text-h5) {
  font-family: 'Chau Philomene One', sans-serif;
  color: #fdae51;
}

:deep(.text-h6) {
  font-family: 'Chau Philomene One', sans-serif;
}

p {
  line-height: 1.2;
  font-size: 1.1rem;
  color: #333;
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
