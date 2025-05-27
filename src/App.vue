<script setup>
import { ref } from 'vue'
import MealCard from './components/MealCard.vue'
import RecipeModal from './components/RecipeModal.vue'
import MealSelectModal from './components/MealSelectModal.vue'
import RecipeList from './components/RecipeList.vue'
import { generateWeeklyPlan, generateNewMeal, getAllMeals } from './services/meals'

const showRecipeModal = ref(false)
const showMealSelectModal = ref(false)
const showRecipeList = ref(false)
const selectedRecipe = ref(null)
const selectedDay = ref(null)
const weeklyMeals = ref(generateWeeklyPlan())

const showRecipe = (meal) => {
  selectedRecipe.value = meal
  showRecipeModal.value = true
}

const generateNewPlan = () => {
  weeklyMeals.value = generateWeeklyPlan()
}

const openMealSelect = (day) => {
  selectedDay.value = day
  showMealSelectModal.value = true
}

const getAvailableMeals = () => {
  const currentMealNames = weeklyMeals.value.map(m => m.meal.name)
  return getAllMeals().filter(meal => !currentMealNames.includes(meal.name))
}

const selectMeal = (meal) => {
  weeklyMeals.value = weeklyMeals.value.map(({ day, meal: currentMeal }) => ({
    day,
    meal: day === selectedDay.value ? meal : currentMeal
  }))
  showMealSelectModal.value = false
}

const toggleRecipeList = () => {
  showRecipeList.value = !showRecipeList.value
}
</script>

<template>
  <div class="min-h-screen bg-orange-50">
    <header class="bg-green-500 text-white p-4 shadow-lg">
      <nav class="max-w-6xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Menu Planner</h1>
      </nav>
    </header>

    <main class="max-w-6xl mx-auto p-4">
      <div class="space-y-8">
        <section v-if="!showRecipeList" class="bg-orange-100 rounded-lg p-6 shadow-md">
          <h2 class="text-2xl font-bold text-orange-600 mb-4">This Week's Menu</h2>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MealCard
              v-for="{ day, meal } in weeklyMeals"
              :key="day"
              :day="day"
              :meal="meal"
              @click="showRecipe(meal)"
              @change-meal="openMealSelect(day)"
            />
          </div>
        </section>

        <section v-if="!showRecipeList" class="bg-green-100 rounded-lg p-6 shadow-md">
          <h2 class="text-2xl font-bold text-green-600 mb-4">Quick Actions</h2>
          <div class="flex gap-4">
            <button 
              @click="generateNewPlan"
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
          </div>
        </section>

        <section v-if="showRecipeList" class="bg-white rounded-lg shadow-md">
          <div class="p-4 bg-green-500 text-white rounded-t-lg flex justify-between items-center">
            <h2 class="text-2xl font-bold">Recipe Collection</h2>
            <button 
              @click="toggleRecipeList"
              class="bg-white text-green-500 px-4 py-2 rounded-md hover:bg-green-50 transition-colors"
            >
              Back to Menu
            </button>
          </div>
          <RecipeList />
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
      :day="selectedDay"
      :available-meals="getAvailableMeals()"
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
