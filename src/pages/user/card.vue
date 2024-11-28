
<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="bg-white text-primary">
    </q-header>

    <q-page-container>
      <q-page>
        <!-- Loader pendant le chargement -->
        <div v-if="isLoading" class="flex items-center justify-center" style="height: 100vh;">
          <q-spinner color="primary" size="3em" />
        </div>

        <!-- Contenu une fois chargé -->
        <div v-else class="grid-container">
          <div class="grid-item">
            <transition name="slide" mode="out-in">
              <div v-if="showBongooCard" key="bongoo">
                <div v-if="isSubscriptionActive">
                  <BongooCard
                    :firstName="firstName"
                    :lastName="lastName"
                    @click="toggleCard"
                  />
                </div>
                <div v-else class="flex justify-center items-center p-4">
                  <q-btn
                    class="bg-primary text-white shadow-lg transform hover:scale-105 transition-transform"
                    icon="shopping_cart"
                    :href="`https://t.me/bongoo_pay_bot?start=${id}`"
                    target="_blank"
                    padding="lg"
                  >
                    <div class="text-center">
                      <div class="text-lg font-bold">Unlock You Bongoo Card</div>
                      <div class="text-sm opacity-90">Click here to buy yours today! </div>
                    </div>
                  </q-btn>
                </div>
              </div>
              <div v-else key="qrcode">
                <div class="text-center">
                  <QRCodeGenerator @click="toggleCard" />
                </div>
              </div>
            </transition>
          </div>

          <div class="grid-item" v-if="errorMessage">
            <div class="error-message">
              {{ errorMessage }}
            </div>
          </div>

          <div class="grid-item">
            <UserPhoto />
          </div>

          <div class="grid-item">
            <PhotoUpload
              folder="profile_photos"
              uploadPreset="ml_default"
              :onUploadSuccess="handleProfilePhotoUpload"
            />
          </div>

          <div>
            <div v-for="promo in promos" :key="promo.title_promo">
              <PromoCard
                :title="promo.title_promo"
                :desc="promo.desc_promo"
                :location="promo.location"
                @promo-claimed="loadUserPromos"
              />
            </div>
          </div>

          <div class="logout-button">
            <q-btn
              color="negative"
              label="Log Out"
              @click="handleLogout"
              :loading="loading"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
    </q-footer>
  </q-layout>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';
import PhotoUpload from 'components/PhotoUpload.vue';
import UserPhoto from 'components/UserPhoto.vue';
import BongooCard from 'components/BongooCard.vue';
import { getCurrentUser, uploadProfilePhoto } from 'src/services/user';
import { fetchUserPromos } from 'src/services/promos';

import QRCodeGenerator from "components/qrcode.vue";
import PromoCard from 'components/PromoCard.vue';

export default {
  name: 'UserProfile',
  components: {
    QRCodeGenerator,
    UserPhoto,
    PhotoUpload,
    BongooCard,
    PromoCard
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const promos = ref([]);

    const isLoading = ref(true);
    const loading = ref(false);
    const errorMessage = ref('');
    const firstName = ref('');
    const lastName = ref('');
    const id = ref('');
    const subscriptionExpirationDate = ref('');
    const showSubscriptionDialog = ref(false);
    const showBongooCard = ref(true);

    const toggleCard = () => {
      showBongooCard.value = !showBongooCard.value;
    };

    const handleLogout = async () => {
      loading.value = true;
      errorMessage.value = '';
      try {
        await authStore.logout();
        router.push('/login');
      } catch (error) {
        errorMessage.value = error.response?.data?.message || 'Error during logout.';
      } finally {
        loading.value = false;
      }
    };

    const handleProfilePhotoUpload = async (cloudinaryResponse) => {
      try {
        await uploadProfilePhoto({
          photo: cloudinaryResponse.public_id
        });
      } catch (error) {
        // Handle error if necessary
      }
    };

    const loadUserPromos = async () => {
      try {
        promos.value = await fetchUserPromos();
      } catch (error) {
        console.error('Error fetching user promos:', error);
        errorMessage.value = 'Error fetching user promos.';
      }
    };

    onMounted(async () => {
      try {
        const response = await getCurrentUser();
        if (response) {
          firstName.value = response.first_name;
          lastName.value = response.last_name;
          id.value = response.id;
          subscriptionExpirationDate.value = response.subscription_expiration_date;

          await loadUserPromos();

          if (!isSubscriptionActive.value) {
            showSubscriptionDialog.value = true;
          }
        } else {
          errorMessage.value = 'User not found.';
        }
      } catch (error) {
        errorMessage.value = 'Error retrieving user.';
      } finally {
        isLoading.value = false;
      }
    });

    const isSubscriptionActive = computed(() => {
      if (!subscriptionExpirationDate.value) return false;
      const today = new Date();
      const expirationDate = new Date(subscriptionExpirationDate.value);
      return expirationDate >= today;
    });

    return {
      handleLogout,
      loading,
      isLoading,
      errorMessage,
      firstName,
      lastName,
      id,
      handleProfilePhotoUpload,
      showSubscriptionDialog,
      isSubscriptionActive,
      showBongooCard,
      toggleCard,
      promos,
      loadUserPromos
    };
  }
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr 1fr;
  }
}

.grid-item {
}

.logout-button {
  width: 50%;
  height: 50px;
  display: flex;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
}

.error-message {
  color: red;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>




