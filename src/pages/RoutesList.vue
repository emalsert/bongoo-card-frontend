<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="q-pa-md">
        <h2 class="text-h4 q-mb-md">Liste des Routes</h2>
        <q-list bordered separator>
          <q-item v-for="route in routes" :key="route" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ route }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="chevron_right" color="primary" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'RoutesList',

  data() {
    return {
      routes: []
    }
  },

  mounted() {
    const router = useRouter()
    this.routes = router.getRoutes().map(route => route.path)
  }
}
</script>

<style lang="scss" scoped>
.q-list {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  text-align: center;
}
</style>
