<template>
  <q-page class="faq-page">
    <div class="content-wrapper">
      <div class="header-section">
        <q-img
          src="https://res.cloudinary.com/doyo6tvky/image/upload/v1732510901/niwzcte2vgdhlznxa25t.png"
          alt="Bongoo"
          class="bongoo-logo"
          :ratio="1"
        />
      </div>

      <div class="faq-section">
        <q-expansion-item
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item q-mb-md"
          :label="faq.question"
          header-class="faq-header"
          expand-icon-class="faq-icon"
        >
          <q-card class="faq-answer">
            <q-card-section>
              {{ faq.answer }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>
    <AppFooter />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import AppFooter from 'components/FooterCompo.vue'

export default defineComponent({
  name: 'FAQPage',
  components: {
    AppFooter
  },
  data() {
    return {
      faqs: [
        {
          question: 'What is the Bongoo card?',
          answer: 'The Bongoo card is designed for all under 30s (expats, foreigners, locals) to enjoy benefits, discounts, and offers at our partner establishments across Cambodia.'
        },
        {
          question: 'How much does the Bongoo card cost?',
          answer: 'Here are the pricing options for the Bongoo card 1 month: $3.9, 3 months: $10.4, 6 months: $19.49, 1 year: $35.99. Once you have it, you can use it as many times as you like. The best part? It pays for itself with just one offer!'
        },
        {
          question: 'What are the offers?',
          answer: 'Your card gives you access permanent offers, Available all year and usable as many times as you want (e.g., 24/7 happy hours at bars, 50% off your bill, etc.). You also have access to exclusive offers, which are limited in time and quantity (e.g., 2 for 1, free drink, etc.).'
        },
        {
          question: 'How do I get my card?',
          answer: 'You just have to visit our "Get It!" page.'
        },
        {
          question: 'How do I use my card?',
          answer: 'To use your Bongoo card, simply log in to your member account on the Bongoo platform (via the web app or mobile app once available). The card is fully digital, so there is no physical card to carry. When you\'re at one of our partner establishments, just show the QR code in your member area to the vendor. They will scan it, and the discount or offer will be applied directly to your bill. It\'s quick, easy, and paper-free!'
        },
        {
          question: 'RIGHT NEAR YOU!',
          answer: 'All offers are easily accessible throughout Cambodia. You can find them in the app or on our website, including in Phnom Penh and other cities across the country.'
        }
      ]
    }
  }
})
</script>

<style scoped>
.faq-page {
  min-height: 100vh;
  background-color: #FFF8EF;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1% auto 40px;
  width: 100%;
}

.bongoo-logo {
  width: 25%;
  max-width: 300px;
  transition: all 0.3s ease;
}

.faq-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
}

.faq-item {
  border: 2px solid #000;
  border-radius: 15px;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  box-shadow: 5px 5px 0px #bd5a0d;
  background-color: white;
}

.faq-item:hover {
  box-shadow: 8px 8px 0px #bd5a0d;
  transform: translate(-2px, -2px);
}

:deep(.faq-header) {
  padding: 20px 24px;
  font-family: 'Chau Philomene One', sans-serif;
  font-size: 1.2rem;
  color: #6573d6;
}

:deep(.faq-icon) {
  color: #6573d6;
}

:deep(.q-expansion-item__content) {
  background-color: white;
}

.faq-answer {
  padding: 0;
  box-shadow: none;
  background-color: white;
}

:deep(.q-card__section) {
  padding: 0 24px 20px;
  color: #333;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 10px;
  }

  .header-section {
  }

  .bongoo-logo {
    width: 80%;
    max-width: 250px;
  }

  .faq-section {
    padding: 0 10px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .bongoo-logo {
    width: 35%;
  }
}
</style>
