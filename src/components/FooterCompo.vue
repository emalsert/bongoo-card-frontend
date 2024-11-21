<template>
  <div class="footer bg-grey-2">
    <div class="footer-content q-px-md q-py-md">
      <div class="footer-links">
        <q-btn
          to="/"
          flat
          no-caps
          label="Terms and Conditions"
          class="text-weight-bold text-black"
        />
        <q-btn
          to="/"
          flat
          no-caps
          label="Legal Notice"
          class="text-weight-bold text-black"
        />
      </div>
      <div class="footer-logo">
        <q-img
          src="/images/bongoo.png"
          alt="Bongoo Logo"
          width="120px"
          height="40px"
          fit="contain"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppFooter'
})
</script>

<style scoped>
.footer {
  width: 100%;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.footer-links {
  display: flex;
  gap: 20px;
}

:deep(.q-btn) {
  font-size: 14px;
}

:deep(.q-btn:hover) {
  color: #6573D6 !important;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 20px;
  }

  .footer-links {
    gap: 10px;
  }

  :deep(.q-btn) {
    padding: 4px 8px;
  }
}
</style>
