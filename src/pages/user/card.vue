
<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="bg-white text-primary">
      <!-- Header content -->
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center">
        <div class="text-center">
          <h2>Bongoo Card</h2>
          <p>Nom : {{ firstName }} {{ lastName }}</p>
        </div>

        <q-btn
          color="negative"
          label="Log Out"
          @click="handleLogout"
          :loading="loading"
          class="logout-button"
        />

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <PhotoUpload
          folder="profile_photos"
          uploadPreset="ml_default"
          :onUploadSuccess="handleProfilePhotoUpload"
        />
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
      <!-- Footer content -->
    </q-footer>
  </q-layout>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useRoute, useRouter } from 'vue-router';
import PhotoUpload from 'components/PhotoUpload.vue';
import UserPhoto from 'components/UserPhoto.vue';
import BongooCard from 'components/BongooCard.vue';
import { getCurrentUser, uploadProfilePhoto } from 'src/services/user';

export default {
  name: 'UserProfile',
  components: {
    UserPhoto,
    PhotoUpload,
    BongooCard
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const loading = ref(false);
    const errorMessage = ref('');
    const firstName = ref('');
    const lastName = ref('');
    const subscriptionExpirationDate = ref('');
    const showSubscriptionDialog = ref(false);

    const isSubscriptionActive = computed(() => {
      if (!subscriptionExpirationDate.value) return false;
      const today = new Date();
      const expirationDate = new Date(subscriptionExpirationDate.value);
      return expirationDate >= today;
    });

    console.log('isSubscriptionActive:', isSubscriptionActive.value);

    const handleLogout = async () => {
      loading.value = true;
      errorMessage.value = '';
      try {
        await authStore.logout();
        router.push('/login');
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        errorMessage.value = error.response?.data?.message || 'Erreur lors de la déconnexion.';
      } finally {
        loading.value = false;
      }
    };

    const handleProfilePhotoUpload = async (cloudinaryResponse) => {
      try {
        const response = await uploadProfilePhoto({
          photo: cloudinaryResponse.public_id
        });
        if (response.success) {
          // Mettre à jour l'URL de la photo de profil si nécessaire
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la photo de profil:', error);
      }
    };

    onMounted(async () => {
      try {
        const response = await getCurrentUser();
        console.log('response:', response);
        if (response) {
          firstName.value = response.first_name;
          lastName.value = response.last_name;
          subscriptionExpirationDate.value = response.subscription_expiration_date;

          if (!isSubscriptionActive.value) {
            showSubscriptionDialog.value = true;
          }
        } else {
          errorMessage.value = 'Utilisateur non trouvé.';
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        errorMessage.value = 'Erreur lors de la récupération de l\'utilisateur.';
      }
    });

    return {
      handleLogout,
      loading,
      errorMessage,
      firstName,
      lastName,
      handleProfilePhotoUpload,
      showSubscriptionDialog,
      isSubscriptionActive
    };
  }
};
</script>

<style scoped>
.logout-button {
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.bongoo-card {
  margin-top: 20px;
}
</style>

