<!-- src/components/UserTable.vue -->
<template>
  <div class="q-pa-md">
    <h2>Users</h2>

    <!-- Display a spinner while loading -->
    <div v-if="loading" class="q-my-md">
      <q-spinner color="primary" size="50px" />
    </div>

    <!-- User table -->
    <q-table
      v-else
      :columns="columns"
      :rows="users"
      row-key="id"
    >
      <!-- Custom cell for 'promos' -->
      <template v-slot:body-cell-promos="props">
        <q-td>
          <!-- Display the list of promo titles -->
          <div v-if="props.row.promos && props.row.promos.length">
            <ul>
              <li v-for="promo in props.row.promos" :key="promo.title_promo">
                {{ promo.title_promo }}
              </li>
            </ul>
          </div>
          <div v-else>
            No promos
          </div>
        </q-td>
      </template>

      <!-- Custom cell for 'actions' -->
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn flat icon="edit" @click="openEditDialog(props.row)" />
          <q-btn flat icon="delete" color="red" @click="openDeleteDialog(props.row)" />
          <!-- New Manage Promos button -->
          <q-btn flat icon="local_offer" color="primary" @click="openPromosDialog(props.row)" />
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

    <!-- Manage Promos Dialog -->
    <q-dialog v-model="showPromosDialog">
      <q-card style="min-width: 500px;">
        <q-card-section>
          <div class="text-h6">Manage Promos for {{ selectedUser.first_name }} {{ selectedUser.last_name }}</div>
        </q-card-section>
        <q-card-section>
          <q-list bordered>
            <!-- List current promos -->
            <q-item v-for="promo in userPromos" :key="promo.title_promo">
              <q-item-section>{{ promo.title_promo }}</q-item-section>
              <q-item-section side>
                <q-btn flat icon="remove_circle" color="red" @click="handleRemovePromoFromUser(promo.title_promo)" />
              </q-item-section>
            </q-item>
          </q-list>

          <!-- Add promo to user -->
          <div class="q-mt-md">
            <q-select
              v-model="selectedPromoId"
              :options="availablePromos"
              option-value="id"
              option-label="title_promo"
              label="Add Promo"
              emit-value
              map-options
            />
            <q-btn label="Add Promo" color="primary" @click="handleAddPromoToUser" class="q-ml-sm" />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAllUsers, updateUser, deleteUser } from '../services/user';
import { getPromos, addPromoToUser as addPromoToUserService, removePromoFromUser as removePromoFromUserService } from '../services/promos';

export default {
  name: 'UserTable',
  setup() {
    const users = ref([]);
    const loading = ref(true);

    // Roles available
    const roles = ['user', 'admin'];

    // Variables for dialogs
    const showEditDialog = ref(false);
    const showDeleteDialog = ref(false);
    const showPromosDialog = ref(false);
    const selectedUser = ref(null);
    const errorMessage = ref(null);

    // Variables for promos
    const userPromos = ref([]);
    const availablePromos = ref([]);
    const selectedPromoId = ref(null);

    // Function to fetch users
    const fetchUsers = async () => {
      loading.value = true;
      try {
        const data = await getAllUsers();
        users.value = data.users || [];
      } catch (error) {
        console.error('Error fetching users:', error);
        errorMessage.value = 'Error fetching users.';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchUsers();
      fetchAvailablePromos();
    });

    // Function to fetch all promos
    const fetchAvailablePromos = async () => {
      try {
        availablePromos.value = await getPromos();
      } catch (error) {
        console.error('Error fetching promos:', error);
        errorMessage.value = 'Error fetching promos.';
      }
    };

    // Function to fetch promos for the selected user
    const fetchUserPromos = async (userId) => {
      try {
        const user = users.value.find((u) => u.id === userId);
        userPromos.value = user.promos || [];
      } catch (error) {
        console.error('Error fetching user promos:', error);
        errorMessage.value = 'Error fetching user promos.';
      }
    };

    // Definition of columns for q-table
    const columns = [
      { name: 'id', label: 'ID', field: 'id', sortable: true },
      { name: 'firstName', label: 'First Name', field: 'first_name', sortable: true },
      { name: 'lastName', label: 'Last Name', field: 'last_name', sortable: true },
      { name: 'email', label: 'Email', field: 'email', sortable: true },
      { name: 'role', label: 'Role', field: 'role', sortable: true },
      {
        name: 'subscription_expiration_date',
        label: 'Subscription Expiration',
        field: 'subscription_expiration_date',
        sortable: true,
      },
      {
        name: 'promos',
        label: 'Promos',
        field: 'promos',
        sortable: false,
      },
      { name: 'actions', label: 'Actions' },
    ];

    // Methods to open and close dialogs
    const openEditDialog = (user) => {
      selectedUser.value = { ...user };
      showEditDialog.value = true;
    };

    const openDeleteDialog = (user) => {
      selectedUser.value = user;
      showDeleteDialog.value = true;
    };

    const openPromosDialog = async (user) => {
      selectedUser.value = user;
      await fetchUserPromos(user.id);
      showPromosDialog.value = true;
    };

    const handleEditSubmit = async () => {
      try {
        await updateUser(selectedUser.value.id, selectedUser.value);
        // Update the user in the list
        const index = users.value.findIndex((user) => user.id === selectedUser.value.id);
        if (index !== -1) {
          users.value[index] = { ...selectedUser.value };
        }
        showEditDialog.value = false;
      } catch (error) {
        console.error('Error updating user:', error);
        errorMessage.value = 'Error updating user.';
      }
    };

    const handleDelete = async () => {
      try {
        await deleteUser(selectedUser.value.id);
        // Remove the user from the list
        users.value = users.value.filter((user) => user.id !== selectedUser.value.id);
        showDeleteDialog.value = false;
      } catch (error) {
        console.error('Error deleting user:', error);
        errorMessage.value = 'Error deleting user.';
      }
    };

    // Method to add a promo to the user
    const handleAddPromoToUser = async () => {
      try {
        if (!selectedPromoId.value) {
          errorMessage.value = 'Please select a promo to add.';
          return;
        }
        await addPromoToUserService(selectedUser.value.id, selectedPromoId.value);
        // Refresh user promos
        await fetchUserPromos(selectedUser.value.id);
        selectedPromoId.value = null;
      } catch (error) {
        console.error('Error adding promo to user:', error);
        errorMessage.value = 'Error adding promo to user.';
      }
    };

    // Method to remove a promo from the user
    const handleRemovePromoFromUser = async (promoTitle) => {
      try {
        await removePromoFromUserService(selectedUser.value.id, promoTitle);
        // Refresh user promos
        await fetchUserPromos(selectedUser.value.id);
      } catch (error) {
        console.error('Error removing promo from user:', error);
        errorMessage.value = 'Error removing promo from user.';
      }
    };

    return {
      users,
      loading,
      columns,
      roles,
      showEditDialog,
      showDeleteDialog,
      showPromosDialog,
      selectedUser,
      openEditDialog,
      openDeleteDialog,
      openPromosDialog,
      handleEditSubmit,
      handleDelete,
      errorMessage,
      userPromos,
      availablePromos,
      selectedPromoId,
      handleAddPromoToUser,
      handleRemovePromoFromUser,
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

