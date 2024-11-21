<!-- src/components/OfferTable.vue -->
<template>
  <div>

    <q-table
      :columns="columns"
      :rows="offers"
      row-key="id">
      <!-- Custom cell for 'image' -->
      <template v-slot:body-cell-image="props">
        <q-td>
          <q-img :src="props.row.image" alt="Image" width="100px" />
        </q-td>
      </template>

      <!-- Custom cell for 'links' -->
      <template v-slot:body-cell-links="props">
        <q-td>
          <div v-if="props.row.google_maps">
            <a :href="props.row.google_maps" target="_blank">Google Maps</a>
          </div>
          <div v-if="props.row.instagram">
            <a :href="props.row.instagram" target="_blank">Instagram</a>
          </div>
          <div v-if="props.row.facebook">
            <a :href="props.row.facebook" target="_blank">Facebook</a>
          </div>
        </q-td>
      </template>

      <!-- Custom cell for 'actions' -->
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn flat icon="edit" @click="openEditDialog(props.row)" />
          <q-btn flat icon="delete" color="red" @click="openDeleteDialog(props.row)" />
        </q-td>
      </template>
    </q-table>

    <!-- Edit Offer Dialog -->
    <q-dialog v-model="showEditDialog">
      <q-card style="min-width: 400px;">
        <q-card-section>
          <div class="text-h6">Modifier l'Offre</div>
        </q-card-section>

        <q-form @submit.prevent="handleEditSubmit">
          <q-card-section>
            <q-input
              filled
              v-model="selectedOffer.title"
              label="Titre"
              type="text"
              :rules="[val => !!val || 'Ce champ est requis']"
            />

            <q-input
              filled
              v-model="selectedOffer.offer_details"
              label="Détails de l'Offre"
              type="text"
            />

            <!-- Afficher l'image actuelle -->
            <div class="q-mt-md">
              <q-img :src="selectedOffer.image" alt="Image de l'offre" width="100px" />
            </div>

            <!-- Composant PhotoUpload pour télécharger une nouvelle image -->
            <div class="q-mt-md">
              <PhotoUpload
                folder="offers_photos"
                uploadPreset="offers_upload_preset"
                :onUploadSuccess="handleOfferPhotoUpload"
              />
            </div>

            <!-- Vous pouvez supprimer ce champ si vous utilisez le composant PhotoUpload -->
            <!--
            <q-input
              filled
              v-model="selectedOffer.image"
              label="URL de l'Image"
              type="text"
            />
            -->

            <q-select
              filled
              v-model="selectedOffer.category"
              label="Catégorie"
              :options="categoryOptions"
              emit-value
              map-options
              clearable
              :rules="[val => !val || categoryOptions.some(option => option.value === val) || 'Catégorie invalide']"
            />

            <q-input
              filled
              v-model="selectedOffer.description"
              label="Description"
              type="textarea"
            />

            <q-input
              filled
              v-model="selectedOffer.button_text"
              label="Texte du Bouton"
              type="text"
            />

            <!-- Social Links -->
            <q-input
              filled
              v-model="selectedOffer.google_maps"
              label="Lien Google Maps"
              type="text"
            />

            <q-input
              filled
              v-model="selectedOffer.instagram"
              label="Lien Instagram"
              type="text"
            />

            <q-input
              filled
              v-model="selectedOffer.facebook"
              label="Lien Facebook"
              type="text"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Annuler" color="primary" v-close-popup />
            <q-btn flat label="Enregistrer" type="submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- Delete Offer Confirmation Dialog -->
    <q-dialog v-model="showDeleteDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirmer la Suppression</div>
        </q-card-section>

        <q-card-section>
          Êtes-vous sûr de vouloir supprimer l'offre "{{ selectedOffer.title }}" ?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="Supprimer" color="red" @click="handleDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getOffers, createOffer, updateOffer, deleteOffer } from '../services/offers'
import PhotoUpload from 'components/PhotoUpload.vue'

