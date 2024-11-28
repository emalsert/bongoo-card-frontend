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
import { getUserIdPhoto } from '../services/user';

export default {
  name: 'UserPhoto',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const photoUrl = ref('');

    const fetchUserPhoto = async () => {
      try {
        const response = await getUserIdPhoto(props.id);
        console.log('User photo response:', response);
        if (response.photo) {
          photoUrl.value = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${response.photo}`;
        } else {
          console.warn("Aucune photo trouvée ou réponse invalide.");
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la photo utilisateur :', error);
      }
    };

    onMounted(() => {
      fetchUserPhoto();
    });

    return {
      photoUrl,
    };
  },
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
