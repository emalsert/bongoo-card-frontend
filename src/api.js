// src/plugins/axios.js

import axios from 'axios'
import { useAuthStore } from 'stores/auth'

// Créez une instance d'Axios
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8004/api', // Récupère l'URL de l'API depuis les variables d'environnement
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Envoie les cookies avec les requêtes (utile pour CSRF)
})

// Intercepteur pour inclure le Bearer Token et le CSRF Token
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.token || localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Optionnel : Intercepteur pour gérer les réponses globalement
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore()
      //authStore.logout()
      //window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
