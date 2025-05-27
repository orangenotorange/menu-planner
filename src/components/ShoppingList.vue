<script setup lang="ts">
import { computed } from 'vue';
import { useMealStore } from '../stores/mealStore';
import type { Ingredient } from '../types/meals';

const { currentWeekPlan } = useMealStore();

interface AggregatedIngredient extends Ingredient {
  meals: string[];
}

const shoppingList = computed(() => {
  const ingredientMap = new Map<string, AggregatedIngredient>();

  currentWeekPlan.value.days.forEach(day => {
    if (!day.dinner) return;

    day.dinner.ingredients.forEach(ingredient => {
      const key = `${ingredient.name}-${ingredient.unit}`;
      if (ingredientMap.has(key)) {
        const existing = ingredientMap.get(key)!;
        existing.amount += ingredient.amount;
        if (!existing.meals.includes(day.dinner!.name)) {
          existing.meals.push(day.dinner!.name);
        }
      } else {
        ingredientMap.set(key, {
          ...ingredient,
          meals: [day.dinner.name]
        });
      }
    });
  });

  // Convert map to array and sort by name
  return Array.from(ingredientMap.values()).sort((a, b) => 
    a.name.localeCompare(b.name)
  );
});

// Group ingredients by category or type
const groupedIngredients = computed(() => {
  const groups = new Map<string, AggregatedIngredient[]>();
  
  shoppingList.value.forEach(ingredient => {
    const category = ingredient.category || 'Other';
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category)!.push(ingredient);
  });

  return new Map([...groups.entries()].sort());
});
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-4">Shopping List</h2>
      <p class="text-gray-600 mb-4">Ingredients needed for this week's meals</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <div v-for="[category, ingredients] in groupedIngredients" :key="category" 
        class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-green-600 mb-4">{{ category }}</h3>
        <ul class="space-y-3">
          <li v-for="ingredient in ingredients" :key="ingredient.name" 
            class="flex flex-col gap-1 pb-2 border-b last:border-0">
            <div class="flex justify-between items-start">
              <span class="font-medium">{{ ingredient.name }}</span>
              <span class="text-gray-600">{{ ingredient.amount }} {{ ingredient.unit }}</span>
            </div>
            <div class="text-sm text-gray-500">
              Used in: {{ ingredient.meals.join(', ') }}
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Print Button -->
    <div class="mt-6 flex justify-end">
      <button 
        @click="window.print()"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Print Shopping List
      </button>
    </div>
  </div>
</template>

<style scoped>
@media print {
  header, footer, button {
    display: none !important;
  }
  .grid {
    display: block !important;
  }
  .bg-white {
    box-shadow: none !important;
    border: 1px solid #e2e8f0;
    margin-bottom: 1rem;
  }
}
</style> 