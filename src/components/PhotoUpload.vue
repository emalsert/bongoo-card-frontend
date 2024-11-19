// components/PhotoUpload.vue
<template>
  <div class="q-pa-md">
    <q-card class="upload-card">
      <q-card-section>
        <div class="text-h6">Profile Photo</div>
      </q-card-section>

      <q-card-section>
        <q-file
          v-model="photo"
          filled
          bottom-slots
          label="Choose photo"
          counter
          accept=".jpg,.jpeg,.png"
          max-file-size="5242880"
          @rejected="onRejected"
          @update:model-value="onFileSelected"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
          <template v-slot:hint>Max size: 5MB</template>
        </q-file>

        <!-- Preview de l'image -->
        <div v-if="previewUrl" class="q-mt-md">
          <q-img
            :src="previewUrl"
            style="max-width: 200px"
            class="q-mx-auto"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-if="photo"
          flat
          color="negative"
          label="Cancel"
          @click="resetUpload"
          :disable="uploading"
        />
        <q-btn
          :loading="uploading"
          color="primary"
          label="Upload"
          @click="uploadPhoto"
          :disable="!photo"
        />
      </q-card-actions>
    </q-card>

    <q-dialog v-model="alert.show">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ alert.title }}</div>
        </q-card-section>
        <q-card-section>{{ alert.message }}</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import { uploadToCloudinary } from '../services/cloudinary';
import { useQuasar } from 'quasar';

export default {
  name: 'PhotoUpload',
  props: {
    folder: {
      type: String,
      required: true
    },
    uploadPreset: {
      type: String,
      required: true
    },
    onUploadSuccess: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const $q = useQuasar();
    const photo = ref(null);
    const previewUrl = ref('');
    const uploading = ref(false);
    const alert = ref({
      show: false,
      title: '',
      message: ''
    });

    const onFileSelected = (file) => {
      if (file) {
        previewUrl.value = URL.createObjectURL(file);
      }
    };

    const resetUpload = () => {
      if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
      }
      photo.value = null;
      previewUrl.value = '';
    };

    const onRejected = (rejectedEntries) => {
      alert.value = {
        show: true,
        title: 'Upload Error',
        message: rejectedEntries[0].failedPropValidation === 'max-file-size'
          ? 'File is too large. Maximum size is 5MB.'
          : 'Invalid file type. Please use JPG or PNG.'
      };
    };

    const uploadPhoto = async () => {
      if (!photo.value) return;

      uploading.value = true;
      try {
        const cloudinaryResponse = await uploadToCloudinary(photo.value, props.folder, props.uploadPreset);

        // Appeler la fonction de rappel passée en prop
        await props.onUploadSuccess(cloudinaryResponse);

        alert.value = {
          show: true,
          title: 'Success',
          message: 'Photo uploaded successfully!'
        };
        resetUpload();
      } catch (error) {
        console.error('Photo upload error:', error);
        alert.value = {
          show: true,
          title: 'Error',
          message: error.message || 'Failed to upload photo. Please try again.'
        };
      } finally {
        uploading.value = false;
      }
    };

    return {
      photo,
      previewUrl,
      uploading,
      alert,
      onRejected,
      onFileSelected,
      uploadPhoto,
      resetUpload
    };
  }
};
</script>

<style scoped>
.upload-card {
  max-width: 500px;
  margin: 0 auto;
}

.q-file {
  width: 100%;
}

.q-img {
  border-radius: 8px;
}
</style>
