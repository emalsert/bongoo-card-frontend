<template>
  <div class="q-pa-md flex items-center">
    <q-card flat bordered class="photo-container">
      <q-card-section>
        <div class="row items-center q-col-gutter-md">
          <div class="col-12 col-sm-4">
            <PhotoRender :photo-url="currentPhoto" :user-name="userName" />
          </div>

          <div class="col-12 col-sm-8">
            <q-uploader
              url="/"
              :factory="uploadPhoto"
              accept=".jpg,.jpeg,.png"
              :max-file-size="5242880"
              class="full-width"
              flat
              bordered
              @rejected="onRejected"
              @uploaded="onSuccess"
              @failed="onError"
            >
              <template v-slot:header="scope">
                <div class="row items-center q-pa-sm">
                  <q-btn
                    v-if="scope.queuedFiles.length > 0"
                    icon="clear_all"
                    @click="scope.removeQueuedFiles"
                    class="q-ml-sm"
                    flat
                    dense
                  />
                  <div class="col">
                    <div class="text-subtitle1">Upload Profile Photo</div>
                    <div class="text-caption">Max file size: 5MB</div>
                  </div>
                </div>
              </template>
            </q-uploader>
          </div>
        </div>
      </q-card-section>

      <q-card-actions v-if="currentPhoto" align="right" class="q-pa-md">
        <q-btn
          flat
          color="negative"
          label="Remove Photo"
          @click="confirmDelete"
          :loading="deleting"
        />
      </q-card-actions>
    </q-card>

    <q-dialog v-model="deleteConfirm">
      <q-card>
        <q-card-section>
          <div class="text-h6">Remove Profile Photo</div>
        </q-card-section>
        <q-card-section>Are you sure you want to remove your profile photo?</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            color="negative"
            label="Remove"
            @click="removePhoto"
            :loading="deleting"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { uploadToCloudinary } from '../services/cloudinary'
import { uploadProfilePhoto } from '../services/user'


export default {
  name: 'PhotoComponent',

  props: {
    userName: {
      type: String,
      required: true
    },
    initialPhoto: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const $q = useQuasar()
    const currentPhoto = ref(props.initialPhoto)
    const deleting = ref(false)
    const deleteConfirm = ref(false)

    const uploadPhoto = async (files) => {
      const file = files[0]
      try {
        const { url } = await uploadToCloudinary(file)
        const response = await uploadProfilePhoto({ photo: url })

        if (response.success) {
          currentPhoto.value = url
          emit('photo-updated', url)
          return {
            url: response.user.photo,
            method: 'POST',
            headers: [{ name: 'Content-Type', value: 'application/json' }]
          }
        }
      } catch (error) {
        throw new Error(error.message)
      }
    }

    const onRejected = (rejectedEntries) => {
      $q.notify({
        type: 'negative',
        message: rejectedEntries[0].failedPropValidation === 'max-file-size'
          ? 'File is too large. Maximum size is 5MB.'
          : 'Invalid file type. Please use JPG or PNG.'
      })
    }

    const onSuccess = () => {
      $q.notify({
        type: 'positive',
        message: 'Photo uploaded successfully'
      })
    }

    const onError = (error) => {
      $q.notify({
        type: 'negative',
        message: error.message || 'Failed to upload photo'
      })
    }

    const confirmDelete = () => {
      deleteConfirm.value = true
    }

    const removePhoto = async () => {
      deleting.value = true
      try {
        const response = await fetch('/api/users/photo', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()

        if (data.success) {
          currentPhoto.value = ''
          emit('photo-updated', null)
          deleteConfirm.value = false
          $q.notify({
            type: 'positive',
            message: 'Photo removed successfully'
          })
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Failed to remove photo'
        })
      } finally {
        deleting.value = false
      }
    }

    return {
      currentPhoto,
      deleting,
      deleteConfirm,
      uploadPhoto,
      onRejected,
      onSuccess,
      onError,
      confirmDelete,
      removePhoto
    }
  }
}
</script>

<style scoped>
.photo-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>
