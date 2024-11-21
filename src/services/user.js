// src/services/user.js
import api from '../api'
import { useAuthStore } from 'stores/auth'
import { storeToRefs } from 'pinia'

export const uploadProfilePhoto = async ({ photo }) => {
  const auth = useAuthStore()
  const { token } = storeToRefs(auth)

  if (!token.value) {
    throw new Error('No authentication token available')
  }

  try {
    const response = await api.post('/users/photo',
      { photo },
      {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error uploading photo:', error)
    throw error
  }
}

export const getCurrentUserPhoto = async () => {
  const auth = useAuthStore()
  const { user } = storeToRefs(auth)
  const response = await api.get(`/users/${user.value.id}/photo`)
  return response.data
}

export const getUserPhoto = async () => {
  const response = await api.get('/user/photo')
  return response.data
}

export const removeProfilePhoto = async () => {
  const response = await api.delete('/users/photo')
  return response.data
}

export const getUserDetails = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`, {
      responseType: 'text'
    })

    const responseText = response.data
    const jsonStartIndex = responseText.indexOf('{')
    if (jsonStartIndex !== -1) {
      const jsonString = responseText.substring(jsonStartIndex)
      const data = JSON.parse(jsonString)
      return data
    } else {
      throw new Error('Unable to find JSON in the response')
    }
  } catch (error) {
    console.error('Error fetching user details:', error)
    throw error
  }
}

export const getCurrentUser = async () => {
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
    return response.data
  } catch (error) {
    console.error('Error fetching current user:', error)
    throw error
  }
}

export const getUserIdPhoto = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/photo`)
    return response.data
  } catch (error) {
    console.error('Error fetching user photo:', error)
    throw error
  }
}

export const updatePassword = async (passwordData) => {
  const auth = useAuthStore();
  const { token } = storeToRefs(auth);

  if (!token.value) {
    throw new Error('No authentication token available');
  }

  try {
    const response = await api.put('/user/update-password', passwordData, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export const sendResetPasswordEmail = async (emailData) => {
  try {
    const response = await api.post('/forgot-password', emailData);
    return response.data;
  } catch (error) {
    console.error('Error sending reset password email:', error);
    throw error;
  }
};

export const resetPassword = async (passwordData) => {
  try {
    const response = await api.post('/reset-password', passwordData);
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};


