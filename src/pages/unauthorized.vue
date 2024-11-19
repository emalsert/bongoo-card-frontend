<!-- src/pages/Unauthorized.vue -->
<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <q-icon name="warning" size="64px" color="red" />
      <h1>Accès non autorisé</h1>
      <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
      <q-btn label="Retour à l'accueil" @click="$router.push('/')" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'UnauthorizedCompo',
};
</script>
