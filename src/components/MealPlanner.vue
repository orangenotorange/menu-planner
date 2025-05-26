<script setup lang="ts">
import { ref } from 'vue';
import { useMealStore } from '../stores/mealStore';
import type { Meal } from '../types/meals';
import RecipeDetails from './RecipeDetails.vue';

const { currentWeekPlan, availableMeals, addMealToDay, removeMealFromDay, calculateServings } = useMealStore();

const showMealSelector = ref(false);
const selectedDayIndex = ref<number>(0);
const showRecipe = ref(false);
const selectedMealId = ref<string>('');

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(date);
};

const openMealSelector = (dayIndex: number) => {
  selectedDayIndex.value = dayIndex;
  showMealSelector.value = true;
};

const selectMeal = (meal: Meal) => {
  addMealToDay(selectedDayIndex.value, meal, 'dinner');
  showMealSelector.value = false;
};

const removeMeal = (dayIndex: number) => {
  removeMealFromDay(dayIndex, 'dinner');
};

const viewRecipe = (meal: Meal) => {
  selectedMealId.value = meal.id;
  showRecipe.value = true;
};

const generateWeeklyPlan = () => {
  const dinnerOptions = availableMeals.value.filter(meal => meal.category === 'dinner');
  
  // Clear current plan
  currentWeekPlan.value.days.forEach((day, index) => {
    removeMealFromDay(index, 'dinner');
  });

  // Generate new plan
  currentWeekPlan.value.days.forEach((day, index) => {
    // Get random meal, but avoid repeats if possible
    let availableMeals = dinnerOptions.filter(meal => 
      !currentWeekPlan.value.days.some(d => d.dinner?.id === meal.id)
    );
    
    // If we've used all meals, reset the available options
    if (availableMeals.length === 0) {
      availableMeals = dinnerOptions;
    }

    const randomIndex = Math.floor(Math.random() * availableMeals.length);
    const selectedMeal = availableMeals[randomIndex];
    addMealToDay(index, selectedMeal, 'dinner');
  });
};
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">Weekly Dinner Planner</h1>
        <h2 class="text-xl text-gray-600">Plan for 2 Adults and 2 Children</h2>
      </div>
      <button 
        @click="generateWeeklyPlan"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors"
      >
        Generate Weekly Plan
      </button>
    </div>

    <div class="grid grid-cols-7 gap-4">
      <div v-for="(day, index) in currentWeekPlan.days" :key="index" 
        class="border rounded-lg p-4 bg-white shadow-sm">
        <h3 class="font-semibold mb-4 text-gray-800">{{ formatDate(day.date) }}</h3>
        
        <div class="min-h-[100px]">
          <div v-if="day.dinner" class="bg-blue-50 p-3 rounded-lg">
            <div class="flex justify-between items-start">
              <button 
                @click="viewRecipe(day.dinner)" 
                class="text-sm text-left hover:text-blue-600 font-medium"
              >
                {{ day.dinner.name }}
              </button>
              <button @click="removeMeal(index)" class="text-red-500 text-xs hover:text-red-700">×</button>
            </div>
            <div class="text-xs text-gray-600 mt-1">
              {{ day.dinner.preparationTime }} mins | {{ day.dinner.dietaryTags.join(', ') }}
            </div>
          </div>
          <button
            v-else
            @click="openMealSelector(index)"
            class="w-full p-3 text-sm border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors text-gray-500"
          >
            Add Dinner
          </button>
        </div>
      </div>
    </div>

    <!-- Meal Selector Modal -->
    <div v-if="showMealSelector" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold">Select Dinner</h3>
          <button @click="showMealSelector = false" class="text-gray-500 hover:text-gray-700">×</button>
        </div>
        
        <div class="grid grid-cols-1 gap-4">
          <div
            v-for="meal in availableMeals.filter(m => m.category === 'dinner')"
            :key="meal.id"
            class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            @click="selectMeal(meal)"
          >
            <h4 class="font-medium">{{ meal.name }}</h4>
            <div class="text-sm text-gray-600 mt-1">
              <p>Preparation time: {{ meal.preparationTime }} minutes</p>
              <p>Tags: {{ meal.dietaryTags.join(', ') }}</p>
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

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
</style> 