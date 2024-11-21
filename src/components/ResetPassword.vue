<!-- src/components/ResetPassword.vue -->

<template>
  <q-page class="reset-password-page">
    <q-card class="reset-password-card">
      <q-card-section>
        <div class="text-h6">Réinitialiser le Mot de Passe</div>
      </q-card-section>

      <q-form @submit.prevent="handleResetPassword">
        <q-card-section>
          <q-input
            filled
            v-model="email"
            label="Adresse e-mail"
            type="email"
            :rules="[val => !!val || 'Ce champ est requis', val => /.+@.+\..+/.test(val) || 'Adresse e-mail invalide']"
            disabled
          />
          <q-input
            filled
            v-model="password"
            label="Nouveau mot de passe"
            type="password"
            :rules="[val => !!val || 'Ce champ est requis', val => val.length >= 8 || 'Au moins 8 caractères']"
          />
          <q-input
            filled
            v-model="passwordConfirmation"
            label="Confirmer le nouveau mot de passe"
            type="password"
            :rules="[val => !!val || 'Ce champ est requis', val => val === password || 'Les mots de passe ne correspondent pas']"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" @click="resetForm" />
          <q-btn flat label="Réinitialiser" type="submit" color="primary" :loading="loading" />
        </q-card-actions>
      </q-form>

      <q-dialog v-model="alert.show">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ alert.title }}</div>
          </q-card-section>
          <q-card-section>{{ alert.message }}</q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup @click="redirectToLogin" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import { resetPassword } from '../services/user';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'ResetPassword',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const passwordConfirmation = ref('');
    const token = ref('');

    const loading = ref(false);

    const alert = ref({
      show: false,
      title: '',
      message: '',
    });

    const resetForm = () => {
      password.value = '';
      passwordConfirmation.value = '';
    };

    const redirectToLogin = () => {
      router.push('/login');
    };

    const handleResetPassword = async () => {
      loading.value = true;
      try {
        const response = await resetPassword({
          email: email.value,
          password: password.value,
          password_confirmation: passwordConfirmation.value,
          token: token.value,
        });

        if (response.success) {
          alert.value = {
            show: true,
            title: 'Succès',
            message: 'Votre mot de passe a été réinitialisé avec succès.',
          };
          resetForm();
        } else {
          alert.value = {
            show: true,
            title: 'Erreur',
            message: response.message || 'Une erreur est survenue.',
          };
        }
      } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe:', error);
        alert.value = {
          show: true,
          title: 'Erreur',
          message: error.response?.data?.message || 'Une erreur est survenue.',
        };
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      token.value = route.query.token || '';
      email.value = route.query.email || '';
    });

    return {
      email,
      password,
      passwordConfirmation,
      loading,
      alert,
      resetForm,
      handleResetPassword,
      redirectToLogin,
    };
  },
};
</script>

<style scoped>
.reset-password-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.reset-password-card {
  max-width: 500px;
  width: 100%;
}
</style>

