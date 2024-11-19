<!-- src/components/ContainerComponent.vue -->
<template>
  <q-card class="custom-container">
    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'ContainerComponent',
}
</script>

<style lang="scss" scoped>
.custom-container {
  background-color: white;
  border: 2px solid #000;
  border-radius: 18px !important;
  position: relative;
  box-shadow: 5px 5px 0px #bd5a0d !important;
  max-width: 100%;
  margin-left: 5%;
  margin-right: 5%;
  padding: 5%;
}
</style>
