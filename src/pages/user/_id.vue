<template>
  <q-layout view="lHh lpr lFf">
      <q-page class="content-container">
        <div class="content-wrapper">
          <div v-if="errorMessage" class="error-message q-mb-md">
            {{ errorMessage }}
          </div>

          <div class="card-section q-mb-lg">
            <UserPhotoId :id="7" />
          </div>

          <div class="card-section">
            <div v-if="isSubscriptionActive">
              <BongooCard
                :firstName="firstName"
                :lastName="lastName"
              />
            </div>
            <div v-else>
              <q-banner class="bg-red text-white">
                You need to pay subscription to unlock the Bongoo card.
              </q-banner>
            </div>
          </div>
        </div>
      </q-page>
  </q-layout>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useRoute, useRouter } from 'vue-router';
import UserPhotoId from 'components/UserPhotoId.vue';
import BongooCard from 'components/BongooCard.vue';
import { getUserDetails } from 'src/services/user';

export default {
  name: 'UserProfile',
  components: {
    UserPhotoId,
    BongooCard,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const userId = ref(null);
    const loading = ref(false);
    const errorMessage = ref('');
    const firstName = ref('');
    const lastName = ref('');
    const subscriptionExpirationDate = ref('');

    onMounted(async () => {
      userId.value = route.params.id;
      try {
        const response = await getUserDetails(userId.value);
        if (response.success && response.user) {
          console.log('User details:', response);
          firstName.value = response.user.first_name;
          lastName.value = response.user.last_name;
          subscriptionExpirationDate.value = response.user.subscription_expiration_date;
        } else {
          errorMessage.value = 'Utilisateur non trouvé.';
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        errorMessage.value = 'Erreur lors de la récupération de l\'utilisateur.';
      }
    });

    const isSubscriptionActive = computed(() => {
      if (!subscriptionExpirationDate.value) return false;
      const today = new Date();
      const expirationDate = new Date(subscriptionExpirationDate.value);
      return expirationDate >= today;
    });

    return {
      userId,
      loading,
      errorMessage,
      firstName,
      lastName,
      subscriptionExpirationDate,
      isSubscriptionActive,
    };
  },
};
</script>

<style scoped>
.content-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.content-wrapper {
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.error-message {
  color: red;
  text-align: center;
  padding: 10px;
  width: 100%;
}

h2 {
  color: #512da8;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .content-wrapper {
    margin-top: 40px;
    padding: 0 20px;
  }
}
</style>




