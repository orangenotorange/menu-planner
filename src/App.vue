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
  <div class="min-h-screen bg-gradient-to-br from-[#ff8c42] via-[#4b7f52] to-[#ffd6b9] relative overflow-hidden">
    <!-- Background shapes for depth -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#ff8c42] opacity-20 blur-3xl"></div>
      <div class="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#4b7f52] opacity-20 blur-3xl"></div>
      <div class="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full bg-[#ffd6b9] opacity-20 blur-3xl"></div>
    </div>

    <header class="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-lg border-b border-white/20">
      <nav class="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-[#4b7f52] to-[#ff8c42] bg-clip-text text-transparent">
          Menu Planner
        </h1>
        <div v-if="showShoppingList || showRecipeList" class="flex gap-2">
          <button 
            @click="showShoppingList = false; showRecipeList = false"
            class="px-4 py-2 rounded-lg backdrop-blur-sm bg-white/30 hover:bg-white/40 border border-white/50 shadow-sm transition-all text-[#4b7f52]"
          >
            Back to Menu
          </button>
        </div>
      </nav>
    </header>

    <main class="max-w-6xl mx-auto p-4">
      <div class="space-y-8">
        <section v-if="!showRecipeList && !showShoppingList" class="rounded-xl backdrop-blur-md bg-white/40 p-6 shadow-xl border border-white/50">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-[#4b7f52] to-[#ff8c42] bg-clip-text text-transparent mb-4">
            This Week's Menu
          </h2>
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

        <section v-if="!showRecipeList && !showShoppingList" class="rounded-xl backdrop-blur-md bg-white/40 p-6 shadow-xl border border-white/50">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-[#4b7f52] to-[#ff8c42] bg-clip-text text-transparent mb-4">
            Quick Actions
          </h2>
          <div class="flex flex-wrap gap-4">
            <button 
              @click="generateRandomWeeklyPlan"
              class="px-4 py-2 rounded-lg backdrop-blur-sm bg-[#ff8c42]/80 hover:bg-[#ff8c42]/90 text-white shadow-lg transition-all"
            >
              Generate New Plan
            </button>
            <button 
              @click="toggleRecipeList"
              class="px-4 py-2 rounded-lg backdrop-blur-sm bg-[#4b7f52]/80 hover:bg-[#4b7f52]/90 text-white shadow-lg transition-all"
            >
              View All Recipes
            </button>
            <button 
              @click="toggleShoppingList"
              class="px-4 py-2 rounded-lg backdrop-blur-sm bg-blue-500/80 hover:bg-blue-500/90 text-white shadow-lg transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Shopping List
            </button>
          </div>
        </section>

        <section v-if="showRecipeList" class="rounded-xl backdrop-blur-md bg-white/40 shadow-xl border border-white/50">
          <div class="p-4 bg-gradient-to-r from-[#4b7f52]/80 to-[#4b7f52]/90 text-white rounded-t-xl">
            <h2 class="text-2xl font-bold">Recipe Collection</h2>
          </div>
          <RecipeList />
        </section>

        <section v-if="showShoppingList" class="rounded-xl backdrop-blur-md bg-white/40 shadow-xl border border-white/50">
          <div class="p-4 bg-gradient-to-r from-[#4b7f52]/80 to-[#4b7f52]/90 text-white rounded-t-xl">
            <h2 class="text-2xl font-bold">Shopping List</h2>
          </div>
          <ShoppingList />
        </section>
      </div>
    </main>

    <footer class="mt-8 backdrop-blur-md bg-white/30 border-t border-white/20">
      <div class="max-w-6xl mx-auto p-4 text-center text-[#4b7f52]/70">
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

<style>
:root {
  --glass-border: 1px solid rgba(255, 255, 255, 0.2);
  --glass-bg: rgba(255, 255, 255, 0.4);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
}
</style>
