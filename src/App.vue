<script setup>
import { ref } from 'vue'
import MealCard from './components/MealCard.vue'
import RecipeModal from './components/RecipeModal.vue'
import MealSelectModal from './components/MealSelectModal.vue'
import RecipeList from './components/RecipeList.vue'
import ShoppingList from './components/ShoppingList.vue'
import { useMealStore } from './stores/mealStore'

const { currentWeekPlan, availableMeals, addMealToDay, removeMealFromDay, generateRandomWeeklyPlan } = useMealStore()

const showRecipeModal = ref(false)
const showMealSelectModal = ref(false)
const showRecipeList = ref(false)
const showShoppingList = ref(false)
const selectedRecipe = ref(null)
const selectedDayIndex = ref(null)

const showRecipe = (meal) => {
  selectedRecipe.value = meal
  showRecipeModal.value = true
}

const openMealSelect = (dayIndex) => {
  selectedDayIndex.value = dayIndex
  showMealSelectModal.value = true
}

const selectMeal = (meal) => {
  addMealToDay(selectedDayIndex.value, meal, 'dinner')
  showMealSelectModal.value = false
}

const toggleRecipeList = () => {
  showRecipeList.value = !showRecipeList.value
  showShoppingList.value = false
}

const toggleShoppingList = () => {
  showShoppingList.value = !showShoppingList.value
  showRecipeList.value = false
}
</script>

<template>
  <div class="min-h-screen bg-orange-50">
    <header class="bg-green-500 text-white p-4 shadow-lg">
      <nav class="max-w-6xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Menu Planner</h1>
        <div v-if="showShoppingList || showRecipeList" class="flex gap-2">
          <button 
            @click="showShoppingList = false; showRecipeList = false"
            class="bg-white text-green-500 px-4 py-2 rounded-md hover:bg-green-50 transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </nav>
    </header>

    <main class="max-w-6xl mx-auto p-4">
      <div class="space-y-8">
        <section v-if="!showRecipeList && !showShoppingList" class="bg-orange-100 rounded-lg p-6 shadow-md">
          <h2 class="text-2xl font-bold text-orange-600 mb-4">This Week's Menu</h2>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MealCard
              v-for="(day, index) in currentWeekPlan.days"
              :key="index"
              :day="day.date"
              :meal="day.dinner"
              @click="showRecipe(day.dinner)"
              @change-meal="openMealSelect(index)"
            />
          </div>
        </section>

        <section v-if="!showRecipeList && !showShoppingList" class="bg-green-100 rounded-lg p-6 shadow-md">
          <h2 class="text-2xl font-bold text-green-600 mb-4">Quick Actions</h2>
          <div class="flex flex-wrap gap-4">
            <button 
              @click="generateRandomWeeklyPlan"
              class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Generate New Plan
            </button>
            <button 
              @click="toggleRecipeList"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              View All Recipes
            </button>
            <button 
              @click="toggleShoppingList"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Shopping List
            </button>
          </div>
        </section>

        <section v-if="showRecipeList" class="bg-white rounded-lg shadow-md">
          <div class="p-4 bg-green-500 text-white rounded-t-lg">
            <h2 class="text-2xl font-bold">Recipe Collection</h2>
          </div>
          <RecipeList />
        </section>

        <section v-if="showShoppingList" class="bg-white rounded-lg shadow-md">
          <div class="p-4 bg-green-500 text-white rounded-t-lg">
            <h2 class="text-2xl font-bold">Shopping List</h2>
          </div>
          <ShoppingList />
        </section>
      </div>
    </main>

    <footer class="bg-orange-100 p-4 mt-8">
      <div class="max-w-6xl mx-auto text-center text-orange-600">
        <p>© 2024 Menu Planner. All rights reserved.</p>
      </div>
    </footer>

    <RecipeModal
      :show="showRecipeModal"
      :recipe="selectedRecipe"
      @close="showRecipeModal = false"
    />

    <MealSelectModal
      :show="showMealSelectModal"
      :day="selectedDayIndex"
      :available-meals="availableMeals"
      @close="showMealSelectModal = false"
      @select="selectMeal"
    />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
