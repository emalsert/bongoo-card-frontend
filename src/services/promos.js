// src/services/promos.js
import api from '../api'
import { useAuthStore } from 'stores/auth'
import { storeToRefs } from 'pinia'

/**
 * Fetches all promos.
 * @returns {Promise<Object>} - The promos data.
 */
export const getPromos = async () => {
  try {
    const response = await api.get('/admin/promos')
    return response.data
  } catch (error) {
    console.error('Error fetching promos:', error)
    throw error
  }
}

/**
 * Creates a new promo.
 * @param {Object} promoData - The data of the promo to create.
 * @returns {Promise<Object>} - The created promo data.
 */
export const createPromo = async (promoData) => {
  const auth = useAuthStore()
  const { token } = storeToRefs(auth)

  if (!token.value) {
    throw new Error('No authentication token available')
  }

  try {
    const response = await api.post('/admin/promos', promoData, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error creating promo:', error)
    throw error
  }
}

/**
 * Updates an existing promo.
 * @param {string} id - The ID of the promo to update.
 * @param {Object} promoData - The new data of the promo.
 * @returns {Promise<Object>} - The updated promo data.
 */
export const updatePromo = async (id, promoData) => {
  const auth = useAuthStore()
  const { token } = storeToRefs(auth)

  if (!token.value) {
    throw new Error('No authentication token available')
  }

  try {
    const response = await api.put(`/admin/promos/${id}`, promoData, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error updating promo:', error)
    throw error
  }
}

/**
 * Deletes a promo.
 * @param {string} id - The ID of the promo to delete.
 * @returns {Promise<Object>} - The server response.
 */
export const deletePromo = async (id) => {
  const auth = useAuthStore()
  const { token } = storeToRefs(auth)

  if (!token.value) {
    throw new Error('No authentication token available')
  }

  try {
    const response = await api.delete(`/admin/promos/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error deleting promo:', error)
    throw error
  }
}

/**
 * Adds a promo to the current user.
 * @param {string} promoId - The ID of the promo to add.
 * @returns {Promise<Object>} - The updated promos of the user.
 */
export const addPromoToCurrentUser = async (promoId) => {
  const auth = useAuthStore()
  const { token } = storeToRefs(auth)

  if (!token.value) {
    throw new Error('No authentication token available')
  }

  try {
    const response = await api.post(`/user/promos/${promoId}/add`, null, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error adding promo to current user:', error)
    throw error
  }
}

/**
 * Removes a promo from the current user.
 * @param {string} promoTitle - The title of the promo to remove.
 * @returns {Promise<Object>} - The updated promos of the user.
 */
export const removePromoFromCurrentUser = async (promoTitle) => {
  const auth = useAuthStore()
  const { token } = storeToRefs(auth)

  if (!token.value) {
    throw new Error('No authentication token available')
  }

  try {
    const response = await api.post(`/user/promos/${promoTitle}/remove`, null, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error removing promo from current user:', error)
    throw error
  }
}

/**
 * Fetches the current user's promos.
 * @returns {Promise<Array>} - The user's promos.
 */
export const fetchUserPromos = async () => {
  const auth = useAuthStore()
  const { token } = storeToRefs(auth)

  if (!token.value) {
    throw new Error('No authentication token available')
  }

  try {
    const response = await api.get('/user', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    return response.data.promos || []
  } catch (error) {
    console.error('Error fetching user promos:', error)
    throw error
  }
}

/**
 * Adds a promo to a user (Admin).
 * @param {string} userId - The ID of the user.
 * @param {string} promoId - The ID of the promo to add.
 * @returns {Promise<Object>} - The updated promos of the user.
 */
export const addPromoToUser = async (userId, promoId) => {
  const auth = useAuthStore()
  const { token } = storeToRefs(auth)

  if (!token.value) {
    throw new Error('No authentication token available')
  }

  try {
    const response = await api.post(`/admin/users/${userId}/promos/add`, { promo_id: promoId }, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error adding promo to user:', error)
    throw error
  }
}

/**
 * Removes a promo from a user (Admin).
 * @param {string} userId - The ID of the user.
 * @param {string} promoTitle - The title of the promo to remove.
 * @returns {Promise<Object>} - The updated promos of the user.
 */
export const removePromoFromUser = async (userId, promoTitle) => {
  const auth = useAuthStore()
  const { token } = storeToRefs(auth)

  if (!token.value) {
    throw new Error('No authentication token available')
  }

  try {
    const response = await api.post(`/admin/users/${userId}/promos/remove`, { promo_title: promoTitle }, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error removing promo from user:', error)
    throw error
  }
}
