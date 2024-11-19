<template>
  <div class="category-nav">
    <label for="category">Catégorie :</label>
    <q-select
      v-model="selectedCategory"
      @update:model-value="onCategoryChange"
      :options="categoryOptions"
      label="Choisir une catégorie"
      clearable
    />
  </div>
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
}
</style>
