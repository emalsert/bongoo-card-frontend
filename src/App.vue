<!-- src/App.vue -->
<template>
  <div>
    <div v-if="loadingStore.isLoading" class="fullscreen-loader">
      <q-spinner color="primary" size="100px" />
    </div>
    <router-view />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useAuthStore } from 'stores/auth';
import {useLoadingStore} from "stores/loadingStores";


export default {
  setup() {
    const authStore = useAuthStore();
    const loadingStore = useLoadingStore();

    onMounted(() => {
      authStore.initializeAuth();
    });

    return {
      loadingStore
    };
  },
};
</script>

<style scoped>
.fullscreen-loader {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

