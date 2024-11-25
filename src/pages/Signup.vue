<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="signup-card">
          <q-card-section>
            <h3 class="text-h5 text-primary text-center q-mb-md">Sign Up</h3>

            <q-form @submit="handleSignup" class="q-gutter-md">
              <q-input
                v-model="firstName"
                label="First Name"
                :rules="[val => !!val || 'First name is required']"
                outlined
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                v-model="lastName"
                label="Last Name"
                outlined
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="person_outline" />
                </template>
              </q-input>

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
                :rules="[
                  val => !!val || 'Password is required',
                  val => val.length >= 6 || 'Password must be at least 6 characters'
                ]"
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
                  label="Sign Up"
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

            <q-banner v-if="successMessage" class="bg-positive text-white q-mt-md">
              {{ successMessage }}
            </q-banner>

            <div class="text-center q-mt-md">
              Already have an account?
              <q-btn
                flat
                color="primary"
                label="Log in"
                to="/login"
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
export default {
  name: 'SignupPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isPwd: true,
      loading: false,
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    async handleSignup() {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        // Votre logique de signup ici
        this.loading = false;
        this.successMessage = 'Account created successfully!';
      } catch (error) {
        this.loading = false;
        this.errorMessage = error.message || 'An error occurred during signup';
      }
    }
  }
}
</script>

<style scoped>
.signup-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

@media (max-width: 480px) {
  .signup-card {
    width: 90%;
    margin: 20px;
  }
}
</style>



