<template>
  <q-layout view="lHh lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="login-card">
          <q-card-section>
            <h3 class="text-h5 text-primary text-center q-mb-md">Login</h3>

            <q-form @submit="handleLogin" class="q-gutter-md">
              <q-input
                v-model="email"
                label="Email"
                type="email"
                :rules="[
                 val => !!val || 'Email is required',
                 val => /.+@.+\..+/.test(val) || 'Please enter a valid email'
               ]"
                outlined
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>

              <q-input
                v-model="password"
                label="Password"
                :type="isPwd ? 'password' : 'text'"
                :rules="[val => !!val || 'Password is required']"
                outlined
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <div class="full-width q-mt-md">
                <q-btn
                  label="Log In"
                  type="submit"
                  color="primary"
                  class="full-width"
                  :loading="loading"
                />
              </div>
            </q-form>

            <q-banner v-if="errorMessage" class="bg-negative text-white q-mt-md">
              {{ errorMessage }}
            </q-banner>

            <div class="text-center q-mt-md">
              Don't have an account?
              <q-btn
                flat
                color="primary"
                label="Sign up"
                to="/signup"
                no-caps
              />
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'

export default {
  name: 'LoginScreen',

  setup() {
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const loading = ref(false)
    const isPwd = ref(true)
    const authStore = useAuthStore()

    const handleLogin = async () => {
      errorMessage.value = ''
      loading.value = true
      try {
        await authStore.login({ email: email.value, password: password.value })
        const redirectPath = authStore.$state.redirectPath || '/home'
        window.location.href = redirectPath
      } catch (error) {
        errorMessage.value = error.response?.data?.message || 'Login failed.'
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      errorMessage,
      handleLogin,
      loading,
      isPwd
    }
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

@media (max-width: 480px) {
  .login-card {
    width: 90%;
    margin: 20px;
  }
}
</style>


