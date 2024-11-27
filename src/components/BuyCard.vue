<template>
  <div>
    <!-- Si l'utilisateur est authentifié -->
    <div v-if="isAuthenticated" class="flex justify-center items-center p-4">
      <!-- Vérifiez si 'id' est défini -->
      <q-btn
        v-if="id"
        class="my-card-btn bg-primary text-white shadow-lg transform hover:scale-105 transition-transform"
        icon="shopping_cart"
        :href="`https://t.me/bongoo_pay_bot?start=${id}`"
        target="_blank"
        padding="lg"
      >
        <div class="text-center">
          <div class="text-lg font-bold">Unlock Your Bongoo Card</div>
        </div>
      </q-btn>
      <!-- Affichez un message de chargement si 'id' n'est pas défini -->
      <div v-else class="flex justify-center items-center p-4">
        <q-spinner></q-spinner>
      </div>
    </div>

    <!-- Si l'utilisateur n'est pas authentifié -->
    <div v-else class="flex justify-center items-center p-4">
      <q-btn
        class="my-card-btn bg-primary text-white shadow-lg transform hover:scale-105 transition-transform"
        icon="shopping_cart"
        @click="openSignupDialog"
        padding="lg"
      >
        <div class="text-center">
          <div class="text-lg font-bold">Unlock Your Bongoo Card</div>
        </div>
      </q-btn>

      <!-- Popup de connexion requise -->
      <q-dialog v-model="signupDialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Inscription Requise</div>
          </q-card-section>

          <q-card-section>
            <p>
              Vous devez vous inscrire, puis aller dans le menu => <strong>Ma Carte</strong> ou revenir et cliquer sur ce bouton.
            </p>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Annuler" color="primary" v-close-popup />
            <q-btn flat label="S'inscrire" color="primary" @click="goToSignup" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';
import { getCurrentUser } from 'src/services/user';

export default {
  name: 'BuyCard',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const isAuthenticated = ref(false);
    const id = ref('');
    const signupDialog = ref(false);
    const errorMessage = ref('');

    onMounted(async () => {
      try {
        if (authStore.isAuthenticated) {
          isAuthenticated.value = true;
          const response = await getCurrentUser();
          if (response && response.id) {
            id.value = response.id;
          } else {
            errorMessage.value = 'Utilisateur non trouvé.';
          }
        } else {
          isAuthenticated.value = false;
        }
      } catch (error) {
        errorMessage.value = 'Erreur lors de la récupération des données utilisateur.';
        console.error(error);
      }
    });

    const openSignupDialog = () => {
      signupDialog.value = true;
    };

    const goToSignup = () => {
      signupDialog.value = false;
      router.push('/signup');
    };

    return {
      isAuthenticated,
      id,
      signupDialog,
      openSignupDialog,
      goToSignup,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.my-card-btn {
  background: #FCAD51;
  color: white;
  border-radius: 20px;
  padding: 5px 15px;
  margin-top: 2rem;
  font-weight: bold;
  font-family: 'Chau Philomene One', sans-serif;
  text-transform: uppercase;
  transition: transform 0.3s ease;
  font-size: 1.2rem;
}

.my-card-btn:hover {
  transform: scale(1.05);
  background: #fd9e31;
}
</style>




