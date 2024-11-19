<!-- src/components/UserPhoto.vue -->
<template>
  <div class="q-pa-md">
    <q-avatar v-if="photoUrl" size="150px">
      <q-img
        :src="photoUrl"
        spinner-color="primary"
        spinner-size="82px"
        style="height: 150px; width: 150px; border-radius: 10px; overflow: hidden;"
      >
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            Impossible de charger l'image
          </div>
        </template>
      </q-img>
    </q-avatar>
    <q-avatar v-else size="150px" color="primary" text-color="white">
      <!-- Placeholder avatar -->
    </q-avatar>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getCurrentUserPhoto, getUserIdPhoto } from '../services/user';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

export default {
  name: 'UserPhoto',
  setup() {
    const auth = useAuthStore();
    const { user, isAuthenticated } = storeToRefs(auth);
    const route = useRoute();

    const photoUrl = ref('');

    const fetchUserPhoto = async () => {
      try {
        let response;

        if (isAuthenticated.value && user.value && user.value.id) {
          response = await getCurrentUserPhoto();
        } else {
          const userId = route.params.id;
          if (!userId) {
            console.warn('No user ID provided in the route.');
            return;
          }
          response = await getUserIdPhoto(userId);
        }
        console.log('User photo response:', response);
        if (response.success && response.data && response.data.photo) {
          photoUrl.value = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${response.data.photo}`;
        } else {
          console.warn("No photo found or invalid response.");
        }
      } catch (error) {
        console.error('Error fetching user photo:', error);
      }
    };

    onMounted(() => {
      fetchUserPhoto();
    });

    return {
      photoUrl,
    };
  }
};
</script>

<style scoped>
.q-pa-md {
  display: flex;
  justify-content: center;
  align-items: center;
}

.q-avatar {
  border-radius: 10px;
}
</style>


