<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <q-btn
          flat
          no-caps
          to="/"
          label="Terms and Conditions"
          class="text-black text-weight-bold"
        />
        <q-btn
          flat
          no-caps
          to="/"
          label="Legal Notice"
          class="text-black text-weight-bold"
        />
      </div>
      <div class="footer-logo">
        <q-img
          src="/images/bongoo.png"
          alt="Bongoo Logo"
          height="40px"
          width="auto"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterCompo",
};

</script>

<style lang="scss" scoped>
.footer {
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  width: 100%;

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;

    .footer-links {
      display: flex;
      gap: 20px;

      .q-btn {
        font-size: 1rem;

        &:hover {
          color: #6573d6 !important;
        }
      }
    }

    .footer-logo {
      height: 40px;
    }
  }
}

// Mobile responsive
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
