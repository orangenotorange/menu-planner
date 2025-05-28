<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start">
          <h2 class="text-2xl font-bold text-orange-600">{{ recipe.name }}</h2>
          <button 
            @click="$emit('close')" 
            class="text-gray-500 hover:text-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mt-4">
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <span class="flex items-center">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Prep time: {{ formatPrepTime(recipe.preparationTime) }}
            </span>
            <span class="flex items-center">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {{ formatIngredients(recipe.ingredients) }}
            </span>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <span 
              v-for="tag in recipe.dietaryTags" 
              :key="tag"
              class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full"
            >
              {{ formatDietaryTag(tag) }}
            </span>
          </div>

          <div class="mt-6">
            <h3 class="font-semibold text-green-600 mb-2">Ingredients</h3>
            <ul class="list-disc list-inside space-y-1 text-gray-600">
              <li v-for="ingredient in recipe.ingredients" :key="ingredient.name" class="flex items-baseline">
                <span class="font-medium">{{ ingredient.amount }} {{ ingredient.unit }}</span>
                <span class="ml-2">{{ ingredient.name }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-6">
            <h3 class="font-semibold text-green-600 mb-2">Servings</h3>
            <div class="flex gap-4 text-gray-600">
              <span class="flex items-center gap-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ recipe.servings.adult }} adults
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {{ recipe.servings.child }} children
              </span>
            </div>
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