<!-- src/layouts/AdminLayout.vue -->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <!-- Contenu du header -->
    </q-header>

    <q-drawer show-if-above bordered class="bg-primary text-white">
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item class="q-pb-lg">
            <q-item-section>
              <q-img
                src="/images/bongoo.png"
                width="120px"
                fit="contain"
                class="q-mx-auto"
              />
            </q-item-section>
          </q-item>

          <q-item
            to="/admin/manage-offers"
            clickable
            v-ripple
            active-class="active-link"
          >
            <q-item-section avatar>
              <q-icon name="local_offer" />
            </q-item-section>
            <q-item-section>Manage Offers</q-item-section>
          </q-item>

          <q-item
            to="/admin/manage-users"
            clickable
            v-ripple
            active-class="active-link"
          >
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>
            <q-item-section>Manage Users</q-item-section>
          </q-item>

          <q-item clickable v-ripple class="q-mt-xl" @click="handleLogout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>Logout</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
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
import {useAuthStore} from "stores/auth";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";

export default {
  name: 'AdminLayout',

  setup() {
    const authStore = useAuthStore();
    const router = useRouter();


    const loading = ref(false);
    const errorMessage = ref('');
    const handleLogout = async () => {
      loading.value = true;
      errorMessage.value = '';
      try {
        await authStore.logout();
        router.push('/login');
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        errorMessage.value = error.response?.data?.message || 'Erreur lors de la déconnexion.';
      } finally {
        loading.value = false;
      }
    };

    return {
      handleLogout
    }
  }
};
</script>
