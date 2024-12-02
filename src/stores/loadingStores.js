// stores/loadingStore.js
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    pendingRequests: 0
  }),
  getters: {
    isLoading: (state) => state.pendingRequests > 0
  },
  actions: {
    startRequest() {
      this.pendingRequests++;
    },
    finishRequest() {
      if (this.pendingRequests > 0) {
        this.pendingRequests--;
      }
    }
  }
});
