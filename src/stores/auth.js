// src/stores/auth.js
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import apiClient from 'src/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null, // Stores user data including the role
    token: null,
  }),

  actions: {
    async initializeAuth() {
      await this.checkAuth();
    },

    async checkAuth() {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          this.token = token;
          // Optionally, check if user data is already loaded
          if (!this.user) {
            // Fetch user data from API to get the role
            const response = await apiClient.get('/user', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            this.user = response.data;
          }
          this.isAuthenticated = true;
          return true;
        }
        this.reset();
        return false;
      } catch (error) {
        console.error('Error during checkAuth:', error);
        this.reset();
        return false;
      }
    },

    async login(credentials) {
      const response = await apiClient.post('/login', credentials);
      const token = response.data.access_token;

      localStorage.setItem('access_token', token);
      this.token = token;
      this.isAuthenticated = true;
      this.user = response.data.user; // User data including the role
      return response.data;
    },


    async logout() {
      try {
        // Optionally, inform the server about logout
        await apiClient.post('/logout', null, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        this.reset();
      }
    },

    reset() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      localStorage.removeItem('access_token');
    },
  },
});
