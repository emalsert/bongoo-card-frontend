<!-- src/pages/admin/ManageUsers.vue -->
<template>
  <q-page class="q-pa-md">
    <UserTable />
  </q-page>
</template>

<script>


import UserTable from "components/UserTable.vue";

export default {
  name: 'ManageUsers',
  components: {
    UserTable,
  },
};
</script>
