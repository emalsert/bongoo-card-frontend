<template>
  <q-page class="forgot-password-page">
    <q-card class="forgot-password-card">
      <q-card-section>
        <div class="text-h6">Reset Password</div>
      </q-card-section>

      <q-form @submit.prevent="handleForgotPassword">
        <q-card-section>
          <q-input
            filled
            v-model="email"
            label="Email address"
            type="email"
            :rules="[val => !!val || 'This field is required', val => /.+@.+\..+/.test(val) || 'Invalid email address']"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="resetForm" />
          <q-btn flat label="Send" type="submit" color="primary" :loading="loading" />
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
            title: 'Success',
            message: 'A reset email has been sent.',
          };
          resetForm();
        } else {
          alert.value = {
            show: true,
            title: 'Error',
            message: response.message || 'An error occurred.',
          };
        }
      } catch (error) {
        console.error('Error during reset request:', error);
        alert.value = {
          show: true,
          title: 'Error',
          message: error.response?.data?.message || 'An error occurred.',
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
  margin-top: 5%;
}

.forgot-password-card {
  max-width: 500px;
  width: 100%;
}
</style>
