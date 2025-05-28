<template>
  <div v-if="show" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-white/80 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/50 shadow-2xl">
      <div class="p-6">
        <div class="flex justify-between items-start">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-[#4b7f52] to-[#ff8c42] bg-clip-text text-transparent">{{ recipe.name }}</h2>
          <button 
            @click="$emit('close')" 
            class="text-gray-500/80 hover:text-gray-700/80 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mt-4">
          <div class="flex items-center gap-4 text-sm text-gray-600/90">
            <span class="flex items-center">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Prep time: {{ formatPrepTime(recipe.preparationTime) }}
            </span>
            <span class="flex items-center">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              {{ formatCalories(recipe.calories) }} per serving
            </span>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <span 
              v-for="tag in recipe.dietaryTags" 
              :key="tag"
              class="text-xs backdrop-blur-sm bg-[#e8f5e9]/60 text-[#4b7f52] px-2 py-1 rounded-full border border-[#4b7f52]/30"
            >
              {{ formatDietaryTag(tag) }}
            </span>
          </div>

          <div class="mt-6">
            <h3 class="font-semibold bg-gradient-to-r from-[#4b7f52] to-[#ff8c42] bg-clip-text text-transparent mb-2">Serving Information</h3>
            <div class="backdrop-blur-md bg-[#ffd6b9]/30 rounded-xl p-4 border border-[#ff8c42]/30">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-600/90 mb-2">Serving Size</p>
                  <p class="font-medium text-gray-700">{{ recipe.servingSize.amount }} {{ recipe.servingSize.unit }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600/90 mb-2">Makes</p>
                  <div class="flex gap-4">
                    <span class="flex items-center gap-1">
                      <svg class="w-5 h-5 text-gray-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {{ recipe.servings.adult }} adult servings
                    </span>
                    <span class="flex items-center gap-1">
                      <svg class="w-5 h-5 text-gray-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {{ recipe.servings.child }} child servings
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="font-semibold bg-gradient-to-r from-[#4b7f52] to-[#ff8c42] bg-clip-text text-transparent mb-2">Ingredients</h3>
            <ul class="list-none space-y-2 text-gray-600/90 backdrop-blur-md bg-white/30 rounded-xl p-4 border border-white/50">
              <li v-for="ingredient in recipe.ingredients" :key="ingredient.name" class="flex items-baseline">
                <span class="font-medium min-w-[100px]">{{ ingredient.amount }} {{ ingredient.unit }}</span>
                <span class="ml-4">{{ ingredient.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  },
  recipe: {
    type: Object,
    required: true
  }
})

const formatPrepTime = (minutes) => {
  if (!minutes) return 'N/A';
  if (minutes < 60) {
    return minutes === 1 ? '1 minute' : `${minutes} minutes`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hourText = hours === 1 ? '1 hour' : `${hours} hours`;
  return remainingMinutes ? `${hourText} ${remainingMinutes} minutes` : hourText;
}

const formatCalories = (calories) => {
  if (!calories) return 'N/A';
  return `${calories} calories`;
}

const formatIngredients = (ingredients) => {
  if (!ingredients || !ingredients.length) return 'No ingredients';
  return `${ingredients.length} ${ingredients.length === 1 ? 'ingredient' : 'ingredients'}`;
}

const formatDietaryTag = (tag) => {
  if (!tag) return '';
  return tag.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

defineEmits(['close'])
</script> 