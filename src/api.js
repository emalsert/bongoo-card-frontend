// src/plugins/axios.js

import axios from 'axios'
import { useAuthStore } from 'stores/auth'
import {useLoadingStore} from "stores/loadingStores";


const apiClient = axios.create({
  baseURL: 'https://bongoo-card-backend-9fda547544f0.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (config) => {
    // Gestion du token d'authentification
    const authStore = useAuthStore()
    const token = authStore.token || localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Gestion de l'état de chargement global
    const loadingStore = useLoadingStore()
    loadingStore.startRequest()

    return config
  },
  (error) => {
    const loadingStore = useLoadingStore()
    loadingStore.finishRequest()
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    // Fin du chargement à la réception de la réponse
    const loadingStore = useLoadingStore()
    loadingStore.finishRequest()
    return response
  },
  (error) => {
    // Gestion des erreurs et fin du chargement
    const loadingStore = useLoadingStore()
    loadingStore.finishRequest()

    // Gestion de l'erreur d'authentification
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore()
      //authStore.logout()
      //window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
