<!-- src/pages/admin/ManageUsers.vue -->
<template>
  <q-page class="q-pa-md">
    <CreateOffer />
    <OfferTable />
  </q-page>
</template>

<script>


import OfferTable from "components/OfferTable.vue";
import CreateOffer from "components/CreateOffer.vue";

export default {
  name: 'ManageOffers',
  components: {
    OfferTable,
    CreateOffer,
  },
};
</script>



