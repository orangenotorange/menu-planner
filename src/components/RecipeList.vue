<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMealStore } from '../stores/mealStore';
import type { Meal } from '../types/meals';
import RecipeDetails from './RecipeDetails.vue';

const { availableMeals } = useMealStore();

const searchQuery = ref('');
const selectedMealId = ref<string>('');
const showRecipe = ref(false);

const filteredMeals = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return availableMeals.value.filter(meal => {
    // Search in meal name
    if (meal.name.toLowerCase().includes(query)) return true;
    
    // Search in ingredients
    if (meal.ingredients.some(ing => ing.name.toLowerCase().includes(query))) return true;
    
    // Search in dietary tags
    if (meal.dietaryTags.some(tag => tag.toLowerCase().includes(query))) return true;
    
    return false;
  });
});

const viewRecipe = (meal: Meal) => {
  selectedMealId.value = meal.id;
  showRecipe.value = true;
};
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-4">All Recipes</h2>
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by recipe name, ingredient, or dietary tag..."
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div class="absolute right-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="meal in filteredMeals"
        :key="meal.id"
        class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
        @click="viewRecipe(meal)"
      >
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">{{ meal.name }}</h3>
          <div class="text-sm text-gray-600">
            <p class="mb-1">{{ meal.preparationTime }} minutes</p>
            <p class="mb-2">{{ meal.ingredients.length }} ingredients</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in meal.dietaryTags"
                :key="tag"
                class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recipe Details Modal -->
    <div v-if="showRecipe" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-end mb-4">
          <button @click="showRecipe = false" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <RecipeDetails :meal-id="selectedMealId" />
      </div>
    </div>
  </div>
</template> 