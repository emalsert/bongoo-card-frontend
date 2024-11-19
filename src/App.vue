<!-- src/App.vue -->
<template>
  <router-view />
</template>

<script>
import { onMounted } from 'vue';
import { useAuthStore } from 'stores/auth';

export default {
  setup() {
    const authStore = useAuthStore();

    onMounted(() => {
      authStore.initializeAuth();
    });
  },
};
</script>

<style>
/* Styles globaux si nécessaire */
</style>

