<script setup lang="ts">
import { computed } from 'vue';
import type { Recipe } from '../types/recipes';
import { useRecipeStore } from '../stores/recipeStore';

const props = defineProps<{
  mealId: string;
}>();

const { getRecipeByMealId } = useRecipeStore();
const recipe = computed(() => getRecipeByMealId(props.mealId));
</script>

<template>
  <div v-if="recipe" class="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">{{ recipe.meal.name }}</h2>
    
    <!-- Basic Info -->
    <div class="mb-6">
      <p class="text-gray-600">Preparation time: {{ recipe.meal.preparationTime }} minutes</p>
      <p class="text-gray-600">Dietary tags: {{ recipe.meal.dietaryTags.join(', ') }}</p>
    </div>

    <!-- Ingredients -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold mb-3">Ingredients</h3>
      <ul class="list-disc list-inside space-y-2">
        <li v-for="ingredient in recipe.meal.ingredients" :key="ingredient.name" class="text-gray-700">
          {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
        </li>
      </ul>
    </div>

    <!-- Instructions -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold mb-3">Instructions</h3>
      <ol class="list-decimal list-inside space-y-2">
        <li v-for="(step, index) in recipe.instructions" :key="index" class="text-gray-700">
          {{ step }}
        </li>
      </ol>
    </div>

    <!-- Tips -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold mb-3">Tips</h3>
      <ul class="list-disc list-inside space-y-2">
        <li v-for="(tip, index) in recipe.tips" :key="index" class="text-gray-700">
          {{ tip }}
        </li>
      </ul>
    </div>

    <!-- Nutrition Info -->
    <div v-if="recipe.nutritionInfo" class="bg-gray-50 p-4 rounded-lg">
      <h3 class="text-xl font-semibold mb-3">Nutrition Information</h3>
      <div class="grid grid-cols-4 gap-4 text-center">
        <div>
          <p class="font-medium">Calories</p>
          <p class="text-gray-700">{{ recipe.nutritionInfo.calories }}</p>
        </div>
        <div>
          <p class="font-medium">Protein</p>
          <p class="text-gray-700">{{ recipe.nutritionInfo.protein }}g</p>
        </div>
        <div>
          <p class="font-medium">Carbs</p>
          <p class="text-gray-700">{{ recipe.nutritionInfo.carbs }}g</p>
        </div>
        <div>
          <p class="font-medium">Fat</p>
          <p class="text-gray-700">{{ recipe.nutritionInfo.fat }}g</p>
        </div>
      </div>
    </div>
  </div>
</template> 