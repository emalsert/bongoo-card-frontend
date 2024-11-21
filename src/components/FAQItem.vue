<template>
  <q-card class="faq-card q-mb-md">
    <q-expansion-item
      expand-icon-toggle
      :label="question"
      header-class="faq-header"
    >
      <q-card-section class="faq-answer">
        <p>{{ answer }}</p>
      </q-card-section>
    </q-expansion-item>
  </q-card>
</template>

<script>
export default {
  name: 'FaqItem',
  props: {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.faq-card {
  background-color: white;
  border: 2px solid #000;
  border-radius: 18px;
  position: relative;
  box-shadow: 5px 5px 0px #bd5a0d;
  width: 80%;
  margin: 0 auto;
}

.faq-header {
  font-size: 1.5rem;
  padding: 15px;
}

.faq-answer {
  padding: 0 15px 15px 15px;
  color: #333;
}

:deep(.q-expansion-item__content) {
  background-color: rgba(0, 0, 0, 0.02);
}

:deep(.q-item) {
  padding: 0;
}

:deep(.q-item__section--side) {
  padding-right: 15px;
}

@media (max-width: 768px) {
  .faq-card {
    width: 90%;
  }

  .faq-header {
    font-size: 1.2rem;
  }
}
</style>
