// src/services/offers.js
import api from '../api'
import { useAuthStore } from 'stores/auth'
import { storeToRefs } from 'pinia'

/**
 * Récupère toutes les offres avec une catégorie optionnelle.
 * @param {string} category - (Optionnel) La catégorie à filtrer.
 * @returns {Promise<Object>} - Les données des offres.
 */
export const getOffers = async (category = null, nombre = null) => {
  try {
    const params = {}

    if (category) {
      params.category = category
    }

    if (nombre !== null && nombre > 0) {
      params.nombre = nombre
    }

    const response = await api.get('/offers', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching offers:', error)
    throw error
  }
}

/**
 * Crée une nouvelle offre.
 * @param {Object} offerData - Les données de l'offre à créer.
 * @returns {Promise<Object>} - Les données de l'offre créée.
 */
export const createOffer = async (offerData) => {
  const auth = useAuthStore()
  const { token } = storeToRefs(auth)

  if (!token.value) {
    throw new Error('No authentication token available')
  }

  try {
    const response = await api.post('/offers', offerData, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error creating offer:', error)
    throw error
  }
}

/**
 * Met à jour une offre existante.
 * @param {string} id - L'ID de l'offre à mettre à jour.
 * @param {Object} offerData - Les nouvelles données de l'offre.
 * @returns {Promise<Object>} - Les données de l'offre mise à jour.
 */
export const updateOffer = async (id, offerData) => {
  const auth = useAuthStore()
  const { token } = storeToRefs(auth)

  if (!token.value) {
    throw new Error('No authentication token available')
  }

  try {
    const response = await api.patch(`/offers/${id}`, offerData, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error updating offer:', error)
    throw error
  }
}

/**
 * Supprime une offre.
 * @param {string} id - L'ID de l'offre à supprimer.
 * @returns {Promise<Object>} - La réponse du serveur.
 */
export const deleteOffer = async (id) => {
  const auth = useAuthStore()
  const { token } = storeToRefs(auth)

  if (!token.value) {
    throw new Error('No authentication token available')
  }

  try {
    const response = await api.delete(`/offers/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error deleting offer:', error)
    throw error
  }
}

