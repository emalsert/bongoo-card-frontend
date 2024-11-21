<template>

  <div class="q-pa-md">
    <h2>Offers</h2>
    <q-card class="create-offer-card">
      <q-card-section>
        <div class="text-h6">Créer une Nouvelle Offre</div>
      </q-card-section>

      <q-form @submit.prevent="handleCreateOffer">
        <q-card-section>
          <q-input
            filled
            v-model="offer.title"
            label="Titre"
            type="text"
            :rules="[val => !!val || 'Le titre est requis']"
          />

          <q-input
            filled
            v-model="offer.description"
            label="Description"
            type="textarea"
            :rules="[val => !!val || 'La description est requise']"
          />

          <!-- Sélecteur de catégorie -->
          <q-select
            filled
            v-model="offer.category"
            label="Catégorie"
            :options="categoryOptions"
            emit-value
            map-options
            :rules="[val => !!val || 'La catégorie est requise']"
          />

          <!-- Détails de l'offre -->
          <q-input
            filled
            v-model="offer.offer_details"
            label="Détails de l'Offre"
            type="text"
          />

          <!-- Texte du bouton -->
          <q-input
            filled
            v-model="offer.button_text"
            label="Texte du Bouton"
            type="text"
            :rules="[val => !!val || 'Le texte du bouton est requis']"
          />

          <!-- Liens sociaux -->
          <q-input
            filled
            v-model="offer.google_maps"
            label="Lien Google Maps"
            type="text"
          />

          <q-input
            filled
            v-model="offer.instagram"
            label="Lien Instagram"
            type="text"
          />

          <q-input
            filled
            v-model="offer.facebook"
            label="Lien Facebook"
            type="text"
          />

          <!-- Téléchargement de l'image -->
          <div class="q-mt-md">
            <PhotoUpload
              folder="offers_photos"
              uploadPreset="offers_upload_preset"
              :onUploadSuccess="handleOfferPhotoUpload"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" @click="resetForm" />
          <q-btn flat label="Créer l'Offre" type="submit" color="primary" :loading="loading" />
        </q-card-actions>
      </q-form>
    </q-card>

    <!-- Dialogues pour les notifications -->
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PhotoUpload from 'components/PhotoUpload.vue'
import { createOffer } from '../services/offers'

export default {
  name: 'CreateOffer',
  components: {
    PhotoUpload
  },
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const offer = ref({
      title: '',
      description: '',
      category: '',
      offer_details: '',
      button_text: '',
      google_maps: '',
      instagram: '',
      facebook: '',
      image: '' // URL de l'image téléchargée
    })

    const categoryOptions = [
      { label: 'Bar', value: 'Bar' },
      { label: 'Shop', value: 'Shop' },
      { label: 'Restaurant', value: 'Restaurant' },
      { label: 'Trip', value: 'Trip' },
      { label: 'Event', value: 'Event' }
    ]

    const alert = ref({
      show: false,
      title: '',
      message: ''
    })

    // Fonction appelée lorsque l'image est téléchargée avec succès
    const handleOfferPhotoUpload = async (cloudinaryResponse) => {
      try {
        // Enregistrer l'URL sécurisée de l'image dans l'offre
        offer.value.image = cloudinaryResponse.secure_url
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'image de l\'offre:', error)
        alert.value = {
          show: true,
          title: 'Erreur',
          message: 'Une erreur est survenue lors du téléchargement de l\'image.'
        }
      }
    }

    // Fonction pour réinitialiser le formulaire
    const resetForm = () => {
      offer.value = {
        title: '',
        description: '',
        category: '',
        offer_details: '',
        button_text: '',
        google_maps: '',
        instagram: '',
        facebook: '',
        image: ''
      }
    }

    // Fonction pour gérer la soumission du formulaire
    const handleCreateOffer = async () => {
      loading.value = true
      try {
        // Valider que l'image a été téléchargée
        if (!offer.value.image) {
          alert.value = {
            show: true,
            title: 'Image Requise',
            message: 'Veuillez télécharger une image pour l\'offre.'
          }
          loading.value = false
          return
        }

        // Appeler l'API pour créer l'offre
        const response = await createOffer(offer.value)

        if (response.success) {
          alert.value = {
            show: true,
            title: 'Succès',
            message: 'Offre créée avec succès !'
          }
          resetForm()
          // Rediriger vers la liste des offres ou une autre page
          // router.push('/offers')
        } else {
          alert.value = {
            show: true,
            title: 'Erreur',
            message: response.message || 'Une erreur est survenue.'
          }
        }
      } catch (error) {
        console.error('Erreur lors de la création de l\'offre:', error)
        alert.value = {
          show: true,
          title: 'Erreur',
          message: error.message || 'Une erreur est survenue.'
        }
      } finally {
        loading.value = false
      }
    }

    return {
      offer,
      categoryOptions,
      handleOfferPhotoUpload,
      handleCreateOffer,
      resetForm,
      loading,
      alert
    }
  }
}
</script>

<style scoped>
.create-offer-card {
  max-width: 600px;
  margin: 0 auto;
}
h2 {
  color: #fdae51;
  margin-bottom: 20px;
}
</style>
