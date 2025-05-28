<template>
  <div class="bg-white p-4 rounded-md shadow border-l-4" :class="meal ? 'border-green-500' : 'border-gray-300'">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-semibold text-green-600">{{ formatDate(day) }}</h3>
        <p class="text-xs text-gray-500">{{ formatWeekday(day) }}</p>
      </div>
      <button 
        @click.stop="$emit('changeMeal')"
        class="text-sm bg-orange-100 hover:bg-orange-200 text-orange-600 px-2 py-1 rounded-full transition-colors"
      >
        {{ meal ? 'Change Meal' : 'Add Meal' }}
      </button>
    </div>
    <div 
      v-if="meal"
      class="mt-3 cursor-pointer hover:opacity-75 transition-opacity"
      @click="$emit('click')"
    >
      <h4 class="font-medium text-orange-600">{{ meal.name }}</h4>
      <div class="flex items-center gap-2 mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm text-gray-600">{{ formatPrepTime(meal.preparationTime) }}</p>
      </div>
      <div class="mt-2 flex flex-wrap gap-2">
        <span class="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          {{ formatIngredients(meal.ingredients) }}
        </span>
        <span 
          v-for="tag in meal.dietaryTags" 
          :key="tag"
          class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full"
        >
          {{ formatDietaryTag(tag) }}
        </span>
      </div>
    </div>
    <div 
      v-else 
      class="mt-3 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Click to add a meal for this day
    </div>
  </div>
</template>

<script setup>
defineProps({
  day: {
    type: Date,
    required: true
  },
  meal: {
    type: Object,
    required: false,
    default: null
  }
})

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
}

const formatWeekday = (date) => {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
}

const formatPrepTime = (minutes) => {
  if (!minutes) return 'N/A';
  if (minutes < 60) {
    return minutes === 1 ? '1 min' : `${minutes} mins`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hourText = hours === 1 ? '1 hr' : `${hours} hrs`;
  return remainingMinutes ? `${hourText} ${remainingMinutes} min` : hourText;
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

defineEmits(['click', 'changeMeal'])
</script> 