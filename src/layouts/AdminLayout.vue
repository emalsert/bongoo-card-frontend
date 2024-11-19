<!-- src/layouts/AdminLayout.vue -->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <!-- Contenu du header -->
    </q-header>

    <q-drawer show-if-above>
      <!-- Menu de navigation admin -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <!-- Contenu du footer -->
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'AdminLayout',
};
</script>