export default {
  name: 'OfferTable',
  components: {
    PhotoUpload
  },
  setup() {
    const offers = ref([])

    const columns = [
      { name: 'title', label: 'Titre', field: 'title', sortable: true },
      { name: 'offer_details', label: 'Détails', field: 'offer_details', sortable: true },
      { name: 'image', label: 'Image' }, // Pas de 'field' car on utilise un template personnalisé
      { name: 'category', label: 'Catégorie', field: 'category', sortable: true },
      { name: 'description', label: 'Description', field: 'description' },
      { name: 'button_text', label: 'Texte du Bouton', field: 'button_text' },
      { name: 'links', label: 'Liens' }, // Pas de 'field' car on utilise un template personnalisé
      { name: 'actions', label: 'Actions' }, // Pas de 'field' car on utilise un template personnalisé
    ]

    const categoryOptions = [
      { label: 'Bar', value: 'Bar' },
      { label: 'Shop', value: 'Shop' },
      { label: 'Restaurant', value: 'Restaurant' },
      { label: 'Trip', value: 'Trip' },
      { label: 'Event', value: 'Event' },
    ]

    // Variables pour les dialogues
    const showEditDialog = ref(false)
    const showDeleteDialog = ref(false)
    const selectedOffer = ref(null)

    async function fetchOffers() {
      try {
        const data = await getOffers()
        offers.value = data.offers // Assurez-vous que la réponse contient un champ 'offers'
      } catch (error) {
        console.error('Erreur lors de la récupération des offres :', error)
      }
    }

    onMounted(() => {
      fetchOffers()
    })

    // Fonctions pour ouvrir les dialogues
    function openEditDialog(offer) {
      selectedOffer.value = { ...offer }
      showEditDialog.value = true
    }

    function openDeleteDialog(offer) {
      selectedOffer.value = offer
      showDeleteDialog.value = true
    }

    // Fonction appelée lorsque l'image est téléchargée avec succès
    const handleOfferPhotoUpload = async (cloudinaryResponse) => {
      try {
        // Mettre à jour l'URL de l'image dans l'offre sélectionnée
        selectedOffer.value.image = cloudinaryResponse.secure_url
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'image de l\'offre :', error)
        // Vous pouvez afficher une notification d'erreur ici
      }
    }

    // Gestion de la soumission du formulaire d'édition
    async function handleEditSubmit() {
      try {
        await updateExistingOffer(selectedOffer.value.id, selectedOffer.value)
        showEditDialog.value = false
        fetchOffers() // Rafraîchir la liste des offres après la mise à jour
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'offre :', error)
        // Vous pouvez afficher une notification d'erreur ici
      }
    }

    // Gestion de la suppression d'une offre
    async function handleDelete() {
      try {
        await deleteExistingOffer(selectedOffer.value.id)
        showDeleteDialog.value = false
        fetchOffers() // Rafraîchir la liste des offres après suppression
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'offre :', error)
      }
    }

    // Fonctions pour créer, mettre à jour et supprimer des offres
    async function createNewOffer(offerData) {
      try {
        const data = await createOffer(offerData)
        offers.value.push(data.offer) // Mettez à jour la liste locale des offres
      } catch (error) {
        console.error('Erreur lors de la création de l\'offre :', error)
      }
    }

    async function updateExistingOffer(id, offerData) {
      try {
        const data = await updateOffer(id, offerData)
        // Mettez à jour l'offre dans la liste locale
        const index = offers.value.findIndex(offer => offer.id === id)
        if (index !== -1) {
          offers.value[index] = data.offer
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'offre :', error)
      }
    }

    async function deleteExistingOffer(id) {
      try {
        await deleteOffer(id)
        // Supprimez l'offre de la liste locale
        offers.value = offers.value.filter(offer => offer.id !== id)
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'offre :', error)
      }
    }

    return {
      offers,
      columns,
      fetchOffers,
      createNewOffer,
      updateExistingOffer,
      deleteExistingOffer,
      showEditDialog,
      showDeleteDialog,
      selectedOffer,
      openEditDialog,
      openDeleteDialog,
      handleEditSubmit,
      handleDelete,
      categoryOptions,
      handleOfferPhotoUpload,
    }
  },
}
</script>

<style scoped>
h2 {
  color: #fdae51;
  margin-bottom: 20px;
}
</style>


