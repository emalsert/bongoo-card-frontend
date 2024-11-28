<!-- src/components/PromoCard.vue -->
<template>
  <div class="promo-card">
    <div @click="openPromoModal">
      <h3>{{ title }}</h3>
      <p>{{ desc }}</p>
      <p><strong>Location:</strong> {{ location }}</p>
    </div>

    <!-- Confirmation Modal -->
    <q-dialog v-model="isPromoModalOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Claim</div>
        </q-card-section>
        <q-card-section>
          <p>
            This offer is unique and can only be claimed once. Do you want to claim it now?
          </p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Claim" color="primary" @click="claimPromo" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Success Modal -->
    <q-dialog v-model="isSuccessModalOpen">
      <q-card>
        <q-card-section class="text-center">
          <q-icon name="check_circle" color="green" size="64px" />
          <div class="text-h5">{{ title }}</div>
          <p>You have successfully claimed this offer!</p>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { removePromoFromCurrentUser } from 'src/services/promos'

export default {
  name: 'PromoCard',
  props: {
    title: String,
    desc: String,
    location: String,
  },
  data() {
    return {
      isPromoModalOpen: false,
      isSuccessModalOpen: false,
    }
  },
  methods: {
    openPromoModal() {
      this.isPromoModalOpen = true
    },
    async claimPromo() {
      this.isPromoModalOpen = false

      try {
        // API call to remove the promo from the current user
        await removePromoFromCurrentUser(this.title)

        // Open the success modal
        this.isSuccessModalOpen = true

        // Emit an event to refresh the list in the parent component
        this.$emit('promo-claimed', this.title)
      } catch (error) {
        console.error('Error claiming the promo:', error)
        // Handle errors (e.g., show a notification)
      }
    },
  },
}
</script>

<style scoped>
.promo-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  cursor: pointer;
}
</style>
