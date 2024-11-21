<template>
  <q-page class="faq-page">
    <div class="content-wrapper">
      <div class="header-section">
        <q-img
          src="/images/header/header2.png"
          alt="Bongoo"
          class="bongoo-logo"
          :ratio="1"
        />
      </div>

      <div class="faq-section">
        <FAQItem
          v-for="(faq, index) in faqs"
          :key="index"
          :question="faq.question"
          :answer="faq.answer"
          class="q-mb-md"
        />
      </div>
    </div>
    <AppFooter />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import FAQItem from '../components/FAQItem.vue'
import AppFooter from 'components/FooterCompo.vue'

export default defineComponent({
  name: 'FAQPage',
  components: {
    FAQItem,
    AppFooter
  },
  data() {
    return {
      faqs: [
        {
          question: 'What is the Bongoo card?',
          answer: 'The Bongoo card is an advantage card for everyone, student or not. It gives you unlimited access to discounts and exclusive promotional offers.'
        },
        {
          question: 'How much does the Bongoo card cost?',
          answer: 'The Bongoo card costs €9.90 for the year. Once you have it, you can use it as many times as you like. The best part? It pays for itself with just one offer!'
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
          answer: 'To use your card, simply present it to our partners when you order. They will apply the discount or offer directly to your bill.'
        },
        {
          question: 'RIGHT NEAR YOU!',
          answer: 'All offers are easily accessible in Phnom Penh. You can find them in the app or on our website.'
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
  margin: 7% auto 40px;
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

@media (max-width: 768px) {
  .content-wrapper {
    padding: 10px;
  }

  .header-section {
    margin: 25% auto 30px;
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
