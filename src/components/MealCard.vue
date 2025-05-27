<template>
  <div class="bg-white p-4 rounded-md shadow border-l-4 border-green-500">
    <div class="flex justify-between items-start">
      <h3 class="font-semibold text-green-600">{{ day }}</h3>
      <button 
        @click.stop="$emit('changeMeal')"
        class="text-sm bg-orange-100 hover:bg-orange-200 text-orange-600 px-2 py-1 rounded-full transition-colors"
      >
        Change Meal
      </button>
    </div>
    <div 
      class="mt-2 cursor-pointer hover:opacity-75 transition-opacity"
      @click="$emit('click')"
    >
      <h4 class="font-medium text-orange-600">{{ meal.name }}</h4>
      <p class="text-sm text-gray-600 mt-1">Prep time: {{ meal.prepTime }} mins</p>
      <div class="mt-2">
        <span class="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">{{ meal.ingredients.length }} ingredients</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  day: {
    type: String,
    required: true
  },
  meal: {
    type: Object,
    required: true
  }
})

defineEmits(['click', 'changeMeal'])
</script> 