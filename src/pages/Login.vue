<template>
  <q-layout view="lHh lpr lFf">
    <q-page-container>
      <q-page>
        <div class="login-container">
          <ContainerComponent class="cardCompo">
            <form @submit.prevent="handleLogin">
              <h3>Login</h3>
              <div>
                <label for="email">Email: </label>
                <input type="email" v-model="email" id="email" required />
              </div>

              <div>
                <label for="password">Password: </label>
                <input type="password" v-model="password" id="password" required />
              </div>

              <!-- Remplacement du bouton HTML standard par q-btn -->
              <q-btn
                label="Log In"
                @click="handleLogin"
                :loading="loading"
                class="primary"
              />
            </form>
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
            <div class="signup-link">
              Don't have an account? <router-link to="/signup">Sign up</router-link>
            </div>
          </ContainerComponent>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import ContainerComponent from 'components/ContainerComponent.vue'

export default {
  name: 'LoginScreen',

  components: {
    ContainerComponent
  },

  setup() {
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const authStore = useAuthStore()
    const loading = ref(false)

    const handleLogin = async () => {
      errorMessage.value = ''
      loading.value = true
      try {
        await authStore.login({ email: email.value, password: password.value })
        // Récupérer le paramètre redirect
        const redirectPath = authStore.$state.redirectPath || '/home'
        // Redirection après succès de la connexion
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
      loading
    }
  }
}
</script>

<style scoped>
.signup-link {
  text-align: center;
  margin-top: 20px;
}

.signup-link a {
  color: #6573D6;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}

.cardCompo {
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: box-shadow 0.3s ease;
  height: auto;
  width: 400px;
  margin: 0 auto;
  margin-top: 10%;
  margin-bottom: 50px;
  padding: 20px;
  border-radius: 15px;
  box-sizing: border-box;
  justify-content: center;
  background-color: #fff;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

h3 {
  color: #6573D6;
  text-align: center;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: #6573D6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4959B8;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}

@media (max-width: 768px) {
  .cardCompo {
    width: 90%;
    margin-top: 30%;
    padding: 15px;
  }

  h3 {
    font-size: 18px;
  }

  input {
    font-size: 14px;
  }

  button {
    font-size: 14px;
  }
}
</style>


