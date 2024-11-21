<template>
  <q-card class="category-nav">
    <q-select
      v-model="selectedCategory"
      @update:model-value="onCategoryChange"
      :options="categoryOptions"
      label="Choisir une catégorie"
      clearable
    />
  </q-card>
</template>

<script>
export default {
  name: 'CategorySelector',
  emits: ['category-selected'],
  data() {
    return {
      selectedCategory: '',
      categoryOptions: [
        { label: 'Toutes les catégories', value: '' },
        { label: 'Bar', value: 'Bar' },
        { label: 'Shop', value: 'Shop' },
        { label: 'Restaurant', value: 'Restaurant' },
        { label: 'Trip', value: 'Trip' },
        { label: 'Event', value: 'Event' },
      ],
    };
  },
  methods: {
    onCategoryChange(value) {
      this.$emit('category-selected', value);
    },
  },
};
</script>

<style scoped>
.category-nav {
  margin-bottom: 20px;
  margin-top: 2%;
  max-width: 1200px;
  padding: 5px;
}
</style>
