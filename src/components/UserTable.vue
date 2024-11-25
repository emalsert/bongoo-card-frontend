<!-- src/components/UserTable.vue -->
<template>
  <div class="q-pa-md">
    <h2>Users</h2>

    <!-- Afficher un spinner pendant le chargement -->
    <div v-if="loading" class="q-my-md">
      <q-spinner color="primary" size="50px" />
    </div>

    <!-- Table des utilisateurs -->
    <q-table
      v-else
      :columns="columns"
      :rows="users"
      row-key="id"
    >
      <!-- Custom cell for 'actions' -->
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn flat icon="edit" @click="openEditDialog(props.row)" />
          <q-btn flat icon="delete" color="red" @click="openDeleteDialog(props.row)" />
        </q-td>
      </template>
    </q-table>

    <!-- Edit User Dialog -->
    <q-dialog v-model="showEditDialog">
      <q-card style="min-width: 400px;">
        <q-card-section>
          <div class="text-h6">Modifier l'Utilisateur</div>
        </q-card-section>

        <q-form @submit.prevent="handleEditSubmit">
          <q-card-section>
            <q-input
              filled
              v-model="selectedUser.first_name"
              label="Prénom"
              type="text"
              :rules="[val => !!val || 'Ce champ est requis']"
            />

            <q-input
              filled
              v-model="selectedUser.last_name"
              label="Nom"
              type="text"
              :rules="[val => !!val || 'Ce champ est requis']"
            />

            <q-input
              filled
              v-model="selectedUser.email"
              label="Email"
              type="email"
              :rules="[val => !!val || 'Ce champ est requis', val => /.+@.+\..+/.test(val) || 'Email invalide']"
            />

            <q-select
              filled
              v-model="selectedUser.role"
              label="Rôle"
              :options="roles"
              :rules="[val => !!val || 'Ce champ est requis']"
            />

            <q-input
              filled
              v-model="selectedUser.subscription_expiration_date"
              label="Date d'expiration de la souscription"
              type="date"
              :rules="[val => !!val || 'Ce champ est requis']"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Annuler" color="primary" v-close-popup />
            <q-btn flat label="Enregistrer" type="submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- Delete User Confirmation Dialog -->
    <q-dialog v-model="showDeleteDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirmer la Suppression</div>
        </q-card-section>

        <q-card-section>
          Êtes-vous sûr de vouloir supprimer l'utilisateur "{{ selectedUser.firstName }} {{ selectedUser.lastName }}" ?
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
import { ref, onMounted } from 'vue';
import { getAllUsers, updateUser, deleteUser } from '../services/user';

export default {
  name: 'UserTable',
  setup() {
    const users = ref([]); // Liste des utilisateurs
    const loading = ref(true); // Indicateur de chargement

    // Rôles disponibles
    const roles = ['user', 'admin']; // Ajustez selon vos rôles disponibles

    // Variables pour les dialogues
    const showEditDialog = ref(false);
    const showDeleteDialog = ref(false);
    const selectedUser = ref(null);
    const errorMessage = ref(null);

    // Fonction pour récupérer les utilisateurs
    const fetchUsers = async () => {
      loading.value = true;
      try {
        const data = await getAllUsers();
        users.value = data.users || [];
      } catch (error) {
        console.error('Error fetching users:', error);
        errorMessage.value = 'Erreur lors de la récupération des utilisateurs.';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchUsers();
    });

    // Définition des colonnes pour q-table
    const columns = [
      { name: 'id', label: 'ID', field: 'id', sortable: true },
      { name: 'firstName', label: 'Prénom', field: 'first_name', sortable: true },
      { name: 'lastName', label: 'Nom', field: 'last_name', sortable: true },
      { name: 'email', label: 'Email', field: 'email', sortable: true },
      { name: 'role', label: 'Rôle', field: 'role', sortable: true },
      {
        name: 'subscription_expiration_date',
        label: 'Date d\'expiration',
        field: 'subscription_expiration_date',
        sortable: true,
      },
      { name: 'actions', label: 'Actions' }, // Pas de 'field' car on utilise un template personnalisé
    ];

    // Méthodes pour ouvrir et fermer les dialogues
    const openEditDialog = (user) => {
      selectedUser.value = { ...user }; // Cloner l'utilisateur pour éviter la mutation directe
      showEditDialog.value = true;
    };

    const openDeleteDialog = (user) => {
      selectedUser.value = user;
      showDeleteDialog.value = true;
    };

    const handleEditSubmit = async () => {
      try {
        await updateUser(selectedUser.value.id, selectedUser.value);
        // Mettre à jour l'utilisateur dans la liste
        const index = users.value.findIndex((user) => user.id === selectedUser.value.id);
        if (index !== -1) {
          users.value[index] = { ...selectedUser.value };
        }
        showEditDialog.value = false;
      } catch (error) {
        console.error('Error updating user:', error);
        errorMessage.value = 'Erreur lors de la mise à jour de l\'utilisateur.';
      }
    };

    const handleDelete = async () => {
      try {
        await deleteUser(selectedUser.value.id);
        // Supprimer l'utilisateur de la liste
        users.value = users.value.filter((user) => user.id !== selectedUser.value.id);
        showDeleteDialog.value = false;
      } catch (error) {
        console.error('Error deleting user:', error);
        errorMessage.value = 'Erreur lors de la suppression de l\'utilisateur.';
      }
    };

    return {
      users,
      loading,
      columns,
      roles,
      showEditDialog,
      showDeleteDialog,
      selectedUser,
      openEditDialog,
      openDeleteDialog,
      handleEditSubmit,
      handleDelete,
      errorMessage,
    };
  },
};
</script>

<style scoped>
h2 {
  color: #fdae51;
  margin-bottom: 20px;
}

.q-my-md {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

