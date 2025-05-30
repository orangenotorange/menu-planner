<template>
  <div class="backdrop-blur-md bg-white/40 p-4 rounded-xl shadow-xl border border-white/50 transition-all hover:shadow-lg hover:bg-white/50" :class="meal ? 'border-l-4 border-l-[#4b7f52]/50' : ''">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-lg font-semibold bg-[#4b7f52] bg-clip-text text-transparent">{{ formatWeekday(day) }}</h3>
        <p class="text-sm font-medium text-gray-500">{{ formatDate(day) }}</p>
      </div>
      <button 
        @click.stop="$emit('changeMeal')"
        class="text-sm backdrop-blur-sm bg-[#ffd6b9]/80 hover:bg-[#ffd6b9]/90 text-[#ff8c42] px-3 py-1.5 rounded-full transition-all shadow-sm border border-[#ff8c42]/30"
      >
        {{ meal ? 'Change Meal' : 'Add Meal' }}
      </button>
    </div>
    <div 
      v-if="meal"
      class="mt-3 cursor-pointer transition-all"
      @click="$emit('click')"
    >
      <h4 class="font-medium text-[#ff8c42]">{{ meal.name }}</h4>
      <div class="flex items-center gap-2 mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm text-gray-600/90">{{ formatPrepTime(meal.preparationTime) }}</p>
      </div>
      <div class="flex items-center gap-2 mt-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
        <p class="text-sm text-gray-600/90">{{ formatCalories(meal.calories) }}</p>
      </div>
      <div class="mt-2 flex flex-wrap gap-2">
        <span class="text-xs backdrop-blur-sm bg-[#ffd6b9]/60 text-[#ff8c42] px-2 py-1 rounded-full flex items-center gap-1 border border-[#ff8c42]/30">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          {{ formatIngredients(meal.ingredients) }}
        </span>
        <span 
          v-for="tag in meal.dietaryTags" 
          :key="tag"
          class="text-xs backdrop-blur-sm bg-[#e8f5e9]/60 text-[#4b7f52] px-2 py-1 rounded-full border border-[#4b7f52]/30"
        >
          {{ formatDietaryTag(tag) }}
        </span>
      </div>
    </div>
    <div 
      v-else 
      class="mt-3 p-4 border-2 border-dashed border-gray-300/50 rounded-lg text-center text-gray-500/90 backdrop-blur-sm bg-white/20"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto mb-2 text-gray-400/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

const formatCalories = (calories) => {
  if (!calories) return 'N/A';
  return `${calories} cal`;
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