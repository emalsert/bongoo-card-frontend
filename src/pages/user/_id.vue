<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="bg-white text-primary">
      <!-- Header Content -->
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center">
        <div class="text-center">
          <h2>Bongoo Card</h2>
          <p>Nom : {{ firstName }} {{ lastName }}</p>
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <UserPhoto />

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
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <!-- Footer Content -->
    </q-footer>
  </q-layout>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useRoute, useRouter } from 'vue-router';
import UserPhoto from 'components/UserPhoto.vue';
import BongooCard from 'components/BongooCard.vue';
import { getUserDetails } from 'src/services/user';

export default {
  name: 'UserProfile',
  components: {
    UserPhoto,
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
.main {
  margin-top: 7%;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .main {
    margin-top: 25%;
  }
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>




