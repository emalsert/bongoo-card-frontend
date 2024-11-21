<template>
  <q-page class="forgot-password-page">
    <q-card class="forgot-password-card">
      <q-card-section>
        <div class="text-h6">Réinitialiser le Mot de Passe</div>
      </q-card-section>

      <q-form @submit.prevent="handleForgotPassword">
        <q-card-section>
          <q-input
            filled
            v-model="email"
            label="Adresse e-mail"
            type="email"
            :rules="[val => !!val || 'Ce champ est requis', val => /.+@.+\..+/.test(val) || 'Adresse e-mail invalide']"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" @click="resetForm" />
          <q-btn flat label="Envoyer" type="submit" color="primary" :loading="loading" />
        </q-card-actions>
      </q-form>

      <q-dialog v-model="alert.show">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ alert.title }}</div>
          </q-card-section>
          <q-card-section>{{ alert.message }}</q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { sendResetPasswordEmail } from '../services/user';

export default {
  name: 'ForgotPassword',
  setup() {
    const email = ref('');
    const loading = ref(false);

    const alert = ref({
      show: false,
      title: '',
      message: '',
    });

    const resetForm = () => {
      email.value = '';
    };

    const handleForgotPassword = async () => {
      loading.value = true;
      try {
        const response = await sendResetPasswordEmail({ email: email.value });

        if (response.success) {
          alert.value = {
            show: true,
            title: 'Succès',
            message: 'Un e-mail de réinitialisation a été envoyé.',
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
        console.error('Erreur lors de la demande de réinitialisation:', error);
        alert.value = {
          show: true,
          title: 'Erreur',
          message: error.response?.data?.message || 'Une erreur est survenue.',
        };
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      loading,
      alert,
      resetForm,
      handleForgotPassword,
    };
  },
};
</script>

<style scoped>
.forgot-password-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.forgot-password-card {
  max-width: 500px;
  width: 100%;
}
</style>
