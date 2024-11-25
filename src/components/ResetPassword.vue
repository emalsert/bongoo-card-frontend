<!-- src/components/ResetPassword.vue -->

<template>
  <q-page class="reset-password-page">
    <q-card class="reset-password-card">
      <q-card-section>
        <div class="text-h6">Reset Password</div>
      </q-card-section>

      <q-form @submit.prevent="handleResetPassword">
        <q-card-section>
          <q-input
            filled
            v-model="email"
            label="Email address"
            type="email"
            :rules="[val => !!val || 'This field is required', val => /.+@.+\..+/.test(val) || 'Invalid email address']"
            disabled
          />
          <q-input
            filled
            v-model="password"
            label="New password"
            type="password"
            :rules="[val => !!val || 'This field is required', val => val.length >= 8 || 'At least 8 characters']"
          />
          <q-input
            filled
            v-model="passwordConfirmation"
            label="Confirm new password"
            type="password"
            :rules="[val => !!val || 'This field is required', val => val === password || 'Passwords do not match']"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="resetForm" />
          <q-btn flat label="Reset" type="submit" color="primary" :loading="loading" />
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
            title: 'Success',
            message: 'Your password has been successfully reset.',
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
        console.error('Error while resetting password:', error);
        alert.value = {
          show: true,
          title: 'Error',
          message: error.response?.data?.message || 'An error occurred.',
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
  margin-top: 5%;
}

.reset-password-card {
  max-width: 500px;
  width: 100%;
}
</style>

