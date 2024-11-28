<template>
  <q-page class="q-pa-md">
    <div>
    <h2>Admin - Promo Management</h2>

    <!-- Create Promo Form -->
    <div>
      <h3>Create New Promo</h3>
      <q-form @submit.prevent="createPromo">
        <q-input v-model="newPromo.title_promo" label="Title" outlined />
        <q-input v-model="newPromo.desc_promo" label="Description" outlined />
        <q-input v-model="newPromo.location" label="Location" outlined />
        <q-btn label="Create Promo" type="submit" color="primary" />
      </q-form>
    </div>

    <!-- List of Promos -->
    <div>
      <h3>Existing Promos</h3>
      <q-table
        :columns="columns"
        :rows="promos"
      >
        <template v-slot:body-cell-actions="props">
          <q-btn flat icon="edit" @click="openEditModal(props.row)" />
          <q-btn flat icon="delete" color="red" @click="deletePromo(props.row.id)" />
        </template>
      </q-table>
    </div>

    <!-- Edit Promo Modal -->
    <q-dialog v-model="isEditModalOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit Promo</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="updatePromo">
            <q-input v-model="editedPromo.title_promo" label="Title" outlined />
            <q-input v-model="editedPromo.desc_promo" label="Description" outlined />
            <q-input v-model="editedPromo.location" label="Location" outlined />
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn flat label="Save" type="submit" color="primary" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getPromos, createPromo, updatePromo, deletePromo } from 'src/services/promos'

export default {
  name: 'AdminPromos',
  setup() {
    const promos = ref([])
    const newPromo = ref({
      title_promo: '',
      desc_promo: '',
      location: '',
    })
    const editedPromo = ref({})
    const isEditModalOpen = ref(false)

    const columns = [
      { name: 'id', label: 'ID', field: 'id' },
      { name: 'title_promo', label: 'Title', field: 'title_promo' },
      { name: 'desc_promo', label: 'Description', field: 'desc_promo' },
      { name: 'location', label: 'Location', field: 'location' },
      { name: 'actions', label: 'Actions', field: 'actions' },
    ]

    const fetchPromos = async () => {
      try {
        promos.value = await getPromos()
      } catch (error) {
        console.error('Error fetching promos:', error)
      }
    }

    const createPromoHandler = async () => {
      try {
        await createPromo(newPromo.value)
        newPromo.value = { title_promo: '', desc_promo: '', location: '' }
        await fetchPromos()
      } catch (error) {
        console.error('Error creating promo:', error)
      }
    }

    const openEditModal = (promo) => {
      editedPromo.value = { ...promo }
      isEditModalOpen.value = true
    }

    const updatePromoHandler = async () => {
      try {
        await updatePromo(editedPromo.value.id, editedPromo.value)
        isEditModalOpen.value = false
        await fetchPromos()
      } catch (error) {
        console.error('Error updating promo:', error)
      }
    }

    const deletePromoHandler = async (id) => {
      try {
        await deletePromo(id)
        await fetchPromos()
      } catch (error) {
        console.error('Error deleting promo:', error)
      }
    }

    onMounted(() => {
      fetchPromos()
    })

    return {
      promos,
      newPromo,
      editedPromo,
      isEditModalOpen,
      columns,
      createPromo: createPromoHandler,
      updatePromo: updatePromoHandler,
      deletePromo: deletePromoHandler,
      openEditModal,
    }
  },
}
</script>
