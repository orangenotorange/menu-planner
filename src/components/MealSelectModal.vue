<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-orange-600">Select a Meal</h2>
          <button 
            @click="$emit('close')" 
            class="text-gray-500 hover:text-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="grid gap-4">
          <div
            v-for="meal in availableMeals.filter(m => m.category === 'dinner')"
            :key="meal.id"
            class="border rounded-lg p-4 hover:bg-orange-50 cursor-pointer transition-colors"
            @click="$emit('select', meal)"
          >
            <h3 class="font-medium text-orange-600">{{ meal.name }}</h3>
            <div class="mt-2 space-y-2">
              <p class="text-sm text-gray-600 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ meal.preparationTime }} mins
              </p>
              <p class="text-sm text-gray-600 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {{ meal.ingredients.length }} ingredients
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in meal.dietaryTags"
                  :key="tag"
                  class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
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
  day: {
    type: Number,
    required: true
  },
  availableMeals: {
    type: Array,
    required: true
  }
})

defineEmits(['close', 'select'])
</script> 