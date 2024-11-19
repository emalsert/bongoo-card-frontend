<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <container-component class="cardCompo">
          <form @submit.prevent="handleSignup">
            <h3>Signup</h3>

            <div>
              <label for="firstName">First Name: </label>
              <input type="text" v-model="firstName" id="firstName" required />
            </div>

            <div>
              <label for="lastName">Last Name: </label>
              <input type="text" v-model="lastName" id="lastName" />
            </div>

            <div>
              <label for="email">Email: </label>
              <input type="email" v-model="email" id="email" required />
            </div>

            <div>
              <label for="password">Password: </label>
              <input type="password" v-model="password" id="password" required />
            </div>

            <button type="submit">Sign Up</button>
          </form>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>

          <!-- Ajout du lien vers login -->
          <div class="login-link">
            Already have an account? <router-link to="/login">Log in</router-link>
          </div>
        </container-component>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import ContainerComponent from 'components/ContainerComponent.vue';

export default {
  name: 'LoginScreen',
  components: {
    ContainerComponent,
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {

  },
};
</script>


<style scoped>
.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link a {
  color: #6573D6;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
.cardCompo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

h3 {
  text-align: center;
  color: #6573D6;
}

.full-width {
  width: 100%;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.success-message {
  color: green;
  margin-top: 10px;
  text-align: center;
}
</style>



