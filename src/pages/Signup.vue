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
                :error="fieldErrors.first_name !== undefined"
                :error-message="fieldErrors.first_name && fieldErrors.first_name[0]"
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
                :error="fieldErrors.last_name !== undefined"
                :error-message="fieldErrors.last_name && fieldErrors.last_name[0]"
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
                :error="fieldErrors.email !== undefined"
                :error-message="fieldErrors.email && fieldErrors.email[0]"
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
                :error="fieldErrors.password !== undefined"
                :error-message="fieldErrors.password && fieldErrors.password[0]"
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

              <!-- Champ de Confirmation du Mot de Passe -->
              <q-input
                v-model="passwordConfirmation"
                label="Confirm Password"
                :type="isPwd ? 'password' : 'text'"
                :rules="[
                  val => !!val || 'Please confirm your password',
                  val => val === password || 'Passwords do not match'
                ]"
                :error="fieldErrors.password_confirmation !== undefined"
                :error-message="fieldErrors.password_confirmation && fieldErrors.password_confirmation[0]"
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
import { useAuthStore } from 'src/stores/auth';

export default {
  name: 'SignupPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '', // Nouveau champ pour la confirmation du mot de passe
      isPwd: true,
      loading: false,
      errorMessage: '',
      successMessage: '',
      fieldErrors: {}, // Pour stocker les erreurs spécifiques aux champs
    };
  },
  methods: {
    async handleSignup() {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';
      this.fieldErrors = {};

      // Préparer les données pour l'inscription
      const payload = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation, // Ajouter la confirmation du mot de passe
      };

      try {
        // Appeler la méthode signup du store
        const authStore = useAuthStore();
        const result = await authStore.signup(payload);

        if (result.success) {
          this.successMessage = result.message;
          // Rediriger après un court délai
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        } else {
          this.errorMessage = result.message;
          // Stocker les erreurs spécifiques aux champs
          this.fieldErrors = result.errors;
        }
      } catch (error) {
        this.errorMessage = 'An unexpected error occurred.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
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





