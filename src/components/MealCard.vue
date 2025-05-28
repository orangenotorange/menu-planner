<template>
  <div class="bg-white p-4 rounded-md shadow border-l-4 border-green-500">
    <div class="flex justify-between items-start">
      <h3 class="font-semibold text-green-600">{{ formatDate(day) }}</h3>
      <button 
        @click.stop="$emit('changeMeal')"
        class="text-sm bg-orange-100 hover:bg-orange-200 text-orange-600 px-2 py-1 rounded-full transition-colors"
      >
        {{ meal ? 'Change Meal' : 'Add Meal' }}
      </button>
    </div>
    <div 
      v-if="meal"
      class="mt-2 cursor-pointer hover:opacity-75 transition-opacity"
      @click="$emit('click')"
    >
      <h4 class="font-medium text-orange-600">{{ meal.name }}</h4>
      <p class="text-sm text-gray-600 mt-1">Prep time: {{ meal.preparationTime }} mins</p>
      <div class="mt-2 flex flex-wrap gap-2">
        <span class="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
          {{ meal.ingredients.length }} ingredients
        </span>
        <span 
          v-for="tag in meal.dietaryTags" 
          :key="tag"
          class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <div 
      v-else 
      class="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500"
    >
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
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(date);
}

defineEmits(['click', 'changeMeal'])
</script> 