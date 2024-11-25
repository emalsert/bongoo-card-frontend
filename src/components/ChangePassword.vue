<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="change-password-card">
          <q-card-section>
            <div class="text-h6">Change Password</div>
          </q-card-section>

          <q-form @submit.prevent="handleChangePassword">
            <q-card-section>
              <q-input
                filled
                v-model="currentPassword"
                label="Current Password"
                type="password"
                :rules="[val => !!val || 'This field is required']"
                class="q-mb-md"
              />
              <q-input
                filled
                v-model="newPassword"
                label="New Password"
                type="password"
                :rules="[
                  val => !!val || 'This field is required',
                  val => val.length >= 8 || 'Minimum 8 characters'
                ]"
                class="q-mb-md"
              />
              <q-input
                filled
                v-model="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                :rules="[
                  val => !!val || 'This field is required',
                  val => val === newPassword || 'Passwords do not match'
                ]"
              />
            </q-card-section>

            <q-card-actions align="right" class="q-pa-md">
              <q-btn
                flat
                label="Cancel"
                color="primary"
                @click="handleCancel"
              />
              <q-btn
                flat
                label="Save"
                type="submit"
                color="primary"
                :loading="loading"
              />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default {
  name: 'ChangePassword',
  setup() {
    const router = useRouter();
    const $q = useQuasar();

    const currentPassword = ref('');
    const newPassword = ref('');
    const confirmNewPassword = ref('');
    const loading = ref(false);

    const resetForm = () => {
      currentPassword.value = '';
      newPassword.value = '';
      confirmNewPassword.value = '';
    };

    const handleCancel = () => {
      resetForm();
      router.push('/home');
    };

    const handleChangePassword = async () => {
      loading.value = true;
      try {
        const response = await updatePassword({
          current_password: currentPassword.value,
          new_password: newPassword.value,
          new_password_confirmation: confirmNewPassword.value,
        });

        if (response.success) {
          $q.notify({
            type: 'positive',
            message: response.message || 'Password updated successfully'
          });
          resetForm();
          router.push('/home');
        } else {
          throw new Error(response.message || 'Failed to update password');
        }
      } catch (error) {
        console.error('Error updating password:', error);
        $q.notify({
          type: 'negative',
          message: error.message || 'An error occurred while updating the password'
        });
      } finally {
        loading.value = false;
      }
    };

    return {
      currentPassword,
      newPassword,
      confirmNewPassword,
      loading,
      resetForm,
      handleCancel,
      handleChangePassword,
    };
  },
};
</script>

<style scoped>
.change-password-card {
  width: 100%;
  max-width: 500px;
  padding: 20px;
  margin-top: 5%;
}

@media (max-width: 600px) {
  .change-password-card {
    max-width: 90%;
  }
}
</style>
