<!-- src/components/UserTable.vue -->
<template>
  <div>
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
              v-model="selectedUser.firstName"
              label="Prénom"
              type="text"
              :rules="[val => !!val || 'Ce champ est requis']"
            />

            <q-input
              filled
              v-model="selectedUser.lastName"
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

export default {
  name: 'UserTable',
  setup() {
    const users = ref([]); // Liste des utilisateurs
    const loading = ref(true); // Indicateur de chargement

    // Rôles disponibles
    const roles = ['admin', 'user', 'moderator'];

    // Variables pour les dialogues
    const showEditDialog = ref(false);
    const showDeleteDialog = ref(false);
    const selectedUser = ref(null);

    // Fonction pour récupérer les utilisateurs (données d'exemple pour le moment)
    const fetchUsers = async () => {
      // Simuler un appel API avec des données fictives
      setTimeout(() => {
        users.value = [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            role: 'admin',
          },
          {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            role: 'user',
          },
          // Ajoutez plus d'utilisateurs si nécessaire
        ];
        loading.value = false;
      }, 1000);
    };

    onMounted(() => {
      fetchUsers();
    });

    // Définition des colonnes pour q-table
    const columns = [
      { name: 'id', label: 'ID', field: 'id', sortable: true },
      { name: 'firstName', label: 'Prénom', field: 'firstName', sortable: true },
      { name: 'lastName', label: 'Nom', field: 'lastName', sortable: true },
      { name: 'email', label: 'Email', field: 'email', sortable: true },
      { name: 'role', label: 'Rôle', field: 'role', sortable: true },
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

    const handleEditSubmit = () => {
      // Mettre à jour l'utilisateur dans la liste (remplacer par un appel API)
      const index = users.value.findIndex((user) => user.id === selectedUser.value.id);
      if (index !== -1) {
        users.value[index] = { ...selectedUser.value };
      }
      showEditDialog.value = false;
    };

    const handleDelete = () => {
      // Supprimer l'utilisateur de la liste (remplacer par un appel API)
      users.value = users.value.filter((user) => user.id !== selectedUser.value.id);
      showDeleteDialog.value = false;
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
