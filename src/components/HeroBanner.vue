<template>
  <q-page class="hero-section">
    <div class="hero-banner">
      <q-img
        src="https://res.cloudinary.com/doyo6tvky/image/upload/v1732511014/qyp33hbyu7kcu2yyge6e.png"
        alt="Bongoo"
        class="bongoo q-mt-xl"
        spinner-color="primary"
        spinner-size="82px"
      />
      <q-img
        src="https://res.cloudinary.com/doyo6tvky/image/upload/v1732510901/niwzcte2vgdhlznxa25t.png"
        alt="Bongoo"
        class="bongoo hide-on-mobile q-mt-xl"
        spinner-color="primary"
        spinner-size="82px"
      />
    </div>

    <ScrollingBanner />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import ScrollingBanner from './ScrollingBanner.vue'

export default defineComponent({
  name: 'HeroBanner',
  components: {
    ScrollingBanner
  },

  setup() {
    const router = useRouter()

    const getCard = () => {
      router.push('/obtenir-carte')
    }

    return {
      getCard
    }
  }
})
</script>

<style lang="scss">
.hero-section {
  .hero-banner {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFF8EF;
    text-align: center;
    margin-bottom: 2%;
    flex-wrap: wrap;
    font-family: 'ch', sans-serif;

    .bongoo {
      max-width: 40%;
    }
  }

  @media (max-width: 768px) {
    .hide-on-mobile {
      display: none;
    }

    .hero-banner {
      .bongoo {
        margin-bottom: 5%;
        max-width: 100%;
      }
    }
  }
}

// Optional: Add Quasar specific classes for spacing and responsive behavior
.q-page {
  padding-top: env(safe-area-inset-top); // For devices with notches
  min-height: auto !important; // Override Quasar's default min-height if needed
}
</style>
